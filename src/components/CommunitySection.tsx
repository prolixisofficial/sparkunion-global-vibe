
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunitySection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-tr from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Connect to the World
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[32rem]">
              Join vibrant communities centered around regional cultures and global interests. Share, discuss, and celebrate diverse perspectives with like-minded people.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Cultural Forums</h3>
                  <p className="text-sm text-muted-foreground">Discuss topics related to specific regions and traditions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Live Chat Sessions</h3>
                  <p className="text-sm text-muted-foreground">Connect in real-time with creators and community members</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Cultural Events</h3>
                  <p className="text-sm text-muted-foreground">Virtual gatherings celebrating diverse traditions</p>
                </div>
              </div>
            </div>
            <Button className="gap-2 group">
              Explore Communities
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Regional Cuisine</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sharing recipes, techniques, and stories about traditional dishes.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-accent/50"></div>
                    <div className="w-6 h-6 rounded-full bg-secondary/50"></div>
                    <div className="w-6 h-6 rounded-full bg-primary/50"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">1.2K members</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Language Exchange</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn and practice regional languages with native speakers.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-accent/50"></div>
                    <div className="w-6 h-6 rounded-full bg-secondary/50"></div>
                    <div className="w-6 h-6 rounded-full bg-primary/50"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">2.5K members</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Music & Dance</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Celebrating traditional and modern cultural performances.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-accent/50"></div>
                    <div className="w-6 h-6 rounded-full bg-secondary/50"></div>
                    <div className="w-6 h-6 rounded-full bg-primary/50"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">3.7K members</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Art & Crafts</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sharing traditional artistic techniques and contemporary creations.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-accent/50"></div>
                    <div className="w-6 h-6 rounded-full bg-secondary/50"></div>
                    <div className="w-6 h-6 rounded-full bg-primary/50"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">1.9K members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
