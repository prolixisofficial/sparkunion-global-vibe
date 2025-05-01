
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  onChange: (value: string) => void;
}

export const ImagePreview = ({ imageUrl, onChange }: ImagePreviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClearImage = () => {
    onChange("");
    setError(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="imageUrl">Image URL (optional)</Label>
      <div className="flex space-x-2">
        <Input
          id="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => {
            onChange(e.target.value);
            setError(null);
          }}
          className="flex-1"
        />
        {imageUrl && (
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      {imageUrl && (
        <div className="mt-2 aspect-video w-full overflow-hidden rounded-md bg-muted relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="h-full w-full object-cover"
            onLoad={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
              setError("Unable to load image. Please check the URL.");
              setIsLoading(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
