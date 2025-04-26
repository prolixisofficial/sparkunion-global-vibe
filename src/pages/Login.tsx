
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-tr from-primary via-primary/80 to-accent relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots-lg text-white/10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Welcome Back to SparkUnion</h2>
          <p className="text-white/80 text-lg max-w-md text-center">
            Continue your cultural journey. Connect with creators and communities around the world.
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
            <h1 className="text-2xl font-bold mt-6 mb-2">Log in to your account</h1>
            <p className="text-muted-foreground">Enter your email below to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
