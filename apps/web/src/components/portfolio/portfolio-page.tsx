import { SiteFooter } from "./layout/site-footer"
import { SiteHeader } from "./layout/site-header"
import { AboutSection } from "./sections/about-section"
import { ActivitySection } from "./sections/activity/activity-section"
import { ContactSection } from "./sections/contact-section"
import { ExperienceSection } from "./sections/experience-section"
import { GallerySection } from "./sections/gallery-section"
import { HeroSection } from "./sections/hero-section"
import { PostsSection } from "./sections/posts/posts-section"
import { ProjectsSection } from "./sections/projects-section"
import { TechStackSection } from "./sections/tech-stack-section"
import { VideosSection } from "./sections/videos-section"

export function PortfolioPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SiteHeader />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechStackSection />
        <ActivitySection />
        <GallerySection />
        <VideosSection />
        <PostsSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </main>
  )
}
