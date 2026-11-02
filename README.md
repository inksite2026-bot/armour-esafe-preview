# ARMOUR SECURITY e-Safe — Six design proposals

React + TypeScript touchscreen prototypes: **Option 1 — Corporate Minimalist**, **Option 2 — Premium Touchscreen**, **Option 3 — Gradient Flow**, **Option 4 — Easy Touch**, **Option 5 — Guided Steps**, and **Option 6 — Banknote Focus**. Original files in `reference/` and `logo.png` are preserved. Existing Options 1–4 are preserved while adding Options 5 and 6.

## Install and launch

Requires Node.js 20.19+ (or 22.12+).

```sh
npm install
npm run dev
```

Open http://localhost:5173 to choose a design. Start with **Touch to Start**, select a language, and enter demo User ID **1001**. Both account choices and the user are fictional.

```sh
npm run build
npm run preview
npm test
```

Build runs TypeScript checks before producing `dist/`. Browser tests use installed Google Chrome via Playwright. To use Playwright's bundled browser instead, run `npx playwright install chromium` and remove `channel: 'chrome'` in `playwright.config.ts`.

## Presentation

- Nine screen shortcuts live outside the kiosk. Shortcuts populate the minimal demo identity/account needed to preview a screen; Success reached by shortcut is marked `DEMO-PREVIEW`.
- Resolution selector provides 1024 × 768, 1280 × 800 and 1920 × 1080 presentation surfaces. The inner kiosk always preserves its native 1024 × 768 proportions without scrolling.
- Fullscreen preserves the kiosk proportions; Options 2–6 retain a separate demo control strip when needed. Escape exits fullscreen.
- English and Bahasa Malaysia are supported throughout the kiosk. External presentation tools use English.
- Numeric keypad supports delete/clear; ID also accepts physical keyboard input. Additional information supports physical typing and the on-screen keyboard, shift, delete, clear, space and next field.
- Cash starts at 25 notes / RM191. Option 1 retains its original insertion simulation. In Options 2–6, Deposit More starts collection without adding cash; external demo controls feed denominations into a brief counting simulation.
- Empty deposits cannot be confirmed. Final confirmation is guarded against repeated submissions. Cancel and Return to Home clear session details and restore the sample.
- All displayed dates use Asia/Kuala_Lumpur. No hardware, bank or payment APIs are used. No transaction data is persisted.

## Banknote assets

Separate authentic banknote assets were not supplied. Options 1 and 2 use labelled, denomination-coloured placeholders; Options 3–6 use neutral denomination placeholders (not invented banknote artwork). Add authorised PNG images at these paths; they load automatically on reload:

```
public/assets/notes/rm1.png
public/assets/notes/rm5.png
public/assets/notes/rm10.png
public/assets/notes/rm20.png
public/assets/notes/rm50.png
public/assets/notes/rm100.png
```

Images use `object-fit: contain` to preserve their proportions. Missing images safely fall back to placeholders. The supplied logo is copied unchanged to `public/assets/logo.png` and displayed proportionally.

## Structure

- `src/transaction.ts`: reusable denominations, account fixtures, calculations and formatting.
- `src/components.tsx`: named reusable kiosk design-system components.
- `src/App.tsx`: shared session state, nine-screen flow, localisation and presentation wrapper.
- `src/styles.css`: Option 1 styling and fixed kiosk layout.
- `tests/kiosk.spec.ts`: end-to-end transaction, validation, cancellation, language and layout tests.

Inter is requested from Google Fonts with an Arial/system fallback if offline. All core prototype interactions work without external services after installation.


## Presentation routes

- `/` or `/designs`: client presentation entry point.
- `/option-1`: original Corporate Minimalist preview, with an external design switcher.
- `/option-2`: Premium Touchscreen preview, with its own independent session.
- `/option-3`: Gradient Flow preview, with its own independent session.
- `/#/option-4`: Easy Touch preview, with its own independent session. Hash routes preserve the existing GitHub Pages deployment compatibility.
- `/compare`: select any pair for side-by-side comparison at widths of 1200px or more. Show all four uses a two-column grid on desktop, four columns at 2200px or more, and a single column on smaller displays.
- `?embedded` hides the external design switcher when a preview is embedded. Comparison uses separate same-origin frames to isolate CSS and session state.

The core Option 1 files (`App.tsx`, `components.tsx`, `styles.css`, `transaction.ts`) remain unchanged. Only its test entry URL changed from `/` to `/option-1`. Shared fixtures, denominations, totals, currency/date formatting and original assets are reused by Option 2. The existing component-level state was deliberately left intact to avoid altering Option 1 behavior.

### Premium deposit simulation

1. Navigate to Cash Deposit through the transaction flow or external screen selector.
2. The initial sample is RM191 / 25 banknotes.
3. Select **Deposit More**. This only starts a collection cycle; it does not add money.
4. Add denominations using the **Simulation Lab** outside the kiosk. A short simulated counting phase batches notes, updates quantities and recalculates totals.
5. Select **Finish collection**, then **Confirm Deposit**, review, and confirm the demo transaction.

