import { DataFunctionArgs, json } from '@remix-run/node';
import { LayerEditor, action } from './__layer-editor';
import { NavLink } from '@remix-run/react';

export const handle = {
  breadcrumb: () => {
    return <NavLink to={'/dashboard/builder/layers/new'}>New</NavLink>;
  },
};

export async function loader({ params }: DataFunctionArgs) {
  return json({});
}

export { action };
export default function NewLayerPage() {
  return <LayerEditor />;
}
