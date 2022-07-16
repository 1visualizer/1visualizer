import { HierarchyResult } from "../../entities/HierarchyResult";
import { XMLValidator } from "fast-xml-parser";

import * as _ from "lodash";

export function parse(document: string): Node {
  const parser = new DOMParser();
  const doc1 = parser.parseFromString(document, "application/xml");
  const ns = doc1.createNSResolver(doc1.documentElement);
  const res = doc1.evaluate("/xs:schema/xs:element", doc1.documentElement, ns, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return res.singleNodeValue!;
}

export function parseRoot(root: Element): HierarchyResult {
  let result = {} as HierarchyResult;
  result.id = _.uniqueId("elem");
  result.name = root.getAttribute("name") ?? root.nodeName;
  result.type = getTypeByElement(root);
  result.children = [];
  if (root.hasChildNodes()) {
    for (let i = 0; i < root.children.length; i++) {
      const item = root.children[i];
      if (item.nodeName.includes("complexType")) {
        complexTypeParser(result, item);
      }
    }
  }
  return result;
}

function complexTypeParser(parent: HierarchyResult, element: Element) {
  if (element.hasChildNodes()) {
    if (element.childElementCount == 1 && element.children[0].nodeName.includes("simpleContent")) {
      simpleContentParser(parent, element.children[0]);
    }
    for (let i = 0; i < element.children.length; i++) {
      const item = element.children[i];
      if (item.nodeName.includes("sequence")) {
        sequenceParser(parent, item);
      }
    }
  }
}

function simpleContentParser(parent: HierarchyResult, element: Element) {
  if (element.hasChildNodes()) {
    for (let i = 0; i < element.children.length; i++) {
      const item = element.children[i];
      if (item.nodeName.includes("extension")) {
        const baseAttr = item.getAttribute("base");
        if (baseAttr != null) parent.type = getTypeByAttribute(baseAttr);
      }
    }
  }
}

function sequenceParser(parent: HierarchyResult, sequence: Element) {
  let sequenceResult = {} as HierarchyResult;
  sequenceResult.id = _.uniqueId("seq");
  sequenceResult.icon = "/src/assets/sequence4.svg";
  sequenceResult.minOccurs = sequence.getAttribute("minOccurs") ?? "1";
  sequenceResult.maxOccurs = sequence.getAttribute("maxOccurs") == "unbounded" ? "*" : sequence.getAttribute("maxOccurs") ?? "1";
  sequenceResult.type = "sequence";
  sequenceResult.children = [];
  parent.children.push(sequenceResult);

  if (sequence.hasChildNodes()) {
    for (let i = 0; i < sequence.children.length; i++) {
      const item = sequence.children[i];
      if (item.nodeName.includes("element")) {
        elementParser(sequenceResult, item);
      } else if (item.nodeName.includes("sequence")) {
        sequenceParser(sequenceResult, item);
      }
    }
  }
}

function elementParser(parent: HierarchyResult, element: Element) {
  let elementResult = {} as HierarchyResult;
  elementResult.id = _.uniqueId("elem");
  elementResult.name = element.getAttribute("name") ?? element.nodeName;
  elementResult.type = getTypeByElement(element);
  elementResult.minOccurs = element.getAttribute("minOccurs") ?? "1";
  elementResult.maxOccurs = element.getAttribute("maxOccurs") == "unbounded" ? "*" : element.getAttribute("maxOccurs") ?? "1";
  elementResult.children = [];
  parent.children.push(elementResult);

  if (element.hasChildNodes()) {
    for (let i = 0; i < element.children.length; i++) {
      const item = element.children[i];
      if (item.nodeName.includes("complexType")) {
        complexTypeParser(elementResult, item);
      }
    }
  }
}

function getTypeByElement(element: Element): string {
  const type = element.getAttribute("type") as string;
  return getTypeByAttribute(type);
}

function getTypeByAttribute(type: string): string {
  if (type?.includes("string")) {
    return "string-5";
  } else if (type?.includes("integer") || type?.includes("decimal") || type?.includes("unsigned") || type?.includes("long")) {
    return "number-16";
  } else if (type?.includes("boolean")) {
    return "boolean";
  } else if (type?.includes("date")) {
    return "date";
  } else if (type?.includes("time")) {
    return "time";
  } else {
    return "complextypexml";
  }
}


export function validateXml(document: string) {
  const result = XMLValidator.validate(document, {
    allowBooleanAttributes: true,
  });
  return result;
}
