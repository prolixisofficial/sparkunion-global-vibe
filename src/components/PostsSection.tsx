
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PostsSection = () => {
  const posts = [
    {
      id: 1,
      username: "CultureExplorer",
      time: "2 hours ago",
      content: "Just visited this amazing traditional festival in my hometown! The colors, the music - everything was so vibrant! #CulturalHeritage",
      likes: 128,
      comments: 24
    },
    {
      id: 2,
      username: "GlobalCooking",
      time: "5 hours ago",
      content: "Sharing my grandmother's traditional recipe that's been in our family for generations. Can't wait for you all to try it! #RegionalCuisine",
      likes: 256,
      comments: 47
    },
    {
      id: 3,
      username: "ArtisticSoul",
      time: "1 day ago",
      content: "My latest artwork inspired by traditional patterns from my culture. Modern meets heritage! #CulturalFusion #Art",
      likes: 312,
      comments: 53
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            What's Happening
          </h2>
          <p className="text-muted-foreground">
            See what people around the world are sharing right now. Join the conversation and add your voice to the global community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md border border-border overflow-hidden hover:-translate-y-1 transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                    <div>
                      <p className="font-medium">{post.username}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center" data-aos="fade-up" data-aos-delay="400">
          <Button className="gap-2 group" variant="outline">
            Join the Buzz
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PostsSection;
