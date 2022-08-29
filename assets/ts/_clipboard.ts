export interface IClipboardParams {
  beforeCopy?: (state: {
    currentConfig: IClipboardConfig;
    currentCopyValue: string;
  }) => void;
  onCopyError?: (state: {
    currentConfig: IClipboardConfig;
    currentError: Error | string;
  }) => void;
  afterCopy?: (state: {
    currentConfig: IClipboardConfig;
    currentCopyValue: string;
  }) => void;
}

export interface IClipboardConfig {
  element: HTMLElement;
  control: HTMLElement;
}

export class Clipboard {
  config: IClipboardConfig;
  params: IClipboardParams;

  constructor(element: HTMLElement, params: IClipboardParams = {}) {
    const config: IClipboardConfig = {
      element,
      control: <HTMLElement>(
        document.querySelector(
          `[data-clipboard-action][data-clipboard-id=${element.id}]`
        )
      ),
    };

    this.config = config;
    this.params = params;

    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_initEventListeners = () => {
    this.config.control.addEventListener("click", this.#_handleControlClick);
  };

  #_removeEventListeners = () => {
    this.config.control.removeEventListener("click", this.#_handleControlClick);
  };

  #_handleControlClick = () => {
    const action = this.config.control.getAttribute("data-clipboard-action");

    if (action && this[action] instanceof Function) {
      const args = this.config.control.getAttribute(
        "data-clipboard-action-args"
      );

      this[action](args);
    }
  };
  // TODO: implement images and any raw value
  copyText = (exactValue?: string) => {
    // Thanks to Greg Lowe and Jack G https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript/33928558#33928558

    const activeElement = <HTMLElement>document.activeElement;

    const copyValue = exactValue
      ? exactValue
      : this.config.element.textContent ?? "";

    if (this.params.beforeCopy) {
      this.params.beforeCopy({
        currentConfig: this.config,
        currentCopyValue: copyValue,
      });
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(copyValue)
        .then(() => {
          if (this.params.afterCopy) {
            this.params.afterCopy({
              currentConfig: this.config,
              currentCopyValue: copyValue,
            });
          }
        })
        .catch((err) => {
          if (this.params.onCopyError) {
            this.params.onCopyError({
              currentConfig: this.config,
              currentError: err,
            });
          }
        });

      return;
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      const textarea = document.createElement("textarea");

      // Thanks to zenorocha/clipboard.js https://github.com/zenorocha/clipboard.js

      textarea.textContent = copyValue;
      textarea.style.fontSize = "12pt"; // Reset box model

      textarea.style.border = "0";
      textarea.style.padding = "0";
      textarea.style.margin = "0"; // Move element out of screen horizontally

      textarea.style.position = "absolute";
      textarea.style.right = "-9999px"; // Move element to the same position vertically

      let yPosition = window.pageYOffset || document.documentElement.scrollTop;
      textarea.style.top = yPosition + "px";
      textarea.setAttribute("readonly", "");

      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
      } catch (ex) {
        if (this.params.onCopyError) {
          this.params.onCopyError({
            currentConfig: this.config,
            currentError: ex,
          });
        }
      } finally {
        textarea.remove();
      }
    }

    if (this.params.afterCopy) {
      this.params.afterCopy({
        currentConfig: this.config,
        currentCopyValue: copyValue,
      });
    }

    if (activeElement) {
      activeElement.focus();
    }
  };

  //   cutText = () => {};
  // TODO: implement images and any raw value
  //   pasteText = (exactValue?: string) => {};
}
