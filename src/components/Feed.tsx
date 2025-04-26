
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Heart, MessageSquare, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string;
  created_at: string;
  likes_count: number;
  profile?: {
    full_name: string;
    avatar_url: string;
  };
  tags?: {
    name: string;
  }[];
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profile:profiles(full_name, avatar_url),
          tags:post_tags(tag:tags(name))
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching posts:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load posts. Please try again later.",
        });
        setLoading(false);
        return;
      }
      
      setPosts(data || []);
      setLoading(false);
    };
    
    fetchPosts();
  }, [toast]);

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to like posts.",
      });
      return;
    }

    // Check if user has already liked the post
    const { data: existingLike } = await supabase
      .from('likes')
      .select()
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .maybeSingle();

    if (existingLike) {
      // User already liked, so remove the like
      const { error } = await supabase
        .from('likes')
        .delete()
        .match({ user_id: user.id, post_id: postId });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not remove like. Please try again.",
        });
        return;
      }

      // Update post likes count
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes_count: post.likes_count - 1 } 
          : post
      ));
    } else {
      // Add new like
      const { error } = await supabase
        .from('likes')
        .insert({ user_id: user.id, post_id: postId });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not like post. Please try again.",
        });
        return;
      }

      // Update post likes count
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes_count: post.likes_count + 1 } 
          : post
      ));
    }
  };

  const formatDate = (date: string) => {
    const postDate = new Date(date);
    const now = new Date();
    const diff = now.getTime() - postDate.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6 py-4">
      {loading ? (
        // Loading skeleton
        Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="aspect-square w-full bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-muted rounded animate-pulse" />
                <div className="w-6 h-6 bg-muted rounded animate-pulse" />
                <div className="w-6 h-6 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-4 w-48 bg-muted rounded animate-pulse" />
              <div className="h-3 w-full bg-muted rounded animate-pulse" />
            </div>
          </Card>
        ))
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.profile?.avatar_url} alt={post.profile?.full_name || "User"} />
                  <AvatarFallback>{post.profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.profile?.full_name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {post.image_url && (
              <div className="aspect-square w-full bg-muted relative overflow-hidden">
                <img 
                  src={post.image_url} 
                  alt="Post" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:text-red-500"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-sm font-medium">
                  {post.likes_count} likes
                </div>
              </div>

              <div>
                <p><span className="font-medium">{post.profile?.full_name?.split(" ")[0] || "User"}</span>{" "}
                  <span className="text-muted-foreground">{post.content}</span>
                </p>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tagObj, index) => (
                    tagObj.tag && (
                      <span key={index} className="text-sm text-primary hover:underline cursor-pointer">
                        #{tagObj.tag.name}
                      </span>
                    )
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Feed;
