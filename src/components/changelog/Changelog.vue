<script setup lang="ts">
import { onMounted, ref } from "vue";
import Markdown from "vue3-markdown-it";

const source = ref("");
onMounted(function () {
  fetch("../../../CHANGELOG.md")
    .then((response) => response.text())
    .then((text) => {
      source.value = text;
    });
});
</script>

<template>
  <main id="changelog" class="fluid-container">
    <Markdown :source="source" />
  </main>
</template>

<style scoped>
.fluid-container {
  height: 93vh;
}
</style>
