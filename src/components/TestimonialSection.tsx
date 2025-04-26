
const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-accent/10">
      <div className="container px-4 md:px-6">
        <div className="rounded-2xl p-8 md:p-12 bg-white shadow-lg border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="text-5xl mb-8 text-primary">"</div>
            <p className="text-xl md:text-2xl font-medium mb-8">
              It's completely new feelings! SparkUnion has transformed how I connect with my culture while reaching a global audience. As a creator, I can share authentic stories and be supported by people who truly appreciate my work.
            </p>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-accent/30 mb-4"></div>
              <h4 className="font-medium">Lisa Johnson</h4>
              <p className="text-sm text-muted-foreground">Influencer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
