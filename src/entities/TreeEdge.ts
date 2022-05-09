import { TreeNode } from "../entities/TreeNode";
import { Shape } from "@antv/x6";

export class TreeEdge extends Shape.Edge {
  isHidden() {
    const node = this.getTargetNode() as TreeNode;
    this.setLabels("Tester 1292");

    return !node || !node.isVisible();
  }
}
