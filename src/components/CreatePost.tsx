
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { XCircle } from "lucide-react";

export default function CreatePost() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a post",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Insert the post
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl || null
        })
        .select('id')
        .single();
      
      if (postError) throw postError;
      
      const postId = postData.id;
      
      // 2. Process tags if any
      if (tags.trim()) {
        const tagNames = tags
          .split(",")
          .map(tag => tag.trim().toLowerCase())
          .filter(Boolean);
        
        for (const tagName of tagNames) {
          // Check if tag exists
          const { data: existingTag, error: tagQueryError } = await supabase
            .from("tags")
            .select("id")
            .eq("name", tagName)
            .maybeSingle();
          
          if (tagQueryError) console.error("Error checking tag:", tagQueryError);
          
          let tagId;
          
          if (existingTag) {
            tagId = existingTag.id;
          } else {
            // Create new tag
            const { data: newTag, error: createTagError } = await supabase
              .from("tags")
              .insert({ name: tagName })
              .select("id")
              .single();
            
            if (createTagError) {
              console.error("Error creating tag:", createTagError);
              continue;
            }
            
            tagId = newTag.id;
          }
          
          // Add post_tag relationship
          const { error: postTagError } = await supabase
            .from("post_tags")
            .insert({
              post_id: postId,
              tag_id: tagId
            });
          
          if (postTagError) console.error("Error linking tag to post:", postTagError);
        }
      }
      
      toast({
        title: "Post created",
        description: "Your post has been created successfully",
      });
      
      navigate("/app");
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container max-w-lg py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>Create New Post</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full" 
              onClick={() => navigate("/app")}
            >
              <XCircle size={24} />
            </Button>
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                className="resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <div className="mt-2 aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="travel, photography, nature"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating post..." : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
