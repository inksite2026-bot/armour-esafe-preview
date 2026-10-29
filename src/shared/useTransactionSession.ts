// The existing session engine is visual-framework independent. Re-export it here
// so new designs share navigation, validation, input and deposit simulation without
// changing the already-reviewed Premium implementation.
export { usePremiumSession as useTransactionSession } from '../premium/usePremiumSession';
export type { PremiumSession as TransactionSession } from '../premium/usePremiumSession';
