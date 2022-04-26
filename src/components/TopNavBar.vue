<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
    <div class="container-fluid">
      <a
        href="/"
        class="navbar-brand"
        title="Icon-only"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        <svg class="bi" width="40" height="32">
          <use xlink:href="#bootstrap" />
        </svg>
        <span class="visually-hidden">Icon-only</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ms-auto me-5 mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
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
</style>
