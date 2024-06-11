<script setup lang="ts">
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <input type="text">
  <p>{{ wordOfTheDay }}</p>
  <p>"You won!"</p>
</template>
