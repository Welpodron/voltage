import { Animation } from "./_utils";

export class Tabs {
  element: HTMLElement;
  controls: Array<HTMLElement>;
  items: Array<HTMLElement>;
  tablist: HTMLElement;
  tablistItems: Array<HTMLElement>;
  currentTablistItem: HTMLElement;
  currentItem: HTMLElement;
  previousItem: HTMLElement;

  previousItemAnimation?: Animation;
  nextItemAnimation?: Animation;

  constructor(element: HTMLElement) {
    this.element = element;

    this.items = <Array<HTMLElement>>(
      [...this.element.querySelectorAll("[data-tabs-item]")].filter(
        (item) =>
          item.parentElement && !item.parentElement.closest("[data-tabs-item]")
      )
    );

    this.currentItem = this.items[0];

    this.items.forEach((item) => {
      if (item.getAttribute("data-tabs-item-active"))
        return (this.currentItem = item);
    });

    this.items.forEach((item) => {
      if (this.currentItem === item) {
        item.setAttribute("data-tabs-item-active", "");
        item.setAttribute("data-tabs-item-showing", "");
      } else {
        item.removeAttribute("data-tabs-item-active");
        item.removeAttribute("data-tabs-item-showing");
      }
    });

    this.previousItem = this.currentItem;

    this.controls = <Array<HTMLElement>>[
      ...document.querySelectorAll(
        `[data-tabs-action][data-tabs-id=${this.element.id}]`
      ),
    ];

    this.controls.forEach((control) => {
      control.addEventListener("click", this.handleControlClick);
    });

    this.tablist = <HTMLElement>(
      this.element.querySelector("[data-tabs-tablist]")
    );

    if (this.tablist) {
      this.tablist.setAttribute("role", "tablist");

      this.tablistItems = <Array<HTMLElement>>(
        [...this.tablist.querySelectorAll("[data-tabs-tablist-item]")].filter(
          (item) =>
            item.parentElement &&
            !item.parentElement.closest("[data-tabs-tablist-item]")
        )
      );

      this.currentTablistItem = this.tablistItems[0];

      this.tablistItems.forEach((control) => {
        const controlFor = control.getAttribute("data-tabs-tablist-item");
        if (
          controlFor &&
          parseInt(controlFor) === this.items.indexOf(this.currentItem)
        )
          return (this.currentTablistItem = control);
      });

      this.tablistItems.forEach((control) => {
        if (this.currentTablistItem === control) {
          control.ariaSelected = "true";
        } else {
          control.ariaSelected = "false";
          control.tabIndex = -1;
        }

        control.setAttribute("role", "tab");
      });

      this.tablist.addEventListener("keydown", this.handleTablistKeyDown);
    }
  }

  handleControlClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const currentTarget = <HTMLElement>evt.currentTarget;
    const action = currentTarget.getAttribute("data-tabs-action");

    if (action && this[action]) {
      const actionArgs = currentTarget.getAttribute("data-tabs-action-args");
      this[action](actionArgs);
    }
  };

  handleTablistKeyDown = (evt: KeyboardEvent) => {
    // TODO: add HOME and END keys support
    if (evt.code === "ArrowRight" || evt.code === "ArrowDown") {
      evt.preventDefault();
      // TODO: Fix cycle На данный момент цикл сбрасывается так как если например 3 элемент ведет на item которого нет то перехода не будет
      //   TODO: Fix to DRY
      const nextTablistItem =
        this.tablistItems[
          (this.tablistItems.indexOf(this.currentTablistItem) + 1) %
            this.tablistItems.length
        ];

      const controlFor = nextTablistItem.getAttribute("data-tabs-tablist-item");

      if (controlFor) {
        this.show(controlFor);
      }

      return;
    }

    if (evt.code === "ArrowLeft" || evt.code === "ArrowUp") {
      evt.preventDefault();

      // prev item cycled
      const nextTablistItem =
        this.tablistItems[
          (this.tablistItems.indexOf(this.currentTablistItem) +
            this.tablistItems.length -
            1) %
            this.tablistItems.length
        ];

      const controlFor = nextTablistItem.getAttribute("data-tabs-tablist-item");

      if (controlFor) {
        this.show(controlFor);
      }

      return;
    }
  };

  show = (position: string) => {
    const nextItem = this.items[parseInt(position)];

    if (!nextItem) return;

    // COMPLETE ANIMATIONS FAST
    if (this.previousItemAnimation) {
      this.previousItemAnimation.end();
      if (this.nextItemAnimation) {
        this.nextItemAnimation.end();
      }
    }

    // Allow change if this.previousItem === nextItem BUT dont play animations
    this.previousItem = this.currentItem;

    this.currentItem = nextItem;

    if (this.previousItem === nextItem) {
      return;
    }

    // fast controls update for animations

    if (this.tablistItems) {
      const nextTablistItem = this.tablistItems.find((control) => {
        const controlFor = control.getAttribute("data-tabs-tablist-item");

        if (
          controlFor &&
          parseInt(controlFor) === this.items.indexOf(this.currentItem)
        ) {
          return true;
        }

        return false;
      });

      if (nextTablistItem) {
        this.currentTablistItem.tabIndex = -1;
        this.currentTablistItem.ariaSelected = "false";
        this.currentTablistItem = nextTablistItem;
        nextTablistItem.removeAttribute("tabindex");
        nextTablistItem.ariaSelected = "true";
        // TODO: focus only if was sent here by arrow key NOT BY control
        nextTablistItem.focus();
      }
    }

    // Variant number 1
    // Less buggy version but CSS based + more selectors
    // this.previousItem.removeAttribute("data-tabs-item-active");
    // this.currentItem.setAttribute("data-tabs-item-active", "");

    // this.previousItem.removeAttribute("data-tabs-item-showing");
    // this.currentItem.scrollWidth;
    // this.currentItem.setAttribute("data-tabs-item-showing", "");

    // Variant number 2
    // More performant BUT buggy needs further inspection
    // Needs spam fix check bug
    this.previousItemAnimation = new Animation({
      duration: 250,
      from: { opacity: 1 },
      to: { opacity: 0 },
      before: (state) => {
        this.previousItem.style.transition = "opacity 0s";
      },
      step: ({ props }) => {
        this.previousItem.style.opacity = props.opacity + "";
      },
      after: (state) => {
        this.previousItem.style.display = "none";
        this.previousItem.removeAttribute("data-tabs-item-active");
        this.previousItem.removeAttribute("data-tabs-item-showing");
        if (this.nextItemAnimation) {
          this.nextItemAnimation.start();
        }
      },
    });

    this.nextItemAnimation = new Animation({
      duration: 250,
      from: { opacity: 0 },
      to: { opacity: 1 },
      before: (state) => {
        this.currentItem.style.transition = "opacity 0s";
        this.currentItem.style.display = "block";
      },
      step: ({ props }) => {
        this.currentItem.style.opacity = props.opacity + "";
      },
      after: (state) => {
        // Sometimes bugs out needs further inspection
        // this.previousItemAnimation = undefined;
        // this.nextItemAnimation = undefined;
        this.currentItem.setAttribute("data-tabs-item-active", "");
        this.currentItem.setAttribute("data-tabs-item-showing", "");
      },
    });

    this.previousItemAnimation.start();
  };
}
