
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useCreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPost = async (userId: string, content: string, imageUrl: string, tags: string) => {
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
      // Insert the post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: userId,
          content,
          image_url: imageUrl || null
        })
        .select()
        .single();
      
      if (postError) throw postError;
      
      // Process tags if any
      if (tags.trim()) {
        const tagNames = tags
          .split(",")
          .map(tag => tag.trim().toLowerCase())
          .filter(Boolean);
        
        for (const tagName of tagNames) {
          // Check if tag exists
          const { data: existingTag } = await supabase
            .from('tags')
            .select()
            .eq('name', tagName)
            .maybeSingle();
          
          let tagId;
          
          if (existingTag) {
            tagId = existingTag.id;
          } else {
            // Create new tag
            const { data: newTag, error: createTagError } = await supabase
              .from('tags')
              .insert({ name: tagName })
              .select()
              .single();
            
            if (createTagError) continue;
            
            tagId = newTag.id;
          }
          
          // Add post_tag relationship
          await supabase
            .from('post_tags')
            .insert({
              post_id: post.id,
              tag_id: tagId
            });
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

  return { createPost, isSubmitting };
};
