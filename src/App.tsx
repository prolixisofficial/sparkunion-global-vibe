
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/providers/AuthProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AppHome from "./pages/AppHome";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./components/CreatePost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/app" element={<PrivateRoute><AppHome /></PrivateRoute>} />
              <Route path="/app/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
              <Route path="/app/profile" element={<PrivateRoute><AppHome /></PrivateRoute>} />
              <Route path="/app/explore" element={<PrivateRoute><AppHome /></PrivateRoute>} />
              <Route path="/app/glimes" element={<PrivateRoute><AppHome /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
