export class Tabs {
  element: HTMLElement;
  controls: Array<HTMLElement>;
  items: Array<HTMLElement>;
  tablist: HTMLElement;
  tablistItems: Array<HTMLElement>;
  currentTablistItem: HTMLElement;
  currentItem: HTMLElement;

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
      this.currentItem === item
        ? item.setAttribute("data-tabs-item-active", "")
        : item.removeAttribute("data-tabs-item-active");
    });

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

    if (!nextItem || nextItem === this.currentItem) return;

    // fast controls update for animations

    if (this.tablistItems) {
      const nextTablistItem = this.tablistItems.find((control) => {
        const controlFor = control.getAttribute("data-tabs-tablist-item");

        if (
          controlFor &&
          parseInt(controlFor) === this.items.indexOf(nextItem)
        ) {
          return true;
        }

        return false;
      });

      if (nextTablistItem) {
        nextTablistItem.removeAttribute("tabindex");
        nextTablistItem.ariaSelected = "true";
        // TODO: focus only if was sent here by arrow key NOT BY control
        nextTablistItem.focus();
        this.currentTablistItem.tabIndex = -1;
        this.currentTablistItem.ariaSelected = "false";
        this.currentTablistItem = nextTablistItem;
      }
    }

    this.currentItem.style.display = "none";
    this.currentItem.removeAttribute("data-tabs-item-active");
    nextItem.setAttribute("data-tabs-item-active", "");
    nextItem.style.display = "block";
    this.currentItem = nextItem;
  };
}
