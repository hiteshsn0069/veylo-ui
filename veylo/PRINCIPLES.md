# Veylo principles

Status: draft 1, proposed for review. Every decision below is open to change by the owner.

## Who Veylo is for

Designers and developers starting a product from scratch, usually building with an AI coding tool
(Claude Code, Cursor, Antigravity and similar). They want to work on what the product does, not on
how it looks.

## The promise

Plug Veylo in and the interface is already good. You do not have to critique every screen your AI
tool produces, because the taste is built in. When you do want something different, you change it
once in Veylo and it changes everywhere.

## The problems Veylo solves

1. **"Which components does my product need?"** Veylo answers with page recipes, not just a catalog.
2. **"My AI tool keeps producing average-looking UI."** Veylo gives the agent fixed, specific rules.
3. **"I can't describe what's wrong, I just don't like it."** Veylo removes the need to describe it.
4. **"Design and code drift apart."** One source feeds the code, the agent rules and the Figma file.

## How it should feel

Proposed: **calm, precise, confident.**

- Calm: few colours, generous space, nothing competing for attention.
- Precise: everything sits on a scale; nothing is "about right".
- Confident: clear hierarchy and one obvious next action on every screen.

## Principles

1. **Decide once.** Every recurring choice has one default. A system with five acceptable options has made no decision.
2. **Taste is specific.** Rules are written as numbers and names an agent can follow, never as adjectives.
3. **One source, many outputs.** Code, agent instructions, documentation and Figma all derive from the same tokens and rules.
4. **Control without effort.** Defaults are trusted; every default can be changed in one place and exported.
5. **Recipes before components.** Users think in pages (sign in, settings, dashboard). Veylo answers at that level first.
6. **Restraint is the default.** Colour, shadow, motion and emphasis are used sparingly so they keep their meaning.
7. **Accessible by default.** Contrast, focus, keyboard use and reduced motion are part of the default, not an option.
8. **Honest status.** Nothing is called ready without documented states, limits and checks.

## How users get Veylo

| Way in | Status |
|---|---|
| Agent skill (`skills/veylo`) dropped into a project | draft exists |
| Components installed through the CLI and registry | inherited from upstream, not yet rebranded |
| Theme studio: change styles and decisions, download the result | prototype in `hiteshsn0069/Veylo`, not yet ported |
| Figma: copy a component, or paste the whole system | not started |

## Order of work

1. Principles (this file) and the agent skill.
2. Foundations: colour ramps, type scale, spacing, radius, elevation, motion, as tokens.
3. Veylo theme applied to the component library.
4. Page recipes built with real components, used to find gaps.
5. Studio ported; export of theme, rules and skill.
6. Figma library generated from the same tokens.

## Not doing (for now)

- A second component library. Components come from the upstream fork.
- More than one visual style at launch. One excellent default beats four average presets.
- Promising that an agent will never deviate. Veylo guides and checks; it cannot guarantee.
