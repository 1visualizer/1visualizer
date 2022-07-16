export interface HierarchyResult {
  id: string;
  name: string;
  value?: string;
  x: number;
  y: number;
  minOccurs: string;
  maxOccurs: string;
  type: string;
  children: HierarchyResult[];
  icon?: string;
}
