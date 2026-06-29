import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import hamburgerIcon from "../../assets/hamburgerbutton.svg";
import chevronDown from "../../assets/chevron-down.png";
import chevronUp from "../../assets/chevron-up.png";
import logoutIcon from "../../assets/log-out-03.png";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsUserMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!isUserMenuOpen) return;

      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
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
            <div className="header__user-menu" ref={userMenuRef}>
              <button
                type="button"
                className="header__user-toggle"
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                <span className="header__user-name">{currentUser?.name ?? "User"}</span>
                <img
                  className="header__user-chevron"
                  src={isUserMenuOpen ? chevronUp : chevronDown}
                  alt=""
                  aria-hidden="true"
                />
              </button>

              {isUserMenuOpen && (
                <button
                  type="button"
                  className="header__logout-item"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                  <img src={logoutIcon} alt="" aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}