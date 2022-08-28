import { Popover } from "./_popover";

interface ISelectBoxConfig {
  name?: string;
  defaultValue?: string;
}

export class SelectBox {
  // TODO: errors
  // TODO: multiple
  // TODO: validation
  value: string;
  name: string;

  element: HTMLElement;
  input: HTMLInputElement;
  controls: Array<HTMLElement>;

  //   menu: Popover;

  constructor(element: HTMLElement, config: ISelectBoxConfig = {}) {
    this.element = element;

    this.input = <HTMLInputElement>this.element.querySelector("input");

    this.name =
      config.name ||
      this.element.getAttribute("data-form-field-name") ||
      this.input.name;

    this.input.name = this.name;

    this.value =
      config.defaultValue ||
      this.element.getAttribute("data-form-field-default-value") ||
      this.input.value;

    this.input.value = this.value;

    this.controls = <Array<HTMLElement>>[
      ...document.querySelectorAll(
        `[data-form-selectbox-id=${this.element.id}][data-form-selectbox-action]`
      ),
    ];

    this.destroyEventListeners();
    this.initEventListeners();
  }

  initEventListeners = () => {
    this.input.addEventListener("click", this.handleInputClick);

    this.controls.forEach((control) => {
      control.addEventListener("click", this.handleControlClick);
    });
  };

  destroyEventListeners = () => {
    this.input.removeEventListener("click", this.handleInputClick);

    this.controls.forEach((control) => {
      control.removeEventListener("click", this.handleControlClick);
    });
  };

  handleInputClick = (evt: MouseEvent) => {};

  handleControlClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const currentTarget = <HTMLElement>evt.currentTarget;

    const action = currentTarget.getAttribute("data-form-selectbox-action");

    if (action && this[action] instanceof Function) {
      const args = currentTarget.getAttribute(
        "data-form-selectbox-action-args"
      );
      this[action](args);
    }
  };

  change = (value: string) => {
    this.value = value;
    this.input.value = this.value;
  };
}
