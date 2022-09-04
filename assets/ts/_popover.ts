import { throttle } from "./_utils";

export interface IPopoverParams {
  isMenu?: boolean;
  isOnce?: boolean;
  isDynamic?: boolean;
  isForced?: boolean;
  popoverYOffset: number;
  popoverPositionFrom?: HTMLElement;
  popoverPositionExact?: { x: number; y: number };
}

export interface IPopoverConfig {
  element: HTMLDialogElement;
  control?: HTMLElement;
  isActive: boolean;
  isTranslating: boolean;
  mutationObserver?: MutationObserver;
  firstFocusableEl?: HTMLDivElement;
  lastFocusableEl?: HTMLButtonElement;
  // WARNING! POSSIBLE MEMORY LEAK
  savedNodes?: Set<Element>;
  savedChildren: Array<Element>;
}

const defaultPopoverParams: IPopoverParams = {
  popoverYOffset: 5,
  // TODO: Add custom position support
};

export class Popover {
  config: IPopoverConfig;
  params: IPopoverParams;

  constructor(
    element: HTMLDialogElement,
    params: Partial<IPopoverParams> = {}
  ) {
    this.params = { ...defaultPopoverParams, ...params };
    // TODO: Rework
    this.params.isMenu =
      this.params.isMenu || element.hasAttribute("data-popover-menu");
    this.params.isOnce =
      this.params.isOnce || element.hasAttribute("data-popover-once");
    this.params.isDynamic =
      params.isDynamic || element.hasAttribute("data-popover-dynamic");
    this.params.isForced =
      params.isForced || element.hasAttribute("data-popover-forced");

    this.config = {
      element,
      savedChildren: [],
      isActive: false,
      isTranslating: false,
    };

    if (!this.params.isForced) {
      this.config.control = <HTMLElement>(
        document.querySelector(
          `[data-popover-id=${element.id}][data-popover-action]`
        )
      );
    }

    // Fake focus trap is INITIALIZED BEFORE SAVING CHILDREN AND LISTENING TO DYNAMIC CHANGES!
    this.#_initFakeTrapFocus();

    if (this.params.isDynamic) {
      this.config.savedNodes = new Set();
      this.#_removeMutationObservers();
      this.#_initMutationObservers();
    }

    this.#_removeEventListeners();
    this.#_initEventListeners();

    if (this.params.isForced) {
      this.show();
    }
  }

  #_handleDocumentClick = (evt: MouseEvent) => {
    if (!this.config.isActive) return;

    const target = <Element>evt.target;

    if (this.config.control?.contains(target)) return;

    if (this.params.isMenu) {
      this.hide();
    }

    if (this.config.element.contains(target)) return;
    if (this.config.savedChildren.some((child) => child.contains(target)))
      return;

    let savedWasFound = false;

    if (this.config.savedNodes != undefined) {
      this.config.savedNodes.forEach((node, key, set) => {
        if (node.contains(target)) {
          savedWasFound = true;
          return;
        }
      });
    }

    if (savedWasFound) return;

