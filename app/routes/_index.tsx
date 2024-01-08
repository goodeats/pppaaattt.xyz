import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import Column from '~/lib/layout/Column.tsx';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';
import { getUserId } from '~/modules/auth.server';
import GuestLayout from '~/lib/layout/GuestLayout';

export async function loader({ request }: DataFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect('/dashboard');
  }
  return json({});
}

export default function Index() {
  return (
    <GuestLayout>
      <Column>
        <ColumnHeading>Welcome!</ColumnHeading>
      </Column>
    </GuestLayout>
  );
}
