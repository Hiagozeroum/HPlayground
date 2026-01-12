import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Custom Directives
import { vHTooltip } from './directives/tooltip'

// Global Components
import HTooltip from './components/HTooltip.vue'

const app = createApp(App)

// Registrar custom directives
app.directive('h-tooltip', vHTooltip)

// Registrar componentes globais
app.component('HTooltip', HTooltip)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
