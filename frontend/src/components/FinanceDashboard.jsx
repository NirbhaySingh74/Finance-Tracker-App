import { useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.get("http://localhost:5000/api/finance");
      console.log("response", response);
      setFinanceData(response.data);
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/profile"
      );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/finance/add",
        formData
      );
      setFinanceData([...financeData, response.data]);
      setFormData({
        description: "",
        amount: "",
        category: "Income",
        paymentMethod: "Cash",
      });
    } catch (error) {
      console.error("Error submitting finance data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Finance Dashboard</div>
        {userData && (
          <div className="flex items-center">
            <img
              src={userData.profilePic}
              alt="User Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <span>{userData.username}</span>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Record</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Investment">Investment</option>
              <option value="Savings">Savings</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Record
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">Records</h2>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Payment Method</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {financeData?.map((record) => (
              <tr key={record._id} className="text-center">
                <td className="py-2 px-4">{record?.description}</td>
                <td className="py-2 px-4">{record?.amount}</td>
                <td className="py-2 px-4">{record?.category}</td>
                <td className="py-2 px-4">{record?.paymentMethod}</td>
                <td className="py-2 px-4">
                  {new Date(record?.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default FinanceDashboard;
