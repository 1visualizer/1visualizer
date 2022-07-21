<script setup lang="ts">
import { onMounted, ref } from "vue";
import logo from "../../assets/1visualizer-logo.svg";

const isRoot = ref(false);
const isChangelog = ref(false);

onMounted(function () {
  activeState();
  addEventListener("hashchange", (event) => {
    activeState();
  });
});

function activeState() {
  if (window.location.hash === "#/" || window.location.hash === "" || window.location.hash === "/") {
    isRoot.value = true;
    isChangelog.value = false;
  } else if (window.location.hash === "#/changelog") {
    isChangelog.value = true;
    isRoot.value = false;
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark sticky-top bg-primary">
    <div class="container-fluid">
      <a href="/" class="navbar-brand" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
        <svg class="bi" width="50" height="47" xmlns="http://www.w3.org/2000/svg">
          <use :href="`${logo}#bootstrap`" />
        </svg>
        <span class="visually-hidden">Icon-only</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ms-auto me-5 mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: isRoot }" aria-current="page" href="#/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: isChangelog }" href="#/changelog">Changelog</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}
.navbar {
  padding-top: 0.1em;
  padding-bottom: 0.1em;
}
</style>
