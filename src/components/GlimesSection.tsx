
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Video } from "lucide-react";

const GlimesSection = () => {
  // This is a placeholder component since we don't have actual video functionality yet
  // In a real implementation, we would fetch glimes from the database
  
  const demoGlimes = [
    {
      id: 1,
      username: "Sonya Leena",
      avatar: "https://i.pravatar.cc/150?img=1",
      thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 2,
      username: "Adam Addisin",
      avatar: "https://i.pravatar.cc/150?img=3",
      thumbnail: "https://images.unsplash.com/photo-1493409137604-0901c55e4456"
    },
    {
      id: 3,
      username: "Nicole Segall",
      avatar: "https://i.pravatar.cc/150?img=5",
      thumbnail: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0"
    }
  ];

  return (
    <div className="px-4 py-6 bg-gradient-to-br from-background to-muted/30 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Video className="h-5 w-5" /> Glimes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {demoGlimes.map(glime => (
          <Card key={glime.id} className="overflow-hidden h-72 relative group">
            <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/50 transition-colors"></div>
            <img 
              src={glime.thumbnail} 
              className="absolute inset-0 w-full h-full object-cover"
              alt={`Glime by ${glime.username}`}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={glime.avatar} alt={glime.username} />
                  <AvatarFallback>{glime.username[0]}</AvatarFallback>
                </Avatar>
                <span className="text-white font-medium text-sm">{glime.username}</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GlimesSection;
