import { DataFunctionArgs, json } from '@remix-run/node';
import { LayerEditor, action } from './__layer-editor';

export async function loader({ params }: DataFunctionArgs) {
  return json({});
}

export { action };
export default function NewLayerPage() {
  return <LayerEditor />;
}
