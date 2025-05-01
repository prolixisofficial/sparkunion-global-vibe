
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, BookmarkIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post as PostType } from "@/types";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PostProps {
  post: PostType;
  refreshPosts?: () => void;
}

export default function Post({ post, refreshPosts }: PostProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Check if user has liked this post
    if (user) {
      const checkLikeStatus = async () => {
        const { data, error } = await supabase
          .from('likes')
          .select()
          .eq('user_id', user.id)
          .eq('post_id', post.id)
          .maybeSingle();
        
        if (!error && data) {
          setIsLiked(true);
        }
      };
      
      checkLikeStatus();
    }
  }, [user, post.id]);
  
  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive",
      });
      return;
    }
    
    if (!isLiked) {
      // Add like
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      
      const { error } = await supabase
        .from("likes")
        .insert({
          user_id: user.id,
          post_id: post.id,
          glime_id: null
        });
      
      if (error) {
        console.error("Error liking post:", error);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
        toast({
          title: "Error",
          description: "Could not like this post",
          variant: "destructive",
        });
      } else {
        // Update post's like count
        await supabase
          .from("posts")
          .update({ likes_count: likeCount + 1 })
          .eq("id", post.id);
      }
    } else {
      // Remove like
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
      
      const { error } = await supabase
        .from("likes")
        .delete()
        .match({
          user_id: user.id,
          post_id: post.id
        });
      
      if (error) {
        console.error("Error unliking post:", error);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        toast({
          title: "Error",
          description: "Could not unlike this post",
          variant: "destructive",
        });
      } else {
        // Update post's like count
        await supabase
          .from("posts")
          .update({ likes_count: likeCount - 1 })
          .eq("id", post.id);
      }
    }
    
    if (refreshPosts) refreshPosts();
  };
  
  return (
    <div className="border-b border-border pb-6 mb-6">
      {/* Post header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link to={`/app/profile/${post.user_id}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.profile?.avatar_url || ""} alt={post.profile?.full_name || ""} />
              <AvatarFallback className="bg-primary/10">
                {post.profile?.full_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link to={`/app/profile/${post.user_id}`} className="font-semibold hover:underline">
              {post.profile?.full_name || "Anonymous"}
            </Link>
            {post.profile?.id && (
              <div className="text-xs text-muted-foreground">
                {post.profile?.id?.substring(0, 8)}
              </div>
            )}
          </div>
        </div>
        <button className="text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>
      
      {/* Post image */}
      {post.image_url && (
        <div className="relative aspect-square w-full overflow-hidden rounded-md mb-3">
          <img 
            src={post.image_url} 
            alt="Post" 
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}
      
      {/* Post actions */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`transition-colors ${isLiked ? "text-red-500" : ""}`}
          >
            <Heart className={`size-6 ${isLiked ? "fill-red-500" : ""}`} />
          </button>
          <button>
            <MessageSquare className="size-6" />
          </button>
          <button>
            <Share2 className="size-6" />
          </button>
        </div>
        <button>
          <BookmarkIcon className="size-6" />
        </button>
      </div>
      
      {/* Likes count */}
      <div className="font-semibold mb-1">{likeCount} likes</div>
      
      {/* Caption */}
      <div className="mb-1">
        <span className="font-semibold mr-2">{post.profile?.full_name || "Anonymous"}</span>
        <span>{post.content}</span>
      </div>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {post.tags.map(tag => (
            <span key={tag.id} className="text-primary text-sm">#{tag.name}</span>
          ))}
        </div>
      )}
      
      {/* Time */}
      <div className="text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
      </div>
    </div>
  );
}
