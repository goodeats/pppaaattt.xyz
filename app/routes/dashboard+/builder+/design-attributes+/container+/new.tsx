import { DataFunctionArgs, json } from '@remix-run/node';
import { ContainerEditor, action } from './__container-editor';

export async function loader({ params }: DataFunctionArgs) {
  return json({});
}

export { action };
export default function NewContainerPage() {
  return <ContainerEditor />;
}