Confirmation is disabled during collection/counting and for zero totals. The final action has an immediate duplicate-submission guard. Cancel/reset clears session state and pending timers. The fullscreen view retains the separate Simulation Lab when needed, and Escape exits fullscreen. No real hardware status or banking activity is represented.

### Premium implementation

- `src/premium/usePremiumSession.ts`: independent session orchestration and simulated note collection, reusing `transaction.ts`.
- `src/premium/components.tsx`: premium shell, buttons, inputs, money cards, status, modal and success components.
- `src/premium/PremiumApp.tsx`: all nine premium screens and external preview controls.
- `src/premium/premium.css`: exclusively `p2-` prefixed styling.
- `src/DesignPresentation.tsx`: route selection, proposal gallery and isolated comparison frames.
- `tests/premium.spec.ts`: complete flow, counting, duplicate clicks, zero amounts, both languages, layout checks, independent comparison and fullscreen.

Authentic note images are still absent: all four proposals use clearly labelled placeholders and support the same six replacement PNG paths documented above. Only supplied or appropriately licensed banknote assets should be added.


## Option 3 — Gradient Flow

A distinct gradient canvas with centered financial typography, white receipt panels and all six denominations in one horizontal gallery. Its nine screens, on-demand keyboard, bilingual text and external preview controls use exclusively `gf-` scoped styling.

- `src/gradient/GradientApp.tsx`: nine-screen presentation, on-demand form keyboard and resolution/fullscreen controls.
- `src/gradient/components.tsx`: gradient design system, neutral note placeholders, horizontal denomination sections, modal and touch inputs.
- `src/gradient/gradient.css`: fixed 1024 × 768 layout, exact requested diagonal gradient, responsive preview and reduced-motion support.
- `src/shared/useTransactionSession.ts`: neutral shared import of the existing visual-independent session engine. Option 3 reuses its validation, navigation, fields, counting timers, reset and duplicate-submission guard. Each mounted design has independent state; no business logic is copied.
- `public/assets/previews/option-{1,2,3}.png`: screenshots of the actual cash-deposit interfaces used as client proposal thumbnails.
- `tests/gradient.spec.ts`: complete flow, on-demand keyboard, both languages, all six denominations, empty deposits, cancel/reset, layout/gallery checks, fullscreen and three-way comparison.

### Using Gradient Flow

Start from `/option-3` with demo ID **1001**. Select any additional-information field to open the touch keyboard. **Done** closes it; tapping a field reopens it. All fields also accept physical keyboard input.

On Cash Deposit, select **Deposit More**, add denominations in the external **Demo Controls** strip, wait for counting, then select **Finish collection**. Confirm Deposit opens the review screen; Confirm Transaction opens a final demo-only modal. No real banking or hardware service is contacted.

### Verification

All 13 browser tests passed, including regressions for Options 1 and 2. TypeScript and Vite production build pass. Layout checks cover every screen in English and Bahasa Malaysia at all three preview resolutions, the open keyboard, a single-row gallery without horizontal scrolling, and fullscreen proportions. Option 3 does not redesign either earlier option. Separate shared routing and asset-path updates present in the workspace are retained; the regression suite verifies the current combined project.


## Option 4 — Easy Touch

Easy Touch addresses small-screen readability and uncertain touch input by reducing information density. It uses a solid off-white background, navy text and yellow primary actions. Cancel is always separated at the top right, Back stays at the bottom left, and Continue/review stays on the right.

### Measured native dimensions

All measurements below are at 1024 × 768 CSS pixels, before presentation scaling:

| Element | Native dimensions |
| --- | --- |
| Main actions | 96–110 px high; deposit actions 104 px high |
| Back / Cancel | At least 80 px high |
| Numeric keys | 90 px high and at least 90 px wide, with 16 px gaps |
| Letter keys | At least 72 × 64 px; 16 px horizontal and 12 px vertical gaps |
| Language choices | 136 px high |
| Account choices | 140 px high |
| Main screen headings | 40–44 px; focused editor headings 36 px |
| Main action labels | 26–30 px |
| Deposit amount | 92 px |
| Essential instructions | 26–30 px |

Secondary information is generally 20–24 px; the nonessential placeholder caption is 16 px. Keyboard vertical spacing is 12 px to fit the focused editor without reducing key size. Other primary control groups have 16–24 px gaps.

### Focused subviews

- **Add a reference:** three optional, large field rows. Selecting a field opens a dedicated editor. Done or Back returns to the field list and retains the value. Contact/reference opens the numeric keypad; Use letters and 123 switch keyboard modes. All three inputs also accept physical typing. The existing shared input engine applies the same 40/100-character limits.
- **Cash Deposit:** only the total, note count, status and clear actions are shown. View Breakdown opens three large denomination rows per page: RM1/RM5/RM10, then RM20/RM50/RM100. Previous, Next and Back to Deposit require no swiping or scrolling.
- **Deposit More:** opens the insertion instruction overlay without adding money. External demo controls add denominations; the existing counting timer updates totals. Finish collection returns to the cash screen. Zero amounts and active counting cannot be confirmed.
- **Review Deposit:** shows the destination, total, user and date/time. Confirm Deposit opens a large final demo-only modal with protection against duplicate submissions.

