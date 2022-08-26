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
