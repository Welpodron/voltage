import { ThemeSwitcher, ThemeSwitcherType } from "./_context";

export class BtnThemeSwitcher {
  element: Element | HTMLElement;
  switcher: ThemeSwitcherType;

  constructor(element: Element | HTMLElement) {
    this.element = element;
    this.switcher = ThemeSwitcher;

    this.initEventListeners();
  }

  initEventListeners = () => {
    this.element.addEventListener("click", this.handleClick);
  };

  handleClick = (evt: Event) => {
    evt.preventDefault();
    this.switcher.setValue((<any>window).theme === "light" ? "dark" : "light");
  };
}

export class BtnSidebarResizer {
  element: Element | HTMLElement;
  dragging: boolean = false;
  sidebar: HTMLElement;
  maxWidth: number;
  minWidth: number;
  defaultWidth: number;

  constructor(element: Element | HTMLElement) {
    this.element = element;

    this.sidebar = <HTMLElement>this.element.closest("[data-sidebar]");

    this.maxWidth = parseInt(getComputedStyle(this.sidebar).maxWidth);
    this.minWidth = parseInt(getComputedStyle(this.sidebar).minWidth);
    this.defaultWidth = parseInt(getComputedStyle(this.sidebar).width);

    this.initEventListeners();
  }

  initEventListeners = () => {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
    this.element.addEventListener("dblclick", this.handleDbClick);
    this.element.addEventListener("mousedown", this.handleMouseDown);
    this.element.addEventListener("drag", this.handleDrag);
    this.element.addEventListener("dragstart", this.handleDragStart);
  };

  handleDbClick = (evt: Event) => {
    const { width } = this.sidebar.getBoundingClientRect();

    if (width <= this.minWidth) {
      this.sidebar.style.width = `${this.defaultWidth}px`;
    } else {
      this.sidebar.style.width = `${this.minWidth}px`;
    }
  };

  handleMouseMove = (evt: Event) => {
    if (!this.dragging) return;
    const { clientX } = <MouseEvent>evt;

    if (clientX < this.minWidth || clientX > this.maxWidth) return;

    this.sidebar.style.width = `${clientX}px`;
  };

  handleMouseDown = (evt: Event) => {
    this.dragging = true;
  };

  handleMouseUp = (evt: Event) => {
    this.dragging = false;
  };

  handleDrag = (evt: Event | DragEvent) => {
    this.dragging = true;
  };

  handleDragStart = (evt: Event | DragEvent) => {
    this.dragging = true;
  };
}

import { throttle } from "./_utils";

export interface IBtnScrollToTopConfig {
  control: HTMLElement;
}

type ScrollDirection = "top" | "left";

export class BtnScrollToTop {
  config: IBtnScrollToTopConfig;

  constructor(control: HTMLElement) {
    const config: IBtnScrollToTopConfig = {
      control,
    };

    this.config = config;

    this.checkVisibility();

    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_removeEventListeners = () => {
    this.config.control.removeEventListener("click", this.#_handleControlClick);

    document.removeEventListener(
      "scroll",
      throttle(this.#_handleDocumentScroll, 200)
    );
  };

  #_initEventListeners = () => {
    this.config.control.addEventListener("click", this.#_handleControlClick);

    document.addEventListener(
      "scroll",
      throttle(this.#_handleDocumentScroll, 200)
    );
  };

  #_handleDocumentScroll = () => {
    this.checkVisibility();
  };

  #_handleControlClick = () => {
    this.scrollTop();
  };

  checkVisibility = () => {
    if (window.scrollY > 200) {
      this.config.control.setAttribute("data-btn-scroll-to-top-active", "");
    } else {
      this.config.control.removeAttribute("data-btn-scroll-to-top-active");
    }
  };

  scroll = (direction: ScrollDirection = "top", amount?: string | number) => {
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
