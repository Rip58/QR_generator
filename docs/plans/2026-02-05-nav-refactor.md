# Refactor Plan: Navigation & Settings

**Goal:** Reform the TopBar to use the "4 Squares" icon as the Menu trigger, removing the hamburger. Add a Settings page with Dark/Light mode toggle.

## Proposed Changes

### 1. Theme Provider
- **Create** `components/theme-provider.tsx`: Standard `next-themes` wrapper.
- **Modify** `app/layout.tsx`: Wrap children in `ThemeProvider`.

### 2. Navigation Components
- **Create** `components/layout/MenuOverlay.tsx`: A full-screen or slide-over menu containing links to "Home" and "Settings".
- **Modify** `components/layout/TopBar.tsx`: 
    - Remove the `CapsuleButton` with `Menu` icon.
    - Make the `LayoutGrid` (4 squares) icon clickable.
    - Add state to toggle `MenuOverlay`.

### 3. Settings Page
- **Create** `app/settings/page.tsx`:
    - Layout similar to "Capsule" aesthetic.
    - Add "Appearance" section.
    - Add Toggle buttons for "Light" / "Dark" / "System".

## Verification Plan
1. **Manual Test:** Click "4 Squares" -> Menu opens? -> Click "Settings" -> Navigates?
2. **Theme Test:** Toggle Dark/Light -> Visual check of background/text colors.
