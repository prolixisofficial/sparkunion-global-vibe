
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Search, Home, PlusSquare, Heart, User, LogOut, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      
      setProfile(data);
    };
    
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      return;
    }
    
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - visible on md and larger screens */}
      <div className="hidden md:flex flex-col w-64 border-r border-border bg-card p-4 fixed h-screen">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-secondary/80 px-4 py-2 rounded-full">
            <span className="text-primary font-heading font-bold text-xl">SparkUnion</span>
          </div>
        </div>

        <div className="mb-8 flex flex-col items-center">
          <Avatar className="w-20 h-20 mb-2">
            <AvatarImage src={profile?.avatar_url || "https://i.pravatar.cc/150"} alt="User" />
            <AvatarFallback>{profile?.full_name?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{profile?.full_name || user?.email}</h3>
          <p className="text-sm text-muted-foreground">@{profile?.full_name?.toLowerCase().replace(/\s+/g, '_') || 'user'}</p>
          
          <div className="flex justify-between w-full mt-4 text-sm">
            <div className="text-center">
              <p className="font-bold">472</p>
              <p className="text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold">12.4K</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">228</p>
              <p className="text-muted-foreground">Following</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col space-y-1 flex-1">
          <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate("/app")}>
            <Home className="h-5 w-5" />
            <span>Feed</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Search className="h-5 w-5" />
            <span>Explore</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <PlusSquare className="h-5 w-5" />
            <span>Glimes</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Heart className="h-5 w-5" />
            <span>Notifications</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Button>
        </nav>

        <Button variant="ghost" className="justify-start gap-2 mt-auto" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>

      {/* Mobile header - only visible on small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm p-3">
        <div className="flex justify-between items-center">
          <div className="bg-secondary/80 px-3 py-1 rounded-full">
            <span className="text-primary font-heading font-bold text-lg">SparkUnion</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <div className="container max-w-4xl">
          {children}
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-10">
        <div className="flex justify-around items-center py-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/app")}>
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <PlusSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Avatar className="h-7 w-7">
              <AvatarImage src={profile?.avatar_url || "https://i.pravatar.cc/150"} alt="User" />
              <AvatarFallback>{profile?.full_name?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
