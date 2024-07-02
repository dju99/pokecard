interface Matrix {
  x: number;
  y: number;
}

export default function MouseCoordinate({ x, y }: Matrix) {
  var px = Math.abs(Math.floor((100 / 300) * x) - 100);
  var py = Math.abs(Math.floor((100 / 413) * y) - 100);
  var lp = 50 + (px - 50) / 1.5;
  var tp = 50 + (py - 50) / 1.5;

  const card_x = (10 / 103) * y - 20;
  const card_y = (-2 / 15) * x + 20;

  return { lp, tp, card_x, card_y };
}
