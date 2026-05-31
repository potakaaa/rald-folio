# Rald Folio

A minimal developer and creative portfolio built with TanStack Start, React, TypeScript, Tailwind CSS, and shadcn-style components.

## Run Locally

```bash
pnpm install
pnpm dev
```

The web app runs from `apps/web` and usually opens at `http://localhost:3000`.

## Configure Portfolio Content

Displayed portfolio content lives in JSON files here:

```txt
apps/web/src/data/content/
```

Edit these files first when updating the site:

```txt
profile.json
socials.json
projects.json
tech-stack.json
gallery.json
videos.json
experience.json
education.json
certifications.json
posts.json
```

`apps/web/src/data/portfolio.ts` only adapts those JSON files into typed exports for the React app.

### Profile

Update `apps/web/src/data/content/profile.json` for the hero, about card, contact email, and location.

```json
{
  "name": "Your Name",
  "role": "Developer / Creative",
  "tagline": "Short value-focused headline.",
  "intro": "One or two sentences about what you do.",
  "location": "Your Location",
  "email": "you@example.com",
  "image": "https://..."
}
```

### Social Links

Update `apps/web/src/data/content/socials.json` for GitHub, LinkedIn, Facebook, Instagram, or any other links.

```json
[
  {
    "label": "GitHub",
    "href": "https://github.com/username"
  }
]
```

### Projects

Update `apps/web/src/data/content/projects.json` for the Development Projects section.

Each project supports:

- `title`
- `description`
- `stack`
- `image`
- `github`
- `demo`
- `featured`

Set `featured: true` to make a project wider on desktop.

### Tech Stack

Update `apps/web/src/data/content/tech-stack.json` to change grouped skills.

Current groups are Frontend, Backend, Database, DevOps, and Tools, but you can rename or remove any group.

### Creative Gallery

Update `apps/web/src/data/content/gallery.json` to showcase photos, design work, artwork, or creative references.

Each image needs:

- `src`
- `alt`
- `caption`
- `orientation`: `landscape`, `portrait`, or `square`

Use descriptive `alt` text for accessibility. The orientation controls each image's size in the
automatically packed bento grid.

### Cloudinary Images

Use full public Cloudinary delivery URLs in the existing `image` and `src` fields:

```json
{
  "image": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/portfolio/profile.jpg"
}
```

The app automatically adds Cloudinary responsive width, automatic format, and automatic quality transformations for profile, project, and gallery images. No Cloudinary API key or secret is needed because the site only displays public delivery URLs. Non-Cloudinary image URLs continue to work unchanged.

### Videos

Update `apps/web/src/data/content/videos.json` for short films, montages, edits, reels, or YouTube showcases.

Use only the YouTube video ID, not the full URL:

```json
[
  {
    "title": "Short Film Edit",
    "description": "A cinematic cut focused on pacing and sound.",
    "youtubeId": "VIDEO_ID_HERE"
  }
]
```

For `https://www.youtube.com/watch?v=abc123`, the ID is `abc123`.

### Experience, Education, Certifications

Update:

- `apps/web/src/data/content/experience.json`
- `apps/web/src/data/content/education.json`
- `apps/web/src/data/content/certifications.json`

Each item uses:

- `title`
- `organization`
- `period`
- `description`

### Thoughts / Posts

Update `apps/web/src/data/content/posts.json` for owner-authored posts.

Visitors can support and comment anonymously in their own browser. Comments and support are stored in `localStorage`, not a database.

```json
[
  {
    "id": "unique-post-id",
    "date": "2026-05-30",
    "title": "Post title",
    "body": "Short post body."
  }
]
```

Keep every `id` stable. Changing an ID resets local visitor support/comments for that post.

## Update Section Copy

Section titles and descriptions live in:

```txt
apps/web/src/components/portfolio/portfolio-page.tsx
```

Search for `<Section` to edit copy like About, Projects, Stack, Gallery, Videos, Experience, Posts, and Contact.

## Theme And Styling

Design tokens and global styles live in:

```txt
packages/ui/src/styles/globals.css
```

The site uses CSS variables for light and dark mode. Dark mode is the default, and the theme toggle stores the visitor preference in `localStorage`.

## UI Components

Shared shadcn components live in:

```txt
packages/ui/src/components
```

To add another shadcn component:

```bash
pnpm dlx shadcn@latest add component-name -c apps/web
```

Import shared components like this:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Checks

Run these before shipping changes:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Deploy To Netlify

This repository includes the Netlify TanStack Start Vite plugin and a root `netlify.toml`.

To deploy from Git:

1. Push the repository to GitHub, GitLab, Bitbucket, or Azure DevOps.
2. In Netlify, select **Add new project** and import the repository.
3. Set the package directory to `apps/web`.
4. Leave the base directory unset so Netlify installs the pnpm workspace from the repository root.
5. Confirm the build command is `pnpm --filter web build`.
6. Confirm the publish directory is `apps/web/dist/client`.

No environment variables are currently required. Cloudinary images use public delivery URLs.

### GitHub Actions CI/CD

The `.github/workflows/ci-cd.yml` workflow runs type checking, linting, and the production build for
pull requests and pushes to `main`. After a successful `main` build, Netlify CLI runs its
framework-aware production build and deploys the generated client assets and SSR function.

Add these repository secrets in **GitHub > Settings > Secrets and variables > Actions**:

- `NETLIFY_AUTH_TOKEN`: create a Netlify personal access token.
- `NETLIFY_SITE_ID`: copy the project's ID from Netlify project configuration.

If the repository is also connected directly to Netlify, disable Netlify's automatic Git builds so
each push to `main` creates only one production deployment.
