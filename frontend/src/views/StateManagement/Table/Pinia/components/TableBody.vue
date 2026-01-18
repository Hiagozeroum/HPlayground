<template>
  <tbody>
    <tr>
      <td colspan="3" class="text-caption pa-1">
        <v-chip size="x-small" color="demo-badge" label> 📝 TableBody.vue (Nível 4) </v-chip>
      </td>
    </tr>
    <tr v-for="product in store.paginatedProducts" :key="product.id">
      <td>{{ product.name }}</td>
      <td>R$ {{ product.price.toFixed(2) }}</td>
      <td>
        <v-chip
          :color="
            product.status === 'available'
              ? 'success'
              : product.status === 'low_stock'
                ? 'warning'
                : 'error'
          "
          size="small"
          label
        >
          {{ product.stock }}
        </v-chip>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import { useTableStore } from '../useTableStore'

// 📝 NÍVEL 4: Acessa a store Pinia
const store = useTableStore()
</script>
