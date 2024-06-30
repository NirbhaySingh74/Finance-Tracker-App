const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
          Error
        </h2>
        <p className="text-center text-gray-700">
          Something went wrong. Please try again later.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Go back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
