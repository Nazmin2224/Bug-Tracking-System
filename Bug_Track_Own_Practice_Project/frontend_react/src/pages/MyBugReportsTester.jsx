import React, { useEffect, useState } from 'react';
import './/BugReports.css'; // or adjust path as needed
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../services/auth';

function MyBugReportsTester() {
  const [myBugs, setMyBugs] = useState([]);

  useEffect(() => {
    const fetchAssignedBugs = async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          toast.error("⚠️ Not logged in");
          return;
        }

        const res = await api.get(`/api/bugs/tester/${user.id}`);
        setMyBugs(res.data);
      } catch (err) {
        console.error("Failed to fetch assigned bugs", err);
        toast.error("❌ Failed to load assigned bugs");
      }
    };

    fetchAssignedBugs();
  }, []);

  return (
    <div className="bug-reports-page">
      <h2>🧪 My Assigned Bugs</h2>

      <table className="bugs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {myBugs.length > 0 ? (
            myBugs.map(bug => (
              <tr key={bug.id}>
                <td>{bug.id}</td>
                <td>{bug.title}</td>
                <td>{bug.severity}</td>
                <td>{bug.status}</td>
                <td>{bug.project?.name || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No assigned bugs found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default MyBugReportsTester;
