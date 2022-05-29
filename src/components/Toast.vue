<script setup lang="ts">
import { onUpdated } from "vue";
import { Toast } from "bootstrap";

const props = defineProps({
  errors: { type: Array, default: () => [] },
});

onUpdated(() => {
  const all = props.errors.filter((obj) => {
    return obj.show != true;
  });
  all.forEach(function (error) {
    var errorToast = document.getElementById(error.id);
    var toast = new Toast(errorToast);
    toast.show();
    error.show = true;
    errorToast.addEventListener("hidden.bs.toast", function () {
      const indexOfObject = props.errors.findIndex((item) => {
        return item.id === error.id;
      });
      if (indexOfObject !== -1) {
        props.errors.splice(indexOfObject, 1);
      }
    });
  });
});
</script>
<script lang="ts">
const TOASTS_MAX = 5;
export function push(array: Array, data): Array {
  if (array.length == TOASTS_MAX) {
    array.shift();
    array.push(data);
  } else {
    array.push(data);
  }
}
</script>

<template>
  <div ref="container" class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div v-for="item in errors" v-bind:id="item.id" class="toast fade opacity-75 bg-danger" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="15000">
      <div class="toast-header bg-danger">
        <strong class="me-auto text-white">Error</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body text-white error-body">{{ item.msg }}</div>
    </div>
  </div>
</template>
