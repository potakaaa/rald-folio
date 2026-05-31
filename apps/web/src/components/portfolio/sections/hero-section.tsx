import { IconMapPin } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { profile } from "@/data/portfolio"
import { getCloudinaryImageUrl, getCloudinarySrcSet } from "@/lib/cloudinary"

export function HeroSection() {
  return (
    <section
      id="top"
      className="grid min-h-[calc(100svh-58px)] items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="max-w-3xl">
        <Badge variant="outline" className="mb-5">
          {profile.role}
        </Badge>
        <h1 className="text-4xl font-medium leading-tight sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          {profile.tagline}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
          {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>

      <Card className="bg-card/80">
        <img
          src={getCloudinaryImageUrl(profile.image, 900)}
          srcSet={getCloudinarySrcSet(profile.image, [480, 720, 900, 1200])}
          sizes="(min-width: 1024px) 39vw, 100vw"
          alt={`${profile.name} portrait placeholder`}
          className="aspect-[4/3] w-full object-cover object-[59%_center]"
          fetchPriority="high"
        />
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage
                src={getCloudinaryImageUrl(profile.image, 96)}
                alt=""
                className="object-[56%_center]"
              />
              <AvatarFallback>RH</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Building with intent</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <IconMapPin className="size-3.5" />
                {profile.location}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="border border-border p-3">
              <p className="text-muted-foreground">Edge</p>
              <p className="mt-1 font-medium">Engineering + Taste</p>
            </div>
            <div className="border border-border p-3">
              <p className="text-muted-foreground">Output</p>
              <p className="mt-1 font-medium">Products That Feel Real</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
