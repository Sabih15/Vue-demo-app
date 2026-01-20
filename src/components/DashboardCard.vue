<template>
  <div class="card">
    <h4>{{ title }}</h4>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
