<script setup lang="ts"></script>

<script>
import { PrismEditor } from "vue-prism-editor";

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";

export default {
  components: {
    PrismEditor,
  },
  props: {
    data: String,
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
  },
};
</script>
<template>
  <div class="tab-content workarea" id="pills-tabContent">
    <div class="tab-pane fade show active codearea pt-5 ps-5 pe-5" id="pills-code" role="tabpanel" aria-labelledby="pills-code-tab">
      <prism-editor class="my-editor" v-model="data" :highlight="highlighter" line-numbers></prism-editor>
    </div>
    <div class="tab-pane fade codearea pt-5 ps-5 pe-5" id="pills-design" role="tabpanel" aria-labelledby="pills-design-tab">design</div>
  </div>
</template>

<style scoped>
.workarea {
  width: 100%;
}

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
