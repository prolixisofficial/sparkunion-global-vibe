
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Profile } from "@/types";
import { Edit, Settings } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  refreshProfile: () => Promise<void>;
}

export default function ProfileHeader({ profile, isOwnProfile, refreshProfile }: ProfileHeaderProps) {
  const { toast } = useToast();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleUpdateProfile = async () => {
    if (!profile?.id) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl
        })
        .eq("id", profile.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
      
      await refreshProfile();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
          <AvatarImage src={profile?.avatar_url || ""} />
          <AvatarFallback className="text-3xl">
            {profile?.full_name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile?.full_name || "Anonymous"}</h1>
          <p className="text-muted-foreground text-sm mb-4">@{profile?.id?.substring(0, 8)}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
          
          {isOwnProfile ? (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Update your profile information
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="avatarUrl">Avatar URL</Label>
                      <Input 
                        id="avatarUrl" 
                        value={avatarUrl} 
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                      />
                      
                      {avatarUrl && (
                        <div className="mt-2 flex justify-center">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>
                              {fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button 
                      type="button" 
                      onClick={handleUpdateProfile} 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button>Follow</Button>
              <Button variant="outline">Message</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
