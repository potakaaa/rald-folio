import { Card, CardContent } from "@workspace/ui/components/card"
import { socials } from "@/data/portfolio"
import { GitHubContributions } from "./github-contributions"
import { Section } from "../../shared/section"

const githubUsername =
  socials
    .find((social) => social.label === "GitHub")
    ?.href.match(/github\.com\/([^/]+)/)?.[1] ?? "potakaaa"

export function ActivitySection() {
  return (
    <Section
      id="activity"
      eyebrow="GitHub"
      title="Contribution activity."
      description="A live view of the consistency behind the work: experiments, shipped features, maintenance, and incremental progress."
    >
      <Card size="sm">
        <CardContent>
          <GitHubContributions username={githubUsername} />
        </CardContent>
      </Card>
    </Section>
  )
}
