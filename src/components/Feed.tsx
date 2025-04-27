
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Post as PostType } from "@/types";
import Post from "./Post";
import { useToast } from "@/hooks/use-toast";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Get posts with profiles and tags
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profile:profiles(*),
          tags:post_tags(tag:tags(*))
        `)
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform the nested tag structure to match our type
        const transformedPosts = data.map((post: any) => ({
          ...post,
          tags: post.tags?.map((tagItem: any) => tagItem.tag) || []
        }));
        
        setPosts(transformedPosts);
      }
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
    fetchPosts();
  }, []);
  
  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <Post key={post.id} post={post} refreshPosts={fetchPosts} />
        ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p className="mb-4">No posts yet.</p>
          <p>Be the first to share something!</p>
        </div>
      )}
    </div>
  );
}
