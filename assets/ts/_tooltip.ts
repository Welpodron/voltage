export interface ITooltipConfig {
  element?: HTMLElement;
  timeout?: number;
  control: HTMLElement;
}

export interface ITooltipParams {
  tooltipElClass?: string;
  tooltipElTagName: keyof HTMLElementTagNameMap;
  tooltipYOffset: number;
}

const defaultTooltipParams: ITooltipParams = {
  tooltipElTagName: "span",
  tooltipYOffset: 5,
};

// TODO: add fixed position support
// TODO: ADD  RESIZE EVENT
export class Tooltip {
  config: ITooltipConfig;
  params: ITooltipParams;

  constructor(control: HTMLElement, params: Partial<ITooltipParams> = {}) {
    const config: ITooltipConfig = {
      control,
    };

    this.config = config;

    this.params = { ...defaultTooltipParams };

    this.params.tooltipElClass =
      control.getAttribute("data-tooltip-class") || undefined;

    this.params = { ...this.params, ...params };

    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_initEventListeners = () => {
    this.config.control.addEventListener(
      "mouseenter",
      this.#_handleControlMouseEnter
    );
    this.config.control.addEventListener(
      "mouseleave",
      this.#_handleControlMouseLeave
    );
    // TODO: Rework this workaround
    this.config.control.addEventListener(
      "hidecalled",
      this.#_handleComponentHideCalled
    );
    this.config.control.addEventListener(
      "showcalled",
      this.#_handleComponentShowCalled
    );
  };

  #_removeEventListeners = () => {
    this.config.control.removeEventListener(
      "mouseenter",
      this.#_handleControlMouseEnter
    );
    this.config.control.removeEventListener(
      "mouseleave",
      this.#_handleControlMouseLeave
    );
    // TODO: Rework this workaround
    this.config.control.removeEventListener(
      "hidecalled",
      this.#_handleComponentHideCalled
    );
    this.config.control.removeEventListener(
      "showcalled",
      this.#_handleComponentShowCalled
    );
  };

  #_handleComponentHideCalled = () => {
    this.hide();
  };

  #_handleComponentShowCalled = () => {
    this.show();
  };

  #_handleControlMouseEnter = () => {
    this.show();
  };

  #_handleControlMouseLeave = () => {
    this.hide();
  };

  show = () => {
    clearTimeout(this.config.timeout);

    if (this.config.element) {
      this.config.element.remove();
      this.config.element = undefined;
    }

    this.config.element = document.createElement(this.params.tooltipElTagName);
    this.config.element.textContent =
      this.config.control.getAttribute("aria-label");
    this.config.element.style.pointerEvents = "none";
    this.config.element.style.opacity = "0";
    this.config.element.style.transition = "opacity 0.2s ease";
    this.config.element.setAttribute("data-tooltip-control", "");

    if (this.params.tooltipElClass) {
      this.config.element.classList.add(
        ...this.params.tooltipElClass.split(" ")
      );
    }

    const {
      top: controlTop,
      left: controlLeft,
      width: controlWidth,
      height: controlHeight,
    } = this.config.control.getBoundingClientRect();

    const controlTopScrollY = controlTop + window.scrollY;
    const controlLeftScrollX = controlLeft + window.scrollX;

    this.config.element.style.left = controlLeftScrollX + controlWidth + "px";
    this.config.element.style.top =
      controlTopScrollY + controlHeight + this.params.tooltipYOffset + "px";

    document.body.appendChild(this.config.element);

    const {
      width: elementWidth,
      height: elementHeight,
      left: elementLeft,
      top: elementTop,
    } = this.config.element.getBoundingClientRect();

    if (Math.ceil(elementLeft + elementWidth) >= window.innerWidth) {
      this.config.element.style.left =
        elementLeft + window.scrollX - controlWidth - elementWidth + "px";
    }

    if (
      Math.ceil(elementTop + elementHeight + this.params.tooltipYOffset) >=
      window.innerHeight
    ) {
      this.config.element.style.top =
        elementTop +
        window.scrollY -
        elementHeight -
        controlHeight -
        this.params.tooltipYOffset -
        this.params.tooltipYOffset +
        "px";
    }

    this.config.element.style.opacity = "1";
  };

  hide = () => {
    if (!this.config.element) return;

    this.config.element.style.opacity = "0";

    this.config.timeout = setTimeout(() => {
      this.config.element?.addEventListener(
        "transitionend",
        () => {
          this.config.element?.remove();
          this.config.element = undefined;
        },
        { once: true }
      );
      this.config.element?.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.config.element).transitionDuration) * 1000);
  };
}
