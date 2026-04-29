import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            TaskMaster
          </h1>
          <p className="text-xl text-gray-600">
            Organize your tasks, boost your productivity
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to TaskMaster
            </h2>
            <p className="text-gray-600">
              Get started by creating an account or logging in
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Link
              href="/signup"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Create Account
            </Link>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <Link
              href="/login"
              className="block w-full text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Login to Existing Account
            </Link>
          </div>

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-600 font-semibold">✓</div>
                <div className="text-gray-600">Create Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-semibold">✓</div>
                <div className="text-gray-600">Set Priorities</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-semibold">✓</div>
                <div className="text-gray-600">Track Progress</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-semibold">✓</div>
                <div className="text-gray-600">Due Dates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2024 TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}