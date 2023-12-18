import { DataFunctionArgs, json } from '@remix-run/node';
import { NavLink } from '@remix-run/react';
import { SideLengthEditor, action } from './__side-length-editor';

export const handle = {
  breadcrumb: () => {
    return (
      <NavLink to={'/dashboard/builder/design-attributes/side-length/new'}>
        New
      </NavLink>
    );
  },
};

export async function loader({ params }: DataFunctionArgs) {
  return json({});
}

export { action };
export default function NewSideLengthPage() {
  return <SideLengthEditor />;
}
