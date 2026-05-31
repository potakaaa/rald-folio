import { Button } from "@workspace/ui/components/button"
import { profile } from "@/data/portfolio"
import { ThemeToggle } from "../shared/theme-toggle"

const navigationItems = ["projects", "stack", "gallery", "posts", "contact"]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <nav className="flex items-center justify-between gap-4" aria-label="Primary">
        <a className="text-sm font-medium" href="#top" aria-label={`${profile.name} home`}>
          {profile.name}
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <Button key={item} asChild variant="ghost" size="sm">
              <a href={`#${item}`}>{item}</a>
            </Button>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}
