# Veylo UI — Phase 0 baseline

Veylo UI is an independent project built on a fork of [shadcn-ui/ui](https://github.com/shadcn-ui/ui).
It is not affiliated with or endorsed by shadcn/ui. Upstream code is MIT licensed (© 2023 shadcn);
`LICENSE.md` and all upstream notices are retained unchanged.

Product-specific files live under `veylo/` so upstream merges stay conflict-free.

## Provenance

| | |
|---|---|
| Fork | `hiteshsn0069/veylo-ui` (GitHub fork relationship kept) |
| Upstream | `shadcn-ui/ui`, remote `upstream` |
| Baseline commit | `c2a67849b` (10 Oct 2026) |
| Modifications so far | this file only |

## Repository map

| Path | What it is |
|---|---|
| `apps/v4` | Next.js docs site, component catalog and registry source. Branding in `apps/v4/lib/config.ts`. |
| `apps/v4/registry` | Component source: `bases/{radix,base,aria}`, `new-york-v4`, styles, themes, icons. |
| `apps/v4/public/r` | Generated registry JSON served to the CLI (output of `registry:build`). |
| `apps/v4/content/docs` | MDX documentation. |
| `packages/shadcn` | The CLI (`init`, `add`, `diff`, `search`, `migrate`, `build`, `mcp`). |
| `packages/react`, `helpers`, `registry` | Published support libraries. |
| `packages/tests` | CLI integration tests. |
| `templates/*` | Starter projects (Next, Vite, Astro, React Router, Start; app and monorepo). |

Data flow: registry source → `registry:build` → `public/r/*.json` → CLI and MCP server read those URLs → files are written into the consumer's project.

## Commands (verified on Windows 11, Node 26.7, pnpm 10.33.4, bun 1.4.2)

| Command | Result |
|---|---|
| `pnpm install --frozen-lockfile` | pass |
| `pnpm build:packages` | pass (4/4) |
| `pnpm --filter=v4 registry:build` | pass |
| `pnpm typecheck` | pass (10/10) |
| `pnpm lint` | pass |
| `pnpm --filter=shadcn test` | 474 pass, 10 fail (see Known gaps) |
| `pnpm --filter=v4 exec next build` | fail: out of memory (see Known gaps) |

Windows needs a short checkout path and `git config core.longpaths true`.
`registry:build` rewrites generated files with different line endings; discard them with `git checkout -- .` unless the registry changed.

## Decisions

| Decision | Choice |
|---|---|
| Repository model | True GitHub fork; product code isolated under `veylo/` and clearly named packages. |
| Brand name | Veylo (working name; see Known gaps). |
| Differentiator | Theme studio and token engine from `hiteshsn0069/Veylo`, ported in a later phase. |
| Upstream sync | `git fetch upstream`, review by area, merge with the checks above, record the decision here. Never a blind merge. |

## Known gaps

- Site build: `next build` crashed with "process out of memory" in the MDX loader workers on this machine. Not a code error; retry with more memory or on CI.
- CLI tests: 10 failures in `create-project`, `dry-run` and `migrate-radix` tests on Windows. Upstream CI runs on Linux; not yet confirmed there.
- Node: upstream pins Node 20 (`.nvmrc`); baseline was run on Node 26.
- Brand: `veylo` on npm was unpublished in January 2026 and may be unavailable; `veylo.com` and `veylo.io` are registered; several small GitHub projects use the name. No trademark search done.
- Third-party assets (fonts, icon sets, images in `apps/v4/public`) need a separate licence review before launch.
- GitHub Actions are not yet enabled on the fork, so CI has not run there.
