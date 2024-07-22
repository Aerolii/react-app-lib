import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>home</p>
      <Outlet />
    </div>
  );
}
