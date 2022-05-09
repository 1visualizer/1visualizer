<script setup lang="ts">
import DesignContent from "./DesignContent.vue";
import CodeContent from "./CodeContent.vue";
</script>

<script lang="ts"></script>
<template>
  <div class="tab-content workarea" id="pills-tabContent">
    <CodeContent />
    <DesignContent />
  </div>
</template>

<style scoped>
.workarea {
  width: 100%;
}
</style>
