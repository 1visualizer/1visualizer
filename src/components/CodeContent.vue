<script setup lang="ts">
import { PrismEditor } from "vue-prism-editor";
import { validateXml } from "../common/xmlparser";
import { highlight, languages } from "prismjs/components/prism-core";
import * as bootstrap from "bootstrap";

const props = defineProps({ code: String });
const emit = defineEmits(["code-change", "clear-graph"]);

function highlighter(code) {
  return highlight(code, languages.js); // languages.<insert language> to return html with markup
}

function onCodeChange() {
  let result;
  if ((result = validateXml(props.code!)) == true) {
    emit("code-change", props.code);
  } else {
    emit("code-change", "");
    var liveToast = document.getElementById("liveToast");
    var errorBody = document.getElementById("error-body");
    //errorBody.innerText  = "dddd";
    var toast = new bootstrap.Toast(liveToast);
    toast.show();
  }
}
</script>

<template>
  <div class="tab-pane fade show active codearea pt-5 ps-5 pe-5" id="pills-code" role="tabpanel" aria-labelledby="pills-code-tab">
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="liveToast" class="toast fade opacity-75 bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-danger">
          <strong class="me-auto text-white">Error</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-white error-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
    <prism-editor class="my-editor" v-model="code" :highlight="highlighter" @input="onCodeChange" line-numbers></prism-editor>
  </div>
</template>

<style scoped>
.codearea {
  height: 97%;
}

.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
</style>

<style>
.my-editor .prism-editor__textarea:focus {
  outline: none;
}
</style>
