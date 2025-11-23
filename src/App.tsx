import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AppCatalog from "./pages/AppCatalog";
import Settings from "./pages/Settings";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
                <Route path="/catalog" element={<ProtectedRoute><Layout><AppCatalog /></Layout></ProtectedRoute>} />
                <Route path="/logs" element={<ProtectedRoute><Layout><Logs /></Layout></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
                <Route path="/settings" element={<AdminRoute><Layout><Settings /></Layout></AdminRoute>} />
                <Route path="/users" element={<AdminRoute><Layout><Users /></Layout></AdminRoute>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
