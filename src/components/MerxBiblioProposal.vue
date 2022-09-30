<script setup lang="ts">
import { biblio } from "../states";
import { computed } from "vue";
import fuzzysort from "fuzzysort";

const biblioFounded = computed(() => {
  return biblio.searched.length < 3
      ? biblio.complete
      : fuzzysort.go(biblio.searched, biblio.complete, {
          key: 'title',
          limit: 20
        }).map(e => e.obj);
});
</script>

<template>
  <input
      v-model="biblio.searched"
      placeholder="Rechercher un bouquin"
  >
  <section id="biblio">
    <article
        v-for="branch in biblioFounded"
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
        <figure>
          <img :src="branch.cover">
          <figcaption>
            <span class="title">{{ branch.title }}</span>
            <span class="price">{{ branch.price }}&nbsp;€</span>
          </figcaption>
        </figure>
      </label>
    </article>
  </section>
</template>

<style scoped lang="scss">

input {
  margin: 1em;
}

#biblio {
  display: flex;

  article {
    flex: initial;

  input {
    display: none;
  }

  figure {
    text-align: center;
    margin: 12px;

  img {
    max-width: 150px;
  }

  figcaption {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.33em;

  .title {
    font-size: 12px;
    text-align: right;
    line-height: 1.33em;
    margin-right: 1em;
  }

  }
  }

  &.selected {
     font-weight: bold;
   }

  }
}
</style>
