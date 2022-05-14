<script setup lang="ts"></script>

<script lang="ts">
import { PrismEditor } from "vue-prism-editor";
import { validateXml } from "../common/xmlparser";

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";

export default {
  components: {
    PrismEditor,
  },
  emits: ["code-change"],
  props: {
    code: String,
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    onCodeChange() {
      if (validateXml(this.code!) == true) {
        this.$emit("code-change", this.code);
      }
    },
  },
};
</script>
<template>
  <div class="tab-pane fade show active codearea pt-5 ps-5 pe-5" id="pills-code" role="tabpanel" aria-labelledby="pills-code-tab">
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
