import { getValue } from "@antv/x6/lib/util/object/object";
import { XMLParser } from "fast-xml-parser";
import { HierarchyResult } from "../entities/HierarchyResult";

export function parse(xml: string): object {
  const parser = new XMLParser();
  return parser.parse(xml);
}

export function constructHierarchy(xml: Object): HierarchyResult {
  let node = {} as HierarchyResult;
  node.id = Object.keys(xml)[0];

  node.children = [];
  if (typeof xml[node.id] != "object") {
    node.value = xml[node.id];
  } else {
    Object.keys(xml[node.id]).forEach(function (value) {
      let newNode = constructHierarchy({ [value]: xml[node.id][value] });
      node.children.push(newNode);
    });
  }
  return node;
}
