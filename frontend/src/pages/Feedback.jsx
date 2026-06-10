import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await api.get("/api/feedback");
      setFeedbackList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (role !== "STAFF") {
    return (
      <Layout>
        <div className="alert alert-danger">Access Denied</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="mb-4">
          <h2>Tenant Feedbacks</h2>
          <p className="text-muted">
            Review ratings and comments submitted by tenants.
          </p>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Ticket</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {feedbackList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Feedback Available
                    </td>
                  </tr>
                ) : (
                  feedbackList.map((feedback) => (
                    <tr key={feedback.id}>
                      <td>
                        <div className="fw-bold">{feedback.user?.fullName}</div>

                        <small className="text-muted">
                          {feedback.user?.role}
                        </small>
                      </td>

                      <td>
                        <Link
                          to={`/tickets/${feedback.ticket?.id}`}
                          className="fw-bold text-decoration-none"
                        >
                          {feedback.ticket?.ticketNumber}
                        </Link>
                      </td>
                      <td>{feedback.rating}/5</td>

                      <td>{feedback.comments}</td>

                      <td>
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Feedback;
