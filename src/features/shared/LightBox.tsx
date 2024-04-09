import { useEffect, useRef } from "react";

type LightBoxConfigureTypes = {
  isLightBox: boolean;
  setIsLightBox: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LightBox({
  isLightBox,
  setIsLightBox,
}: LightBoxConfigureTypes) {
  const lightBoxImagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleExitClick = (e: MouseEvent) => {
      if (isLightBox && e.target === lightBoxImagesRef.current) {
        setIsLightBox(false);
      }
    };

    const handleExitKey = (e: KeyboardEvent) => {
      if (isLightBox && e.key == "Escape") {
        setIsLightBox(false);
      }
    };

    document.addEventListener("click", handleExitClick);
    document.addEventListener("keydown", handleExitKey);

    return () => {
      document.removeEventListener("click", handleExitClick);
      document.removeEventListener("keydown", handleExitKey);
    };
  }, [isLightBox, setIsLightBox]);

  return (
    <>
      <div
        ref={lightBoxImagesRef}
        className={` ${isLightBox ? "md:opacity-90 fixed inset-0" : "opacity-0"}
        bg-black
        z-[3]
        transition-opacity
        `}
      ></div>
    </>
  );
}
