
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreatorSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Get Paid as a Creator
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[32rem]">
              Turn your passion into profit with our creator monetization tools. Share your cultural stories, art, and talents with the world while earning from your audience.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Multiple Revenue Streams</h3>
                  <p className="text-sm text-muted-foreground">Subscriptions, tips, and sponsored content opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Creator Analytics</h3>
                  <p className="text-sm text-muted-foreground">Detailed insights on your audience and content performance</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">Connect with audiences around the world who love your culture</p>
                </div>
              </div>
            </div>
            <Button className="gap-2 group">
              Start Creating
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4" data-aos="fade-left">
            <div className="bg-white rounded-xl shadow-md p-5 h-[200px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-12 w-12 bg-secondary/30 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">💸</span>
              </div>
              <h3 className="font-medium mb-2">Direct Support</h3>
              <p className="text-sm text-muted-foreground">Receive direct support from fans who value your content</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 h-[200px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-12 w-12 bg-accent/30 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className="font-medium mb-2">Creative Freedom</h3>
              <p className="text-sm text-muted-foreground">Create content your way, highlighting your unique perspective</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 h-[200px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">🌐</span>
              </div>
              <h3 className="font-medium mb-2">Cultural Exchange</h3>
              <p className="text-sm text-muted-foreground">Share your culture with a diverse global audience</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 h-[200px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-12 w-12 bg-secondary/30 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-medium mb-2">Growth Tools</h3>
              <p className="text-sm text-muted-foreground">Access tools to grow your audience and increase earnings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
