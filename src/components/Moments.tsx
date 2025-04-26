
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

interface Moment {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string;
  expires_at: string;
  profile?: {
    full_name: string;
    avatar_url: string;
  };
}

const Moments = () => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMoments = async () => {
      const { data, error } = await supabase
        .from('moments')
        .select('*, profile:profiles(full_name, avatar_url)')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching moments:", error);
        setLoading(false);
        return;
      }
      
      setMoments(data || []);
      setLoading(false);
    };
    
    fetchMoments();
  }, []);

  // Gradient border styling
  const gradientRingStyle = {
    background: "linear-gradient(45deg, #ff0f7b, #0061ff)",
    padding: "3px",
    borderRadius: "50%",
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Moments</h2>
      <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
        {/* Add Story Button - only for authenticated users */}
        {user && (
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-background">
                <AvatarImage src={user ? "https://i.pravatar.cc/150" : undefined} />
                <AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-background"
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Add Moment</span>
              </Button>
            </div>
            <span className="text-xs">Your story</span>
          </div>
        )}

        {/* Display Moments */}
        {moments.map((moment) => (
          <div key={moment.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div style={gradientRingStyle}>
              <Avatar className="w-16 h-16 border-2 border-background">
                <AvatarImage 
                  src={moment.profile?.avatar_url} 
                  alt={moment.profile?.full_name || "User"} 
                />
                <AvatarFallback>
                  {moment.profile?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs truncate w-16 text-center">
              {moment.profile?.full_name?.split(" ")[0] || "User"}
            </span>
          </div>
        ))}

        {/* Loading state */}
        {loading && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div style={gradientRingStyle}>
              <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
            </div>
            <div className="w-12 h-3 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;
