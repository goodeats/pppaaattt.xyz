import { Submission } from '@conform-to/react';
import { z } from 'zod';

export const codeQueryParam = 'code';
export const targetQueryParam = 'target';
export const typeQueryParam = 'type';
export const redirectToQueryParam = 'redirectTo';
const types = ['onboarding', 'reset-password', 'change-email', '2fa'] as const;
const VerificationTypeSchema = z.enum(types);
export type VerificationTypes = z.infer<typeof VerificationTypeSchema>;

const VerifySchema = z.object({
  [codeQueryParam]: z.string().min(6).max(6),
  [typeQueryParam]: VerificationTypeSchema,
  [targetQueryParam]: z.string(),
  [redirectToQueryParam]: z.string().optional(),
});

export type VerifyFunctionArgs = {
  request: Request;
  submission: Submission<z.infer<typeof VerifySchema>>;
  body: FormData | URLSearchParams;
};
