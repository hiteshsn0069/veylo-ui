---
name: veylo
description: Veylo design taste for product UI. Applies whenever building, changing or reviewing any screen, page, layout or component in a project that uses Veylo or shadcn/ui components. Gives fixed defaults for hierarchy, type, spacing, colour, component choice and states so the user does not have to critique the design. Use with the shadcn skill, which covers the CLI and component mechanics.
user-invocable: false
---

# Veylo

You are designing for someone who wants to work on what their product does, not how it looks. They
will not give detailed design feedback. Get it right without asking: follow the defaults below
exactly, and only deviate when the user asks for something specific.

The feel is **calm, precise, confident**: few colours, generous space, one obvious action per screen.

For installing and composing components, follow the `shadcn` skill. This skill decides how the
result should look.

## Before you build a screen

1. Name the one thing the user came to this screen to do. That gets the only primary button.
2. Pick the page recipe below. Do not invent a layout if a recipe fits.
3. List the states you owe: loading, empty, error, success, disabled. Build them, not just the happy path.

## Hierarchy

- One primary button per screen. Everything else is `outline`, `secondary` or `ghost`.
- One page title (`h1`) per screen. Section titles are `h2`. Do not skip levels.
- Show importance with size and weight first, colour last.
- Secondary information uses `text-muted-foreground`, never a lighter custom colour.
- If everything is bold, nothing is. At most one bold element per card besides its title.

## Type

Use only these. Do not introduce other sizes.

| Role | Classes |
|---|---|
| Page title | `text-2xl font-semibold tracking-tight` |
| Section title | `text-lg font-semibold` |
| Card title | `text-base font-medium` |
| Body | `text-sm` |
| Supporting text | `text-sm text-muted-foreground` |
| Labels, captions, table headers | `text-xs font-medium text-muted-foreground` |
| Big number (stats) | `text-3xl font-semibold tabular-nums` |

- Marketing pages only may use `text-4xl` to `text-6xl` for the hero headline.
- Body text lines stay under about 70 characters (`max-w-prose`).
- Numbers in tables and stats use `tabular-nums`.

## Spacing

Spacing shows what belongs together. Use only this scale:

| Use | Value |
|---|---|
| Icon to its label, label to its input | `gap-2` |
| Between fields in a form, items in a list | `gap-4` |
| Inside a card | `p-6` |
| Between cards or sections on a page | `gap-6` |
| Between major page regions | `gap-8` |
| Page padding | `p-4` on mobile, `p-6` from `md`, `p-8` from `lg` |

- Related things sit closer than unrelated things. Always.
- Use `flex`/`grid` with `gap-*`. Do not space siblings with margins.
- Content width: forms `max-w-md`, reading `max-w-prose`, settings `max-w-2xl`, app pages `max-w-7xl`.

## Colour

- Use semantic tokens only: `background`, `foreground`, `card`, `muted`, `primary`, `secondary`, `accent`, `destructive`, `border`, `input`, `ring`. Never raw colours such as `bg-blue-500` or hex values.
- The primary colour appears on the one primary action, the active navigation item, and focus rings. Nowhere else by default.
- `destructive` is only for actions that delete or cannot be undone, and for errors.
- Status uses a `Badge`, not coloured text. Never rely on colour alone: pair it with a word or icon.
- Surfaces: page is `bg-background`, raised content is a `Card`. Do not nest cards inside cards.

## Shape, depth and motion

- Radius comes from the theme (`rounded-md` controls, `rounded-lg` cards). Do not mix other radii.
- Separate with space first, then a `border`, then a shadow. Shadows are for things that float (popover, dialog, dropdown), not for cards at rest.
- Motion is short and functional: 150ms for hover and press, 200ms for things that open. No decorative animation. Respect `prefers-reduced-motion`.
- Icons: one set, `size-4` inline with text, `size-5` standalone. Icon-only buttons need an `aria-label`.

## Which component

| Need | Use | Not |
|---|---|---|
| Choose 1 of 2 to 5 visible options | `RadioGroup` or `ToggleGroup` | `Select` |
| Choose 1 of many | `Select`; over 10 options, `Combobox` | long radio list |
| On/off that applies immediately | `Switch` | `Checkbox` |
| Agree, or pick several | `Checkbox` | `Switch` |
| Confirm a destructive action | `AlertDialog` | `Dialog` |
| Short task without leaving the page | `Dialog` | new page |
| Longer side task, filters, details | `Sheet` | `Dialog` |
| Row actions | `DropdownMenu` on a ghost icon button | row of buttons |
| Feedback after an action | toast (`Sonner`) | `Alert` |
| Persistent message about page state | `Alert` | toast |
| Switch views of the same content | `Tabs` | separate pages |
| Explain an icon or truncated text | `Tooltip` | visible helper text |
| Content still loading | `Skeleton` matching the final layout | spinner for whole page |
| Nothing to show yet | `Empty` with one action | blank area |

## Page recipes

- **Sign in / sign up**: centred `Card`, `max-w-sm`. Title, one line of supporting text, fields, primary button full width, secondary link below. Nothing else on the page.
- **Dashboard**: page title row with one primary action; a row of 3 to 4 stat cards; then one or two larger cards (chart, recent table). No more than one chart above the fold.
- **List / table page**: title row with primary "create" action; filter row (search input left, filters right); `Table`; pagination. Row actions in a `DropdownMenu`. Include the empty state.
- **Detail page**: breadcrumb; title with status `Badge`; actions top right; content in cards by topic; destructive action last and separated.
- **Settings**: `max-w-2xl`; one `Card` per group, each with title, description, fields and its own save button; danger zone last.
- **Form**: one column; labels above inputs; helper text below; errors below the field in `text-destructive`; primary action bottom left, cancel next to it as `ghost`.
- **Empty first-run**: one `Empty` block explaining what goes here and one primary action to create the first item.

## States you must build

- Every button: hover, focus-visible, disabled, and loading (spinner, label kept, button disabled).
- Every field: default, focus, filled, error with a message, disabled.
- Every data view: loading (`Skeleton`), empty, error with a retry, and the populated state.
- Every destructive action: confirmation that names the thing being deleted.

## Words

- Buttons say what happens: "Create project", "Save changes", "Delete account". Never "Submit" or "OK".
- Sentence case everywhere. No full stop on labels, buttons or single-sentence helper text.
- Errors say what went wrong and what to do next. No blame, no codes alone.
- Use the same word for the same thing on every screen.

## Accessibility

- Text contrast at least 4.5:1; large text and UI boundaries at least 3:1.
- Everything reachable and operable by keyboard, with a visible focus ring.
- Every input has a visible label. Placeholders are examples, not labels.
- Click targets at least 24 by 24 CSS pixels, 44 on touch layouts.
- Check both light and dark themes before finishing.

## Before you say it is done

- [ ] One primary action; hierarchy readable at a glance
- [ ] Only the type sizes, spacing values and semantic colours listed here
- [ ] Loading, empty and error states exist
- [ ] Works at 375px wide and at desktop width
- [ ] Keyboard and focus work; light and dark both checked
- [ ] Button and error text follow the wording rules

If the user asks for something that breaks these defaults, do it, and say in one line which default you changed.
