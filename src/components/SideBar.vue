<script setup lang="ts"></script>

<template>
  <div class="d-flex flex-column pt-5 flex-shrink-0 bg-light sidebar">
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <a
          href="#"
          class="nav-link active py-3 border-bottom"
          aria-current="page"
          title="Code"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
        >
          <svg class="bi" width="24" height="24" role="img" aria-label="Code">
            <use xlink:href="#code" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link py-3 border-bottom"
          title="Diagram"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
        >
          <svg
            class="bi"
            width="24"
            height="24"
            role="img"
            aria-label="Diagram"
          >
            <use xlink:href="#diagram" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 4.5rem;
}

.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}

.nav-flush .nav-link {
  border-radius: 0;
}
</style>
