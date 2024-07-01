import toast from "react-hot-toast";
import axios from "axios";

const FinanceForm = ({
  formData,
  handleChange,
  setFinanceData,
  financeData,
  setFormData,
}) => {
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

  return (
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
  );
};

export default FinanceForm;
