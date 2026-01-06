export type SidebarItem = {
  label: string;
  link: string;
};

export type MapProps = {
  center: [number, number];
  zoom: number;
  layers: string[];
};

export type HeatmapControlsProps = {
  onToggleLayer: (layer: string) => void;
  activeLayers: string[];
};