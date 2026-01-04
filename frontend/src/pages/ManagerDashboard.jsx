import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";




function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);

  const fetchPendingLeaves = async () => {
    const res = await api.get("/leaves/pending");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  const approveLeave = async (id) => {
    await api.put(`/leaves/${id}/approve`);
    fetchPendingLeaves();
  };

  const rejectLeave = async (id) => {
    await api.put(`/leaves/${id}/reject`);
    fetchPendingLeaves();
  };

  return (
    <div className="container" style={{ width: "700px" }}>
        <Navbar />
      <h2>Manager Dashboard</h2>

      {leaves.length === 0 && <p>No pending requests</p>}

      <ul>
        {leaves.map((leave) => (
          <li key={leave._id} style={{ marginBottom: "15px" }}>
            <strong>{leave.employee.name}</strong> |{" "}
            {leave.leaveType} |{" "}
            {leave.startDate.slice(0, 10)} →{" "}
            {leave.endDate.slice(0, 10)}

            <br />

            <button onClick={() => approveLeave(leave._id)}>
              Approve
            </button>

            <button
              onClick={() => rejectLeave(leave._id)}
              style={{ marginLeft: "10px" }}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerDashboard;
