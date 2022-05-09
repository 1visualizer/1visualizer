import { Node } from "@antv/x6";

export class TreeNode extends Node {
  private collapsed: boolean = false;

  protected postprocess() {
    this.toggleCollapse(false);
  }

  isCollapsed() {
    return this.collapsed;
  }

  toggleButtonVisibility(visible: boolean) {
    this.attr("buttonGroup", {
      display: visible ? "block" : "none",
    });
  }

  toggleCollapse(collapsed?: boolean) {
    const target = collapsed == null ? !this.collapsed : collapsed;
    if (!target) {
      this.attr("buttonSign", {
        d: "M 1 5 9 5 M 5 1 5 9",
        strokeWidth: 1.6,
      });
    } else {
      this.attr("buttonSign", {
        d: "M 2 5 8 5",
        strokeWidth: 1.8,
      });
    }
    this.collapsed = target;
  }
}
