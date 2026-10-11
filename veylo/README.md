# Veylo

A design system you plug into your project so your AI coding tool produces good UI without you
critiquing every screen. Calm, precise, confident.

Veylo is an independent project built on a fork of [shadcn/ui](https://github.com/shadcn-ui/ui)
(MIT). It is not affiliated with or endorsed by shadcn/ui.

## Install

In any project that already uses shadcn/ui (has a `components.json`):

```bash
npx shadcn@latest add https://raw.githubusercontent.com/hiteshsn0069/veylo-ui/main/veylo/r/veylo.json
```

This does three things:

| What | Where |
|---|---|
| Veylo colours and radius, light and dark | your global CSS file, as CSS variables |
| Design rules for Claude Code | `.claude/skills/veylo/SKILL.md` |
| The same rules for Cursor | `.cursor/rules/veylo.mdc` |

For other tools (Antigravity, Codex and similar), point the agent at `.claude/skills/veylo/SKILL.md`
or paste its contents into that tool's rules file.

Starting from nothing? Create the project first with `npx shadcn@latest init`, then run the command above.

## Change it

Everything is yours once installed.

- **Colours and radius:** edit the variables in your global CSS. One change updates every component.
- **Rules:** edit `SKILL.md`. The agent follows whatever it says.

## What is in this folder

| File | Purpose |
|---|---|
| `PRINCIPLES.md` | Who Veylo is for and the decisions behind it. |
| `theme.json` | Source of truth for colours and radius. |
| `../skills/veylo/SKILL.md` | Source of truth for the design rules. |
| `build.mjs` | Builds `r/veylo.json` from the two sources and fails if any text/background pair misses WCAG AA contrast. |
| `r/veylo.json` | The installable item. Generated; do not edit by hand. |
| `PHASE-0.md` | Baseline and provenance record of the fork. |

After changing `theme.json` or `SKILL.md`:

```bash
node veylo/build.mjs
```

## Status

- Works today: theme and agent rules install with one command.
- Not yet: Veylo-branded docs site, theme studio export into this format, Figma library.
