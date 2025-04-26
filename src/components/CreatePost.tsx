
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please login to create a post."
      });
      return;
    }

    if (!content.trim() && !imageUrl.trim()) {
      toast({
        variant: "destructive",
        title: "Cannot create empty post",
        description: "Please add some content or an image."
      });
      return;
    }

    setLoading(true);

    try {
      // Create post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl,
        })
        .select()
        .single();

      if (postError) throw postError;

      // Handle tags if any
      if (tags.trim()) {
        const tagNames = tags
          .split(',')
          .map(tag => tag.trim().toLowerCase())
          .filter(tag => tag);

        for (const tagName of tagNames) {
          // Check if tag exists
          const { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('name', tagName)
            .maybeSingle();

          let tagId;
          if (existingTag) {
            tagId = existingTag.id;
          } else {
            // Create new tag
            const { data: newTag, error: tagError } = await supabase
              .from('tags')
              .insert({ name: tagName })
              .select('id')
              .single();

            if (tagError) throw tagError;
            tagId = newTag.id;
          }

          // Create post_tag relation
          const { error: relationError } = await supabase
            .from('post_tags')
            .insert({
              post_id: post.id,
              tag_id: tagId
            });

          if (relationError) throw relationError;
        }
      }

      toast({
        title: "Post created",
        description: "Your post has been published successfully."
      });
      
      // Reset form and close dialog
      setContent('');
      setImageUrl('');
      setTags('');
      setOpen(false);
      
      // Optionally refresh the page or update posts list
      // For simplicity, we'll use a page refresh
      window.location.reload();
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create post. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create a post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid w-full gap-1.5">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Input
              type="url"
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Input
              placeholder="Tags (comma separated, e.g., travel, nature)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="outline" className="mr-2" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
