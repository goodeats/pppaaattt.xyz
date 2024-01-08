import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import Column from '~/lib/layout/Column.tsx';
import { getUserId } from '~/modules/auth.server';
import GuestLayout from '~/lib/layout/GuestLayout';
import { ImagesGrid } from '~/components/models/landing/images-grid';

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
        <ImagesGrid />
      </Column>
    </GuestLayout>
  );
}
