import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import type { Project } from "@/data/portfolio"
import { projects } from "@/data/portfolio"
import { getCloudinaryImageUrl, getCloudinarySrcSet } from "@/lib/cloudinary"
import { ExternalLink } from "../shared/external-link"
import { Section } from "../shared/section"

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="leading-5">{project.title}</CardTitle>
          {project.featured ? (
            <Badge className="shrink-0 text-[10px] tracking-[0.12em] uppercase">
              Featured
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs leading-5 text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="px-1.5 py-0 text-[10px]"
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto gap-2">
        {project.github ? (
          <ExternalLink href={project.github}>
            <IconBrandGithub />
            GitHub
          </ExternalLink>
        ) : null}
        {project.demo ? (
          <ExternalLink href={project.demo} variant="ghost">
            <IconArrowUpRight />
            Live
          </ExternalLink>
        ) : null}
      </CardFooter>
    </div>
  )
}

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
          <Card
            key={project.title}
            size="sm"
            className={
              project.featured
                ? "hover:-translate-y-1 lg:col-span-2 lg:flex-row lg:gap-0"
                : "hover:-translate-y-1"
            }
          >
            <div
              className={`flex aspect-video items-center justify-center overflow-hidden border-b ${
                project.featured
                  ? "bg-muted/40 p-2 lg:aspect-auto lg:w-[54%] lg:shrink-0 lg:border-r lg:border-b-0"
                  : "bg-muted/40 p-3"
              }`}
            >
              <img
                src={getCloudinaryImageUrl(project.image, 720)}
                srcSet={getCloudinarySrcSet(
                  project.image,
                  [360, 540, 720, 900]
                )}
                sizes={
                  project.featured
                    ? "(min-width: 1024px) 36vw, 100vw"
                    : "(min-width: 1024px) 33vw, 100vw"
                }
                alt={`${project.title}${project.preview === "mobile" ? " mobile app" : ""} preview`}
                className="h-full w-full object-contain transition duration-300 ease-standard group-hover/card:scale-[1.035]"
                loading="lazy"
              />
            </div>
            <ProjectDetails project={project} />
          </Card>
        ))}
      </div>
    </Section>
  )
}
