import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FinanceDashboard = () => {
  const [financeData, setFinanceData] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Income",
    paymentMethod: "Cash",
  });
  const [userData, setUserData] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/finance/add", formData, {
        withCredentials: true,
      });
      setFinanceData([...financeData, response.data]);
      setFormData({
        description: "",
        amount: "",
        category: "Income",
        paymentMethod: "Cash",
      });
      toast.success("Record added successfully!");
    } catch (error) {
      console.error("Error submitting finance data:", error);
      toast.error("Failed to add record!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/finance/${id}`);
      setFinanceData(financeData.filter((record) => record._id !== id));
      toast.success("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting finance data:", error);
      toast.error("Failed to delete record!");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {});
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout!");
    }
  };

  const totalAmount = financeData.reduce(
    (total, record) => total + parseFloat(record.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="text-3xl font-bold">Finance Dashboard</div>
        {userData && (
          <div className="relative flex items-center">
            <img
              src={userData.profilePic}
              alt="User Profile"
              className="w-10 h-10 rounded-full mr-4 cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            <span className="font-medium">{userData.username}</span>
            {showLogout && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 z-10">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
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

        <h2 className="text-2xl font-semibold mb-4">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </h2>

        <h2 className="text-2xl font-semibold mb-4">Records</h2>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Payment Method</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {financeData?.map((record) => (
              <tr key={record._id} className="text-center">
                <td className="py-2 px-4">{record?.description}</td>
                <td className="py-2 px-4">₹{record?.amount.toFixed(2)}</td>
                <td className="py-2 px-4">{record?.category}</td>
                <td className="py-2 px-4">{record?.paymentMethod}</td>
                <td className="py-2 px-4">
                  {new Date(record?.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
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
