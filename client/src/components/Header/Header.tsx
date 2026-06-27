import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import hamburgerIcon from "../../assets/hamburgerbutton.svg";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({ onMenuOpen, onMenuClose, isMobileMenuOpen }: Props) {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onMenuClose();
    navigate("/login");
  };

  function getNavLinkClass({ isActive, isChat = false }: { isActive: boolean; isChat?: boolean }) {
    const classes = ["header__link"];

    if (isActive) {
      classes.push("header__link--active");

      if (!isChat) {
        classes.push("header__link--knowledge-active");
      }
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
      >
        <img className="header__menu-icon" src={hamburgerIcon} alt="" aria-hidden="true" />
      </button>
      <img className="header__logo" src={logo} alt="Mesh AI" />
      <nav
        className={isMobileMenuOpen ? "header__nav header__nav_mobile" : "header__nav"}
        aria-label="Primary"
      >
        {isAuthenticated && (
          <>
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
            <span className="header__user-name">{currentUser?.name}</span>
            <button
              type="button"
              className="header__logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}