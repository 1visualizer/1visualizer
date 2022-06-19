<script setup lang="ts">
import { Graph, Node, Model, Edge } from "@antv/x6";
import { parse, constructHierarchy } from "../../common/xmlparser";
import { HierarchyResult } from "../../entities/HierarchyResult";
import Hierarchy from "@antv/hierarchy";
import { TreeEdge } from "../../entities/TreeEdge";
import { TreeNode } from "../../entities/TreeNode";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  code: String,
});

let mygraph: Graph;

function clearGraph() {
  mygraph.clearCells();
}
function downloadSVGAsText() {
  mygraph.toSVG(function tester(data) {
    const base64doc = btoa(unescape(encodeURIComponent(data)));
    const e = new MouseEvent("click");
    const a = document.createElement("a");
    a.download = "download.svg";
    a.href = "data:image/svg+xml;base64," + base64doc;
    a.dispatchEvent(e);
  });
}
function downloadSVGAsPNG() {
  mygraph.toPNG(function tester(data) {
    const e = new MouseEvent("click");
    const a = document.createElement("a");
    a.download = "download.png";
    a.href = data;
    a.dispatchEvent(e);
  });
}
onMounted(function () {
  TreeNode.config({
    zIndex: 2,
    markup: [
      {
        tagName: "g",
        selector: "buttonGroup",
        children: [
          {
            tagName: "rect",
            selector: "button",
            attrs: {
              "pointer-events": "visiblePainted",
            },
          },
          {
            tagName: "path",
            selector: "buttonSign",
            attrs: {
              fill: "none",
              "pointer-events": "none",
            },
          },
        ],
      },
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "text",
        selector: "label",
      },
    ],
    attrs: {
      body: {
        refWidth: "100%",
        refHeight: "100%",
        strokeWidth: 1,
        fill: "#EFF4FF",
        stroke: "#5F95FF",
      },
      label: {
        textWrap: {
          ellipsis: true,
          width: -10,
        },
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        refX: "50%",
        refY: "50%",
        fontSize: 12,
      },
    },
  });

  TreeEdge.config({
    zIndex: 1,
    label: {
      position: "top",
    },
    attrs: {
      line: {
        stroke: "#A2B1C3",
        strokeWidth: 3,
        targetMarker: null,
      },
    },
  });

  mygraph = new Graph({
    container: document.getElementById("container")!,
    autoResize: true,
    height: 830,
    async: true,
    frozen: false,
    interacting: true,
    sorting: "approx",
    panning: {
      enabled: true,
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    grid: {
      size: 10,
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#E7E8EA",
          thickness: 1,
        },
        {
          color: "#CBCED3",
          thickness: 1,
          factor: 4,
        },
      ],
    },
    connecting: {
      anchor: "orth",
      connector: "rounded",
      connectionPoint: "boundary",
      router: {
        name: "er",
        args: {
          offset: 24,
          direction: "H",
        },
      },
    },
  });

  Node.registry.register("tree-node", TreeNode, true);
  Edge.registry.register("tree-edge", TreeEdge, true);
});

