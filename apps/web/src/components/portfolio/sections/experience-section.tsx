import { IconBriefcase, IconCertificate, IconSchool } from "@tabler/icons-react"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import type { ReactNode } from "react"
import { certifications, education, experience } from "@/data/portfolio"
import type { TimelineItem } from "@/data/portfolio"
import { Section } from "../shared/section"

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
    <Card className="max-h-[36rem]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 space-y-5 overflow-y-auto overscroll-contain">
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

export function ExperienceSection() {
  return (
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
  )
}
