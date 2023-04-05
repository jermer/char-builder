<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import CharBuilder from './components/CharBuilder.vue'
import PDFButton from './components/PDFButton.vue'
import AboutModal from './components/AboutModal.vue'
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
      <div class="lead">Streamlined hero creation based on the world's most well-known roleplaying game.</div>
    </div>

    <hr />

    <div class="instructions">
      <h5>- INSTRUCTIONS -</h5>
      <p>Make decisions about your hero using the sections to the right. When you're done, click the
        button
        to download your hero booklet!</p>

      <PDFButton />

      <p class="small mt-4"><a href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">ABOUT</a></p>
      <AboutModal />
    </div>

    <!-- <img alt="Mythematics logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
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
  color: #0d6efd;
}

.instructions {
  color: black
}

.logo {
  display: block;
  margin: 5rem auto 0;
}
</style>
