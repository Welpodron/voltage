import { BtnThemeSwitcher, BtnScrollToTop, BtnSidebarResizer } from "./_btns";
import { Collapse, ICollapseHTMLElement } from "./_collapse";
import { TableOfContents } from "./_tableofcontents";
import { Tooltip } from "./_tooltip";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.querySelectorAll("[data-btn-scroll-to-top]").forEach((element) => {
      new BtnScrollToTop(element);
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

    document.querySelectorAll("[data-table-of-contests]").forEach((element) => {
      new TableOfContents(element, {
        listClass: "v-table-of-contests__list",
        itemClass: "v-table-of-contests__item",
        linkClass: "v-table-of-contests__link",
      });
    });
  },
  { once: true }
);
