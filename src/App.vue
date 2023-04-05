<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import CharBuilder from './components/CharBuilder.vue'
import PDFButton from './components/PDFButton.vue'
</script>

<script>
import { Tooltip } from 'bootstrap';
export default {
  components: {
    CharBuilder,
    PDFButton
  },
  // data() {
  //   errors: []
  // },
  mounted() {
    //inti tooltip
    /// NEEDED HERE? OR JUST IN COMPONENTS?
    Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode))
  }
}
</script>

<template>
  <header class="pt-5">
    <div class="title">
      <h1>Heroes Without the Handbook</h1>
      <div class="lead">Streamlined character creation based on the world's most well-known roleplaying game.</div>
    </div>

    <hr />

    <div class="instructions">
      <h5>- INSTRUCTIONS -</h5>
      <p>Make some decisions about your character using the sections shown to the right. When you're done, click the
        button
        to download a character sheet!</p>

      <PDFButton />
    </div>

    <img alt="Mythematics logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="disclaimer mt-5">
      <p>
        <i>Heroes Without the Handbook</i> is by Jason Ermer and available at <a href="https://mythematics.org/heroes/"
          target="_blank" rel="noopener">mythematics.org/heroes</a>.
      </p>
      <p>
        This work includes material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC
        and available at
        <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank"
          rel="noopener">dnd.wizards.com/resources/systems-reference-document</a>. The SRD 5.1 is licensed under the
        <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener">Creative Commons
          Attribution 4.0 International License</a>.
      </p>

    </div>
  </header>

  <main>
    <CharBuilder />
  </main>
</template>

<style scoped>
header {
  /* line-height: 1.5; */
  max-height: 100vh;
  text-align: center;
  padding: 3rem;
}

main {
  max-height: 100vh;
  padding-top: 3rem;
}

.title {
  color: darkblue
}

.instructions {
  color: black
}

.logo {
  display: block;
  margin: 5rem auto 0;
}

.disclaimer {
  color: gray;
  text-align: left;
  font-size: x-small;
}
</style>
