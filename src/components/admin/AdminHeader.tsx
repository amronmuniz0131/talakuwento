import { Bell, UserCircle } from 'lucide-react';

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-start w-full mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Users</h1>
        <p className="text-sm text-gray-500">Manage and view all registered users.</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full shadow-sm border border-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
            A
          </div>
          <span className="text-sm font-medium text-gray-700">Admin User</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
