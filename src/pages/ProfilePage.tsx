
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/AuthProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";
import { supabase } from "@/integrations/supabase/client";
import { Profile, Post as PostType } from "@/types";
import Post from "@/components/Post";
import { useToast } from "@/hooks/use-toast";
import { Grid3X3, BookmarkIcon } from "lucide-react";

export default function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const isOwnProfile = !userId || (user && (userId === user.id));
  const profileId = userId || user?.id;
  
  const fetchProfile = async () => {
    if (!profileId) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", profileId)
        .single();
      
      if (error) throw error;
      
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const fetchPosts = async () => {
    if (!profileId) return;
    
    try {
      setLoading(true);
      
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select()
        .eq("user_id", profileId)
        .order("created_at", { ascending: false });
      
      if (postsError) throw postsError;
      
      // Get tags for posts
      const postIds = postsData.map(post => post.id);
      
      const { data: postTagsData, error: postTagsError } = await supabase
        .from("post_tags")
        .select("post_id, tag_id")
        .in("post_id", postIds);
      
      if (postTagsError) throw postTagsError;
      
      // Get tag details
      const tagIds = [...new Set((postTagsData || []).map(pt => pt.tag_id))];
      
      let tagsData: any[] = [];
      if (tagIds.length > 0) {
        const { data: tags, error: tagsError } = await supabase
          .from("tags")
          .select()
          .in("id", tagIds);
        
        if (!tagsError) tagsData = tags;
      }
      
      // Combine data
      const enrichedPosts = postsData.map(post => {
        const postTagIds = (postTagsData || [])
          .filter(pt => pt.post_id === post.id)
          .map(pt => pt.tag_id);
          
        const tags = tagsData.filter(tag => postTagIds.includes(tag.id));
        
        return {
          ...post,
          profile,
          tags
        };
      });
      
      setPosts(enrichedPosts);
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Could not load posts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, [profileId]);
  
  useEffect(() => {
    if (profile) {
      fetchPosts();
    }
  }, [profile]);
  
  return (
    <>
      <Helmet>
        <title>{profile?.full_name || "Profile"} | SparkUnion</title>
        <meta name="description" content={`Check out ${profile?.full_name || "this user"}'s profile on SparkUnion`} />
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
          
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Profile Header */}
            {profile && (
              <ProfileHeader 
                profile={profile} 
                isOwnProfile={isOwnProfile} 
                refreshProfile={fetchProfile}
              />
            )}
            
            {/* Tabs for Posts, Saved, etc. */}
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span>Posts</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <BookmarkIcon className="h-4 w-4" />
                  <span>Saved</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-4">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map(post => (
                      <Post key={post.id} post={post} refreshPosts={fetchPosts} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="mb-2">No posts yet.</p>
                    {isOwnProfile && (
                      <p>Share your first moment with the world!</p>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-4">
                <div className="text-center py-10 text-muted-foreground">
                  <p>No saved posts yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Mobile navigation is handled by AppHome */}
        </main>
      </div>
    </>
  );
}
