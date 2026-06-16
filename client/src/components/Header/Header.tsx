import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Header() {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive ? "header__link header__link--active" : "header__link";
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Mesh AI" />
      <nav className="header__nav" aria-label="Primary">
        <NavLink to="/knowledge" className={getNavLinkClass}>
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={getNavLinkClass}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}