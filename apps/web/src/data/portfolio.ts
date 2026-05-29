import certificationsJson from "./content/certifications.json"
import educationJson from "./content/education.json"
import experienceJson from "./content/experience.json"
import galleryJson from "./content/gallery.json"
import postsJson from "./content/posts.json"
import profileJson from "./content/profile.json"
import projectsJson from "./content/projects.json"
import socialsJson from "./content/socials.json"
import techStackJson from "./content/tech-stack.json"
import videosJson from "./content/videos.json"

export type Profile = {
  name: string
  role: string
  tagline: string
  intro: string
  location: string
  email: string
  image: string
}

export type SocialLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  stack: string[]
  image: string
  github: string
  demo: string
  featured?: boolean
}

export type TechGroup = {
  title: string
  items: string[]
}

export type GalleryImage = {
  src: string
  alt: string
  caption: string
}

export type Video = {
  title: string
  description: string
  youtubeId: string
}

export type TimelineItem = {
  title: string
  organization: string
  period: string
  description: string
}

export type Post = {
  id: string
  date: string
  title: string
  body: string
}

export const profile: Profile = profileJson
export const socials: SocialLink[] = socialsJson
export const projects: Project[] = projectsJson
export const techStack: TechGroup[] = techStackJson
export const gallery: GalleryImage[] = galleryJson
export const videos: Video[] = videosJson
export const experience: TimelineItem[] = experienceJson
export const education: TimelineItem[] = educationJson
export const certifications: TimelineItem[] = certificationsJson
export const posts: Post[] = postsJson
