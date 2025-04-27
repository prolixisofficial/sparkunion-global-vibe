
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthProvider";
import { XCircle } from "lucide-react";
import { TagInput } from "./posts/TagInput";
import { ImagePreview } from "./posts/ImagePreview";
import { useCreatePost } from "@/hooks/use-create-post";

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createPost, isSubmitting } = useCreatePost();
  
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    createPost(user.id, content, imageUrl, tags);
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
            
            <ImagePreview imageUrl={imageUrl} onChange={setImageUrl} />
            <TagInput tags={tags} onChange={setTags} />
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
