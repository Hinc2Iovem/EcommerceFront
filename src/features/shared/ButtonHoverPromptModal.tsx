import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const ButtonHoverPromptModalStyles = cva(
  ["z-[999] transition-all hover:translate-x-[5%] outline-none w-fit"],
  {
    variants: {
      variant: {
        icon: ["hover:rounded-full hover:bg-white rounded-full"],
        iconWithShadow: [
          "hover:rounded-full hover:shadow-black hover:bg-white hover:shadow-sm rounded-full",
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

type hidePromptModal = {
  showModal: boolean;
  contentName: string;
};

type ButtonHoverPromptModalProps = VariantProps<
  typeof ButtonHoverPromptModalStyles
> &
  ComponentProps<"button"> &
  hidePromptModal;

export default function ButtonHoverPromptModal({
  variant,
  className,
  showModal,
  contentName,
  ...props
}: ButtonHoverPromptModalProps) {
  const hoverBeforeClasses = showModal
    ? ""
    : `hover:before:absolute hover:before:bg-white hover:before:bottom-[-4rem] hover:before:left-[-1.5rem] hover:before:p-[.5rem] hover:before:w-[8rem] hover:before:rounded-sm  hover:before:shadow-sm hover:before:shadow-black hover:before:content-['${contentName}']`;

  return (
    <div className="relative">
      <button
        {...props}
        className={twMerge(
          ButtonHoverPromptModalStyles({ variant }),
          className,
          hoverBeforeClasses
        )}
      ></button>

      <aside className="absolute border-black border-[1px] "></aside>
    </div>
  );
}
