import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { techStack } from "@/data/portfolio"
import { Section } from "../shared/section"

export function TechStackSection() {
  return (
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
  )
}
