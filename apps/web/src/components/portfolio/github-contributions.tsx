import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react"
import { useEffect, useMemo, useState } from "react"

type Contribution = {
  date: string
  count: number
  level: number
}

type ContributionsResponse = {
  total: {
    lastYear: number
  }
  contributions: Contribution[]
}

const solarColors = [
  "rgba(240, 170, 90, 0.2)",
  "#FF9B4D",
  "#FFB85D",
  "#FFD46A",
  "#FFF4C6",
]

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""]

function groupByWeek(contributions: Contribution[]) {
  return Array.from({ length: Math.ceil(contributions.length / 7) }, (_, index) =>
    contributions.slice(index * 7, index * 7 + 7),
  )
}

function getMonthLabels(weeks: Contribution[][]) {
  const labels = weeks.flatMap((week, index) => {
    const firstDay = week[0]
    const month = new Date(`${firstDay.date}T00:00:00`).getMonth()
    const previousMonth = index > 0
      ? new Date(`${weeks[index - 1][0].date}T00:00:00`).getMonth()
      : -1

    if (month === previousMonth) {
      return []
    }

    return [{
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(
        new Date(`${firstDay.date}T00:00:00`),
      ),
      start: index,
    }]
  })

  return labels.flatMap((label, index) => {
    const length = (labels[index + 1]?.start ?? weeks.length) - label.start

    return length > 1 ? [{ ...label, length }] : []
  })
}

export function GitHubContributions({ username }: { username: string }) {
  const [data, setData] = useState<ContributionsResponse | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadContributions() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error("Could not load GitHub contributions")
        }

        setData((await response.json()) as ContributionsResponse)
      } catch (fetchError) {
        if (!(fetchError instanceof DOMException && fetchError.name === "AbortError")) {
          setError(true)
        }
      }
    }

    void loadContributions()

    return () => controller.abort()
  }, [username])

  const weeks = useMemo(() => groupByWeek(data?.contributions ?? []), [data])
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])

  if (error) {
    return (
      <p className="text-xs text-muted-foreground">
        GitHub activity is temporarily unavailable.
      </p>
    )
  }

  if (!data) {
    return <div className="h-36 animate-pulse bg-muted" aria-label="Loading GitHub activity" />
  }

  const dateRange = `${new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(`${data.contributions[0].date}T00:00:00`),
  )} - ${new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(`${data.contributions.at(-1)?.date}T00:00:00`),
  )}`

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <IconBrandGithub className="size-4" />
          <p className="text-xs font-medium">
            {data.total.lastYear.toLocaleString()} contributions in the last year
          </p>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          @{username}
          <IconArrowUpRight className="size-3.5" />
        </a>
      </div>
      <div className="overflow-x-auto py-4">
        <div className="mx-auto w-max min-w-max">
          <div className="mb-2 grid gap-1 pl-10 text-[0.625rem] leading-3 text-muted-foreground [grid-template-columns:repeat(53,0.75rem)]">
            {monthLabels.map((month) => (
              <span
                key={`${month.label}-${month.start}`}
                className="h-3"
                style={{ gridColumn: `${month.start + 1} / span ${month.length}` }}
              >
                {month.label}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="grid grid-rows-7 gap-1 text-[0.625rem] leading-3 text-muted-foreground">
              {weekdayLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="h-3 w-8">
                  {label}
                </span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {data.contributions.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contributions on ${day.date}`}
                  aria-label={`${day.count} contributions on ${day.date}`}
                  className="size-3 border border-black/5 transition-transform hover:scale-125"
                  style={{ backgroundColor: solarColors[day.level] ?? solarColors[0] }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-[0.625rem] text-muted-foreground">
        <span>{dateRange}</span>
        <div className="flex items-center gap-1">
          <span className="mr-1">Less</span>
          {solarColors.map((color) => (
            <span
              key={color}
              className="size-3 border border-black/5"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  )
}
