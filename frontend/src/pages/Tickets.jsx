import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const role = localStorage.getItem("role");
      const email = localStorage.getItem("email");

      let response;

      if (role === "TENANT") {
        response = await api.get(`/api/tickets/user?email=${email}`);
      } else {
        response = await api.get("/api/tickets");
      }

      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm);

    const matchesStatus = statusFilter === "" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="container-fluid">
        <h1 className="mb-4">Tickets</h1>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search Tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>

              <option value="OPEN">OPEN</option>

              <option value="IN_PROGRESS">IN_PROGRESS</option>

              <option value="CLOSED">CLOSED</option>

              <option value="REOPENED">REOPENED</option>
            </select>
          </div>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Ticket Number</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="fw-bold text-decoration-none"
                      >
                        {ticket.ticketNumber}
                      </Link>
                    </td>

                    <td>{ticket.title}</td>
                    <td>
                      <span
                        className={
                          ticket.status === "OPEN"
                            ? "badge bg-primary"
                            : ticket.status === "IN_PROGRESS"
                              ? "badge bg-warning text-dark"
                              : ticket.status === "CLOSED"
                                ? "badge bg-success"
                                : "badge bg-secondary"
                        }
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          ticket.priority === "CRITICAL"
                            ? "badge bg-danger"
                            : ticket.priority === "HIGH"
                              ? "badge bg-warning text-dark"
                              : ticket.priority === "MEDIUM"
                                ? "badge bg-info"
                                : "badge bg-success"
                        }
                      >
                        {ticket.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Tickets;
