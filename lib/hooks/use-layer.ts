import { useLayerConfig as layers } from "react-layered";

export const useLayer = layers([
  "navbar",
  { key: "modal", parts: ["overlay", "content", "bar"] },
  { key: "popover", parts: ["overlay", "content", "bar"] },
  { key: "tooltip", parts: ["overlay", "content", "bar"] },
]);
