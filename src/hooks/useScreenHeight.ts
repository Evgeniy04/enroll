import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const useScreenHeight = () => {
  const [height, setHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setHeight(window.height);
    });

    return () => subscription?.remove();
  }, []);

  return height;
}

export default useScreenHeight;