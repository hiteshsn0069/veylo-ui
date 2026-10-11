// Builds the installable Veylo registry item from the two sources of truth:
// veylo/theme.json (colours) and skills/veylo/SKILL.md (agent rules).
// Run: node veylo/build.mjs   (fails if a text/background pair misses WCAG AA)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"

const root = new URL("..", import.meta.url)
const read = (p) => readFileSync(new URL(p, root), "utf8")
const theme = JSON.parse(read("veylo/theme.json"))
const skill = read("skills/veylo/SKILL.md").replace(/\r\n/g, "\n")

// --- contrast check (OKLCH -> linear sRGB -> WCAG relative luminance) ---
function luminance(css) {
  const [l, c, h] = css.match(/oklch\(([^)]+)\)/)[1].split(/[\s/]+/).map(Number)
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const L = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const M = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const S = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const clamp = (v) => Math.min(1, Math.max(0, v))
  const r = clamp(4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S)
  const g = clamp(-1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S)
  const bl = clamp(-0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S)
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl
}
const contrast = (x, y) => {
  const [hi, lo] = [luminance(x), luminance(y)].sort((p, q) => q - p)
  return (hi + 0.05) / (lo + 0.05)
}

const PAIRS = [
  ["foreground", "background"], ["card-foreground", "card"], ["popover-foreground", "popover"],
  ["primary-foreground", "primary"], ["secondary-foreground", "secondary"],
  ["muted-foreground", "background"], ["muted-foreground", "card"], ["muted-foreground", "muted"],
  ["accent-foreground", "accent"], ["primary", "background"], ["destructive", "background"],
  ["sidebar-foreground", "sidebar"], ["sidebar-primary-foreground", "sidebar-primary"],
  ["sidebar-accent-foreground", "sidebar-accent"],
]
const failures = []
for (const mode of ["light", "dark"])
  for (const [fg, bg] of PAIRS) {
    const ratio = contrast(theme[mode][fg], theme[mode][bg])
    if (ratio < 4.5) failures.push(`${mode}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1 (needs 4.5)`)
  }
if (failures.length) {
  console.error("Contrast check failed:\n- " + failures.join("\n- "))
  process.exit(1)
}

// --- registry item ---
const body = skill.replace(/^---\n[\s\S]*?\n---\n/, "")
const item = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "veylo",
  type: "registry:theme",
  title: "Veylo",
  description: "Veylo theme and design rules for AI coding agents: calm, precise, confident.",
  cssVars: theme,
  files: [
    { path: "veylo/SKILL.md", type: "registry:file", target: "~/.claude/skills/veylo/SKILL.md", content: skill },
    {
      path: "veylo/veylo.mdc", type: "registry:file", target: "~/.cursor/rules/veylo.mdc",
      content: `---\ndescription: Veylo design rules for all UI work\nalwaysApply: true\n---\n${body}`,
    },
  ],
}
mkdirSync(new URL("veylo/r/", root), { recursive: true })
writeFileSync(new URL("veylo/r/veylo.json", root), JSON.stringify(item, null, 2) + "\n")
console.log(`veylo/r/veylo.json written (${PAIRS.length * 2} contrast pairs pass AA)`)
