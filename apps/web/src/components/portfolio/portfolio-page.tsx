import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBriefcase,
  IconCertificate,
  IconCode,
  IconMail,
  IconMapPin,
  IconPalette,
  IconSchool,
} from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import type { ReactNode } from "react"
import {
  certifications,
  education,
  experience,
  gallery,
  posts,
  profile,
  projects,
  socials,
  techStack,
  videos,
} from "@/data/portfolio"
import type { TimelineItem } from "@/data/portfolio"
import { PostCard } from "./post-card"
import { ThemeToggle } from "./theme-toggle"

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
}

function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-12 sm:py-16">
      <div className="mb-8 grid gap-3 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-medium sm:text-3xl">{title}</h2>
        </div>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function ExternalLink({
  href,
  children,
  variant = "outline",
}: {
  href: string
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
}) {
  return (
    <Button asChild variant={variant} size="sm">
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    </Button>
  )
}

function TimelineGroup({
  title,
  icon,
  items,
}: {
  title: string
  icon: ReactNode
  items: TimelineItem[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item) => (
          <div key={`${item.title}-${item.period}`} className="grid gap-1 border-l pl-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <Badge variant="outline">{item.period}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{item.organization}</p>
            <p className="text-xs leading-6 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function PortfolioPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <nav className="flex items-center justify-between gap-4" aria-label="Primary">
            <a className="text-sm font-medium" href="#top" aria-label={`${profile.name} home`}>
              {profile.name}
            </a>
            <div className="hidden items-center gap-1 md:flex">
              {["projects", "stack", "gallery", "posts", "contact"].map((item) => (
                <Button key={item} asChild variant="ghost" size="sm">
                  <a href={`#${item}`}>{item}</a>
                </Button>
              ))}
            </div>
            <ThemeToggle />
          </nav>
        </header>

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
              src={profile.image}
              alt={`${profile.name} portrait placeholder`}
              className="aspect-[4/3] w-full object-cover"
            />
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarImage src={profile.image} alt="" />
                  <AvatarFallback>RH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Available for focused builds</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IconMapPin className="size-3.5" />
                    {profile.location}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="border border-border p-3">
                  <p className="text-muted-foreground">Mode</p>
                  <p className="mt-1 font-medium">Design + Code</p>
                </div>
                <div className="border border-border p-3">
                  <p className="text-muted-foreground">Style</p>
                  <p className="mt-1 font-medium">Simple / Premium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Section
          id="about"
          eyebrow="About"
          title="Developer discipline with creative range."
          description="I turn rough ideas into polished, usable products by combining reliable engineering with clear visual judgment."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <IconCode className="size-5" />,
                title: "Product Engineering",
                text: "Practical web apps, dashboards, and interfaces built with typed, reusable systems.",
              },
              {
                icon: <IconPalette className="size-5" />,
                title: "Creative Direction",
                text: "Brand-aware layouts, image systems, and content that feel intentional without excess.",
              },
              {
                icon: <IconBriefcase className="size-5" />,
                title: "Reliable Delivery",
                text: "Clear scope, calm communication, and implementation choices that stay easy to maintain.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs leading-6 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

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
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="aspect-video w-full object-cover"
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

        <Section
          id="stack"
          eyebrow="Stack"
          title="Tools grouped by workflow."
          description="The tools I use to move from prototype to production with speed, consistency, and long-term maintainability."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {techStack.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="gallery"
          eyebrow="Creative"
          title="Gallery studies."
          description="Visual work that shows taste, composition, and the creative range I bring to product and brand experiences."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((image) => (
              <Card key={image.src}>
                <img src={image.src} alt={image.alt} className="aspect-[4/5] w-full object-cover" />
                <CardContent>
                  <p className="text-xs leading-6 text-muted-foreground">{image.caption}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

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

        <Section
          id="experience"
          eyebrow="Experience"
          title="Work, learning, and credentials."
          description="A quick read on the roles, training, and credentials behind the way I plan, communicate, and deliver."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <TimelineGroup
              title="Work"
              icon={<IconBriefcase className="size-4" />}
              items={experience}
            />
            <TimelineGroup
              title="Education"
              icon={<IconSchool className="size-4" />}
              items={education}
            />
            <TimelineGroup
              title="Certifications"
              icon={<IconCertificate className="size-4" />}
              items={certifications}
            />
          </div>
        </Section>

        <Section
          id="posts"
          eyebrow="Thoughts"
          title="Short posts with lightweight support."
          description="Short notes on product, design, and engineering for people who want to understand how I think."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title="Let’s build something clear."
          description="Bring the goal, the constraints, or the messy first draft. I can help turn it into something useful and sharp."
        >
          <Card>
            <CardContent className="grid gap-6 py-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <IconMail className="size-4" />
                  {profile.email}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <ExternalLink key={social.label} href={social.href} variant="outline">
                      {social.label === "GitHub" ? <IconBrandGithub /> : null}
                      {social.label === "LinkedIn" ? <IconBrandLinkedin /> : null}
                      {social.label}
                    </ExternalLink>
                  ))}
                </div>
              </div>
              <Button asChild>
                <a href={`mailto:${profile.email}`}>
                  <IconMail />
                  Contact Me
                </a>
              </Button>
            </CardContent>
          </Card>
        </Section>

        <footer className="border-t border-border py-8 text-xs text-muted-foreground">
          <p>© 2026 {profile.name}. Built with TanStack Start.</p>
        </footer>
      </div>
    </main>
  )
}
