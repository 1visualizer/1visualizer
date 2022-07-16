<script setup lang="ts">
import DesignContent from "./DesignContent.vue";
import CodeContent from "./CodeContent.vue";
import SideBar from "../common/SideBar.vue";
import { ref } from "vue";

const mycode = ref("");
const mydate = ref();
function updateCode(code: string) {
  mycode.value = code;
}

function updateDate(date: Date) {
  mydate.value = date;
}
</script>

<template>
  <main class="fluid-container">
    <SideBar :date="mydate" />
    <div class="tab-content workarea" id="pills-tabContent">
      <CodeContent @code-change="updateCode" />
      <DesignContent @graph-rendred="updateDate" :code="mycode" />
    </div>
  </main>
</template>

<style scoped>
.fluid-container {
  height: 93vh;
}
.workarea {
  width: 100%;
}
</style>
