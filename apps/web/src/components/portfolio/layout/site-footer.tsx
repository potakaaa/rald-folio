import { profile } from "@/data/portfolio"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-xs text-muted-foreground">
      <p>© 2026 {profile.name}. Built with TanStack Start.</p>
    </footer>
  )
}
