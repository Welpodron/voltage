export interface ICheckboxConfig {
  element: HTMLElement;
  control: HTMLInputElement;
  name: string;
  value: string;
  checked: boolean;
}

// TODO: Rework! Может быть лучше использовать один интерфейс Checkbox и для группы боксов и для одного?

export class Checkbox {
  config: ICheckboxConfig;

  constructor(element: HTMLElement) {
    const name = <string>element.getAttribute("data-form-field");

    const control = <HTMLInputElement>(
      element.querySelector('input[type="checkbox"]')
    );

    control.name = name;

    this.config = {
      element,
      name,
      control,
      value: control.hasAttribute("value") ? control.value.trim() : "",
      checked: control.checked,
    };

    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_removeEventListeners = () => {
    this.config.control.removeEventListener(
      "change",
      this.#_handleControlChange
    );
  };

  #_initEventListeners = () => {
    this.config.control.addEventListener("change", this.#_handleControlChange);
  };

  #_handleControlChange = () => {
    this.config.checked = this.config.control.checked;
  };

  //   TODO: Rewrite to getters and setters
  getValue = () => {
    // if (this.config.value) {
    //   return this.config.checked ? this.config.value : undefined;
    // }
    // return this.config.checked;
  };
}

export interface ICheckboxGroupConfig {
  element: HTMLElement;
  controls: Array<HTMLInputElement>;
  name: string;
  value: Set<string>;
}

export class CheckboxGroup {
  config: ICheckboxGroupConfig;

  constructor(element: HTMLElement) {
    const name = <string>element.getAttribute("data-form-field");
    // WARNING! New mechanism cannot be nested
    const controls = <Array<HTMLInputElement>>[
      ...element.querySelectorAll('input[type="checkbox"]'),
    ];

    controls.forEach((control) => {
      control.name = name;
    });

    this.config = {
      element,
      name,
      controls,
      value: new Set(),
    };
    // TODO: Add event delegation
    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_initEventListeners = () => {
    this.config.controls.forEach((control) => {
      control.addEventListener("change", this.#_handleControlChange);
    });
  };

  #_removeEventListeners = () => {
    this.config.controls.forEach((control) => {
      control.removeEventListener("change", this.#_handleControlChange);
    });
  };

  #_handleControlChange = (evt: Event) => {
    const currentTarget = <HTMLInputElement>evt.currentTarget;

    const value = currentTarget.hasAttribute("value")
      ? currentTarget.value.trim()
      : "";

    const checked = currentTarget.checked;

    if (value) {
      if (checked) {
        this.config.value.add(value);
      } else {
        this.config.value.delete(value);
      }
    }
  };

  getValue = () => {};
}
