export interface ITooltipConfig {
  tooltipElTagName?: keyof HTMLElementTagNameMap;
  tooltipElClass?: string;
  tooltipYOffset?: number;
  isTooltipFixed?: boolean;
}

export class Tooltip {
  control: Element | HTMLElement;
  element?: HTMLElement;
  isHovering: boolean = false;
  isFocused: boolean = false;
  isTranslating: boolean = false;
  isTooltipFixed: boolean = false;
  tooltipElClass?: string;
  tooltipElTagName: keyof HTMLElementTagNameMap = "span";
  tooltipYOffset: number = 5;

  constructor(control: Element | HTMLElement, config: ITooltipConfig = {}) {
    this.control = control;

    this.tooltipElClass = config.tooltipElClass;
    this.tooltipElTagName = config.tooltipElTagName ?? this.tooltipElTagName;
    this.tooltipYOffset = config.tooltipYOffset ?? this.tooltipYOffset;
    // TODO: add fixed position support
    this.isTooltipFixed = this.control.hasAttribute("data-tooltip-fixed");

    this.initEventListeners();
  }

  initEventListeners = () => {
    this.control.addEventListener("mouseenter", this.handleMouseEnter);
    this.control.addEventListener("mouseleave", this.handleMouseLeave);
    this.control.addEventListener("focusin", this.handleFocusIn);
    this.control.addEventListener("focusout", this.handleFocusOut);
  };

  add = () => {
    if (this.isTranslating || this.element) return;

    this.isTranslating = true;

    const tooltip = document.createElement(this.tooltipElTagName);

    this.element = tooltip;

    let {
      top: controlTop,
      left: controlLeft,
      width: controlWidth,
      height: controlHeight,
    } = this.control.getBoundingClientRect();

    controlTop += window.scrollY;
    controlLeft += window.scrollX;

    this.element.textContent = this.control.ariaLabel;
    this.element.setAttribute("data-tooltip-control", "");

    if (this.tooltipElClass) {
      this.element.classList.add(this.tooltipElClass);
    }

    this.element.style.left = controlLeft + controlWidth + "px";
    this.element.style.top =
      controlTop + controlHeight + this.tooltipYOffset + "px";

    this.element.style.opacity = "0";
    this.element.style.transition = "opacity 0.2s ease";

    document.body.appendChild(this.element);

    const {
      width: elementWidth,
      height: elementHeight,
      left: elementLeft,
      top: elementTop,
    } = this.element.getBoundingClientRect();

    if (elementLeft + elementWidth > window.innerWidth) {
      tooltip.style.left =
        elementLeft + window.scrollX - controlWidth - elementWidth + "px";
    }

    if (elementTop + elementHeight + this.tooltipYOffset > window.innerHeight) {
      this.element.style.top =
        elementTop +
        window.scrollY -
        elementHeight -
        controlHeight -
        this.tooltipYOffset -
        this.tooltipYOffset +
        "px";
    }

    this.element.style.opacity = "1";

    setTimeout(() => {
      this.element?.addEventListener(
        "transitionend",
        () => {
          this.isTranslating = false;
        },
        { once: true }
      );
      this.element?.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.element).transitionDuration) * 1000);
  };

  remove = () => {
    if (!this.element || this.isTranslating) return;
    this.isTranslating = true;

    this.element.style.opacity = "0";

    setTimeout(() => {
      this.element?.addEventListener(
        "transitionend",
        () => {
          this.element?.remove();
          this.element = undefined;
          this.isTranslating = false;
        },
        { once: true }
      );
      this.element?.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.element).transitionDuration) * 1000);
  };

  handleFocusOut = (evt: Event) => {
    if (
      !(<Element>(<FocusEvent>evt).currentTarget).contains(
        <Element>(<FocusEvent>evt).relatedTarget
      )
    ) {
      this.isFocused = false;

      if (!this.isHovering) {
        this.remove();
      }
    }
  };

  handleFocusIn = (evt: Event) => {
    this.isFocused = true;

    if (!this.isHovering) {
      this.add();
    }
  };

  handleMouseEnter = (evt: Event) => {
    this.isHovering = true;

    if (!this.isFocused) {
      this.add();
    }
  };

  handleMouseLeave = (evt: Event) => {
    this.isHovering = false;

    if (!this.isFocused) {
      this.remove();
    }
  };
}
