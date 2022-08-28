import { BtnThemeSwitcher, BtnSidebarResizer } from "./_btns";
import { Collapse, ICollapseHTMLElement } from "./_collapse";
import { Popover } from "./_popover";
import { Scroller } from "./_scroller";
import { TableOfContents } from "./_tableofcontents";
import { Tabs } from "./_tabs";
import { Tooltip } from "./_tooltip";
import { SelectBox } from "./_selectbox";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.querySelectorAll("[data-scroller]").forEach((element) => {
      new Scroller(<HTMLElement>element);
    });

    document.querySelectorAll("[data-tabs]").forEach((element) => {
      new Tabs(<HTMLElement>element);
    });

    document
      .querySelectorAll("[data-btn-sidebar-resizer]")
      .forEach((element) => {
        new BtnSidebarResizer(element);
      });
    document
      .querySelectorAll("[data-btn-theme-switcher]")
      .forEach((element) => {
        new BtnThemeSwitcher(element);
      });

    document.querySelectorAll("[data-collapse]").forEach((element) => {
      new Collapse(<ICollapseHTMLElement>element);
    });

    document
      .querySelectorAll("[data-tooltip][aria-label]")
      .forEach((element) => {
        new Tooltip(element, { tooltipElClass: "v-tooltip" });
      });

    document.querySelectorAll("dialog[data-popover]").forEach((element) => {
      new Popover(<HTMLDialogElement>element);
    });

    document.querySelectorAll("[data-table-of-contests]").forEach((element) => {
      new TableOfContents(element, {
        listClass: "v-table-of-contests__list",
        itemClass: "v-table-of-contests__item",
        linkClass: "v-table-of-contests__link",
      });
    });

    // Forms API
    document
      .querySelectorAll("[data-form-field='selectbox']")
      .forEach((element) => {
        new SelectBox(<HTMLElement>element);
      });
  },
  { once: true }
);
