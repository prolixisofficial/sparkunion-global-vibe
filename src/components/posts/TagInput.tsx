
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string;
  onChange: (value: string) => void;
}

export const TagInput = ({ tags, onChange }: TagInputProps) => {
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== tagToRemove && tag !== "")
      .join(", ");
    
    onChange(updatedTags);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags (comma separated)</Label>
      <Input
        id="tags"
        placeholder="travel, photography, nature"
        value={tags}
        onChange={(e) => onChange(e.target.value)}
      />
      {tags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.split(",").map((tag, index) => (
            tag.trim() && (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 py-1 group hover:bg-secondary/80"
              >
                {tag.trim()}
                <X 
                  className="ml-2 h-3 w-3 cursor-pointer opacity-70 group-hover:opacity-100" 
                  onClick={() => handleRemoveTag(tag.trim())}
                />
              </Badge>
            )
          ))}
        </div>
      )}
    </div>
  );
};
