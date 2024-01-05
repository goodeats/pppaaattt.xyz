type CanvasDrawProps = {
  ctx: CanvasRenderingContext2D;
  triangle: {
    position: { x: number; y: number };
    size: number;
    rotate: number;
  };
};

// https://byjus.com/question-answer/if-an-equilateral-triangle-is-drawn-inside-a-circle-such-that-the-circle-is-the/
const getRadius = (size: number) => {
  return size / Math.sqrt(3);
};

const setContextPosition = ({
  ctx,
  position,
}: {
  ctx: CanvasRenderingContext2D;
  position: { x: number; y: number };
}) => {
  const { x, y } = position;
  ctx.translate(x, y);
};

// this starts the path at 0, 0
// commenting out because we want the line to start at the top, not center
// keeping for debugger reference if I ever want to see where the middle point is landing
const startFromPosition = ({
  ctx,
  size,
}: {
  ctx: CanvasRenderingContext2D;
  size: number;
}) => {
  // uncomment to display lines from center
  // ctx.moveTo(0, 0);
};

// rotate moved ctx at new 0, 0 position
const setContextRotate = ({
  ctx,
  rotate,
}: {
  ctx: CanvasRenderingContext2D;
  rotate: number;
}) => {
  ctx.rotate(Math.PI * rotate);
};

const drawLines = ({
  ctx,
  radius,
  inset,
  points,
}: {
  ctx: CanvasRenderingContext2D;
  radius: number;
  inset: number;
  points: number;
}) => {
  // top middle
  ctx.lineTo(0, 0 - radius);
  ctx.rotate(Math.PI / points);
  ctx.lineTo(0, 0 - radius * inset);
  ctx.rotate(Math.PI / points);

  // bottom right
  ctx.lineTo(0, 0 - radius);
  ctx.rotate(Math.PI / points);
  ctx.lineTo(0, 0 - radius * inset);
  ctx.rotate(Math.PI / points);

  // bottom left
  ctx.lineTo(0, 0 - radius);
  ctx.rotate(Math.PI / points);
  ctx.lineTo(0, 0 - radius * inset);
  ctx.rotate(Math.PI / points);

  // closes the path back to the top middle
  ctx.closePath();
};

export function CanvasDrawTriangleAtCoords({ ctx, triangle }: CanvasDrawProps) {
  const { position, size, rotate } = triangle;

  // 0.5 inset creates a flat line
  // greater will bow out
  // less will bow in
  // current settings are for a perfect triangle
  const inset = 0.5;
  const points = 3;

  const radius = getRadius(size);
  setContextPosition({ ctx, position });
  startFromPosition({ ctx, size });
  setContextRotate({ ctx, rotate });
  drawLines({ ctx, radius, inset, points });
}
