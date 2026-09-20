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
import Pinya from "./pages/Pinya/index.tsx";
import UnityPage from "./pages/UnityPage";
import Makiling from "./pages/Makiling";
import Stories from './pages/Stories/index.tsx';
import Palaka from './pages/PalakaKalabaw';
import Tenor from './pages/Tenor';
import Langgam from './pages/Langgam/index.tsx';
import Buwaya from './pages/Buwaya/index.tsx';
import Putakti from './pages/Putakti/index.tsx'
import Makopa from './pages/Makopa/index.tsx'
import Makahiya from './pages/Makahiya/index.tsx'
import Ibalon from './pages/Ibalon/index.tsx'
import MainMenu from './pages/MainMenu/index.tsx'
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
          <Route path="/stories" element={<Stories />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/homepage" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/makiling" element={<Makiling />} />
          <Route path="/pinya" element={
            <Pinya />
          } />
          <Route path="/roadmap" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/tenor" element={
              <Tenor />
          } />
          <Route path="/langgam" element={
              <Langgam />
          } />
          <Route path="/makopa" element={
              <Makopa />
          } />
          <Route path="/putakti" element={
              <Putakti />
          } />
          <Route path="/makahiya" element={
              <Makahiya />
          } />
          <Route path="/palaka-kalabaw" element={
              <Palaka />
          } />
          <Route path="/ibalon" element={
              <Ibalon />
          } />
          <Route path="/buwaya" element={
              <Buwaya />
          } />
          <Route path="/pinya" element={
              <Pinya />
          } />
          <Route path="/makiling" element={
              <Makiling />
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
