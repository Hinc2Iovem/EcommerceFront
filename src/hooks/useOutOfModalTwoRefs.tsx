import { useEffect } from "react";

type useOutOfModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  secondModalRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function useOutOfModalTwoRefs({
  setShowModal,
  showModal,
  modalRef,
  secondModalRef,
}: useOutOfModalProps) {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (showModal && e.key === "Escape") {
        setShowModal(false);
      }
    };
    const handleEscapeClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        secondModalRef.current &&
        !secondModalRef.current.contains(e.target as Node) &&
        showModal
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleEscapeClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleEscapeClick);
    };
  }, [showModal, modalRef, setShowModal, secondModalRef]);
}
