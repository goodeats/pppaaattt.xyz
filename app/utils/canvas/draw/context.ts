type ContextProps = {
  context: CanvasRenderingContext2D;
};

export const ContextBegin = ({ context }: ContextProps) => {
  context.beginPath();
  context.save();
};

export const ContextEnd = ({ context }: ContextProps) => {
  context.restore();
  context.closePath();
};
