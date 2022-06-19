import { HierarchyResult } from "../entities/HierarchyResult";
import { XMLValidator } from "fast-xml-parser";
export function parse(document: string): Node {
  const parser = new DOMParser();
  const doc1 = parser.parseFromString(document, "application/xml");
  const ns = doc1.createNSResolver(doc1.documentElement);
  const res = doc1.evaluate("/xs:schema/xs:element", doc1.documentElement, ns, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return res.singleNodeValue!;
}

export function constructHierarchy(element: Element, lastResult: HierarchyResult | null): HierarchyResult {
  if (element.nodeName.includes("sequence")) {
    iterateAndPush(element, lastResult!);
  }

  let result = {} as HierarchyResult;
  result.id = element.getAttribute("name") ?? element.nodeName;
  result.minOccurs = element.getAttribute("minOccurs") ?? "1";
  result.maxOccurs = element.getAttribute("maxOccurs") == "unbounded" ? "*" : element.getAttribute("maxOccurs") ?? "1";
  const type = element.getAttribute("type");

  if (type?.includes("string")) {
    result.type = "string";
  } else if (type?.includes("integer") || type?.includes("decimal") || type?.includes("unsigned") || type?.includes("long")) {
    result.type = "number";
  } else if (type?.includes("boolean")) {
    result.type = "boolean";
  } else if (type?.includes("date")) {
    result.type = "date";
  } else if (type?.includes("time")) {
    result.type = "time";
  } else {
    console.log(type);
    result.type = "complextypexml";
  }
  result.children = [];
  if (element.hasChildNodes() && !element.nodeName.includes("sequence")) {
    if (element.childElementCount == 1 && element.firstChild?.nodeName.includes("complexType")) {
      element = element.firstChild as Element;
    }
    if (element.childElementCount == 1 && element.firstChild?.nodeName.includes("simpleContent")) {
      element = element.firstChild as Element;
    }
    iterateAndPush(element, result);
  }
  return result;
}

function iterateAndPush(element: Element, result: HierarchyResult) {
  for (var child = element.firstChild; child; child = child.nextSibling) {
    if (child.nodeName.includes("attribute")) {
      console.log(child.nodeName);
      continue;
    }
    let newNode = constructHierarchy(child as Element, result);
    if (!newNode.id.includes("sequence")) {
      result.children.push(newNode);
    }
  }
}

export function validateXml(document: string) {
  const result = XMLValidator.validate(document, {
    allowBooleanAttributes: true,
  });
  return result;
}
