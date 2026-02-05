# QR Code App Implementation Plan

> **Note:** This plan leverages the `ui-ux-pro-max` skill for design components and best practices.

**Goal:** Build a modern, "Capsule-style" QR Code Generator with history and customization features, using the specific requested color palette.

**Architecture:** Next.js App Router with Client Components for interactivity. Data is persisted in `localStorage` for privacy and simplicity. Styling via Tailwind CSS with a custom theme.

**Tech Stack:** Next.js, Tailwind CSS, Lucide React, qrcode.react.

---

## Task Structure

### Task 1: Project Scaffolding & Design System

**Files:**
- Modify: `tailwind.config.ts` (Add colors: Cyan #00FFD4, Blue #5465FF, etc.)
- Modify: `app/globals.css` (Set default background to dark/black as implied by high contrast designs)
- Create: `components/ui/CapsuleButton.tsx` (Reusable pill-shaped button)
- Install: `lucide-react`, `qrcode.react`, `html-to-image` (for downloading)

**Step 1: Install Dependencies**
Run: `npm install lucide-react qrcode.react html-to-image`

**Step 2: Config Tailwind Palette**
Update `tailwind.config.ts` to include:
```ts
colors: {
  brand: {
    cyan: '#00FFD4',
    blue: '#5465FF',
    lavender: '#D2DDFF',
    black: '#050208',
  }
}
```

**Step 3: Create Base UI Components**
Create `CapsuleButton.tsx` ensuring it uses `rounded-full` and brand colors.

### Task 2: Global Layout & Navigation

**Files:**
- Create: `components/layout/TopBar.tsx` (Logo Left, Page Icon Right)
- Create: `components/layout/MenuOverlay.tsx` (Hamburger menu content)
- Modify: `app/layout.tsx` (Integrate TopBar)

**Step 1: TopBar Component**
Implement the header with the specific "Design" icon on the right as requested.

**Step 2: Menu Implementation**
Build the slide-over or overlay menu matching the "Domio" references.

### Task 3: QR Generator Core

**Files:**
- Create: `components/qr/QRGenerator.tsx` (Main Container)
- Create: `components/qr/QRForm.tsx` (Inputs for Link, Text, etc.)
- Create: `components/qr/QRPreview.tsx` (Renders the QR code)

**Step 1: Setup State**
Use `useState` for `qrContent` and `qrType` (link, social, etc).

**Step 2: Integration**
Render `QRCodeSVG` from `qrcode.react` in the Preview component using the state.

### Task 4: Customization & Download

**Files:**
- Modify: `components/qr/QRGenerator.tsx` (Add customization state)
- Modify: `components/qr/QRForm.tsx` (Add Color Pickers)
- Modify: `components/qr/QRPreview.tsx` (Add "Download" button logic)

**Step 1: Customization Logic**
Add `fgColor` and `bgColor` to state. Pass to `QRCodeSVG`.

**Step 2: Download Logic**
Use `html-to-image` or basic Canvas to blob conversion to save the QR.

### Task 5: History Feature

**Files:**
- Create: `hooks/useGenericStorage.ts` (or `useQRHistory`)
- Create: `components/qr/HistoryList.tsx`
- Modify: `app/page.tsx` (Add History section)

**Step 1: Hook Implementation**
Read/Write to `localStorage` with a key like `qr-app-history`.

**Step 2: UI Integration**
Display list of saved codes. Clicking one restores its content and settings to the main generator.

---

## Verification Plan

### Automated Tests
- Since this is a UI-heavy prototype, relying on manual verification is best for now.
- *Optional:* Jest unit tests for the History Hook logic.

### Manual Verification
1.  **Design Check:** Verify colors match `#00FFD4` / `#5465FF` exactly.
2.  **QR Scan:** Use a mobile phone camera to scan the generated screen QR.
3.  **Download:** Click download and verify the file saves and is scannable.
4.  **Refresh:** Reload page and ensure History items persist.
