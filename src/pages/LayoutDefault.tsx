import { Outlet } from "react-router-dom";

export default function LayoutDefault() {
  return (
    <section className="h-full">
      <Outlet />
    </section>
  );
}
