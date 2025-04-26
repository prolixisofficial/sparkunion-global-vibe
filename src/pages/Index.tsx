
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CreatorSection from "@/components/CreatorSection";
import PodcastSection from "@/components/PodcastSection";
import CommunitySection from "@/components/CommunitySection";
import PostsSection from "@/components/PostsSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Initialize scroll reveal animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('[data-aos]');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('animate-slide-up');
          element.style.opacity = '1';
        }
      });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CreatorSection />
      <PodcastSection />
      <TestimonialSection />
      <CommunitySection />
      <PostsSection />
      <Footer />
    </div>
  );
};

export default Index;
