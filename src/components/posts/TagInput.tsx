
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
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {tag.trim()}
              </Badge>
            )
          ))}
        </div>
      )}
    </div>
  );
};
