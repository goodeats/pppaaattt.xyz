import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
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
import { IDesignAttribute, ILayer, prisma } from '~/utils/db.server';

enum AttributeType {
  container = 'container',
  palette = 'palette',
  position = 'position',
  sideLength = 'sideLength',
  strokeStyle = 'strokeStyle',
  fillStyle = 'fillStyle',
  lineWidth = 'lineWidth',
  rotation = 'rotation',
  filter = 'filter',
}

interface DesignAttributePickerSchemaTypes {
  layerId: string;
  designAttributeId: string;
}

const DesignAttributePickerSchema: z.Schema<DesignAttributePickerSchemaTypes> =
  z.object({
    layerId: z.string(),
    designAttributeId: z.string(),
  });

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: DesignAttributePickerSchema.superRefine(async (data, ctx) => {
      if (!data.layerId || !data.designAttributeId) return;

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

      const designAttribute = await prisma.designAttribute.findUnique({
        where: {
          id: data.designAttributeId,
          layerId: null,
        },
      });

      if (!designAttribute) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Design Attribute not found',
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

  const { layerId, designAttributeId } = submission.value;

  // find original design attribute
  const designAttribute = await prisma.designAttribute.findUnique({
    where: {
      id: designAttributeId,
      layerId: null,
    },
    include: {
      inputParameters: {
        select: {
          inputType: true,
          unitType: true,
          explicitValues: true,
          randomValues: true,
          rangeValues: true,
        },
      },
    },
  });

  if (!designAttribute) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  // create new design attribute copy with layerId
  const { title, description, attributeType, inputParameters } =
    designAttribute;
  const newDesignAttribute = await prisma.designAttribute.create({
    data: {
      title,
      description,
      attributeType,
      layerId,
      inputParameters: {
        create: inputParameters.map((param) => ({
          ...param,
          explicitValues: param.explicitValues || {}, // ensure explicitValues is not undefined
          randomValues: param.randomValues || {}, // ensure explicitValues is not undefined
          rangeValues: param.rangeValues || {}, // ensure explicitValues is not undefined
        })),
      },
    },
  });

  if (!newDesignAttribute) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(
    `/dashboard/builder/layers/${newDesignAttribute.layerId}/design-attributes`
  );
}

type DesignAttribute = Pick<IDesignAttribute, 'id' | 'title' | 'attributeType'>;

type DesignAttributesPickerProps = {
  layer: SerializeFrom<Pick<ILayer, 'id' | 'title'>>;
  designAttributesGrouped: Record<string, DesignAttribute[]>;
};

export function DesignAttributesPicker({
  layer,
  designAttributesGrouped,
}: DesignAttributesPickerProps) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const layerFetcher = useFetcher<typeof action>();
  // const isPending = layerFetcher.state !== 'idle';

  const [form, fields] = useForm<DesignAttributePickerSchemaTypes>({
    id: 'layer-design-attribute-picker',
    constraint: getFieldsetConstraint(DesignAttributePickerSchema),
    // lastSubmission: layerFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: DesignAttributePickerSchema });
    },
    defaultValue: {
      layerId: layer.id ?? '',
      designAttributeId: '',
    },
  });

  const AttributeRadio = ({
    designAttribute,
  }: {
    designAttribute: DesignAttribute;
  }) => {
    const { id, title } = designAttribute;

    return (
      <Radio key={id} value={id} {...conform.input(fields.designAttributeId)}>
        {title}
      </Radio>
    );
  };

  const AttributeRadioGroup = ({
    attributeType,
    designAttributes,
  }: {
    attributeType: string;
    designAttributes: DesignAttribute[];
  }) => {
    const NoDesignAttributes = () => (
      <Text fontSize="sm" pt={2}>
        No design attributes available.
      </Text>
    );

    const WithDesignAttributes = () => (
      <RadioGroup>
        <Stack direction="row">
          {designAttributes.map((designAttribute, i) => (
            <AttributeRadio key={i} designAttribute={designAttribute} />
          ))}
        </Stack>
      </RadioGroup>
    );

    return (
      <Box key={attributeType} textAlign="left" mb={4}>
        <Heading size="xs" textTransform="uppercase" mb={2}>
          {attributeType}
        </Heading>
        {!designAttributes || designAttributes.length > 0 ? (
          <WithDesignAttributes />
        ) : (
          <NoDesignAttributes />
        )}
      </Box>
    );
  };

  const FormDesignAttribute = () => {
    return (
      <FormControl isInvalid={!!fields.designAttributeId.error}>
        {Object.values(AttributeType).map((attributeType, i) => {
          const designAttributes = designAttributesGrouped[attributeType];
          return (
            <AttributeRadioGroup
              key={i}
              attributeType={attributeType}
              designAttributes={designAttributes ?? []}
            />
          );
        })}
        <FormErrorMessage>{fields.designAttributeId.error}</FormErrorMessage>
      </FormControl>
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
            <NavLink
              to={`/dashboard/builder/layers/${layer.id}/design-attributes`}
            >
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
        <input type="hidden" name="layerId" value={layer.id} />

        <Stack spacing={5}>
          <FormDesignAttribute />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}