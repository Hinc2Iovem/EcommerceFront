import { useState } from "react";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import useMatchMedia from "../../../hooks/useMatchMedia";
import RegisterSidebar from "./RegisterSidebar";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <section
      className={`${
        isMobile ? "" : "justify-center items-center"
      } flex flex-col h-screen`}
    >
      <div
        className={`${
          isMobile
            ? "w-full"
            : "flex m-[1.5rem] bg-neutral-alabaster p-[1.5rem] max-w-[max-content]"
        } relative my-0 rounded-xl`}
      >
        <RegisterSidebar
          isMobile={isMobile}
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
        />
        <main className="w-fit px-[1rem] mx-auto">
          <RegisterForm
            setCurrentForm={setCurrentForm}
            currentForm={currentForm}
            isMobile={isMobile}
          />
        </main>
      </div>
    </section>
  );
}
