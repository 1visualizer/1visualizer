export interface HierarchyResult {
  id: string;
  value?: string;
  x: number;
  y: number;
  children: HierarchyResult[];
}
