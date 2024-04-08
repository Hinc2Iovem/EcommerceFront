import { Outlet } from "react-router-dom";

export default function LayoutDefault() {
  return (
    <main className="h-full">
      <Outlet />
    </main>
  );
}