watch(
  () => props.code,
  async (newCode, oldCode) => {
    if (newCode == "") {
      mygraph.clearCells();
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: newCode,
      };
      fetch("http://localhost:7071/api/xml2xsd", requestOptions)
        .then((response) => response.text())
        .then((xml) => {
          const parser = new DOMParser();
          const doc1 = parser.parseFromString(xml, "application/xml");
          const ns = doc1.createNSResolver(doc1.documentElement);
          const res = doc1.evaluate("/xs:schema/xs:element", doc1.documentElement, ns, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          let ob = constructHierarchy(parse(xml) as Element, null);
          const result = Hierarchy.mindmap(ob, {
            direction: "H",
            getHeight() {
              return 16;
            },
            getWidth() {
              return 16;
            },
            getHGap() {
              return 180;
            },
            getVGap() {
              return 35;
            },
            getSide: () => {
              return "right";
            },
          });
          const model: Model.FromJSONData = { nodes: [], edges: [] };
          const traverse = (data: any, isRoot: Boolean) => {
            if (data) {
              if (isRoot) {
                model.nodes?.push({
                  id: `${data.id}`,
                  x: data.x + 400,
                  y: data.y + 250,
                  width: 200,
                  height: 60,
                  attrs: {
                    body: {
                      stroke: "#5F95FF",
                      strokeWidth: 1,
                      fill: "rgba(95,149,255,0.05)",
                      refWidth: 1,
                      refHeight: 1,
                    },
                    image: {
                      "xlink:href": "./src/assets/" + data.data.type + ".png",
                      width: 20,
                      height: 20,
                      x: 12,
                      y: 12,
                    },
                    title: {
                      text: data.id,
                      refX: 40,
                      refY: 14,
                      fill: "rgba(0,0,0,0.85)",
                      fontSize: 12,
                      "text-anchor": "start",
                    },
                  },
                  markup: [
                    {
                      tagName: "rect",
                      selector: "body",
                    },
                    {
                      tagName: "image",
                      selector: "image",
                    },
                    {
                      tagName: "text",
                      selector: "title",
                    },
                    {
                      tagName: "text",
                      selector: "text",
                    },
                  ],
                });
              } else {
                model.nodes?.push({
                  id: `${data.id}`,
                  x: data.x + 400,
                  y: data.y + 250,
                  width: 200,
                  height: 60,
                  attrs: {
                    body: {
                      stroke: "#5F95FF",
                      strokeWidth: 1,
                      fill: "rgba(95,149,255,0.05)",
                      refWidth: 1,
                      refHeight: 1,
                    },
                    image: {
                      "xlink:href": "./src/assets/" + data.data.type + ".png",
                      width: 20,
                      height: 20,
                      x: 12,
                      y: 12,
                    },
                    title: {
                      text: data.id,
                      refX: 40,
                      refY: 14,
                      fill: "rgba(0,0,0,0.85)",
                      fontSize: 12,
                      "text-anchor": "start",
                    },
                  },
                  markup: [
                    {
                      tagName: "rect",
                      selector: "body",
                    },
                    {
                      tagName: "image",
                      selector: "image",
                    },
                    {
                      tagName: "text",
                      selector: "title",
                    },
                    {
                      tagName: "text",
                      selector: "text",
                    },
                  ],
                  ports: {
                    groups: {
                      group1: {
                        attrs: {
                          circle: {
                            r: 4,
                            magnet: true,
                            stroke: "#31d0c6",
                            fill: "#fff",
                            strokeWidth: 1,
                          },
                        },
                      },
                    },
                    items: [
                      {
                        id: "port1",
                        group: "group1",
                        attrs: {
                          text: {
                            text: data.data.minOccurs + "..." + data.data.maxOccurs,
                          },
                        },
                      },
                    ],
                  },
                });
              }
            }
            if (data.children) {
              data.children.forEach((item: HierarchyResult) => {
                model.edges?.push({
                  source: `${data.id}`,
                  target: `${item.id}`,
                  attrs: {
                    line: {
                      stroke: "#A2B1C3",
                      strokeWidth: 1,
                      targetMarker: null,
                    },
                  },
                });
                traverse(item, false);
              });
            }
          };
          traverse(result, true);
          mygraph.fromJSON(model);
        });
    }
  }
);
</script>
<template>
  <div class="fade designarea pt-5 ps-5 pe-5" id="pills-design" role="tabpanel" aria-labelledby="pills-design-tab">
    <div class="row">
      <nav id="navbarNavDropdown" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a v-on:click="downloadSVGAsText()">
                  <svg class="bi" width="24" height="24" role="img" aria-label="Code">
                    <use xlink:href="#svg" />
                  </svg>
                </a>
              </li>
              <li class="nav-item">
                <a v-on:click="downloadSVGAsPNG()">
                  <svg class="bi" width="24" height="24" role="img" aria-label="Code">
                    <use xlink:href="#png" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="row">
      <div id="container"></div>
    </div>
  </div>
</template>

<style scoped>
.designarea {
  height: 97%;
}
#navbarNavDropdown {
  background: rgb(245, 245, 245);
}

#navbarNavDropdown li {
  padding-right: 20%;
}
</style>

<style></style>
