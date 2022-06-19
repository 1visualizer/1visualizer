<script setup>
import { ref, computed } from "vue";
import App from "./components/app/App.vue";
import Changelog from "./components/changelog/Changelog.vue";
import TopNavBar from "./components/common/TopNavBar.vue";
import SvgElements from "./components/utils/SvgElements.vue";

const routes = {
  "/": App,
  "/changelog": Changelog,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>

<template>
  <SvgElements />
  <TopNavBar />
  <component :is="currentView" />
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
