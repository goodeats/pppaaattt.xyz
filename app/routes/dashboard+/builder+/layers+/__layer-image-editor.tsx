import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '~/components';
import { Form, NavLink, useFetcher } from '@remix-run/react';
import { conform, useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { z } from 'zod';
import {
  DataFunctionArgs,
  SerializeFrom,
  json,
  redirect,
} from '@remix-run/node';
import { ILayer, ILayerImage, prisma } from '~/utils/db.server';
import { isValidImageUrl } from '~/utils/image-utils';
import { BuildAttributes } from '~/lib/utils/build-structure/build-attributes';

const altTextMinLength = 1;
const altTextMaxLength = 10000;

enum LayoutTypeEnum {
  centered = 'centered',
  stretched = 'stretched',
  stretchHeight = 'stretch-height',
  stretchWidth = 'stretch-width',
}
const LayoutTypeEnumNative = z.nativeEnum(LayoutTypeEnum);
type LayoutTypeEnumType = z.infer<typeof LayoutTypeEnumNative>;

interface LayerImageEditorSchemaTypes {
  layerId: string;
  id?: string;
  url: string;
  altText?: string;
  layout: LayoutTypeEnumType;
  display: boolean;
}

const LayerImageEditorSchema: z.Schema<LayerImageEditorSchemaTypes> = z.object({
  layerId: z.string(),
  id: z.string().optional(),
  url: z.string().refine((url) => isValidImageUrl(url), {
    message: 'Invalid image URL',
  }),
  altText: z.string().min(altTextMinLength).max(altTextMaxLength).optional(),
  layout: LayoutTypeEnumNative,
  display: z.coerce.boolean(),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: LayerImageEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id) return;

      const layerImage = await prisma.layerImage.findUnique({
        where: {
          id: data.id,
        },
      });
      if (!layerImage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Layer not found',
        });
      }

      const layer = await prisma.layer.findUnique({
        where: {
          id: data.layerId,
        },
      });
      if (!layer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Layer not found',
        });
      }
    }),
    async: true,
  });

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const);
  }

  if (!submission.value) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const {
    id: layerImageId,
    url,
    altText,
    layout,
    display,
    layerId,
  } = submission.value;
  const layerImage = await prisma.layerImage.upsert({
    where: { id: layerImageId ?? '__new_layer_image__', layerId },
    create: {
      url,
      altText,
      layout,
      display,
      layerId,
    },
    update: {
      url,
      altText,
      layout,
      display,
      layerId,
    },
  });

  if (!layerImage) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const layer = await prisma.layer.findUnique({
    where: {
      id: layerId,
    },
  });
  if (!layer) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const currentBuildAttributes = (layer.buildAttributes ||
    {}) as BuildAttributes;

  const newLayerImage = {
    image: {
      url,
      layout,
      display,
    },
  };
  const updatedBuildAttributes = {
    ...currentBuildAttributes,
    ...newLayerImage,
  };

  const updatedLayer = await prisma.layer.update({
    where: {
      id: layerId,
    },
    data: {
      buildAttributes: updatedBuildAttributes,
    },
  });

  if (!updatedLayer) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`/dashboard/builder/layers/${layerId}`);
}

type LayerImageEditorProps = {
  layer: SerializeFrom<Pick<ILayer, 'id' | 'title'>>;
  image: SerializeFrom<
    Pick<ILayerImage, 'id' | 'url' | 'altText' | 'layout' | 'display'>
  > | null;
};

export function LayerImageEditor({ layer, image }: LayerImageEditorProps) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const layerFetcher = useFetcher<typeof action>();
  // const isPending = layerFetcher.state !== 'idle';

  const [form, fields] = useForm<LayerImageEditorSchemaTypes>({
    id: 'layer-image-editor',
    constraint: getFieldsetConstraint(LayerImageEditorSchema),
    // lastSubmission: layerFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: LayerImageEditorSchema });
    },
    defaultValue: {
      id: layer?.id ?? '',
      url: image?.url ?? '',
      altText: image?.altText ?? '',
      layout: image?.layout ?? 'centered',
      display: image?.display ?? true,
    },
  });

  const FormUrl = () => {
    return (
      <FormControl isInvalid={!!fields.url.error}>
        <FormLabel>Url</FormLabel>
        <Input {...conform.input(fields.url)} />
        <FormErrorMessage>{fields.url.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormAltText = () => {
    return (
      <FormControl isInvalid={!!fields.altText.error}>
        <FormLabel>Alt Text</FormLabel>
        <Textarea
          name={fields.altText.name}
          defaultValue={fields.altText.defaultValue}
        />
        <FormErrorMessage>{fields.altText.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormLayout = () => {
    const options: { value: string; label: string }[] = [
      { value: 'centered', label: 'Centered' },
      { value: 'stretched', label: 'Stretched' },
      { value: 'stretch-height', label: 'Stretch Height' },
      { value: 'stretch-width', label: 'Stretch Width' },
    ];

    return (
      <Stack textAlign="left">
        <FormControl isInvalid={!!fields.layout.error}>
          <FormLabel>Input Parameter Type</FormLabel>
          <RadioGroup
            name={fields.layout.name}
            defaultValue={fields.layout.defaultValue}
          >
            {options.map((option) => (
              <Radio key={option.value} value={option.value} marginRight={3}>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
          <FormErrorMessage>{fields.layout.error}</FormErrorMessage>
        </FormControl>
      </Stack>
    );
  };

  const FormDisplay = () => {
    return (
      <Stack textAlign="left">
        <FormControl isInvalid={!!fields.display.error}>
          <FormLabel>Display Image</FormLabel>
          <Checkbox
            name={fields.display.name}
            defaultChecked={!!fields.display.defaultValue}
            value="true"
          />
          <FormErrorMessage>{fields.display.error}</FormErrorMessage>
        </FormControl>
      </Stack>
    );
  };

  const FormActions = () => {
    return (
      <Stack>
        <ButtonGroup>
          <Button type="submit">
            {/* <Button type="submit" disabled={isPending}> */}
            Submit
          </Button>
          {layer ? (
            <Button form={form.id} variant="outline" type="reset">
              Reset
            </Button>
          ) : null}
          {layer ? (
            <NavLink to={`/dashboard/builder/layers/${layer.id}`}>
              <Button variant="ghost">Cancel</Button>
            </NavLink>
          ) : null}
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <Stack width="full" paddingX={8} paddingY={5}>
      <Form method="post" {...form.props}>
        {/* if editing, include id in hidden field */}
        {image ? <input type="hidden" name="id" value={image.id} /> : null}
        <input type="hidden" name="layerId" value={layer.id} />

        <Stack spacing={5}>
          <FormUrl />
          <FormAltText />
          <FormLayout />
          <FormDisplay />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
