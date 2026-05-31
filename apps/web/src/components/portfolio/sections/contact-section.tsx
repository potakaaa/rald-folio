import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { profile, socials } from "@/data/portfolio"
import { ExternalLink } from "../shared/external-link"
import { Section } from "../shared/section"

export function ContactSection() {
  return (
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
  )
}
