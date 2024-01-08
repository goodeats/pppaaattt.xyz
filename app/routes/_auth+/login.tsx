import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '~/components';
import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import {
  json,
  type DataFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import { z } from 'zod';
import { AuthCard } from '~/components/models/auth/auth-card';
import AuthLayout from '~/lib/layout/AuthLayout';
import {
  handleNewSession,
  login,
  requireAnonymous,
} from '~/modules/auth.server';
import { validateCSRF } from '~/modules/csrf.server';
import { useIsPending } from '~/utils/misc';
import { PasswordSchema, UsernameSchema } from '~/utils/user-validation';

const LoginFormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
  redirectTo: z.string().optional(),
  remember: z.boolean().optional(),
});

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  return json({});
}

export async function action({ request }: DataFunctionArgs) {
  console.log('action');
  await requireAnonymous(request);
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  const submission = await parse(formData, {
    schema: (intent) =>
      LoginFormSchema.transform(async (data, ctx) => {
        if (intent !== 'submit') return { ...data, session: null };

        const session = await login(data);
        if (!session) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid username or password',
          });
          return z.NEVER;
        }

        return { ...data, session };
      }),
    async: true,
  });
  // get the password off the payload that's sent back
  delete submission.payload.password;

  if (submission.intent !== 'submit') {
    // @ts-expect-error - conform should probably have support for doing this
    delete submission.value?.password;
    return json({ status: 'idle', submission } as const);
  }
  if (!submission.value?.session) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const { session, remember, redirectTo } = submission.value;
  console.log('submission');

  return handleNewSession({
    request,
    session,
    remember: remember ?? false,
    redirectTo,
  });
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const [form, fields] = useForm({
    id: 'login-form',
    constraint: getFieldsetConstraint(LoginFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: 'onBlur',
  });

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
              <FormUsername />
              <FormPassword />
              <FormActions />
            </Stack>
          </Form>
        </Stack>
      </AuthCard>
    </AuthLayout>
  );
}

export const meta: MetaFunction = () => {
  return [{ title: 'Login to XYZ' }];
};
