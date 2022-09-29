<script setup lang="ts">
import { merx, discounts } from "../model";
</script>

<template>
  <ul v-if="merx.offers">
    <li v-for="offer in merx.offers">
      {{ discounts[offer.type].html(offer) }}
    </li>
  </ul>
  <article v-if="merx.initial">
    Prix initial: {{ merx.initial }}
    Avec remises: {{ merx.discounted }}
  </article>
  <article v-else>
    Sélectionnez les produits de votre choix
  </article>
</template>

<style scoped>

</style>
