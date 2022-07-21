<script setup lang="ts">
import { watch } from "vue";
import codesvg from "../../assets/code.svg";
import diagramsvg from "../../assets/diagram.svg";

const props = defineProps({
  date: Number,
});
watch(
  () => props.date,
  async (newDate, oldDate) => {
    const designLi = document.getElementById("design");
    const originalBackground = designLi!.style.backgroundColor;
    designLi!.style.backgroundColor = "orange";
    setTimeout(() => {
      designLi!.style.backgroundColor = originalBackground;
    }, 100);
  }
);
</script>

<template>
  <div class="d-flex flex-column pt-5 flex-shrink-0 sidebar">
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <a
          class="nav-link active py-3 border-bottom"
          id="pills-code-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-code"
          title="Code"
          role="tab"
          aria-controls="pills-code"
          aria-current="page"
          aria-selected="true"
          href="#"
        >
          <svg class="bi" width="24" height="24" role="img" aria-label="Code">
            <use :href="`${codesvg}#code`" />
          </svg>
          Code
        </a>
      </li>
      <li id="design" class="nav-item" role="presentation">
        <a
          class="nav-link py-3 border-bottom"
          id="pills-design-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-design"
          title="Diagram"
          role="tab"
          aria-controls="pills-design"
          aria-selected="false"
          href="#"
        >
          <svg class="bi" width="24" height="24" role="img" aria-label="Diagram">
            <use :href="`${diagramsvg}#diagram`" />
          </svg>
          Design
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 5rem;
  background-color: #f3f4f5;
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
