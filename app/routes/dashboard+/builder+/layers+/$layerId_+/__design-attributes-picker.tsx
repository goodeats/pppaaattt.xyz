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
import { BuildAttributes } from '~/lib/utils/build-structure/build-attributes';

enum AttributeType {
  container = 'container',
  palette = 'palette',
  background = 'background',
  position = 'position',
  size = 'size',
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

  // get attributeType of design attribute
  const { attributeType, inputParameters } = designAttribute;

  // remove any existing design attributes by attributeType for layerId
  const existingDesignAttribute =
    await prisma.designAttributesOnLayers.findFirst({
      where: {
        layerId: layerId,
        designAttribute: {
          attributeType: attributeType,
        },
      },
    });

  if (existingDesignAttribute) {
    await prisma.designAttributesOnLayers.delete({
      where: {
        layerId_designAttributeId: {
          layerId: layerId,
          designAttributeId: existingDesignAttribute.designAttributeId,
        },
      },
    });
  }

  // create new design attribute on layer
  const newDesignAttribute = await prisma.designAttributesOnLayers.create({
    data: {
      layerId: layerId,
      designAttributeId: designAttributeId,
    },
  });

  if (!newDesignAttribute) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  // update layer build attributes
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

  // I hate this code, but it works for now and I need to move on
  // need to find an easier way to get values from inputType and unitType
  // from inputParameters without having typescript complain
  if (attributeType === AttributeType.container) {
    const parameters = inputParameters[0];
    const { unitType, explicitValues } = parameters;
    if (!explicitValues) {
      return json({ status: 'error', submission } as const, { status: 400 });
    }

    const explicitUnits = explicitValues[unitType];
    if (!explicitUnits) {
      return json({ status: 'error', submission } as const, { status: 400 });
    }
    const newDimensions = {
      dimensions: {
        width: explicitUnits.width,
        height: explicitUnits.height,
        format: 'px',
      },
    };
    const updatedBuildAttributes = {
      ...currentBuildAttributes,
      ...newDimensions,
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
  } else if (attributeType === AttributeType.palette) {
    const parameters = inputParameters[0];
    const { unitType, explicitValues } = parameters;
    if (!explicitValues) {
      return json({ status: 'error', submission } as const, { status: 400 });
    }

    const explicitUnits = explicitValues[unitType];
    if (!explicitUnits) {
      return json({ status: 'error', submission } as const, { status: 400 });
    }
    const newPalette = {
      palette: {
        colors: explicitUnits,
        format: 'hex',
      },
    };
    const updatedBuildAttributes = {
      ...currentBuildAttributes,
      ...newPalette,
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
  } else if (attributeType === AttributeType.background) {
    console.log('oh no not ready');
  } else if (attributeType === AttributeType.size) {
    const parameters = inputParameters[0];
    const { unitType, explicitValues } = parameters;
    if (!explicitValues) {
      return json({ status: 'error', submission } as const, { status: 400 });
    }

    const explicitUnits = explicitValues[unitType];
    if (!explicitUnits) {
      return json({ status: 'error', submission } as const, { status: 400 });
    }
    const newSize = {
      size: {
        size: explicitUnits,
        format: 'percent',
      },
    };
    const updatedBuildAttributes = {
      ...currentBuildAttributes,
      ...newSize,
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
