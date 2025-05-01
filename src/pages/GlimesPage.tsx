
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Glime, Profile } from "@/types";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function GlimesPage() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <Helmet>
        <title>Glimes | SparkUnion</title>
        <meta name="description" content="Watch short video clips shared by the SparkUnion community" />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <aside className="w-20 md:w-64 shrink-0 sticky top-0 h-screen">
            <Sidebar />
          </aside>
        )}
        
        {/* Main content */}
        <main className="flex-1">
          <Header />
          
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold mb-4">Glimes Coming Soon!</h1>
              <p className="text-muted-foreground">
                Short video clips feature is under development. Check back soon!
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
