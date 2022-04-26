<script setup lang="ts">
import TopNavBar from "./components/TopNavBar.vue";
import ContentContainer from "./components/ContentContainer.vue";
import SvgElements from "./components/SvgElements.vue";
</script>

<template>
  <SvgElements />
  <TopNavBar />
  <ContentContainer />
</template>

<style>
html,
body,
.fluid-container {
  height: 97%;
}
main {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
