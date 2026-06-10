import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const fullName = localStorage.getItem("fullName");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    navigate("/");
  };

  const activeStyle = {
    backgroundColor: "#0d6efd",
    borderRadius: "10px",
    color: "white",
  };

  const menuStyle = {
    padding: "12px",
    textDecoration: "none",
    color: "white",
    borderRadius: "10px",
    display: "block",
    marginBottom: "10px",
  };

  const initials = fullName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "260px",
        height: "100vh",
        background: "#1e293b",
        padding: "20px",

        position: "fixed",
        left: 0,
        top: 0,

        overflowY: "auto",
      }}
    >
      <h3
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        🎫 Helpdesk
      </h3>

      <div
        style={{
          background: "#334155",
          padding: "15px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#475e80",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {initials}
          </div>

          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {fullName}
            </div>

            <div
              style={{
                fontSize: "12px",
                opacity: "0.8",
              }}
            >
              {role}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link
          to="/dashboard"
          style={{
            ...menuStyle,
            ...(location.pathname === "/dashboard" ? activeStyle : {}),
          }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/tickets"
          style={{
            ...menuStyle,
            ...(location.pathname === "/tickets" ? activeStyle : {}),
          }}
        >
          {role === "TENANT" ? "🎟 My Tickets" : "🎟 Tickets"}
        </Link>

        {role === "ADMIN" && (
          <Link
            to="/add-staff"
            style={{
              ...menuStyle,
              ...(location.pathname === "/add-staff" ? activeStyle : {}),
            }}
          >
            👨‍💼 Add Staff
          </Link>
        )}

        {role === "TENANT" && (
          <Link
            to="/create-ticket"
            style={{
              ...menuStyle,
              ...(location.pathname === "/create-ticket" ? activeStyle : {}),
            }}
          >
            ➕ Create Ticket
          </Link>
        )}

        {role === "STAFF" && (
          <Link
            to="/feedback"
            style={{
              ...menuStyle,
              ...(location.pathname === "/feedback" ? activeStyle : {}),
            }}
          >
            ⭐ Feedback
          </Link>
        )}
      </div>

      <hr
        style={{
          borderColor: "#475569",
          marginBottom: "20px",
        }}
      />

      <div className="mt-auto">
        <hr
          style={{
            borderColor: "#475569",
            marginBottom: "20px",
          }}
        />
        <button onClick={logout} className="btn btn-danger w-100">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
