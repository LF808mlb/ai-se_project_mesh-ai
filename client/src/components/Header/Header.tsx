import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Header() {
  function getNavLinkClass({ isActive, isChat }: { isActive: boolean; isChat: boolean }) {
    const classes = ["header__link"];

    if (isActive) {
      classes.push("header__link--active");
    }

    if (isActive && isChat) {
      classes.push("header__link--chat-active");
    }

    return classes.join(" ");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Mesh AI" />
      <nav className="header__nav" aria-label="Primary">
        <NavLink to="/knowledge" className={getNavLinkClass}>
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={(props) => getNavLinkClass({ ...props, isChat: true })}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}