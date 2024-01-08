import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import {
  json,
  redirect,
  type DataFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';
import { useIsPending } from '~/utils/misc';
import {
  EmailSchema,
  NameSchema,
  PasswordAndConfirmPasswordSchema,
  UsernameSchema,
} from '~/utils/user-validation';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '~/components';
import { AuthCard } from '~/components/models/auth/auth-card';
import AuthLayout from '~/lib/layout/AuthLayout';
import { validateCSRF } from '~/modules/csrf.server';
import { prisma } from '~/utils/db.server';
import { requireAnonymous, sessionKey, signup } from '~/modules/auth.server';
import { authSessionStorage } from '~/modules/session.server';
import { safeRedirect } from 'remix-utils/safe-redirect';
import { verifySessionStorage } from '~/modules/verification.server';

const signupSessionKey = 'signup';
const SignupFormSchema = z
  .object({
    email: EmailSchema,
    username: UsernameSchema,
    name: NameSchema,
    remember: z.boolean().optional(),
    redirectTo: z.string().optional(),
  })
  .and(PasswordAndConfirmPasswordSchema);

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  await validateCSRF(formData, request.headers);

  const submission = await parse(formData, {
    schema: (intent) =>
      SignupFormSchema.superRefine(async (data, ctx) => {
        const existingUserEmail = await prisma.user.findUnique({
          where: { email: data.email },
          select: { id: true },
        });
        if (existingUserEmail) {
          ctx.addIssue({
            path: ['email'],
            code: z.ZodIssueCode.custom,
            message: 'A user already exists with this email',
          });
          return;
        }

        const existingUsername = await prisma.user.findUnique({
          where: { username: data.username },
          select: { id: true },
        });
        if (existingUsername) {
          ctx.addIssue({
            path: ['username'],
            code: z.ZodIssueCode.custom,
            message: 'A user already exists with this username',
          });
          return;
        }
      }).transform(async (data) => {
        if (intent !== 'submit') return { ...data, session: null };

        const session = await signup({ ...data });
        return { ...data, session };
      }),
    async: true,
  });

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const);
  }
  if (!submission.value?.session) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const { session, remember, redirectTo } = submission.value;

  const authSession = await authSessionStorage.getSession(
    request.headers.get('cookie')
  );
  authSession.set(sessionKey, session.id);
  const verifySession = await verifySessionStorage.getSession();
  const headers = new Headers();
  headers.append(
    'set-cookie',
    await authSessionStorage.commitSession(authSession, {
      expires: remember ? session.expirationDate : undefined,
    })
  );
  headers.append(
    'set-cookie',
    await verifySessionStorage.destroySession(verifySession)
  );

  return redirect(safeRedirect(redirectTo ?? '/'), { headers });
}

export const meta: MetaFunction = () => {
  return [{ title: 'Sign Up | XYZ' }];
};

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get('cookie')
  );
  const email = verifySession.get(signupSessionKey);
  return json({ email });
}

export default function SignupRoute() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: 'signup-form',
    constraint: getFieldsetConstraint(SignupFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      const result = parse(formData, { schema: SignupFormSchema });
      return result;
    },
    shouldRevalidate: 'onBlur',
  });

  const FormEmail = () => {
    return (
      <FormControl isInvalid={!!fields.email.error}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name={fields.email.name}
          defaultValue={fields.email.defaultValue}
        />
        <FormErrorMessage>{fields.email.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormUsername = () => {
    return (
      <FormControl isInvalid={!!fields.username.error}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name={fields.username.name}
          defaultValue={fields.username.defaultValue}
        />
        <FormErrorMessage>{fields.username.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormName = () => {
    return (
      <FormControl isInvalid={!!fields.name.error}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name={fields.name.name}
          defaultValue={fields.name.defaultValue}
        />
        <FormErrorMessage>{fields.name.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormPassword = () => {
    return (
      <FormControl isInvalid={!!fields.password.error}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name={fields.password.name}
          defaultValue={fields.password.defaultValue}
        />
        <FormErrorMessage>{fields.password.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormConfirmPassword = () => {
    return (
      <FormControl isInvalid={!!fields.confirmPassword.error}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          name={fields.confirmPassword.name}
          defaultValue={fields.confirmPassword.defaultValue}
        />
        <FormErrorMessage>{fields.confirmPassword.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormActions = () => {
    return (
      <Stack>
        <ButtonGroup>
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <AuthLayout>
      <AuthCard title="Sign Up">
        <Stack width="full" paddingX={8} paddingY={5}>
          <Form method="POST" {...form.props}>
            <AuthenticityTokenInput />
            <Stack spacing={5}>
              <FormEmail />
              <FormUsername />
              <FormName />
              <FormPassword />
              <FormConfirmPassword />
              <FormActions />
            </Stack>
          </Form>
        </Stack>
      </AuthCard>
    </AuthLayout>
  );
}
