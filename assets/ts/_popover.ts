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

  // lastActiveElement: Element | null;
  // keyboardfocusableElements: Array<Element>;
  // keyboardfocusableElementActive: Element;

  constructor(
    element: HTMLDialogElement,
    params: Partial<IPopoverParams> = {}
  ) {
    const savedChildren = [...element.children];

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
      savedChildren,
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

    if (this.params.isDynamic) {
      this.config.savedNodes = new Set();
      this.#_removeMutationObservers();
      this.#_initMutationObservers();
    }

    // TODO: REWORK! DO NOT INCLUDE HERE CHILDREN!!!! IT CAUSES FOCUS PROBLEMS
    // this.keyboardfocusableElements = [
    //   ...this.element.querySelectorAll(
    //     'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    //   ),
    // ].filter(
    //   (el) =>
    //     !el.hasAttribute("hidden") &&
    //     !el.hasAttribute("disabled") &&
    //     !el.getAttribute("aria-hidden")
    // );

    // this.keyboardfocusableElementActive = this.keyboardfocusableElements[0];

    this.#_removeEventListeners();
    this.#_initEventListeners();

    if (this.params.isForced) {
      this.show();
    }
  }

  #_handleElementClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const target = <Element>evt.target;

    if (target === this.config.element) return;

    if (this.params.isMenu) {
      return this.hide();
    }
  };

  #_handleDocumentKeyDown = (evt: KeyboardEvent) => {
    // TODO: Add Home btn + End btn support
    if (!this.config.isActive) return;

    if (
      evt.code === "ArrowDown" ||
      evt.code === "ArrowRight" ||
      (!evt.shiftKey && evt.code === "Tab")
    ) {
      evt.preventDefault();
      // const nextKeyboardfocusableElementActive =
      //   this.keyboardfocusableElements[
      //     (this.keyboardfocusableElements.indexOf(
      //       this.keyboardfocusableElementActive
      //     ) +
      //       1) %
      //       this.keyboardfocusableElements.length
      //   ];
      // (<HTMLElement>nextKeyboardfocusableElementActive).focus();
      // this.keyboardfocusableElementActive = nextKeyboardfocusableElementActive;
      return;
    }

    if (
      evt.code === "ArrowUp" ||
      evt.code === "ArrowLeft" ||
      (evt.shiftKey && evt.code === "Tab")
    ) {
      evt.preventDefault();
      // const nextKeyboardfocusableElementActive =
      //   this.keyboardfocusableElements[
      //     (this.keyboardfocusableElements.indexOf(
      //       this.keyboardfocusableElementActive
      //     ) +
      //       this.keyboardfocusableElements.length -
      //       1) %
      //       this.keyboardfocusableElements.length
      //   ];
      // (<HTMLElement>nextKeyboardfocusableElementActive).focus();
      // this.keyboardfocusableElementActive = nextKeyboardfocusableElementActive;
      return;
    }

    // TODO: Rework Esc key
    if (evt.code === "Escape") {
      evt.preventDefault();
      return this.hide();
    }

    // The key combo is unknown so go ahead
  };

  #_handleWindowResize = () => {
    // TODO: Fix resize because sometimes position is bugging out
    if (!this.config.isActive) return;
    this.show();
  };

  #_handleDocumentMouseDown = (evt: MouseEvent) => {
    if (!this.config.isActive) return;
    const target = <Element>evt.target;

    if (this.config.control?.contains(target)) return;
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

    // if (this.config.control) {
    //   this.config.control.removeAttribute("data-popover-action");
    //   this.config.control.removeAttribute("data-popover-id");
    // }

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
    this.config.element.addEventListener("click", this.#_handleElementClick);
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
    this.config.element.removeEventListener("click", this.#_handleElementClick);
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

  show = () => {
    if (this.config.isTranslating) return;

    // Force this element to body end
    // DONT MOVE
    document.body.appendChild(this.config.element);

    const anchorElement =
      this.config.control || this.params.popoverPositionFrom;

    if (!anchorElement) {
      // TODO: IMPLEMENT
      console.warn(
        "TODO: Implement without control action, isForced for example"
      );
      return;
    }

    let {
      width: controlWidth,
      height: controlHeight,
      left: controlLeft,
      top: controlTop,
    } = anchorElement.getBoundingClientRect();

    controlLeft += window.scrollX;
    controlTop += window.scrollY;

    // console.log(controlTop + controlHeight);

    this.config.element.style.left = controlLeft + "px";
    this.config.element.style.top =
      controlTop + controlHeight + this.params.popoverYOffset + "px";

    if (!this.config.isActive) {
      this.config.element.style.opacity = "0";
      this.config.element.style.transition = "opacity 0.2s ease";
      this.config.isTranslating = true;
      // this.lastActiveElement = document.activeElement;
      this.config.element.show();
      this.config.element.style.opacity = "1";

      setTimeout(() => {
        this.config.element.addEventListener(
          "transitionend",
          () => {
            // (<HTMLElement>this.keyboardfocusableElementActive).focus();
            this.config.isActive = true;
            this.config.isTranslating = false;
          },
          { once: true }
        );
        this.config.element.dispatchEvent(new TransitionEvent("transitionend"));
      }, parseFloat(window.getComputedStyle(this.config.element).transitionDuration) * 1000);
    }

    const {
      width: elementWidth,
      height: elementHeight,
      left: elementLeft,
      top: elementTop,
    } = this.config.element.getBoundingClientRect();

    if (Math.ceil(elementLeft + elementWidth) >= window.innerWidth) {
      this.config.element.style.left =
        elementLeft + window.scrollX - controlWidth - elementWidth + "px";
    }

    if (
      Math.ceil(elementTop + elementHeight + this.params.popoverYOffset) >=
      window.innerHeight
    ) {
      this.config.element.style.top =
        elementTop -
        elementHeight -
        controlHeight -
        this.params.popoverYOffset -
        this.params.popoverYOffset +
        window.scrollY +
        "px";
    }
  };

  hide = (withoutFocus: boolean = false) => {
    if (!this.config.isActive || this.config.isTranslating) return;

    this.config.isTranslating = true;

    this.config.element.style.opacity = "0";

    setTimeout(() => {
      this.config.element.addEventListener(
        "transitionend",
        () => {
          // (<HTMLElement>this.keyboardfocusableElementActive).focus();
          this.config.element.close();
          if (this.params.isOnce) {
            this.#_destroySelf();
          } else {
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
