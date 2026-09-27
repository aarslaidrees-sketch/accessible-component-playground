# NOTES: hand-built vs shadcn/ui

I built Modal, Tabs, and Disclosure from scratch, then ran
`npx shadcn@latest init` and `npx shadcn@latest add dialog tabs` to compare.
shadcn now uses Base UI (@base-ui/react) as its underlying primitive library.

## Gaps between my version and shadcn's

1. **Portal rendering.** shadcn's `DialogContent` wraps everything in a
   `DialogPortal`, rendering the dialog outside the normal component tree.
   This avoids z-index/overflow issues from parent containers. My `Modal`
   renders inline inside wherever it's called, which can be clipped by an
   ancestor with `overflow: hidden` or a lower stacking context.

2. **All keyboard/focus-trap logic is hidden in a library, not visible in
   the file.** Neither `dialog.tsx` nor `tabs.tsx` contains any keydown
   handler, focus-trap loop, or explicit ARIA-hiding logic — it's all inside
   `@base-ui/react/dialog` and `@base-ui/react/tabs`. My components have
   100% of their accessibility logic written directly in the file, which is
   easier to audit but easier to get subtly wrong (e.g. edge cases in the
   focus-trap loop that a battle-tested library already handles).

3. **Vertical orientation support on Tabs.** shadcn's `Tabs` accepts an
   `orientation` prop (`horizontal` | `vertical`) that changes layout and
   (inside the library) which arrow keys move selection. My `Tabs` only
   supports horizontal / Left-Right arrows.

4. **Icon-only close button with a visually-hidden accessible name.**
   shadcn's dialog close button shows only an `XIcon` visually, but pairs it
   with `<span className="sr-only">Close</span>` so screen readers still
   announce "Close." My modal's close button uses visible text instead,
   which works but wouldn't generalize to an icon-only button design.

## What matched

- Correct roles/attributes: dialog/tablist/tab/tabpanel roles,
  aria-selected, aria-controls, aria-expanded on the disclosure button.
- Roving tabindex on tabs (only the active tab is Tab-reachable).
- Escape-to-close and focus-return-to-trigger on the modal.
- Arrow/Home/End keyboard handling on tabs.

## Takeaway

Reading shadcn's own files gives a misleading impression that there's very
little accessibility work involved — almost none of it is actually visible
in the wrapper components. It all lives one layer down, inside the Base UI
(or Radix, in older shadcn versions) primitives. Building the components by
hand first was what made it possible to notice that gap at all.