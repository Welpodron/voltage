// SVG STRATEGY START
(() => {
  /*
      y дополнительно умножается на -1 в связи с тем что ось y направлена в другую сторону в систем координат окна браузера
      https://www.figma.com/file/abrhl6sanMhdXyJ5Zt8ehm/Tilda-Grid-Figma-(Copy)?node-id=55321%3A0
    */

  const svg = <HTMLElement>document.querySelector("#svg");

  const squareSize = 200;
  const radius = squareSize / 2;
  const circleCenter = squareSize / 2;

  const data = [
    { key: "lazy", value: 48 },
    { key: "not", value: 93 },
  ];

  const dataSorted = [...data].sort((a, b) => (a.value > b.value ? -1 : 1));
  const dataValueTotal = dataSorted.reduce(
    (accumulator: number, currentValue: { key: string; value: number }) =>
      accumulator + currentValue.value,
    0
  );

  dataSorted.reduce(
    (accumulator: number, currentValue: { key: string; value: number }) => {
      const currentPercent = (currentValue.value * 100) / dataValueTotal;

      const accumulated = accumulator + currentPercent;

      const startingPercent = accumulator;
      const endingPercent = accumulated;

      console.log(endingPercent);

      const xStart = (
        circleCenter +
        Math.sin(2 * Math.PI * (startingPercent / 100)) * radius
      ).toFixed(1);

      const yStart = (
        circleCenter +
        Math.cos(2 * Math.PI * (startingPercent / 100)) * -1 * radius
      ).toFixed(1);

      const xEnd = (
        circleCenter +
        Math.sin(2 * Math.PI * (endingPercent / 100)) * radius
      ).toFixed(1);

      const yEnd = (
        circleCenter +
        Math.cos(2 * Math.PI * (endingPercent / 100)) * -1 * radius
      ).toFixed(1);

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      path.setAttribute(
        "fill",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
      path.setAttribute(
        "d",
        `M 100 100 L ${xStart} ${yStart} A 100 100 0 ${
          currentPercent > 50 ? 1 : 0
        } 1 ${parseFloat(xEnd) - 0.1} ${yEnd} L 100 100 Z`
      );
      svg.appendChild(path);

      return accumulated;
    },
    0
  );
})();
// SVG STRATEGY END
// CANVAS STRATEGY START
const getTextSize = (ctx: CanvasRenderingContext2D, text: string) => {
  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
    ctx.measureText(text);
  const height = actualBoundingBoxAscent + actualBoundingBoxDescent;
  return { width, height };
};

(() => {
  const canvas = <HTMLCanvasElement>document.querySelector("#canvas");

  // resolution
  const canvasWidth = 800;
  const canvasHeight = 800;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Rendering
  canvas.style.width = canvasWidth / 2 + "px";
  canvas.style.height = canvasHeight / 2 + "px";

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  // const textHeight = 6;

  // ctx.font = `${textHeight}px`;
  ctx.font = "bold 13px serif";

  const dotSize = 4;

  type TDot = {
    x: number;
    y: number;
    text?: string;
  };

  const debugDots: TDot[] = [
    { x: 0, y: 0 },
    { x: canvasWidth, y: 0 },
    {
      x: canvasWidth,
      y: canvasHeight,
    },
    { x: 0, y: canvasHeight },
    { x: canvasWidth / 2, y: canvasHeight / 2 },
    { x: canvasWidth / 2, y: 0 },
    { x: 0, y: canvasHeight / 2 },
    { x: canvasWidth / 2, y: canvasHeight },
    { x: canvasWidth, y: canvasHeight / 2 },
  ];

  debugDots.forEach((dot) => {
    let dotX = dot.x;
    let dotY = dot.y;

    if (dotX + dotSize >= canvasWidth) {
      dotX = dotX - dotSize;
    }

    if (dotY + dotSize >= canvasWidth) {
      dotY = dotY - dotSize;
    }

    const dotText = dot?.text || `(${dot.x.toFixed(1)},${dot.y.toFixed(1)})`;

    const { width: textBlockWidth, height: textBlockHeight } = getTextSize(
      ctx,
      dotText
    );

    let textX = dot.x;
    let textY = dot.y;

    if (textX + textBlockWidth >= canvasWidth) {
      textX = textX - textBlockWidth;
    }

    if (textY + textBlockHeight > canvasHeight) {
      textY = textY - textBlockHeight / 2;
    }

    if (textY + textBlockHeight < canvasHeight) {
      textY = textY + textBlockHeight;
    }

    ctx.fillText(dotText, textX, textY);

    ctx.fillRect(dotX, dotY, dotSize, dotSize);
  });

  ctx.rotate((Math.PI / 180) * -90);

  const data = [
    { key: "lazy", value: 50 },
    { key: "lazy", value: 100 },
  ];

  const dataSorted = [...data].sort((a, b) => (a.value > b.value ? -1 : 1));
  const dataValueTotal = dataSorted.reduce(
    (accumulator: number, currentValue: { key: string; value: number }) =>
      accumulator + currentValue.value,
    0
  );

  dataSorted.reduce(
    (accumulator: number, currentValue: { key: string; value: number }) => {
      const currentPercent = (currentValue.value * 100) / dataValueTotal;

      const accumulated = accumulator + currentPercent;

      const startingPercent = accumulator;
      const endingPercent = accumulated;

      ctx.beginPath();
      ctx.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
      ctx.arc(
        -canvasWidth / 2,
        canvasHeight / 2,
        canvasWidth / 2,
        (Math.PI * 2 * startingPercent) / 100,
        (Math.PI * 2 * endingPercent) / 100
      );
      ctx.lineTo(-canvasWidth / 2, canvasHeight / 2);
      ctx.fill();

      return accumulated;
    },
    0
  );
})();

// CANVAS STRATEGY END
