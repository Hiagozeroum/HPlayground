# WebSockets — Conceito e Prática

## O problema que resolve

HTTP é **half-duplex e stateless**: o cliente faz uma requisição, o servidor responde, a conexão se encerra. Para dados em tempo real, a solução "naive" é *polling* — o cliente pergunta repetidamente "tem algo novo?". Funciona, mas é ineficiente: muito overhead de rede, latência variável e desperdício de recursos no servidor.

WebSocket resolve com uma conexão **full-duplex persistente**: após um handshake HTTP inicial (`Upgrade: websocket`), o canal fica aberto e ambos os lados podem enviar mensagens a qualquer momento, sem nova requisição.

```
HTTP polling:
  Cliente → "tem algo novo?" → Servidor → "não"  (overhead repetido)
  Cliente → "tem algo novo?" → Servidor → "sim! { dado }"

WebSocket:
  Cliente ──[handshake HTTP]──► Servidor
           ◄────────────────── conexão aberta (persiste)
  Servidor ──► { dado }  (empurra quando quiser)
  Cliente  ──► { dado }  (também pode enviar a qualquer hora)
```

## Alternativas e quando usar cada uma

| Solução             | Direção             | Quando usar                                   |
|---------------------|---------------------|-----------------------------------------------|
| Polling             | Cliente → Servidor  | Simplicidade, baixa frequência, sem infra WS  |
| SSE                 | Servidor → Cliente  | Notificações unidirecionais (feeds, logs)     |
| **WebSocket**       | **Bidirecional**    | **Chat, jogos, colaboração, dados ao vivo**   |

## Principais casos de uso

- **Chat em tempo real** — mensagens chegam sem o usuário precisar "pedir"
- **Notificações ao vivo** — servidor empurra quando o evento ocorre
- **Dashboards / monitoramento** — métricas atualizando continuamente
- **Colaboração** (Notion, Figma) — múltiplos clientes sincronizados entre si
- **Jogos multiplayer** — latência mínima, alta frequência de mensagens
- **Feeds de preço** (ações, cripto) — stream contínuo de dados

---

## Implementação com NestJS + Socket.IO

NestJS usa o conceito de **Gateway** para WebSockets — é análogo a um Controller, mas orientado a eventos em vez de rotas HTTP.

Por padrão usa `socket.io`, que adiciona reconexão automática, namespaces, rooms e fallback para polling (útil em ambientes que bloqueiam WS puro).

### Instalação (no módulo api/)

```bash
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
```

### Server — Gateway NestJS

```typescript
// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// cors: origem do frontend em desenvolvimento
@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  // Ciclo de vida — conexão estabelecida
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  // Ciclo de vida — conexão encerrada
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // Escuta o evento 'join-room' emitido pelo cliente
  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    // Notifica os outros da sala (sem incluir quem entrou)
    client.to(room).emit('user-joined', { id: client.id });
    return { event: 'joined', room }; // resposta direta ao cliente que enviou
  }

  // Escuta o evento 'message' emitido pelo cliente
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() payload: { room: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = {
      from: client.id,
      text: payload.text,
      timestamp: new Date().toISOString(),
    };

    // Emite para todos na sala, incluindo quem enviou
    this.server.to(payload.room).emit('message', message);
  }
}
```

```typescript
// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
```

```typescript
// src/app.module.ts — registrar o módulo
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ChatModule],
  ...
})
export class AppModule {}
```

### Client — Vue 3 Composable