    this.hide();
  };

  #_handleLastElementFocus = (evt: FocusEvent) => {
    if (!this.config.isActive) return;
    evt.preventDefault();
    return this.config.firstFocusableEl?.focus();
  };

  #_handleDocumentKeyDown = (evt: KeyboardEvent) => {
    // TODO: Add Home btn + End btn support
    if (!this.config.isActive) return;

    if (evt.code === "Tab") {
      if (evt.shiftKey) {
        if (evt.target === this.config.firstFocusableEl) {
          evt.preventDefault();
          return this.config.firstFocusableEl.focus();
        }
        return;
      }

      if (evt.target === this.config.lastFocusableEl) {
        evt.preventDefault();
        return this.config.firstFocusableEl?.focus();
      }
      return;
    }

    // TODO: Rework Esc key
    if (evt.code === "Escape") {
      evt.preventDefault();
      return this.hide();
    }

    if (evt.code === "Enter") {
      if (this.params.isMenu) {
        if (document.activeElement === this.config.firstFocusableEl) {
          evt.preventDefault();
          return this.hide();
        }
      }
    }

    if (evt.code === "Space") {
      if (this.params.isMenu) {
        if (document.activeElement === this.config.firstFocusableEl) {
          return this.hide();
        }
      }
    }

    // The key combo is unknown so go ahead
  };

  #_handleWindowResize = () => {
    // TODO: Fix resize because sometimes position is bugging out
    if (!this.config?.isActive) return;
    this.show();
  };

  #_handleDocumentMouseDown = (evt: MouseEvent) => {
    if (!this.config.isActive) return;

    const target = <Element>evt.target;

    if (this.config.control?.contains(target)) return;

    if (this.params.isMenu) {
      this.hide();
    }

    if (this.config.element.contains(target)) return;
    if (this.config.savedChildren.some((child) => child.contains(target)))
      return;

    let savedWasFound = false;

    if (this.config.savedNodes != undefined) {
      this.config.savedNodes.forEach((node, key, set) => {
        if (node.contains(target)) {
          savedWasFound = true;
          return;
        }
      });
    }

    if (savedWasFound) return;

    this.hide();
  };

  #_handleControlClick = (evt: Event) => {
    evt.preventDefault();

    const currentTarget = <Element>evt.currentTarget;
    const action = currentTarget.getAttribute("data-popover-action");

    if (action && this[action]) {
      const actionArgs = currentTarget.getAttribute("data-popover-action-args");
      this[action](actionArgs);
    }
  };

  #_destroySelf = () => {
    this.#_removeEventListeners();
    this.#_removeMutationObservers();

    this.config.element.remove();

    Object.getOwnPropertyNames(this).forEach((property) => {
      this[property] = null;
    });
  };

  #_initEventListeners = () => {
    this.config.control?.addEventListener("click", this.#_handleControlClick);
    window.addEventListener("resize", throttle(this.#_handleWindowResize, 100));
    document.addEventListener("mousedown", this.#_handleDocumentMouseDown);
    document.addEventListener("keydown", this.#_handleDocumentKeyDown);
    document.addEventListener("click", this.#_handleDocumentClick);
    this.config.lastFocusableEl?.addEventListener(
      "focus",
      this.#_handleLastElementFocus
    );
  };

  #_removeEventListeners = () => {
    this.config.control?.removeEventListener(
      "click",
      this.#_handleControlClick
    );

    window.removeEventListener(
      "resize",
      throttle(this.#_handleWindowResize, 100)
    );
    document.removeEventListener("mousedown", this.#_handleDocumentMouseDown);
    document.removeEventListener("keydown", this.#_handleDocumentKeyDown);
    document.removeEventListener("click", this.#_handleDocumentClick);
    this.config.lastFocusableEl?.removeEventListener(
      "focus",
      this.#_handleLastElementFocus
    );
  };

  #_initMutationObservers = () => {
    const observerConfig = {
      childList: true,
      subtree: true,
    };

    this.config.mutationObserver = new MutationObserver(
      this.#_handleMutationObserverMutations
    );

    this.config.mutationObserver.observe(this.config.element, observerConfig);
  };

  #_removeMutationObservers = () => {
    this.config.mutationObserver?.disconnect();
  };

  #_handleMutationObserverMutations = (
    mutationsList: Array<MutationRecord>,
    observer: MutationObserver
  ) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.removedNodes.forEach((node) => {
          // delete node ONLY IF ITS NOT LONGER IN DOCUMENT
          if (!document.body.contains(node)) {
            this.config.savedNodes?.delete(<Element>node);
          }
        });
        mutation.addedNodes.forEach((node) => {
          this.config.savedNodes?.add(<Element>node);
        });
      }
    }
  };

  #_initFakeTrapFocus = () => {
    const fakeFocusableDiv = document.createElement("div");

    fakeFocusableDiv.tabIndex = 0;
    fakeFocusableDiv.style.cssText +=
      ";" + "overflow-y: auto; width: 100%; height: 100%; max-height: 320px";

    const fakeFocusableButton = document.createElement("button");

    fakeFocusableButton.style.cssText +=
      ";" +
      "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;";

    fakeFocusableDiv.append(...this.config.element.childNodes);

    this.config.element.appendChild(fakeFocusableDiv);
    this.config.element.appendChild(fakeFocusableButton);

    this.config.firstFocusableEl = fakeFocusableDiv;
    this.config.lastFocusableEl = fakeFocusableButton;
    this.config.savedChildren = [...this.config.element.children];
  };

  #_calculatePosition = () => {
    if (!this.config.element) return;

    const anchorEl = this.config.control || this.params.popoverPositionFrom;

    if (!anchorEl) {
      console.error("TO IMPLEMENT WHEN THERE NO ANCHOR EL!");
      return;
    }

    const {
      width: anchorWidth,
      height: anchorHeight,
      left: anchorLeft,
      top: anchorTop,
    } = anchorEl.getBoundingClientRect();

    let x = anchorLeft + window.scrollX;
    let y = anchorTop + window.scrollY;

    this.config.element.style.left = x + "px";
    this.config.element.style.top =
      y + anchorHeight + this.params.popoverYOffset + "px";

    const {
      width: elementWidth,
      height: elementHeight,
      left: elementLeft,
      top: elementTop,
    } = this.config.element.getBoundingClientRect();

    x = elementLeft + window.scrollX;
    y = elementTop + window.scrollY;

    if (Math.ceil(x + elementWidth) >= window.innerWidth) {
      this.config.element.style.left = x - elementWidth + anchorWidth + "px";
    }

    if (
      Math.ceil(
        y + elementHeight + anchorHeight + this.params.popoverYOffset
      ) >= window.innerHeight
    ) {
      this.config.element.style.top =
        y -
        elementHeight -
        anchorHeight -
        this.params.popoverYOffset -
        this.params.popoverYOffset +
        "px";
    }
  };

  show = () => {
    if (this.config.isTranslating) return;

    if (!this.config.isActive) {
      // Move only once
      document.body.appendChild(this.config.element);

      this.config.element.style.opacity = "0";
      this.config.element.style.transition = "opacity 0.2s ease";
      this.config.isTranslating = true;
      this.config.element.show();
      this.config.element.style.opacity = "1";

      setTimeout(() => {
        this.config.element.addEventListener(
          "transitionend",
          () => {
            this.config.firstFocusableEl?.focus();
            this.config.isActive = true;
            this.config.isTranslating = false;
          },
          { once: true }
        );
        this.config.element.dispatchEvent(new TransitionEvent("transitionend"));
      }, parseFloat(window.getComputedStyle(this.config.element).transitionDuration) * 1000);
    }

    this.#_calculatePosition();
  };

  hide = (withoutFocus: boolean = false) => {
    if (!this.config.isActive || this.config.isTranslating) return;

    this.config.isTranslating = true;

    this.config.element.style.opacity = "0";

    setTimeout(() => {
      this.config.element.addEventListener(
        "transitionend",
        () => {
          this.config.element.close();
          if (this.params.isOnce) {
            this.#_destroySelf();
          } else {
            this.config.control?.focus();
            this.config.isActive = false;
            this.config.isTranslating = false;
          }
        },
        { once: true }
      );
      this.config.element.dispatchEvent(new TransitionEvent("transitionend"));
    }, parseFloat(window.getComputedStyle(this.config.element).transitionDuration) * 1000);
  };
}
