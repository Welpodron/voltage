export interface ITooltipConfig {
  tooltipElTagName?: keyof HTMLElementTagNameMap;
  tooltipElClass?: string;
  tooltipYOffset?: number;
}

export class Tooltip {
  element: Element | HTMLElement;
  tooltip?: Element | HTMLElement;
  isHovering: boolean = false;
  isFocused: boolean = false;
  isTranslating: boolean = false;
  tooltipElClass?: string;
  tooltipElTagName: keyof HTMLElementTagNameMap = "span";
  tooltipYOffset: number = 5;

  constructor(element: Element | HTMLElement, config: ITooltipConfig = {}) {
    this.element = element;

    this.tooltipElClass = config.tooltipElClass;
    this.tooltipElTagName = config.tooltipElTagName ?? this.tooltipElTagName;
    this.tooltipYOffset = config.tooltipYOffset ?? this.tooltipYOffset;

    this.initEventListeners();
  }

  initEventListeners = () => {
    this.element.addEventListener("mouseenter", this.handleMouseEnter);
    this.element.addEventListener("mouseleave", this.handleMouseLeave);
    this.element.addEventListener("focusin", this.handleFocusIn);
    this.element.addEventListener("focusout", this.handleFocusOut);
  };

  add = () => {
    if (this.isTranslating && this.tooltip) return;
    this.isTranslating = true;

    const tooltip = document.createElement(this.tooltipElTagName);

    this.tooltip = tooltip;

    let { top, left, width, height } = this.element.getBoundingClientRect();

    top += window.scrollY;
    left += window.scrollX;

    tooltip.textContent = this.element.ariaLabel;
    tooltip.setAttribute("data-tooltip-control", "");

    if (this.tooltipElClass) {
      tooltip.classList.add(this.tooltipElClass);
    }

    let tooltipLeft = left;
    let tooltipTop = top + height + this.tooltipYOffset;

    tooltip.style.top = tooltipTop + "px";
    tooltip.style.left = tooltipLeft + "px";

    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.15s ease";

    document.body.appendChild(tooltip);

    let tooltipDOMRect = tooltip.getBoundingClientRect();
    let tooltipWidth = tooltipDOMRect.width;
    let tooltipHeight = tooltipDOMRect.height;
    let currentTooltipTop = tooltipDOMRect.top;
    let currentTooltipLeft = tooltipDOMRect.left;

    if (currentTooltipLeft + tooltipWidth > window.innerWidth) {
      tooltip.style.left = tooltipLeft - tooltipWidth + width + "px";
    }

    if (currentTooltipTop + tooltipHeight > window.innerHeight) {
      tooltip.style.top =
        tooltipTop -
        tooltipHeight -
        height -
        this.tooltipYOffset -
        this.tooltipYOffset +
        "px";
    }

    tooltip.style.opacity = "1";

    (<HTMLElement>this.tooltip).addEventListener(
      "transitionend",
      () => {
        this.isTranslating = false;
      },
      {
        once: true,
      }
    );
  };

  remove = () => {
    if (this.isTranslating && !this.tooltip) return;
    this.isTranslating = true;
    // TODO: Fix because sometimes it is bugging out
    if (this.tooltip) {
      (<HTMLElement>this.tooltip).style.opacity = "0";
      (<HTMLElement>this.tooltip).addEventListener(
        "transitionend",
        () => {
          this.isTranslating = false;
          this.tooltip?.remove();
          this.tooltip = undefined;
        },
        {
          once: true,
        }
      );
    }
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
