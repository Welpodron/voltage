// SVG STRATEGY START
(() => {
  const svg = <HTMLElement>document.querySelector("#svg");

  const svgWidth = 200;
  const svgHeight = 200;

  const data = [
    { key: "lazy", value: 48 },
    { key: "not", value: 93 },
    { key: "lazy", value: 48 },
    { key: "not", value: 93 },
    { key: "lazy", value: 48 },
    { key: "not", value: 93 },
    { key: "lazy", value: 48 },
    { key: "not", value: 93 },
    { key: "lazy", value: 48 },
    { key: "not", value: 93 },
  ];

  const dataSorted = [...data].sort((a, b) => (a.value > b.value ? -1 : 1));
  const dataValueTotal = dataSorted.reduce(
    (accumulator: number, currentValue: { key: string; value: number }) =>
      accumulator + currentValue.value,
    0
  );

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `matrix(1, 0, 0, -1, 0, ${svgHeight})`);
  /*
      После использования transform matrix система координат стала
  
      y
      |
      |
      |_____x
  
    */

  const rectWidth = svgWidth / dataSorted.length;

  dataSorted.reduce(
    (
      accumulator: number,
      currentValue: { key: string; value: number },
      currentIndex: number
    ) => {
      const currentPercent = (currentValue.value * 100) / dataValueTotal;

      const accumulated = accumulator + currentPercent;

      //   const startingPercent = accumulator;
      const endingPercent = accumulated;

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      const rectX = currentIndex * rectWidth;
      const rectY = 0;
      const rectHeight = (svgHeight * endingPercent) / 100;

      rect.setAttribute("y", rectY.toString());
      rect.setAttribute("x", rectX.toFixed(1));
      rect.setAttribute("width", rectWidth.toFixed(1));
      rect.setAttribute("height", rectHeight.toFixed(1));
      rect.setAttribute(
        "fill",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

      g.appendChild(rect);

      return accumulated;
    },
    0
  );

  svg.appendChild(g);
})();

// SVG STRATEGY END
