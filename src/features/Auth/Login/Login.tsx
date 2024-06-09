import useMatchMedia from "../../../hooks/useMatchMedia";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import LoginSidebar from "./LoginSidebar";
import LoginForm from "./LoginForm";

export default function Login() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);

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
        <LoginSidebar isMobile={isMobile} />
        <main className="w-fit px-[1rem] mx-auto">
          <LoginForm isMobile={isMobile} />
        </main>
      </div>
    </section>
  );
}
