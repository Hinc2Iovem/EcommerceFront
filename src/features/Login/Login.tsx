import { MATCHMEDIA } from "../../const/MatchMedia";
import useMatchMedia from "../../hooks/useMatchMedia";
import LoginForm from "./LoginForm";
import LoginSidebar from "./LoginSidebar";

export default function Login() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);

  return (
    <section className="flex flex-col md:justify-center md:items-center h-screen bg-neutral-magnolia">
      <div className="md:flex md:m-[1.5rem] md:bg-neutral-alabaster md:p-[1.5rem] max-w-[max-content] relative  my-0 rounded-xl">
        <LoginSidebar isMobile={isMobile} />
        <LoginForm />
      </div>
    </section>
  );
}
