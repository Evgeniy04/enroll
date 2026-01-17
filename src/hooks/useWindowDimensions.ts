import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  return windowDimensions;
}