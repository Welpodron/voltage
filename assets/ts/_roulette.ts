export interface IRouletteConfig {
  element: HTMLElement;
  controls: Array<HTMLElement>;

  screen: HTMLElement;
}

export class Roulette {
  config: IRouletteConfig;

  constructor(element: HTMLElement) {
    const controls = <Array<HTMLElement>>[
      ...element.querySelectorAll("[data-roulette-action]"),
    ];

    const screen = <HTMLElement>element.querySelector("[data-roulette-screen]");

    this.config = {
      element,
      screen,
      controls,
    };

    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_initEventListeners = () => {
    this.config.controls.forEach((control) => {
      control.addEventListener("click", this.#_handleControlClick);
    });
  };

  #_removeEventListeners = () => {
    this.config.controls.forEach((control) => {
      control.removeEventListener("click", this.#_handleControlClick);
    });
  };

  #_handleControlClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const currentTarget = <HTMLElement>evt.currentTarget;

    const action = currentTarget.getAttribute("data-roulette-action");

    if (action && this[action] instanceof Function) {
      const args = currentTarget.getAttribute("data-roulette-action-args");
      this[action](args);
    }
  };

  scrollBy = (value: string | number) => {
    const scrollValue = typeof value === "string" ? parseInt(value) : value;

    console.log(scrollValue);

    this.config.screen.scrollBy({
      top: scrollValue,
      behavior: "smooth",
    });
  };
}
