import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import QuizResultsTable from '@/components/admin/QuizResultsTable';
import QuizResultsPanel from '@/components/admin/QuizResultsPanel';
import { getQuizResults } from '@/services/accountService';

interface QuizScore {
  storyTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

interface UserQuizResult {
  _id: string;
  username: string;
  email: string;
  totalQuizzes: number;
  averageScore: number;
  quizScores: QuizScore[];
}

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserQuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination & Search state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Panel state
  const [selectedUser, setSelectedUser] = useState<UserQuizResult | null>(null);
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
      const data = await getQuizResults(page, 10, debouncedSearch);
      setUsers(data.data);
      setTotalPages(data.pages);
    } catch (error: any) {
      toast.error(error || "Failed to load quiz results");
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

  const handleRowClick = (user: UserQuizResult) => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedUser(null), 300); // Wait for animation
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          <AdminHeader />
          
          <QuizResultsTable 
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
      <QuizResultsPanel
        user={selectedUser}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
};

export default QuizResultsPage;
