import { BtnThemeSwitcher, BtnSidebarResizer, BtnScrollToTop } from "./_btns";
import { Collapse, ICollapseHTMLElement } from "./_collapse";
import { Popover } from "./_popover";
import { TableOfContents } from "./_tableofcontents";
import { Tabs } from "./_tabs";
import { Tooltip } from "./_tooltip";

import { Clipboard } from "./_clipboard";
import { Roulette } from "./_roulette";

// FORMS API START
import { Checkbox, CheckboxGroup } from "./forms/_checkbox";
import { SelectBox } from "./forms/_selectbox";
import { FieldDate } from "./forms/_calendar";
// FORMS API END

// Calendar API start
// import { getMonthDays, getCalendarPanel } from "./forms/_calendar";

// 0 - Январь 1 - Февраль 11 - Декабрь
// 0 - Вс 1 - Пн 6 - Суббота
// getMonthDays => число от 1 до 31 включительно
// const year = 2022;
// const month = 8 - 1; // Август 8 месяц, но нумерация начинается с нуля
// const panel = getCalendarPanel(year, month);
// // console.log(getMonthDays(year, month));
// // console.log(getGroups(year, month, getMonthDays(year, month)));
// document.querySelectorAll("[data-row]").forEach((row, rowIndex) => {
//   panel[rowIndex].forEach((day) => {
//     const td = document.createElement("td");
//     td.classList.add("CALENDAR_EXAMPLE_CELL");

//     td.textContent = day.numeric;

//     row.appendChild(td);
//   });
// });

// Calendar API end

// WEB-COMPONENTS API START
import { ImgMagnifier } from "./web-components/_img-magnifier";

customElements.define("v-wc-magnifier", ImgMagnifier);
// WEB-COMPONENTS API END

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.querySelectorAll(".v-code [data-clipboard]").forEach((element) => {
      new Clipboard(<HTMLElement>element, {
        beforeCopy: (state) => {
          state.currentConfig.control.setAttribute("disabled", "true");
          state.currentConfig.control.dispatchEvent(new Event("hidecalled"));
          state.currentConfig.control.classList.add("v-code__btn--loading");
        },
        onCopyError: (state) => {
          console.error(state.currentError);
          state.currentConfig.control.classList.remove("v-code__btn--loading");
          state.currentConfig.control.removeAttribute("disabled");
        },
        afterCopy: (state) => {
          const beforeText =
            state.currentConfig.control.getAttribute("aria-label");

          if (beforeText) {
            state.currentConfig.control.setAttribute(
              "aria-label",
              "Код скопирован"
            );
          }

          state.currentConfig.control.classList.remove("v-code__btn--loading");
          state.currentConfig.control.classList.add("v-code__btn--success");
          state.currentConfig.control.dispatchEvent(new Event("showcalled"));
          setTimeout(() => {
            state.currentConfig.control.dispatchEvent(new Event("hidecalled"));

            if (beforeText) {
              state.currentConfig.control.setAttribute(
                "aria-label",
                beforeText
              );
            }

            state.currentConfig.control.classList.remove(
              "v-code__btn--success"
            );

            state.currentConfig.control.removeAttribute("disabled");
          }, 800);
          //
        },
      });
    });

    document
      .querySelectorAll("[data-tooltip][aria-label]")
      .forEach((element) => {
        new Tooltip(<HTMLElement>element, { tooltipElClass: "v-tooltip" });
      });

    document.querySelectorAll("[data-btn-scroll-to-top]").forEach((element) => {
      new BtnScrollToTop(<HTMLElement>element);
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

    document.querySelectorAll("[data-roulette]").forEach((element) => {
      new Roulette(<HTMLElement>element);
    });

    // Forms API
    document
      .querySelectorAll("[data-form-field='selectbox']")
      .forEach((element) => {
        new SelectBox(<HTMLElement>element);
      });

    document
      .querySelectorAll("[data-form-field][data-form-field-type='checkbox']")
      .forEach((element) => {
        new Checkbox(<HTMLElement>element);
      });
    document
      .querySelectorAll(
        "[data-form-field][data-form-field-type='checkbox-group']"
      )
      .forEach((element) => {
        new CheckboxGroup(<HTMLElement>element);
      });

    document.querySelectorAll("[data-form-field-date]").forEach((element) => {
      new FieldDate(<HTMLElement>element);
    });
  },
  { once: true }
);
