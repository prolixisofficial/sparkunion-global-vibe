
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

export default function CreatePostButton() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleClick = () => {
    if (user) {
      navigate("/app/create");
    } else {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a post",
        variant: "destructive",
      });
      navigate("/login");
    }
  };
  
  return (
    <Button 
      onClick={handleClick}
      className="bg-gradient-to-r from-primary to-secondary fixed bottom-6 right-6 rounded-full shadow-lg"
    >
      <PlusCircle className="mr-2" />
      Create a post
    </Button>
  );
}
