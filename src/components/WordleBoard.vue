<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE} from '@/settings';
import {computed, ref, triggerRef} from "vue"
import englishWords from "@/englishWordsWith5Letters.json"
defineProps({ 
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: String) => englishWords.includes(wordGiven)
  }
})

const guessInProgress= ref<string|null>(null)
const guessSubmitted= ref("")

const formattedGuessInProgress= computed<string>({
  get(){
    return guessInProgress.value ?? ""
  },
  set(rawValue: String){
    const formattedValue= rawValue
    .slice(0, WORD_SIZE)
    .toUpperCase()
    .replace(/[^A-Z]+/gi, "")

    guessInProgress.value= formattedValue;

    triggerRef(formattedGuessInProgress)
  }
})

function onSubmit(){
  if(!englishWords.includes(formattedGuessInProgress.value)){
    return;
  }
  formattedGuessInProgress.value= formattedGuessInProgress.value
}

</script>

<template>
  <input v-model="formattedGuessInProgress" 
        maxlength="WORD_SIZE"
        type="text"
        @keydown.enter="onSubmit">
  <p v-if="guessSubmitted.length" > 0" 
      v-text="guessSubmitted === wordOfTheDay ? {{VICTORY_MESSAGE}} : {{DEFEAT_MESSAGE}}"></p>
</template>
