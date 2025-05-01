
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <>
      <Helmet>
        <title>Explore | SparkUnion</title>
        <meta name="description" content="Explore content from the SparkUnion community" />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <aside className="w-20 md:w-64 shrink-0 sticky top-0 h-screen">
            <Sidebar />
          </aside>
        )}
        
        {/* Main content */}
        <main className="flex-1">
          <Header />
          
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search people, posts, and tags..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="top">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="top">Top</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="tags">Tags</TabsTrigger>
              </TabsList>
              
              <TabsContent value="top" className="py-4">
                <div className="text-center py-10 text-muted-foreground">
                  <p>Enter a search term to explore top content</p>
                </div>
              </TabsContent>
              
              <TabsContent value="people" className="py-4">
                <div className="text-center py-10 text-muted-foreground">
                  <p>Enter a search term to find people</p>
                </div>
              </TabsContent>
              
              <TabsContent value="tags" className="py-4">
                <div className="text-center py-10 text-muted-foreground">
                  <p>Enter a search term to explore tags</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
