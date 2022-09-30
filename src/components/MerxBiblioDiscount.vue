<script setup lang="ts">
  import { merx, discounts } from "../model";
</script>

<template>
  <ul v-if="merx.offers?.length" id="offers">
    <li v-for="offer in merx.offers">
      {{ discounts[offer.type].html(offer) }}
    </li>
  </ul>
  <ul v-if="merx.initial" id="prices">
    <li>Prix initial: {{ merx.initial }}€</li>
    <li>Avec remise: {{ merx.discounted }}€</li>
    <li>Soit une réduction de {{ merx.initial - merx.discounted }}€</li>
  </ul>
  <article v-else id="CTA">
    Sélectionnez les produits de votre choix
  </article>
</template>
