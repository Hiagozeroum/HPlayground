<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  location?: 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'
  disabled?: boolean
  openDelay?: number
  closeDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  location: 'top',
  disabled: false,
  openDelay: 0,
  closeDelay: 0,
})

const tooltipLocation = computed(() => props.location)
</script>

<template>
  <v-tooltip :text="text" :location="tooltipLocation" :disabled="disabled" :open-delay="openDelay" :close-delay="closeDelay">
    <template #activator="{ props: tooltipProps }">
      <span v-bind="tooltipProps">
        <slot></slot>
      </span>
    </template>
  </v-tooltip>
</template>

<style scoped>
/* Estilos customizados podem ser adicionados aqui */
</style>
