
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Mail } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-secondary/80 via-accent/50 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots-lg text-white/10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Join SparkUnion Today</h2>
          <p className="text-primary/80 text-lg max-w-md text-center">
            Unleash your culture, connect globally, and share your unique perspective with the world.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block">
              <div className="bg-secondary/80 px-4 py-2 rounded-full">
                <span className="text-primary font-heading font-bold text-xl">SparkUnion</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Create your account</h1>
            <p className="text-muted-foreground">Enter your details below to create your account</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input 
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters and include a number and a symbol.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" type="button" className="hover:bg-secondary/20">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button" className="hover:bg-secondary/20">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-center mt-4 text-xs text-muted-foreground">
            By clicking "Sign Up", you agree to our{" "}
            <Link to="/" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