```typescript
// src/composables/useChat.ts
import { ref, onUnmounted } from 'vue';
import { io, type Socket } from 'socket.io-client';

export function useChat(serverUrl: string) {
  const socket = ref<Socket | null>(null);
  const messages = ref<{ from: string; text: string; timestamp: string }[]>([]);
  const isConnected = ref(false);

  function connect() {
    socket.value = io(serverUrl, {
      // reconecta automaticamente com backoff exponencial
      reconnectionDelayMax: 10_000,
    });

    socket.value.on('connect', () => {
      isConnected.value = true;
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
    });

    socket.value.on('message', (msg) => {
      messages.value.push(msg);
    });

    socket.value.on('user-joined', ({ id }) => {
      console.log(`Usuário ${id} entrou na sala`);
    });
  }

  function joinRoom(room: string) {
    // callback = resposta ACK direta do servidor
    socket.value?.emit('join-room', room, (response: { room: string }) => {
      console.log('Entrou na sala:', response.room);
    });
  }

  function sendMessage(room: string, text: string) {
    socket.value?.emit('message', { room, text });
  }

  function disconnect() {
    socket.value?.disconnect();
    socket.value = null;
  }

  // Limpeza automática quando o componente é desmontado
  onUnmounted(disconnect);

  return { messages, isConnected, connect, joinRoom, sendMessage, disconnect };
}
```

```vue
<!-- Uso no componente -->
<script setup lang="ts">
import { ref } from 'vue';
import { useChat } from '@/composables/useChat';

const { messages, isConnected, connect, joinRoom, sendMessage } = useChat(
  'http://localhost:3001',
);

const room = 'sala-geral';
const input = ref('');

connect();
joinRoom(room);

function send() {
  if (!input.value.trim()) return;
  sendMessage(room, input.value.trim());
  input.value = '';
}
</script>
```

---

## Conceitos importantes

### Rooms (Salas)
Agrupamentos lógicos de clientes. Um cliente pode estar em múltiplas salas. Mensagens emitidas para uma sala chegam apenas aos clientes nela.

```typescript
client.join('sala-a');           // entra
client.leave('sala-a');          // sai
this.server.to('sala-a').emit(); // emite para todos na sala
client.to('sala-a').emit();      // emite para todos EXCETO quem enviou
```

### Namespaces
Canais separados dentro do mesmo servidor. Útil para separar contextos (ex: `/chat`, `/notifications`).

```typescript
@WebSocketGateway({ namespace: '/chat' })
```

### ACK (Acknowledgement)
O cliente pode passar um callback ao emitir; o servidor retorna um valor diretamente para aquele callback — sem precisar escutar um evento separado de resposta.

```typescript
// cliente
socket.emit('join-room', 'sala-geral', (response) => {
  console.log(response); // { event: 'joined', room: 'sala-geral' }
});

// servidor — o return do @SubscribeMessage vira o ACK
@SubscribeMessage('join-room')
handleJoin(@MessageBody() room: string) {
  return { event: 'joined', room }; // enviado de volta como ACK
}
```

---

## Boas práticas

- **Validar dados no Gateway** — usar `ValidationPipe` também em WebSockets, ou validar manualmente o payload antes de processar
- **Não colocar lógica de negócio no Gateway** — delegar para um Service, exatamente como nos Controllers
- **Autenticação no handshake** — verificar o token JWT no evento `connection`, desconectar se inválido
- **Usar rooms para isolamento** — nunca transmitir para `server.emit()` (todos os clientes) sem necessidade
- **Lidar com desconexão** — limpar estado associado ao `client.id` no `handleDisconnect`

---

## Perguntas frequentes

### Como a room identifica o usuário? É a mesma autenticação do login?

Não — são camadas separadas. O `client.id` é gerado pelo socket.io a cada conexão, é efêmero (muda a cada reconexão) e não tem relação com quem é o usuário.

A autenticação é feita no handshake, passando o JWT no momento da conexão:

```typescript
// Cliente
const socket = io('http://localhost:3001', {
  auth: { token: 'eyJhbGci...' }
});

// Servidor — handleConnection
handleConnection(client: Socket) {
  const token = client.handshake.auth.token;
  const user = verifyJwt(token);
  if (!user) { client.disconnect(); return; }

  client.data.userId = user.id; // associa o socket ao usuário real
}
```

A partir daí, as rooms são nomeadas por IDs de domínio — não pelo `client.id`:

