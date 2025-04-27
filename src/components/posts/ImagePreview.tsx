
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImagePreviewProps {
  imageUrl: string;
  onChange: (value: string) => void;
}

export const ImagePreview = ({ imageUrl, onChange }: ImagePreviewProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="imageUrl">Image URL (optional)</Label>
      <Input
        id="imageUrl"
        type="url"
        placeholder="https://example.com/image.jpg"
        value={imageUrl}
        onChange={(e) => onChange(e.target.value)}
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
  );
};
