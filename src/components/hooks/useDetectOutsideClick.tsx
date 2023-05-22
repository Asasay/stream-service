import { useState, useEffect, RefObject } from "react";

export function useDetectOutsideClick(
  el: RefObject<HTMLElement>,
  initialState: boolean
) {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const clickOutsideEvent: EventListener = (e) => {
      // If the active element exists and is clicked outside of
      if (
        el.current &&
        e.target instanceof Node &&
        !el.current.contains(e.target)
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(!isActive);
      }
    };
    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener("click", clickOutsideEvent);
    }

    return () => {
      window.removeEventListener("click", clickOutsideEvent);
    };
  }, [isActive, el]);

  return [isActive, setIsActive] as const;
}
