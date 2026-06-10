import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const role = localStorage.getItem("role");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    try {
      await api.post("/api/tickets", {
        title,
        description,
        priority,
        categoryId: Number(categoryId),
        userId: Number(localStorage.getItem("userId")),
      });

      alert("Ticket Created Successfully");

      setTitle("");
      setDescription("");
      setCategoryId("");
      setPriority("MEDIUM");
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    }
  };

  if (role !== "TENANT") {
    return (
      <Layout>
        <div className="container-fluid">
          <div className="alert alert-danger">
            <h4>Access Denied</h4>
            <p>Only tenants can create tickets.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="mb-4">
          <h2>Create Ticket</h2>

          <p className="text-muted">Raise a new support request</p>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{
            maxWidth: "900px",
          }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter ticket title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>

                  <select
                    className="form-select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority</label>

                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="LOW">LOW</option>

                    <option value="MEDIUM">MEDIUM</option>

                    <option value="HIGH">HIGH</option>

                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Description</label>

                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Describe your issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateTicket;
