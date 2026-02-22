import { FiUser } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import "../styles/Header.css";
import authService from "../services/authService";

function Header(props: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (page: string) => {
    props.onPageChange(page);
    setDropdownOpen(false);
  };
  const user = authService.getCurrentUser();
  return (
    <div
      className="header"
      style={{
        height: "10dvh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "10dvw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        LOGO
      </div>

      <div
        style={{
          width: "70dvw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        
      >Menu Items</div>

      <div
        className="profile"
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "1rem",
          height: "100%",
          width: "10dvw",
          justifyContent: "center",
          position: "relative",
        }}
        ref={dropdownRef}
      >
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
          title="User Menu"
        >
          {user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiUser size={24} />
              <span style={{ marginLeft: "0.5rem" }}>{user.username}</span>
            </div>
          ) : (
            <FiUser size={24} />
          )}
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
           {user ? (
              <button
                className="dropdown-item"
                onClick={() => {
                  authService.logout();
                  handleMenuClick("home");
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="dropdown-item"
                  onClick={() => handleMenuClick("signin")}
                >
                  Sign In
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleMenuClick("signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
