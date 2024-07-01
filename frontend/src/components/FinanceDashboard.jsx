import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import FinanceForm from "./FinanceForm";
import FinanceRecords from "./FinanceRecords";

const FinanceDashboard = () => {
  const [financeData, setFinanceData] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Income",
    paymentMethod: "Cash",
  });
  const [userData, setUserData] = useState(null);

  const fetchFinanceData = async () => {
    try {
      const response = await axios.get("/api/finance", {
        withCredentials: true,
      });
      setFinanceData(response.data);
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user/profile", {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchFinanceData();
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const totalAmount = financeData.reduce(
    (total, record) => total + parseFloat(record.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header userData={userData} />

      <main className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Record</h2>

        <FinanceForm
          formData={formData}
          handleChange={handleChange}
          setFinanceData={setFinanceData}
          financeData={financeData}
          setFormData={setFormData}
        />

        <h2 className="text-2xl font-semibold mb-4">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </h2>

        <h2 className="text-2xl font-semibold mb-4">Records</h2>
        <FinanceRecords
          financeData={financeData}
          setFinanceData={setFinanceData}
        />
      </main>
    </div>
  );
};

export default FinanceDashboard;