```typescript
client.join(`user:${client.data.userId}`);    // notificações pessoais
client.join(`document:${documentId}`);         // colaboração em recurso
```

**Resumo:** `client.id` é identidade técnica da conexão. Autenticação do usuário é sua responsabilidade, feita no handshake. Rooms são strings arbitrárias definidas pela lógica do seu domínio.

---

### Qual a diferença de um webhook?

São conceitos completamente diferentes apesar do nome parecido:

| | WebSocket | Webhook |
|---|---|---|
| **Quem inicia** | Cliente (browser/app) | Serviço externo (GitHub, Stripe...) |
| **Direção** | Bidirecional e persistente | HTTP POST unidirecional e pontual |
| **Conexão** | Fica aberta | Cada evento é uma requisição nova |
| **Uso típico** | Browser ↔ seu servidor em tempo real | Serviço externo → seu servidor quando algo acontece |
| **Exemplo** | Chat ao vivo | GitHub te avisa quando um PR é aberto |

Webhook é: "quando X acontecer no serviço externo, chame essa URL com um POST". É servidor-para-servidor, sem browser, sem conexão persistente. WebSocket é browser-para-servidor, persistente, bidirecional.

---

### Tem limite de escopo das mensagens?

Sim, e são os pontos mais críticos em produção:

**Técnicos:**
- Cada conexão aberta consome memória e file descriptor no servidor
- socket.io tem limite de ~1MB por mensagem por padrão
- Mensagens vão para todos os subscribers da room — quanto mais clientes, mais banda consumida

**Arquitetural (o mais importante):**
Se você rodar mais de uma instância do servidor (inevitável com carga real), as rooms ficam isoladas por processo. Um cliente no servidor A não recebe mensagens emitidas no servidor B.

A solução padrão é o **Redis Adapter** — usa Redis como pub/sub para sincronizar eventos entre instâncias:

```typescript
import { createAdapter } from '@socket.io/redis-adapter';

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();
this.server.adapter(createAdapter(pubClient, subClient));
```

Sem isso, WebSocket não escala horizontalmente.

---

### Por que não usar WebSocket sempre, no lugar de REST?

WebSocket é ótimo para o que foi feito, e inadequado para o que não foi.

**O que REST oferece que WebSocket não tem:**

- **Cache** — HTTP tem CDN, cache de browser, ETags. WS não tem nada disso. `GET /users/1` pode ser respondido pelo CDN sem chegar no servidor.
- **Escalabilidade horizontal simples** — REST é stateless por natureza. WS requer sticky sessions ou Redis Adapter.
- **Ferramentas** — Swagger, curl, Postman, aba Network do browser funcionam nativamente. WS é mais difícil de inspecionar e testar.
- **Semântica padronizada** — Status codes HTTP (`404`, `401`, `422`) são universais. Em WS você precisa inventar seu próprio protocolo de erro.
- **Compatibilidade** — Firewalls corporativos e alguns proxies bloqueiam WS. HTTP funciona em todo lugar.
- **Reconexão simples** — Se o WS cai, o que foi emitido enquanto estava offline se perde. Com REST você simplesmente refaz a requisição.

**A regra prática:**

```
Preciso de dados agora, uma vez?               → REST
O servidor precisa avisar quando algo mudar?   → WebSocket
É uma escrita (criar, atualizar, deletar)?     → REST (WS pode notificar o resultado)
```

**Padrão comum em produção:** usar os dois juntos. REST para CRUD e operações pontuais; WebSocket para notificações e estado ao vivo. Exemplo: o usuário salva um documento via `POST /documents` (REST), e o servidor emite via WS para os outros colaboradores que estão com aquele documento aberto.

---

## Próximos passos sugeridos

1. Implementar autenticação no handshake via JWT
2. Persistir mensagens no banco antes de emitir
3. Adicionar tipagem forte nos eventos com `ServerToClientEvents` / `ClientToServerEvents`
4. Configurar Redis Adapter para suportar múltiplas instâncias
