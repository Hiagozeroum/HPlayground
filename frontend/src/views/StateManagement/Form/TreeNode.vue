<template>
  <li>
    <div class="node-card d-inline-flex align-center" :class="`node--${levelColor(node.level)}`">
      <span class="node-emoji mr-2">{{ node.emoji }}</span>
      <div class="d-flex flex-column text-left node-text">
        <span class="text-caption font-weight-bold">{{ node.name }}</span>
        <span class="node-role">{{ node.role }} · Nível {{ node.level }}</span>
      </div>
    </div>

    <ul v-if="node.children?.length">
      <TreeNode
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        :level-color="levelColor"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { HierarchyNode } from './hierarchy'

// Componente recursivo: renderiza um nó e seus filhos como subárvore
defineProps<{
  node: HierarchyNode
  levelColor: (level: number) => string
}>()
</script>

<style scoped>
/* Texto sempre na cor padrão da superfície; só a borda/emoji carregam a cor do nível */
.node-text {
  color: rgb(var(--v-theme-on-surface));
}
</style>
