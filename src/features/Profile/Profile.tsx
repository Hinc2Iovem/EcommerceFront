import Header, { HeaderProps } from "../../components/Header/Header";
import HeaderPills from "../../components/Header/HeaderPills";
import HeaderSearch from "../../components/Header/HeaderSearch";

export default function Profile({
  currentCategory = "All",
  setCurrentCategory,
}: HeaderProps) {
  return (
    <section>
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    </section>
  );
}
