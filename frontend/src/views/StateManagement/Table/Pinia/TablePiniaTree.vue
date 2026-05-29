<template>
  <div class="diagram">

    <!-- Nível 1 -->
    <div class="row">
      <div class="node node--1">
        <span class="node__emoji">🏪</span>
        <span class="node__name">TablePiniaExample.vue</span>
        <span class="node__sub">Consumer · Nível 1</span>
      </div>
    </div>

    <!-- Nível 2 -->
    <div class="row">
      <div class="node node--2">
        <span class="node__emoji">📦</span>
        <span class="node__name">TableContainer.vue</span>
        <span class="node__sub">Estrutura · Nível 2</span>
      </div>
    </div>

    <!-- Nível 3 -->
    <div class="row">
      <div class="node node--3">
        <span class="node__emoji">📊</span>
        <span class="node__name">TableStats.vue</span>
        <span class="node__sub">Consumer · Nível 3</span>
      </div>
      <div class="node node--3">
        <span class="node__emoji">🔍</span>
        <span class="node__name">TableFilters.vue</span>
        <span class="node__sub">Consumer · Nível 3</span>
      </div>
      <div class="node node--3">
        <span class="node__emoji">📄</span>
        <span class="node__name">TableContent.vue</span>
        <span class="node__sub">Estrutura · Nível 3</span>
      </div>
      <div class="node node--3">
        <span class="node__emoji">📃</span>
        <span class="node__name">TablePagination.vue</span>
        <span class="node__sub">Consumer · Nível 3</span>
      </div>
    </div>

    <!-- Nível 4 (dentro de TableContent) -->
    <div class="row">
      <div class="node node--4">
        <span class="node__emoji">🗂️</span>
        <span class="node__name">TableHeader.vue</span>
        <span class="node__sub">Consumer · Nível 4</span>
      </div>
      <div class="node node--4">
        <span class="node__emoji">📋</span>
        <span class="node__name">TableBody.vue</span>
        <span class="node__sub">Consumer · Nível 4</span>
      </div>
    </div>

    <p class="legend">
      Todos os componentes acessam <code>useTableStore()</code> diretamente — sem prop drilling.
    </p>

  </div>
</template>

<script setup lang="ts">
// Componente de diagrama estático — dados embutidos no template
</script>

<style scoped>
.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 8px;
  overflow-x: auto;
}

.row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ─── Node base ─────────────────────────── */
.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid;
  background: rgb(var(--v-theme-surface));
  min-width: 136px;
  text-align: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.node:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
}

.node__emoji { font-size: 1.3rem; line-height: 1; }
.node__name  {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}
.node__sub   {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  opacity: 0.55;
  color: rgb(var(--v-theme-on-surface));
}

/* ─── Cores de borda por nível ──────────── */
.node--1 { border-color: #7c3aed; }
.node--2 { border-color: #2563eb; }
.node--3 { border-color: #0891b2; }
.node--4 { border-color: #059669; }

/* ─── Legenda ────────────────────────────── */
.legend {
  font-size: 0.7rem;
  opacity: 0.6;
  text-align: center;
  margin-top: 4px;
}
.legend code {
  font-size: 0.68rem;
  padding: 1px 4px;
  border-radius: 4px;
  background: rgba(var(--v-theme-on-surface), 0.08);
}
</style>
