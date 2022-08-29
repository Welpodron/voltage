// WARNING! Possible memory leak here needs further investigation OR complete rework!

export interface ICollapseHTMLElement extends HTMLElement {
  collapseInstance: Collapse;
}

// TODO: Maybe rewrite accordion section like carousel one?

export class Collapse {
  element: ICollapseHTMLElement;
  active: boolean;
  translating: boolean = false;
  controls: NodeListOf<HTMLElement>;
  direction: string = "vertical";
  // Accordion API WARNING! Possible memory leak here needs further investigation OR complete rework!
  accordionSiblings: NodeListOf<ICollapseHTMLElement>;
  // Accordion API

  constructor(element: ICollapseHTMLElement) {
    this.element = element;

    this.element.collapseInstance = this;

    this.active = this.element.getAttribute("data-collapse-active") !== null;

    this.controls = document.querySelectorAll(
      `[data-collapse-action][data-collapse-id=${this.element.id}]`
    );

    this.controls.forEach((control) => {
      control.setAttribute("aria-expanded", this.active.toString());
      control.setAttribute("aria-controls", this.element.id);
      control.removeEventListener("click", this.handleClick);
      control.addEventListener("click", this.handleClick);
    });

    // Accordion API
    this.accordionSiblings = document.querySelectorAll(
      `[data-collapse]:not([id=${
        this.element.id
      }])[data-accordion-id=${this.element.getAttribute("data-accordion-id")}]`
    );
    // Accordion API
  }

  open = (): void => {
    if (this.translating || this.active) return;
    // Accordion API
    if (
      [...this.accordionSiblings].some(
        (sibling) => sibling.collapseInstance.translating
      )
    )
      return;

    this.accordionSiblings.forEach((sibling) => {
      sibling.collapseInstance.close();
    });
    // Accordion API

    this.translating = true;

    this.controls.forEach((control) => {
      control.setAttribute("aria-expanded", "true");
    });

    this.element.setAttribute("data-collapse-collapsing", "");

    setTimeout(() => {
      this.element.addEventListener(
        "transitionend",
        () => {
          this.element.removeAttribute("data-collapse-collapsing");
          this.element.style.height = "";
          this.active = true;
          this.translating = false;
        },
        { once: true }
      );
      this.element.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.element).transitionDuration) * 1000);
    this.element.setAttribute("data-collapse-active", "");
    this.element.style.height = `${this.element.scrollHeight}px`;
  };

  close = (): void => {
    if (this.translating || !this.active) return;
    this.translating = true;

    this.controls.forEach((control) => {
      control.setAttribute("aria-expanded", "false");
    });

    this.element.style.height = `${
      this.element.getBoundingClientRect().height
    }px`;
    this.element.setAttribute("data-collapse-collapsing", "");
    this.element.removeAttribute("data-collapse-active");
    // Magic
    this.element.scrollHeight;
    //
    setTimeout(() => {
      this.element.addEventListener(
        "transitionend",
        () => {
          this.element.removeAttribute("data-collapse-collapsing");
          this.active = false;
          this.translating = false;
        },
        { once: true }
      );
      this.element.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.element).transitionDuration) * 1000);
    this.element.style.height = "";
  };

  toggle = (): void => {
    if (this.translating) return;
    this.active ? this.close() : this.open();
  };

  handleClick = (evt: Event): void => {
    evt.preventDefault();

    const currentTarget: Element = <Element>evt.currentTarget;
    const action: Function | any =
      this[<keyof this>currentTarget.getAttribute("data-collapse-action")];

    if (action instanceof Function) action();
  };
}
