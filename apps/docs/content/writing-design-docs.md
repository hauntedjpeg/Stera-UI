# Writing design docs

Design docs tell designers and design agents which component to use when, and how to use it. They carry no code: the rest of the component page covers that.

## Which components get them

Only components in the registry. Figma docs for components that don't exist in code yet stay in Figma until the component ships.

## Where they go

- **One component:** a `<DesignGuidelines>` block under `## Design`, right after the page's first `<ComponentPreview>` and before `## Installation`. The site renders it as a panel. `apps/docs/lib/llms.ts` also serves it on its own at `/components/<name>/design.md` and lists it in `/llms.txt`.
- **Choosing between similar components, or rules they share:** a group page in `content/docs/design/`, such as [Overlays](docs/design/overlays.mdx). Component blocks link to it instead of repeating it.
- **Color token rules** (contrast, keeping roles distinct, visible states): [Theming](docs/design/theming.mdx). Whoever places a component can't change these; whoever edits the tokens can.
- **The summary** is the page's frontmatter `description`: one sentence saying what the component is.

## Component block

```mdx
## Design

<DesignGuidelines>

### When to use

- …

### When not to use

- … Use [Alternative](/components/alternative).

### Guidelines

- …

See also: [Group page](/design/group).

</DesignGuidelines>
```

- Leave out a heading with nothing under it.
- **Variants:** a component with variants adds a `### Variants` table before Guidelines, with the columns Variant, Emphasis, Use for and Not for.
- **Parts:** guidance for a part (a command group, a sidebar header) goes in the parent's Guidelines as a bullet that starts with the part's name in bold, such as "**Groups:** …". Parts never get their own block.
- **See also:** end with one `See also:` line linking the component's group page, and [Theming](docs/design/theming.mdx) if it has token rules.

## Group page

A group page is worth making when three or more components compete for the same job or share rules. It has three parts:

1. **A table:** Use, For (a short phrase), and one column for what tells the options apart, like Overlays' "Interactive content."
2. **Deciding:** an ordered list of questions where the first yes wins.
3. **Shared rules:** rules that apply to several components in the group, written once here instead of on each page.

## Rules

- **Intent, not presentation.** Say what a component is for and when to reach for it. Leave out how it looks and where things sit: fill or tint, colors, placement, alignment, corners. The preview shows the look, and anyone forking Stera UI is free to change it.
- **Say when it's the designer's call.** Stera UI is a starting point, so many choices have no rule. Write them as "Your call: … Pick one and use it consistently," so an agent follows what the project already does instead of inventing a rule.
- **Leave out built-in behavior:** dismissal, focus handling, positioning, keyboard support. The component handles it, so it isn't a design decision.
- **Every "when not to use" names the alternative** and links to it.
- **Use code names.** Write variants in code font (`brand`, `ghost`) and components by their code name (Alert Dialog). Where Figma names differ, the code name wins: see [Names](#names).
- **Keep intent words and variant names apart.** "The primary action" is the most important action in a flow, whatever variant it uses. `brand` is a variant. Don't use one to mean the other.
- **No code.** Leave props and parts' code names (`showCloseButton`, `DrawerPopup`) to the code side of the page.
- **Short is fine.** A few true bullets beat a filled-in template.

## Migrating from Figma

Figma docs use Usage and Guidance. The "Use…" bullets in Usage become When to use, and the "Avoid…, use X instead" bullets become When not to use. Then sort every other bullet into one of four buckets:

| Bucket                                                     | Goes to                                                         | Example from the Figma docs                                                                                                                          |
| ---------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A rule about intent                                        | Guidelines                                                      | Toggle Group: "Keep the group small, ideally two to five items."                                                                                     |
| An open choice                                             | Guidelines, as "Your call: … Pick one and use it consistently." | Toast: "Anchor toasts to the same position everywhere."                                                                                              |
| A rule about tokens                                        | [Theming](docs/design/theming.mdx)                              | Toggle: "The pressed state must be clearly distinct from hover and focus."                                                                           |
| Presentation, built-in behavior, or what the preview shows | Cut                                                             | Toggle Group Item: "Only the outer edges of the group carry rounded corners." Dropdown Menu: "Ensure focus returns to the trigger element on close." |

Group pages pick up whatever several Figma docs repeat. The form docs, for example, each say they share the field component's label, description and error treatment. That's one shared rule on a forms group page.

## Names

Where a Figma name differs from the code, the docs use the code name.

| Figma                    | Code                                                                             |
| ------------------------ | -------------------------------------------------------------------------------- |
| Primary Button           | `brand` variant of Button                                                        |
| Field (single-line text) | Input. The code's Field is the layout that pairs a label, an input and an error. |
| Toast, Ping              | Notice, until it's renamed Toast                                                 |

## Check before publishing

- Every variant and part you name exists in the component.
- Every claim about behavior matches the demo on the page.
