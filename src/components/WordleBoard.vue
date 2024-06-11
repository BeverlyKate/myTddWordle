<script setup lang="ts">
import { VICTORY_MESSAGE } from '@/settings';
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <input type="text">
  <p>{{ wordOfTheDay }}</p>
  <p>{{VICTORY_MESSAGE}}</p>
</template>
