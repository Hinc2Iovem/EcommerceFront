import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import AsideHoverPromptModal from "./AsideHoverPromptModal";

const ButtonHoverPromptModalStyles = cva(
  ["z-[999] transition-all hover:translate-x-[5%] outline-none w-fit"],
  {
    variants: {
      variant: {
        icon: ["bg-white rounded-full"],
        iconWithShadow: [
          "hover:shadow-black bg-white hover:shadow-sm rounded-full",
        ],
        rectangle: ["py-[.5rem] px-[2rem] rounded-md"],
        rectangleWithShadow: [
          "hover:shadow-black py-[.5rem] px-[2rem] rounded-md",
        ],
      },
    },
    defaultVariants: {
      variant: "iconWithShadow",
    },
  }
);

export interface hidePromptModal {
  hideModal?: boolean;
  contentName: string;
  positionByAbscissa: "left" | "right";
}

type ButtonHoverPromptModalProps = VariantProps<
  typeof ButtonHoverPromptModalStyles
> &
  ComponentProps<"button"> &
  hidePromptModal;

export default function ButtonHoverPromptModal({
  variant,
  className,
  contentName,
  hideModal,
  positionByAbscissa = "right",
  ...props
}: ButtonHoverPromptModalProps) {
  const [showAsidePrompt, setShowAsidePrompt] = useState(false);

  return (
    <div className="relative ">
      <button
        {...props}
        className={twMerge(
          ButtonHoverPromptModalStyles({ variant }),
          className
        )}
        onMouseOver={() => setShowAsidePrompt(true)}
        onMouseOut={() => setShowAsidePrompt(false)}
      ></button>
      <AsideHoverPromptModal
        contentName={contentName}
        hideModal={hideModal}
        showAsidePrompt={showAsidePrompt}
        positionByAbscissa={positionByAbscissa}
      />
    </div>
  );
}
