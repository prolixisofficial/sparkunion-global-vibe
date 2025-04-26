
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import AppLayout from "@/components/AppLayout";
import Moments from "@/components/Moments";
import Feed from "@/components/Feed";
import GlimesSection from "@/components/GlimesSection";
import CreatePost from "@/components/CreatePost";

const AppHome = () => {
  useEffect(() => {
    document.title = "SparkUnion | Your Feed";
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="Your personalized feed on SparkUnion. Connect with friends, share moments, and discover new content." />
        <meta name="keywords" content="social media, sparkxunion, feed, friends, moments, content" />
        <meta property="og:title" content="SparkUnion | Your Feed" />
        <meta property="og:description" content="Your personalized feed on SparkUnion. Connect with friends, share moments, and discover new content." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SparkUnion | Your Feed" />
        <meta name="twitter:description" content="Your personalized feed on SparkUnion. Connect with friends, share moments, and discover new content." />
      </Helmet>

      <AppLayout>
        <div className="py-4 px-4 md:px-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Feed</h1>
          <CreatePost />
        </div>

        {/* Stories/Moments row */}
        <Moments />
        
        {/* Feed content */}
        <div className="px-4 md:px-0">
          <Feed />
        </div>

        {/* Glimes section */}
        <div className="mt-8 px-4 md:px-0">
          <GlimesSection />
        </div>
      </AppLayout>
    </>
  );
};

export default AppHome;
