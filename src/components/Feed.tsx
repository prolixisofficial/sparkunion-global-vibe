
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
      
      // Get posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: false });
      
      if (postsError) throw postsError;
      
      // Get profiles for post authors
      const userIds = [...new Set(postsData.map(post => post.user_id))];
      
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select()
        .in("id", userIds);
      
      if (profilesError) throw profilesError;
      
      // Get tags for posts
      const postIds = postsData.map(post => post.id);
      
      const { data: postTagsData, error: postTagsError } = await supabase
        .from("post_tags")
        .select("post_id, tag_id")
        .in("post_id", postIds);
      
      if (postTagsError) throw postTagsError;
      
      // Get tag details
      const tagIds = [...new Set(postTagsData.map(pt => pt.tag_id))];
      
      const { data: tagsData, error: tagsError } = await supabase
        .from("tags")
        .select()
        .in("id", tagIds);
      
      if (tagsError) throw tagsError;
      
      // Combine data
      const enrichedPosts = postsData.map(post => {
        const profile = profilesData.find(p => p.id === post.user_id);
        const postTagIds = postTagsData
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
