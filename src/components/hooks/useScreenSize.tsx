import React from "react";

function useScreenSize() {
  const [isDesktop, setDesktop] = React.useState(false);
  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1024);
  };
  React.useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return isDesktop;
}

export default useScreenSize;
