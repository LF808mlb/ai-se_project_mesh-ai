import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({ onMenuOpen, onMenuClose, isMobileMenuOpen }: Props) {
  function getNavLinkClass({ isActive, isChat = false }: { isActive: boolean; isChat?: boolean }) {
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
    <header className={isMobileMenuOpen ? "header header_mobile" : "header"}>
      <button
        type="button"
        className="header__menu-btn"
        aria-label="Open menu"
        aria-expanded={isMobileMenuOpen}
        onClick={onMenuOpen}
      />
      <img className="header__logo" src={logo} alt="Mesh AI" />
      <nav
        className={isMobileMenuOpen ? "header__nav header__nav_mobile" : "header__nav"}
        aria-label="Primary"
      >
        <NavLink to="/knowledge" className={({ isActive }) => getNavLinkClass({ isActive })} onClick={onMenuClose}>
          Knowledge Base
        </NavLink>
        <NavLink
          to="/chat"
          className={(props) => getNavLinkClass({ ...props, isChat: true })}
          onClick={onMenuClose}
        >
          Chat
        </NavLink>
      </nav>
    </header>
  );
}