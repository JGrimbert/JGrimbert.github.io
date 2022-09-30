<script setup lang="ts">
  import { onMounted } from 'vue'
  import { biblio } from "./model";
  import { API } from "./API";
  import MerxBiblioDiscount from './components/MerxBiblioDiscount.vue'
  import MerxBiblioBag from './components/MerxBiblioBag.vue'
  import MerxBiblioProposal from './components/MerxBiblioProposal.vue'

  onMounted(async () => {
    biblio.complete = await API.getBooks();
  });
</script>

<template>
  <main>
      <MerxBiblioProposal />
      <MerxBiblioDiscount />
      <MerxBiblioBag />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
