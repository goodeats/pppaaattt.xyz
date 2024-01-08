import { DataFunctionArgs, json } from '@remix-run/node';
import { NavLink } from '@remix-run/react';
import { SizeEditor, action } from './__size-editor';

export const handle = {
  breadcrumb: () => {
    return (
      <NavLink to={'/dashboard/builder/design-attributes/size/new'}>
        New
      </NavLink>
    );
  },
};

export async function loader({ params }: DataFunctionArgs) {
  return json({});
}

export { action };
export default function NewSizePage() {
  return <SizeEditor />;
}
