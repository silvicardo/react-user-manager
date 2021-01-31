import { useState } from "react";

export default function useStackedViews(): [number[], VoidFunction, VoidFunction] {
  const [viewsIds, setViewsIds] = useState([0]);

  const dismissActiveStackView = () => {
    setViewsIds((prevViewsIds) => (prevViewsIds.length > 1 ? prevViewsIds.slice(0, -1) : prevViewsIds));
  };

  const addViewToStack = () => {
    setViewsIds((prevViewsIds) => [...prevViewsIds, prevViewsIds.length]);
  };

  return [viewsIds, dismissActiveStackView, addViewToStack];
}
