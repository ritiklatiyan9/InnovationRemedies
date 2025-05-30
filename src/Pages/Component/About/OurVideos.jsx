// src/components/YoutubeGalleryPage.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Adjust path if needed
import { Youtube as YoutubeIcon, AlertTriangle } from "lucide-react";

// --- Helper Function to get YouTube Embed URL ---
// This function tries to extract the video ID from various YouTube URL formats
function getYoutubeEmbedUrl(url) {
  let videoId = null;
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase(); // Normalize hostname
    const pathname = urlObj.pathname;

    if (hostname === "youtu.be") {
      videoId = pathname.substring(1);
    } else if (hostname === "www.youtube.com" || hostname === "youtube.com") {
      if (pathname === "/watch") {
        videoId = urlObj.searchParams.get("v");
      } else if (pathname.startsWith("/embed/")) {
        videoId = pathname.substring("/embed/".length);
      } else if (pathname.startsWith("/live/")) {
        videoId = pathname.substring("/live/".length);
      } else if (pathname.startsWith("/shorts/")) { // Handler for YouTube Shorts
        videoId = pathname.substring("/shorts/".length);
      }
    }
    
    // Remove any query parameters from videoId if it was part of the path
    // (e.g., /shorts/VIDEO_ID?feature=share - VIDEO_ID should not contain '?')
    if (videoId && videoId.includes("?")) {
        videoId = videoId.split("?")[0];
    }
    // Also handle cases where videoId might be extracted from query param along with other params
    // e.g. watch?v=ID&list=... if the regex below is not strict enough or ID has extra chars
    // The regex below should handle the standard 11-char ID well.

    if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) { // Basic validation for YouTube video ID format
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    console.error("Error parsing YouTube URL:", url, error);
  }

  // Log if ID extraction failed or resulted in an invalid ID format
  if (!videoId) {
    console.warn(`Could not extract video ID from: ${url}`);
  } else if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)){
    console.warn(`Extracted ID "${videoId}" from ${url} does not conform to the expected 11-character YouTube video ID format.`);
  }
  return null;
}

// --- Video Data (Updated with 6 Share Links) ---
const youtubeLinksData = [
  {
    id: "vid1",
    url: "https://youtu.be/QZKbVRd91TU?si=SzfjY7EPCEGKTPQ3", // MKBHD - Foldable Phones (youtu.be link)
   
  },
  {
    id: "vid2",
    url: "https://youtu.be/PuBz1fkiY8g?si=V2BovSp38VO2ietm", // NASA - Webb Telescope (watch?v=...&feature=share link)
  
  },
  {
    id: "vid3",
    url: "https://youtu.be/gWUpTtO5bJA?si=U_NyVAnzHu87ar8e", // MrBeast Short (youtube.com/shorts/ link)
   
  },
  {
    id: "vid4",
    url: "https://youtu.be/F-c78FHwwgc?si=p__dgLjxtU3HDACE", // Lofi Girl (youtube.com/live/ link)
    
  },
  
];

// Process links to get embeddable URLs and filter out any invalid ones
const videos = youtubeLinksData
  .map(linkInfo => ({
    ...linkInfo,
    embedUrl: getYoutubeEmbedUrl(linkInfo.url),
  }))
  .filter(video => video.embedUrl); // Keep only videos with valid embed URLs

const YoutubeGalleryPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">

         
        </div>
      
      </header>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col bg-card"
            >
              <CardHeader>
                <CardTitle className="truncate text-lg md:text-xl text-card-foreground">{video.title}</CardTitle>
                {video.description && (
                  <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                    {video.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {/* The check for video.embedUrl is already done by the filter, but good for safety */}
                <div className="aspect-video w-full overflow-hidden rounded-md border border-border">
                  <iframe
                    className="w-full h-full"
                    src={video.embedUrl} // We filtered out nulls already
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center h-[50vh]">
          <AlertTriangle className="h-20 w-20 text-destructive mb-4" />
         
        </div>
      )}

     
    </div>
  );
};

export default YoutubeGalleryPage;