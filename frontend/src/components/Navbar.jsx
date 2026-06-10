import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Helpdesk System
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/dashboard">
            Dashboard
          </Link>

          <Link className="btn btn-outline-light me-2" to="/tickets">
            Tickets
          </Link>

          <Link className="btn btn-outline-light me-2" to="/create-ticket">
            Create Ticket
          </Link>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
