import { throttle } from "./_utils";

export class Scroller {
  element: HTMLElement;
  control: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    this.control = <HTMLElement>element.querySelector("[data-scroller-action]");

    this.checkVisibility();

    this.control.addEventListener("click", this.handleControlClick);
    document.addEventListener(
      "scroll",
      throttle(this.handleDocumentScroll, 200),
      { passive: true }
    );
  }

  handleDocumentScroll = (evt) => {
    this.checkVisibility();
  };

  checkVisibility = () => {
    if (window.scrollY > 200) {
      this.element.setAttribute("data-scroller-active", "");
    } else {
      this.element.removeAttribute("data-scroller-active");
    }
  };

  handleControlClick = (evt: Event) => {
    const action = this.control.getAttribute("data-scroller-action");
    if (action && this[action]) {
      const actionArgs = this.control.getAttribute("data-scroller-action-args");
      this[action](actionArgs);
    }
  };

  scroll = (direction: string = "top", amount?: string | number) => {
    const scrollOptions: { behavior: ScrollBehavior } = {
      behavior: "smooth",
    };

    scrollOptions[direction] = amount;

    window.scroll(scrollOptions);
  };

  scrollTop = (amount: string | number = 0) => {
    this.scroll("top", amount);
  };

  scrollLeft = (amount: string | number = 0) => {
    this.scroll("left", amount);
  };
}
