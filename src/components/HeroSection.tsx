
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const backgrounds = [
  'bg-gradient-to-tr from-secondary/40 via-background to-accent/30',
  'bg-gradient-to-br from-accent/40 via-background to-secondary/30',
  'bg-gradient-to-bl from-primary/10 via-background to-secondary/30',
];

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`pt-28 pb-16 md:pt-40 md:pb-24 ${backgrounds[currentBg]} transition-colors duration-1000`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          <div className="space-y-2">
            <h2 className="inline-block text-xs font-medium tracking-wider px-3 py-1 bg-secondary/30 rounded-full animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
              EASY TO USE
            </h2>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Unleash Your Culture,<br /> Connect Globally
          </h1>
          
          <p className="max-w-[42rem] text-muted-foreground md:text-xl animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            Get paid as a creator, listen to podcasts in your language, and join a worldwide community—all in one place.
          </p>
          
          <Link to="/signup" className="animate-slide-up opacity-0" style={{ animationDelay: '0.7s' }}>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mt-16 md:mt-24">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="w-full md:w-[600px] h-[300px] md:h-[400px] bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
            <img 
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
              alt="Cultural landscape" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
