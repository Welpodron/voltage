import { singleton } from "./_utils";

class __ThemeSwitcher {
  storageKey: string = "theme-preference";

  constructor() {
    this.setValue(this.getValue());
  }

  getValue = () => {
    const localStorageValue = localStorage.getItem(this.storageKey);

    if (localStorageValue) {
      return localStorageValue === "dark" ? "dark" : "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  setValue = (value: string) => {
    localStorage.setItem(this.storageKey, value);
    (<any>window).theme = value;

    (<Element>document.firstElementChild).setAttribute(
      "data-theme",
      (<any>window).theme
    );
  };
}

var _ThemeSwitcher = singleton(__ThemeSwitcher);

const ThemeSwitcher = <__ThemeSwitcher>new _ThemeSwitcher();

export { ThemeSwitcher };
export type ThemeSwitcherType = typeof ThemeSwitcher;
