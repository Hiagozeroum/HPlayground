<template>
  <div class="diagram">

    <!-- Nível 1 -->
    <div class="row">
      <div class="node node--1">
        <span class="node__emoji">📦</span>
        <span class="node__name">FormExample.vue</span>
        <span class="node__sub">Provider · Nível 1</span>
      </div>
    </div>

    <!-- Nível 2 -->
    <div class="row">
      <div class="node node--2">
        <span class="node__emoji">📄</span>
        <span class="node__name">FormContainer.vue</span>
        <span class="node__sub">Consumer · Nível 2</span>
      </div>
    </div>

    <!-- Nível 3 -->
    <div class="row">
      <div class="node node--3">
        <span class="node__emoji">📋</span>
        <span class="node__name">FormHeader.vue</span>
        <span class="node__sub">Nível 3</span>
      </div>
      <div class="node node--3">
        <span class="node__emoji">📝</span>
        <span class="node__name">FormBody.vue</span>
        <span class="node__sub">Nível 3</span>
      </div>
      <div class="node node--3">
        <span class="node__emoji">⚡</span>
        <span class="node__name">FormFooter.vue</span>
        <span class="node__sub">Nível 3</span>
      </div>
    </div>

    <!-- Nível 4 -->
    <div class="row">
      <div class="node node--4">
        <span class="node__emoji">🔢</span>
        <span class="node__name">FormFieldsGroup.vue</span>
        <span class="node__sub">Consumer · Nível 4</span>
      </div>
    </div>

    <!-- Nível 5 -->
    <div class="row">
      <div class="node node--5">
        <span class="node__emoji">🔤</span>
        <span class="node__name">NameField.vue</span>
        <span class="node__sub">Nível 5</span>
      </div>
      <div class="node node--5">
        <span class="node__emoji">📧</span>
        <span class="node__name">EmailField.vue</span>
        <span class="node__sub">Nível 5</span>
      </div>
      <div class="node node--5">
        <span class="node__emoji">🎂</span>
        <span class="node__name">AgeField.vue</span>
        <span class="node__sub">Nível 5</span>
      </div>
      <div class="node node--5">
        <span class="node__emoji">✅</span>
        <span class="node__name">TermsField.vue</span>
        <span class="node__sub">Nível 5</span>
      </div>
    </div>

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
.node--5 { border-color: #65a30d; }
</style>
