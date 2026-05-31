import { Button } from "@workspace/ui/components/button"
import type { ReactNode } from "react"

export function ExternalLink({
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
