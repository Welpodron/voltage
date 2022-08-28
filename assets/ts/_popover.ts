import { throttle } from "./_utils";

export interface IPopoverConfig {
  isMenu?: boolean;
}

export class Popover {
  element: HTMLDialogElement;
  control: Element | HTMLElement;
  yOffset: number = 5;
  active: boolean = false;
  lastActiveElement: Element | null;
  keyboardfocusableElements: Array<Element>;
  keyboardfocusableElementActive: Element;
  isTranslating: boolean = false;
  isMenu: boolean = false;

  constructor(element: HTMLDialogElement, config: IPopoverConfig = {}) {
    this.element = element;

    this.isMenu =
      config.isMenu || this.element.hasAttribute("data-popover-menu");

    // Force this element to body end
    document.body.appendChild(this.element);
    // Only one and first control
    this.control = <HTMLElement>(
      document.querySelector(
        `[data-popover-id=${this.element.id}][data-popover-action]`
      )
    );

    this.keyboardfocusableElements = [
      ...this.element.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter(
      (el) =>
        !el.hasAttribute("hidden") &&
        !el.hasAttribute("disabled") &&
        !el.getAttribute("aria-hidden")
    );

    this.keyboardfocusableElementActive = this.keyboardfocusableElements[0];

    this.control.addEventListener("click", this.handleControlClick);
    window.addEventListener("resize", throttle(this.handleResize, 100), {
      passive: true,
    });
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    this.element.addEventListener("click", this.handleElementClick);
  }

  handleElementClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const target = <Element>evt.target;

    if (target === this.element) return;

    if (this.isMenu) {
      this.close();
      return;
    }
  };

  close = (withoutFocus: boolean = false) => {
    if (!this.active || this.isTranslating) return;
    this.isTranslating = true;

    this.element.style.opacity = "0";

    setTimeout(() => {
      this.element.addEventListener(
        "transitionend",
        () => {
          (<HTMLElement>this.keyboardfocusableElementActive).focus();
          this.element.close();
          this.active = false;
          this.isTranslating = false;
        },
        { once: true }
      );
      this.element.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.element).transitionDuration) * 1000);
  };

  handleDocumentKeyDown = (evt: KeyboardEvent) => {
    // TODO: Add Home btn + End btn support
    if (!this.active) return;

    if (
      evt.code === "ArrowDown" ||
      evt.code === "ArrowRight" ||
      (!evt.shiftKey && evt.code === "Tab")
    ) {
      evt.preventDefault();
      const nextKeyboardfocusableElementActive =
        this.keyboardfocusableElements[
          (this.keyboardfocusableElements.indexOf(
            this.keyboardfocusableElementActive
          ) +
            1) %
            this.keyboardfocusableElements.length
        ];
      (<HTMLElement>nextKeyboardfocusableElementActive).focus();
      this.keyboardfocusableElementActive = nextKeyboardfocusableElementActive;
      return;
    }

    if (
      evt.code === "ArrowUp" ||
      evt.code === "ArrowLeft" ||
      (evt.shiftKey && evt.code === "Tab")
    ) {
      evt.preventDefault();
      const nextKeyboardfocusableElementActive =
        this.keyboardfocusableElements[
          (this.keyboardfocusableElements.indexOf(
            this.keyboardfocusableElementActive
          ) +
            this.keyboardfocusableElements.length -
            1) %
            this.keyboardfocusableElements.length
        ];
      (<HTMLElement>nextKeyboardfocusableElementActive).focus();
      this.keyboardfocusableElementActive = nextKeyboardfocusableElementActive;
      return;
    }

    if (evt.code === "Escape") {
      evt.preventDefault();
      this.close();
      return;
    }

    // The key combo is unknown so go ahead
  };

  handleResize = () => {
    // TODO: Fix resize because sometimes position is bugging out
    if (!this.active) return;
    this.show();
  };

  handleDocumentMouseDown = (evt: MouseEvent) => {
    const target = <Element>evt.target;

    if (this.control.contains(target)) return;
    if (this.element.contains(target)) return;

    this.close();
  };

  show = () => {
    if (this.isTranslating) return;

    let {
      width: controlWidth,
      height: controlHeight,
      left: controlLeft,
      top: controlTop,
    } = this.control.getBoundingClientRect();

    controlLeft += window.scrollX;
    controlTop += window.scrollY;

    this.element.style.left = controlLeft + "px";
    this.element.style.top = controlTop + controlHeight + this.yOffset + "px";

    if (!this.active) {
      this.element.style.opacity = "0";
      this.element.style.transition = "opacity 0.2s ease";
      this.isTranslating = true;
      this.lastActiveElement = document.activeElement;
      this.element.show();
      this.element.style.opacity = "1";

      setTimeout(() => {
        this.element.addEventListener(
          "transitionend",
          () => {
            (<HTMLElement>this.keyboardfocusableElementActive).focus();
            this.active = true;
            this.isTranslating = false;
          },
          { once: true }
        );
        this.element.dispatchEvent(new TransitionEvent("transitionend"));
      }, parseFloat(window.getComputedStyle(this.element).transitionDuration) * 1000);
    }

    const {
      width: elementWidth,
      height: elementHeight,
      left: elementLeft,
      top: elementTop,
    } = this.element.getBoundingClientRect();

    if (Math.ceil(elementLeft + elementWidth) >= window.innerWidth) {
      this.element.style.left =
        elementLeft + window.scrollX - controlWidth - elementWidth + "px";
    }

    if (
      Math.ceil(elementTop + elementHeight + this.yOffset) >= window.innerHeight
    ) {
      this.element.style.top =
        elementTop -
        elementHeight -
        controlHeight -
        this.yOffset -
        this.yOffset +
        window.scrollY +
        "px";
    }
  };

  handleControlClick = (evt: Event) => {
    evt.preventDefault();

    const currentTarget = <Element>evt.currentTarget;
    const action = currentTarget.getAttribute("data-popover-action");

    if (action && this[action]) {
      const actionArgs = currentTarget.getAttribute("data-popover-action-args");
      this[action](actionArgs);
    }
  };
}
