import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import StoryPage from "./pages/Story";
import AdminPage from "./pages/AdminPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import NotFound from "./pages/NotFound";
import Sample from "./pages/Sample";
import UnityPage from "./pages/UnityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/sample" element={
            <ProtectedRoute>
              <Sample />
            </ProtectedRoute>
          } />
          <Route path="/roadmap" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/quiz-results" element={
            <ProtectedRoute>
              <QuizResultsPage />
            </ProtectedRoute>
          } />
          <Route path="/story/:storyId" element={<StoryPage />} />
          <Route path="/unity" element={<UnityPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
