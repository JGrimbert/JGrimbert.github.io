<script setup lang="ts">
import { biblio, merx, discounts } from "./model";
import MerxBiblioDiscount from './components/MerxBiblioDiscount.vue'
import MerxBiblioBag from './components/MerxBiblioBag.vue'
import MerxBiblioFounded from './components/MerxBiblioFounded.vue'
import { onMounted, watchEffect } from 'vue'

const API_URL = 'http://henri-potier.xebia.fr/books/';

onMounted(async () => {
  biblio.complete = await (await fetch(API_URL)).json();
});

watchEffect(async () => {
  const { choosen, url, initial } = writeURL(biblio.selected);
  const askOffers = url.length && await (await fetch(`${API_URL}${url}/commercialOffers`)).json();
  merx.initial = initial;
  merx.offers = askOffers.offers;
  merx.discounted = sumDiscounts()
  biblio.choosen = choosen;
});


function writeURL(arr, initial = 0) {

  const choosen = arr.reduce((acc, cur) => {
    initial = initial + cur.price
    return {...acc, [cur.isbn]: cur}
  }, {});

  return { choosen, url: Object.keys(choosen), initial };

}

function sumDiscounts () {

  const priceBeforeDiscount = merx.initial;

  return merx.offers && merx.offers.reduce((acc, cur) => {

    const test = discounts[cur.type].funk(acc, cur.value, cur.sliceValue)

    console.log("->", acc, cur, test)

    return test

  }, priceBeforeDiscount)
}

</script>

<template>
  <main>
      <input
        v-model="biblio.searched"
        placeholder="Rechercher un bouquin"
      >
      <MerxBiblioFounded />
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

input {
  margin: 1em;
}
</style>
