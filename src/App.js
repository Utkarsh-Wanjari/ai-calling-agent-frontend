import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://ai-calling-agent-backend-2wgo.onrender.com";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/customers`)
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCall = (customer) => {
    axios
      .post(`${BACKEND_URL}/call`, customer)
      .then((res) => alert(res.data.message))
      .catch((err) =>
        alert(err.response?.data?.message || "Call failed")
      );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Calling Agent</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.number}</td>
              <td>{c.order_status}</td>
              <td>
                <button onClick={() => handleCall(c)}>
                  Call
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

