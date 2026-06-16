import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import UserTable from '@/components/admin/UserTable';
import UserProfilePanel from '@/components/admin/UserProfilePanel';
import { getAccounts, updateAccount } from '@/services/accountService';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination & Search state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Panel state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Debounce search term
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getAccounts(page, 10, debouncedSearch);
      setUsers(data.data);
      setTotalPages(data.pages);
    } catch (error: any) {
      toast.error(error || "Failed to load users");
      if (error === 'Not authorized, token failed' || error === 'Not authorized, no token') {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedUser(null), 300); // Wait for animation
  };

  const handleSaveUser = async (id: string, data: any) => {
    try {
      await updateAccount(id, data);
      toast.success("User updated successfully");
      fetchUsers(); // Refresh the list
      handleClosePanel();
    } catch (error: any) {
      toast.error(error || "Failed to update user");
      throw error; // Re-throw to prevent panel closing on error
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          <AdminHeader />
          
          <UserTable 
            users={users}
            isLoading={isLoading}
            onRowClick={handleRowClick}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Slide-over Panel */}
      <UserProfilePanel
        user={selectedUser}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default AdminPage;
