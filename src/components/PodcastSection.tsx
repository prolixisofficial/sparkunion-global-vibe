
import { ArrowRight, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PodcastSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Listen to Podcasts Your Way
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[32rem]">
              Dive into a world of cultural podcasts in your language. Explore stories, traditions, and perspectives from your region and beyond.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Regional Content</h3>
                  <p className="text-sm text-muted-foreground">Podcasts in your language, featuring local creators</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">International Selection</h3>
                  <p className="text-sm text-muted-foreground">Discover podcasts from around the globe</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Personalized Recommendations</h3>
                  <p className="text-sm text-muted-foreground">Get suggestions based on your interests and listening habits</p>
                </div>
              </div>
            </div>
            <Button className="gap-2 group">
              Tune In
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-secondary/20 rounded-full blur-xl"></div>
              
              <div className="relative bg-white rounded-xl shadow-lg p-6 border border-border">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="bg-primary h-12 w-12 flex items-center justify-center rounded-md text-white">
                      <Headphones size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Cultural Heritage Stories</p>
                      <p className="text-xs text-muted-foreground">23 episodes</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="bg-secondary h-12 w-12 flex items-center justify-center rounded-md">
                      <Headphones size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Global Perspectives</p>
                      <p className="text-xs text-muted-foreground">42 episodes</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="bg-accent h-12 w-12 flex items-center justify-center rounded-md">
                      <Headphones size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Regional Music Highlights</p>
                      <p className="text-xs text-muted-foreground">18 episodes</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="bg-primary/20 h-12 w-12 flex items-center justify-center rounded-md">
                      <Headphones size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Language Learning</p>
                      <p className="text-xs text-muted-foreground">35 episodes</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
