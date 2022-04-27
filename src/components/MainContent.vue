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

function formatXml(xml, colorize) {
  function esc(s) {
    return s.replace(/[-\/&<> ]/g, function (c) {
      // Escape special chars
      return c == " " ? "&nbsp;" : "&#" + c.charCodeAt(0) + ";";
    });
  }
  var sm = '<div class="xmt">',
    se = '<div class="xel">',
    sd = '<div class="xdt">',
    sa = '<div class="xat">',
    tb = '<div class="xtb">',
    tc = '<div class="xtc">',
    ind = "  ",
    sz = "</div>",
    tz = "</div>",
    re = "",
    is = "",
    ib,
    ob,
    at,
    i;
  if (!colorize) sm = se = sd = sa = sz = "";
  xml
    .match(/(?<=<).*(?=>)|$/s)[0]
    .split(/>\s*</)
    .forEach(function (nd) {
      ob = ("<" + nd + ">").match(/^(<[!?\/]?)(.*?)([?\/]?>)$/s); // Split outer brackets
      ib = ob[2].match(/^(.*?)>(.*)<\/(.*)$/s) || ["", ob[2], ""]; // Split inner brackets
      at = ib[1].match(/^--.*--$|=|('|").*?\1|[^\t\n\f \/>"'=]+/g) || [""]; // Split attributes
      if (ob[1] == "</") is = is.substring(ind.length); // Decrease indent
      re +=
        tb +
        tc +
        esc(is) +
        tz +
        tc +
        sm +
        esc(ob[1]) +
        sz +
        se +
        esc(at[0]) +
        sz;
      for (i = 1; i < at.length; i++)
        re +=
          (at[i] == "="
            ? sm + "=" + sz + sd + esc(at[++i])
            : sa + " " + at[i]) + sz;
      re += ib[2]
        ? sm +
          esc(">") +
          sz +
          sd +
          esc(ib[2]) +
          sz +
          sm +
          esc("</") +
          sz +
          se +
          ib[3] +
          sz
        : "";
      re += sm + esc(ob[3]) + sz + tz + tz;
      if (ob[1] + ob[3] + ib[2] == "<>") is += ind; // Increase indent
    });
  return re;
}
</script>

<template>
  <div class="bg-light pt-5 ps-5 pe-5 rounded workarea">
    <prism-editor
      class="my-editor"
      v-model="data"
      :highlight="highlighter"
      line-numbers
    ></prism-editor>
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
