import { createApp } from "vue";
import EntryPoint from "./EntryPoint.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
createApp(EntryPoint).mount("#app");
