import { IconBrandYoutube } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { videos } from "@/data/portfolio"
import { Section } from "../shared/section"

export function VideosSection() {
  return (
    <Section
      id="videos"
      eyebrow="Video"
      title="Motion work."
      description="A curated reel of short films, montages, and edits shaped through pacing, sound, and visual rhythm."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {videos.map((video) => (
          <Card key={video.youtubeId}>
            <div className="aspect-video bg-muted">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconBrandYoutube className="size-4" />
                {video.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-6 text-muted-foreground">{video.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
