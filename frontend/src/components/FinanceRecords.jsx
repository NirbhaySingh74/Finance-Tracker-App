import toast from "react-hot-toast";
import axios from "axios";

const FinanceRecords = ({ financeData, setFinanceData }) => {
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

  return (
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
  );
};

export default FinanceRecords;
