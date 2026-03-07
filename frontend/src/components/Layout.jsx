import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import LegalFooter from "./LegalFooter";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <LegalFooter />
    </>
  );
}