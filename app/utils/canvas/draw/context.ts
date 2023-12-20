type ContextProps = {
  ctx: CanvasRenderingContext2D;
};

export const ContextBegin = ({ ctx }: ContextProps) => {
  ctx.beginPath();
  ctx.save();
};

export const ContextEnd = ({ ctx }: ContextProps) => {
  ctx.restore();
  ctx.closePath();
};
