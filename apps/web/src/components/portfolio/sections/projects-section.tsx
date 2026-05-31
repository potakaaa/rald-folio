import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { projects } from "@/data/portfolio"
import { getCloudinaryImageUrl, getCloudinarySrcSet } from "@/lib/cloudinary"
import { ExternalLink } from "../shared/external-link"
import { Section } from "../shared/section"

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Development"
      title="Selected projects."
      description="A snapshot of how I solve real product problems: clean interfaces, practical architecture, and work that can ship."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} className={project.featured ? "lg:col-span-2" : ""}>
            <img
              src={getCloudinaryImageUrl(project.image, 900)}
              srcSet={getCloudinarySrcSet(project.image, [480, 720, 900, 1200])}
              sizes={project.featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
              alt={`${project.title} preview`}
              className="aspect-video w-full object-cover"
              loading="lazy"
            />
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{project.title}</CardTitle>
                {project.featured ? <Badge>Featured</Badge> : null}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs leading-6 text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <ExternalLink href={project.github}>
                <IconBrandGithub />
                GitHub
              </ExternalLink>
              <ExternalLink href={project.demo} variant="ghost">
                <IconArrowUpRight />
                Live
              </ExternalLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  )
}
