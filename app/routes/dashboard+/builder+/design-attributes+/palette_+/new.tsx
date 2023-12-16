import { DataFunctionArgs, json } from '@remix-run/node';
import { PaletteEditor, action } from './__palette-editor';
import { NavLink } from '@remix-run/react';

export const handle = {
  breadcrumb: () => {
    return (
      <NavLink to={'/dashboard/builder/design-attributes/palette/new'}>
        New
      </NavLink>
    );
  },
};

export async function loader({ params }: DataFunctionArgs) {
  return json({});
}

export { action };
export default function NewPalettePage() {
  return <PaletteEditor />;
}
