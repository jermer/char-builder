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
  data() {
    return {
      showErrors: false
    }
  },
}
</script>

<template>
  <header class="pt-5">
    <div class="title">
      <!-- <img alt="Mythematics logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
      <img alt="winged sword logo" class="logo" src="@/assets/winged-sword.svg" width="125" height="125" />
      <h1>Heroes Without the Handbook</h1>
      <div class="lead">Streamlined hero creation based on a certain well-known roleplaying game.</div>
    </div>

    <hr />

    <div class="instructions">
      <h5>- INSTRUCTIONS -</h5>
      <p>Follow the prompts in each section. When you're done, click the
        button to download your hero booklet!</p>

      <PDFButton @update-error-flag="showErrors = true" />

      <p class="small mt-4"><a href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">(ABOUT)</a></p>
      <AboutModal />
    </div>
  </header>

  <main>
    <CharBuilder :showErrors="showErrors" />
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
  overflow-y: auto;
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
  margin: 0 auto 0;
}
</style>
