<script setup lang="ts">
import SideBar from "./SideBar.vue";
import MainContent from "./MainContent.vue";
</script>

<template>
  <main class="fluid-container">
    <SideBar />
    <MainContent />
  </main>
</template>

<style scoped>
.fluid-container {
  height: 93vh;
}
</style>
