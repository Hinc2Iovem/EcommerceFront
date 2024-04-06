import { useState } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";
import RegisterSidebar from "./RegisterSidebar";
import RegisterForm from "./RegisterForm";
import { MATCHMEDIA } from "../../const/MatchMedia";

export default function Register() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <section className="flex flex-col md:justify-center md:items-center h-screen bg-neutral-magnolia">
      <div className="md:flex md:m-[1.5rem] md:bg-neutral-alabaster md:p-[1.5rem] max-w-[max-content]  my-0 rounded-xl">
        <RegisterSidebar
          isMobile={isMobile}
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
        />

        <RegisterForm
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
        />
      </div>
    </section>
  );
}
