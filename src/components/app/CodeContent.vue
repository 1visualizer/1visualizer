<script setup lang="ts">
import { PrismEditor } from "vue-prism-editor";
import { validateXml } from "../../common/xmlparser";
import { highlight, languages } from "prismjs/components/prism-core";
import { reactive } from "vue";
import toast, { push } from "../utils/Toast.vue";
import * as _ from "lodash";
const emit = defineEmits(["code-change", "clear-graph"]);
const props = defineProps({
  code: String,
});

const state = reactive({ errors: [] });

function highlighter(code) {
  return highlight(code, languages.js); // languages.<insert language> to return html with markup
}

const codeChange = _.debounce(function () {
  const result = validateXml(props.code!);
  if (props.code?.trim().length != 0 && result == true) {
    emit("code-change", props.code);
  } else if (props.code?.trim().length != 0) {
    emit("code-change", "");
    push(state.errors, { id: _.uniqueId("toast_"), msg: "Invalid document : " + result.err.msg });
  }
}, 2000);

function onCodeChange() {
  codeChange();
}
</script>

<template>
  <div class="tab-pane fade show active codearea pt-5 ps-5 pe-5" id="pills-code" role="tabpanel" aria-labelledby="pills-code-tab">
    <toast :errors="state.errors" :msg="code"></toast>

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
