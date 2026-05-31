import { IconBriefcase, IconCode, IconPalette } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Section } from "../shared/section"

const strengths = [
  {
    icon: <IconCode className="size-5" />,
    title: "Product Thinking",
    text: "Interfaces shaped around real use, not just screenshots. Clear flows, useful features, and fewer moving parts.",
  },
  {
    icon: <IconPalette className="size-5" />,
    title: "Full-Stack Execution",
    text: "From frontend polish to backend structure, I build systems that are practical, maintainable, and ready to grow.",
  },
  {
    icon: <IconBriefcase className="size-5" />,
    title: "Creative Judgment",
    text: "Visual direction, spacing, copy, and details that make a product feel more trusted from the first click.",
  },
]

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Developer discipline with creative range."
      description="I turn rough ideas into polished, usable products by combining reliable engineering with clear visual judgment."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {strengths.map((item) => (
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
  )
}
