<script setup lang="ts">
import { biblio } from "../model";
</script>

<template>
  <article
      v-for="branch in biblio.selected"
      :class="biblio.choosen[branch.isbn] && 'selected'"
  >
    <input
        :id="branch.isbn"
        v-model="biblio.selected"
        type="checkbox"
        :value="branch"
        name="branch"
    >
    <label :for="branch.isbn">
      {{ branch.title }}
    </label>
  </article>
</template>

<style scoped>

</style>
