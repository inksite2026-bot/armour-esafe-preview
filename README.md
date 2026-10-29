# ARMOUR SECURITY e-Safe — Two design proposals

React + TypeScript touchscreen prototypes: **Option 1 — Corporate Minimalist** and **Option 2 — Premium Touchscreen**. Original files in `reference/` and `logo.png` are preserved. Option 1’s implementation files are unchanged.

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
- Fullscreen displays only the kiosk preview; Escape exits fullscreen.
- English and Bahasa Malaysia are supported throughout the kiosk. External presentation tools use English.
- Numeric keypad supports delete/clear; ID also accepts physical keyboard input. Additional information supports physical typing and the on-screen keyboard, shift, delete, clear, space and next field.
- Cash starts at 25 notes / RM191. Deposit More opens a labelled simulation adding one RM10 and one RM20. The separate demo panel adds individual denominations, clears the count or restores the sample.
- Empty deposits cannot be confirmed. Final confirmation is guarded against repeated submissions. Cancel and Return to Home clear session details and restore the sample.
- All displayed dates use Asia/Kuala_Lumpur. No hardware, bank or payment APIs are used. No transaction data is persisted.

## Banknote assets

Separate authentic banknote assets were not supplied. The app uses labelled, denomination-coloured placeholders (not invented banknote artwork). Add authorised PNG images at these paths; they load automatically on reload:

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


## Option 2 and presentation routes

- `/` or `/designs`: client presentation entry point.
- `/option-1`: original Corporate Minimalist preview, with an external design switcher.
- `/option-2`: Premium Touchscreen preview, with its own independent session.
- `/compare`: independent interactive previews side by side at desktop widths of 1200px or more, stacked on smaller displays.
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

Authentic note images are still absent: both proposals use clearly labelled placeholders and support the same six replacement PNG paths documented above. Only supplied or appropriately licensed banknote assets should be added.
