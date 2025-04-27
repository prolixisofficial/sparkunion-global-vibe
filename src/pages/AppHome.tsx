
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/AuthProvider";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MomentsList from "@/components/MomentsList";
import Feed from "@/components/Feed";
import CreatePostButton from "@/components/CreatePostButton";

const AppHome = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Set page title with user's name if available
    document.title = `Home | SparkUnion`;
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Home | SparkUnion</title>
        <meta name="description" content="Connect with people and share your experiences on SparkUnion" />
        <meta property="og:title" content="SparkUnion - Connect and Share" />
        <meta property="og:description" content="Join the SparkUnion community to share moments and connect with people around the globe" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SparkUnion - Connect and Share" />
        <meta name="twitter:description" content="Join the SparkUnion community to share moments and connect with people around the globe" />
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
          
          <div className="max-w-2xl mx-auto">
            {/* Stories/Moments section */}
            <MomentsList />
            
            {/* Posts Feed */}
            <Feed />
          </div>
          
          {/* Mobile navigation at bottom for mobile */}
          {isMobile && (
            <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center py-2 px-4 z-30">
              <a href="/app" className="flex flex-col items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="text-xs mt-1">Home</span>
              </a>
              <a href="/app/explore" className="flex flex-col items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <span className="text-xs mt-1">Search</span>
              </a>
              <a href="/app/create" className="flex flex-col items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
                <span className="text-xs mt-1">Create</span>
              </a>
              <a href="/app/glimes" className="flex flex-col items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 8-6 4 6 4V8Z"></path>
                  <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                </svg>
                <span className="text-xs mt-1">Glimes</span>
              </a>
              <a href="/app/profile" className="flex flex-col items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21a8 8 0 1 0-16 0"></path>
                </svg>
                <span className="text-xs mt-1">Profile</span>
              </a>
            </nav>
          )}
          
          {/* Create Post Button (only visible on desktop) */}
          {!isMobile && <CreatePostButton />}
        </main>
      </div>
    </>
  );
};

export default AppHome;
