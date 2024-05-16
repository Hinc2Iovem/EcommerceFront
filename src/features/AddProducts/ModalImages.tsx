import exit from "../../assets/images/shared/exit.png";
import PreviewImgs from "../shared/PreviewImgs";

type ModalImagesTypes = {
  setShowImgsModal: React.Dispatch<React.SetStateAction<boolean>>;
  showImgsModal: boolean;
  imgsPreview: string[] | ArrayBuffer | null;
  setImgsPreview: React.Dispatch<
    React.SetStateAction<ArrayBuffer | string[] | null>
  >;
};

export default function ModalImages({
  setShowImgsModal,
  showImgsModal,
  imgsPreview,
  setImgsPreview,
}: ModalImagesTypes) {
  return (
    <aside
      className={`${
        showImgsModal ? "" : "hidden"
      } absolute bottom-[10rem] w-[calc(100%-2rem)] max-w-[70rem] h-[30rem] shadow-md p-[1rem] bg-white rounded-md `}
    >
      <div className="w-full h-full border-[2px] border-gray-300 rounded-md overflow-auto p-[1rem]">
        <PreviewImgs
          divClasses="shadow-md my-[1rem] w-full h-full relative "
          imagePreview={
            Array.isArray(imgsPreview) ? imgsPreview[0] : imgsPreview
          }
          setImgsPreview={setImgsPreview}
        />
        <PreviewImgs
          divClasses="shadow-md my-[1rem] w-full h-full relative "
          imagePreview={
            Array.isArray(imgsPreview) ? imgsPreview[1] : imgsPreview
          }
          setImgsPreview={setImgsPreview}
        />
        <PreviewImgs
          divClasses="shadow-md my-[1rem] w-full h-full relative "
          imagePreview={
            Array.isArray(imgsPreview) ? imgsPreview[2] : imgsPreview
          }
          setImgsPreview={setImgsPreview}
        />
      </div>
      <button
        onClick={() => setShowImgsModal(false)}
        className="absolute w-[3rem] h-[3rem] top-[.5rem] right-[.5rem] outline-none hover:scale-[1.02] active:scale-[0.98]"
      >
        <img src={exit} alt="X" className="w-full" draggable="false" />
      </button>
    </aside>
  );
}
