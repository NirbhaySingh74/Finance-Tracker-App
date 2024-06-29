import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Finance Tracker
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your finances efficiently and effectively.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
