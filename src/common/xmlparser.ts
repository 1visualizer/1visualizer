import { HierarchyResult } from "../entities/HierarchyResult";

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
  result.children = [];
  if (element.hasChildNodes() && !element.nodeName.includes("sequence")) {
    if (element.childElementCount == 1 && element.firstChild?.nodeName.includes("complexType")) {
      element = element.firstChild as Element;
    }
    iterateAndPush(element, result);
  }
  return result;
}

function iterateAndPush(element: Element, result: HierarchyResult) {
  for (var child = element.firstChild; child; child = child.nextSibling) {
    let newNode = constructHierarchy(child as Element, result);
    if (!newNode.id.includes("sequence")) result.children.push(newNode);
  }
}