### Preview and hardware validation

Open `http://localhost:5173/#/option-4` and use demo ID **1001**. The selector, screenshot thumbnail and comparison page include all four designs.

**Actual size — 100%** renders the kiosk at exactly 1024 × 768 CSS pixels. If the window is smaller, only the external preview container scrolls; the kiosk itself remains fixed and does not scroll. Fit to preview scales the complete interface proportionally. Fullscreen retains the external demo strip when needed.

CSS pixels are not physical millimetres. Browser zoom, operating-system scaling and display dimensions affect the physical sizes of text and controls. These tests verify browser layout and interactions; **no usability validation on actual kiosk hardware has been performed**. Evaluate the 100% view on the real touchscreen with representative users before choosing the final design.

### Implementation and validation

- `src/easy/EasyTouchApp.tsx`: nine screens, focused editors, paginated breakdown and independent preview.
- `src/easy/components.tsx`: large buttons, numeric/letter keyboards, note assets and accessible confirmation modal.
- `src/easy/easy-touch.css`: exclusively `et-` scoped styling.
- `src/shared/useTransactionSession.ts`: reused transaction, validation, navigation, fields, simulation and reset logic. No changes to the earlier designs' engines or component files.
- `public/assets/previews/option-4.png`: screenshot of the actual cash screen.
- `tests/easy-touch.spec.ts`: complete flow, Malay interactions, editor modes, both breakdown pages, all six denominations, numeric calculations, empty totals, cancellation, duplicate taps, actual-size dimensions, fullscreen and comparison isolation.

All **18 browser tests** pass, including regressions for Options 1–3. TypeScript and production build checks pass. Layout checks include all nine screens and subviews in English and Bahasa Malaysia at all three preview sizes. Checksums confirm that the existing Option 1, 2 and 3 implementation files remain unchanged for this addition. Actual banknote images are still absent; Easy Touch uses labelled neutral placeholders at the same six image paths.


## Option 5 — Guided Steps

Open `http://localhost:5173/#/option-5`. A persistent four-stage rail explains progress: identify, choose account, deposit cash, finish. Each screen presents one clear next action. Focused keyboards and banknote details use the full content width for comfortable touch targets. Optional references are retained while editing; skipping entered information requires an explicit discard confirmation.

The nine-screen flow reuses the shared transaction engine, including demo ID **1001**, counting, validation, cancellation and duplicate-submission protection. Collection instructions distinguish waiting, counting and ready states. Styling and components live in `src/guided/`.

## Option 6 — Banknote Focus

Open `http://localhost:5173/#/option-6`. The cash screen puts all six denominations in two columns and three rows. Each large touch card shows a **180 × 80 px** image container, quantity and subtotal. Tap any denomination to open a **620 × 278 px** image container with its count and value; Back to Cash returns to the full gallery. Images preserve their original proportions with `object-fit: contain`.

This option reuses Easy Touch's accessible controls for the remaining transaction screens and the shared session engine. Its separate cash layout and scoped overrides live in `src/banknote/`; the original Easy Touch files are unchanged. Deposit More opens collection without adding cash. Use the external demo controls to insert notes, then finish collection and review the deposit.

Authentic banknote images remain absent. Clearly labelled neutral placeholders appear until authorised assets are added to `public/assets/notes/rm1.png`, `rm5.png`, `rm10.png`, `rm20.png`, `rm50.png` and `rm100.png`.

### Six-option presentation and verification

The selector includes actual screenshots of all six cash screens. Compare any pair with independent sessions, or choose Show all six. Options 5 and 6 support fullscreen, all three preview resolutions and Actual size — 100%. Pixel dimensions describe browser layout, not guaranteed physical touch sizes; browser zoom and display dimensions affect usability. No physical kiosk testing has been performed.

All **25 Playwright browser tests** pass, covering the six designs, English and Bahasa Malaysia, all nine screens, input editors, note details, totals, empty/counting states, cancel/reset, repeated confirmation, fullscreen and comparison. TypeScript and production build checks pass. Checksums confirm Options 1–4 and the transaction calculations are unchanged by these additions.

## Official banknote images — demo update

All six options now load the official BNM front-side RM1, RM5, RM10, RM20, RM50 and RM100 PNG images from the shared `public/assets/notes/` directory. Earlier references to missing assets describe the previous prototype state. Original image proportions are preserved with contain sizing; Option 6 retains its 180 × 80 card containers and 620 × 278 enlarged view. Neutral placeholders remain only as load-error fallbacks.

These assets are included for this demo at the user's explicit direction. Attribution, original URLs and scope are documented in `public/assets/notes/SOURCES.md`.
