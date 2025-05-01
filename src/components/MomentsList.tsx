
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Moment, Profile } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

export default function MomentsList() {
  const [moments, setMoments] = useState<(Moment & { profile: Profile })[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    async function fetchMoments() {
      try {
        // Fetch moments
        const { data: momentsData, error: momentsError } = await supabase
          .from("moments")
          .select()
          .order("created_at", { ascending: false })
          .limit(20);
        
        if (momentsError) throw momentsError;
        
        // If no moments, return early
        if (!momentsData || momentsData.length === 0) {
          setMoments([]);
          return;
        }
        
        // Fetch profiles for moment creators
        const userIds = [...new Set(momentsData.map(moment => moment.user_id))];
        
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select()
          .in("id", userIds);
        
        if (profilesError) throw profilesError;
        
        // Combine data
        const enrichedMoments = momentsData.map(moment => {
          const profile = profilesData.find(p => p.id === moment.user_id) || {
            id: moment.user_id,
            full_name: "Unknown",
            avatar_url: null,
            created_at: null,
            updated_at: null
          };
          
          return {
            ...moment,
            profile
          };
        }) as (Moment & { profile: Profile })[];
        
        setMoments(enrichedMoments);
      } catch (error) {
        console.error("Error fetching moments:", error);
      }
    }
    
    fetchMoments();
  }, []);
  
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold mb-4">Moments</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {user && (
          <div className="flex flex-col items-center min-w-20">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-background">
                <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt="Your story" />
                <AvatarFallback className="bg-secondary">{user?.user_metadata?.full_name?.charAt(0) || "Y"}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 right-0 bg-primary rounded-full p-1 text-white font-bold border-2 border-background">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </div>
            </div>
            <span className="text-xs mt-2 text-center truncate w-20">Your story</span>
          </div>
        )}
        
        {moments.map((moment) => (
          <div key={moment.id} className="flex flex-col items-center min-w-20">
            <div className="p-0.5 rounded-full bg-gradient-to-br from-red-500 to-blue-500">
              <Avatar className="h-16 w-16 border-2 border-background">
                <AvatarImage src={moment.profile?.avatar_url || ""} alt={moment.profile?.full_name || ""} />
                <AvatarFallback className="bg-primary/10">
                  {moment.profile?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs mt-2 text-center truncate w-20">
              {moment.profile?.full_name?.split(" ")[0] || "User"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
