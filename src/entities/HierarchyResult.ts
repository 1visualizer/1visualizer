export interface HierarchyResult {
  id: string;
  value?: string;
  x: number;
  y: number;
  minOccurs: string;
  maxOccurs: string;
  type : string;
  children: HierarchyResult[];
}
