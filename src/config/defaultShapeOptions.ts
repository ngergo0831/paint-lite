export const lineOptions = Object.freeze({
  fill: 'white',
  stroke: 'white',
  strokeWidth: 5,
  perPixelTargetFind: true,
  hasControls: false,
  lockMovementX: true,
  lockMovementY: true,
  borderColor: 'transparent',
  hoverCursor: 'default'
}) as fabric.ILineOptions;

export const rectOptions = Object.freeze({
  width: 0,
  height: 0,
  hasControls: false,
  lockMovementX: true,
  lockMovementY: true,
  perPixelTargetFind: true,
  strokeWidth: 5,
  stroke: 'white',
  fill: 'transparent',
  hoverCursor: 'default'
}) as fabric.IRectOptions;
