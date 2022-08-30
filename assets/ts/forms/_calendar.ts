// TODO: Implement
// 0 - Январь
// 1 - Февраль и тд
// month is between 1 and 12
export const getMonthDays = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayOfWeek = (year: number, month: number, day: number) => {
  return new Date(year, month - 1, day).toLocaleString("ru-RU", {
    year: "numeric",
    weekday: "long",
    month: "long",
  });
};

// object month by days
// {0: [], 1: [], 2: []}

// returns value between 0 - Sunday and 6 - Saturday
const getWeekday = (year: number, month: number, day: number) => {
  return new Date(year, month, day).getDay();
};

// day obj = {year: {} month: {} day: {} week to impelement week}

interface IDay {
  numeric: string;
  formatted: string;
}

export interface IFieldDateConfig {
  element: HTMLElement;
  controls: Array<HTMLElement>;
  input: HTMLInputElement;
  name: string;
  value: string;

  currentDate: Date;
  currentYear: number;
  currentMonth: number;
  currentDay: number;

  calendar: HTMLElement;
}

export class FieldDate {
  config: IFieldDateConfig;

  constructor(element: HTMLElement) {
    const name = <string>element.getAttribute("data-form-field");

    const input = <HTMLInputElement>element.querySelector("input");

    const controls = <Array<HTMLElement>>[
      ...element.querySelectorAll("[data-form-field-date-action]"),
    ];

    const calendar = <HTMLElement>(
      element.querySelector("[data-form-field-date-calendar]")
    );

    const savedDate = new Date();
    const savedYear = savedDate.getFullYear();
    const savedMonth = savedDate.getMonth();
    const savedDay = savedDate.getDate();

    const currentDate = new Date(savedYear, savedMonth, 1);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    this.config = {
      element,
      name,
      input,
      controls,
      value: "",
      calendar,
      currentDate,
      currentDay,
      currentMonth,
      currentYear,
    };

    console.log(this.config);
    this.initCalendar();
    // TODO: DO EVENT DELEGATION
    this.#_removeEventListeners();
    this.#_initEventListeners();
  }

  #_initEventListeners = () => {
    this.config.controls.forEach((control) => {
      control.addEventListener("click", this.#_handleControlClick);
    });
  };

  #_removeEventListeners = () => {
    this.config.controls.forEach((control) => {
      control.removeEventListener("click", this.#_handleControlClick);
    });
  };

  #_handleControlClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const currentTarget = <HTMLElement>evt.currentTarget;

    const action = currentTarget.getAttribute("data-form-field-date-action");

    if (action && this[action] instanceof Function) {
      const args = currentTarget.getAttribute(
        "data-form-field-date-action-args"
      );
      this[action](args);
    }
  };

  #_pad = (number: number) => (number < 10 ? "0" + number : number.toString());

  getCalendarPanel = (year: number, month: number) => {
    const panelFlat: Array<IDay> = [];
    /*
  
    Месяцы в JS: Январь - 0 Февраль - 1 ... Декабрь - 11
    Дни недели в JS: Воскресенье - 0 Понедельник - 1 ... Суббота - 6 
  
    Универсальный размер календаря - 42 ячейки: 6 строк на 7 столбцов 
  
    Почему не подходит размер календаря в 35 ячеек: 5 строк на 7 столбцов? (минимальное свободное число ячеек для 35 календаря = 35 - 31 = 4 ячейки)
  
    Если месяц имеет 31 день и первый день месяца Воскресенье то матрица будет следующего вида
  
    [ 1, 2, 3, 4, 5, 6, 0]
  
    [Пн,Вт,Cр,Чт,Пт,Сб,Вс]
    [ok,ok,ok,ok,NO,NO,01]
    [02,03,04,05,06,07,08]
    [09,10,11,12,13,14,15]
    [16,17,18,19,20,21,22]
    [23,24,25,26,27,28,29] 30,31 -? 
  
    Все 4 свободные ячейки заполняются, однако не хватает еще 2! 30 и 31 день не может быть добавлен в такую матрицу и требуется перерасчет размера календаря 
  
    Далее рассмотрен ФЕВРАЛЬ НЕ високосного года 
  
    LB - leftBorder
    RB - rightBorder
    xx - на данный момент не известные дни
  
    [ 1, 2, 3, 4, 5, 6, 0]
  
    [Пн,Вт,Cр,Чт,Пт,Сб,Вс]
    [LB,xx,xx,|01,02,03,04]
    [05,06,07,08,09,10,11]
    [12,13,14,15,16,17,18]
    [19,20,21,22,23,24,25]
    [26,27,28,xx,xx,xx,RB]
  
    LB = 4 (Порядковый номер текущего дня)
    
    ИСКЛЮЧЕНИЕ:
  
    [ 1, 2, 3, 4, 5, 6, 0]
  
    [LB,xx,xx,xx,xx,xx,01]
  
    LB = 7
  
    RB = 42 - LB 
    */

    const matrixSize = 42; // НЕ 35!

    let leftBorder = getWeekday(year, month, 1);

    if (leftBorder === 0) {
      leftBorder = 7;
    }

    for (let i = leftBorder - 2; i >= 0; i--) {
      // -1 - предыдущий предыдущего
      // 0 - предыдущий день
      const weekday = new Date(year, month, i * -1);
      panelFlat.push({
        numeric: this.#_pad(weekday.getDate()),
        formatted: `${weekday.getFullYear()}-${this.#_pad(
          weekday.getMonth() + 1
        )}-${this.#_pad(weekday.getDate())}`,
      });
    }

    const rightBorder = matrixSize - leftBorder;

    // Нумерация начинается с 1 -> <=
    // Включить последний день -> + 1
    for (let i = 1; i <= rightBorder + 1; i++) {
      const weekday = new Date(year, month, i);
      panelFlat.push({
        numeric: this.#_pad(weekday.getDate()),
        formatted: `${weekday.getFullYear()}-${this.#_pad(
          weekday.getMonth() + 1
        )}-${this.#_pad(weekday.getDate())}`,
      });
    }

    const panel: Array<Array<IDay>> = [];

    for (let i = 0; i < panelFlat.length; i += 7) {
      panel.push(panelFlat.slice(i, i + 7));
    }

    return panel;
  };

  initCalendar = () => {
    const panel = this.getCalendarPanel(
      this.config.currentYear,
      this.config.currentMonth
    );

    // TODO: it is better TO DO EVENT DELEGATION
    this.config.calendar.querySelectorAll("button").forEach((btn) => {
      btn.removeEventListener("click", this.#_handleControlClick);
    });

    this.config.calendar.replaceChildren();

    panel.forEach((week) => {
      const tr = document.createElement("tr");

      week.forEach((day) => {
        const td = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = day.numeric;
        btn.setAttribute("data-form-field-date-action", "changeValue");
        btn.setAttribute("data-form-field-date-action-args", day.formatted);
        btn.addEventListener("click", this.#_handleControlClick);
        td.appendChild(btn);
        tr.appendChild(td);
      });

      this.config.calendar.appendChild(tr);
    });
  };

  changeValue = (value: string) => {
    this.config.value = value;
    this.config.input.value = value;
  };

  #_updateDate = (date: Date) => {
    this.config.currentDate = new Date(date.getTime());
    this.config.currentYear = date.getFullYear();
    this.config.currentMonth = date.getMonth();
    // this.config.currentDay = date.getDate();
  };

  #_updateDay = (day: number) => {};

  changeMonth = (value: string | number) => {
    if (value === "after") {
      const date = new Date(this.config.currentDate.getTime());
      date.setMonth(this.config.currentMonth + 1);
      this.#_updateDate(date);
      this.initCalendar();
      return;
    }

    if (value === "before") {
      const date = new Date(this.config.currentDate.getTime());
      date.setMonth(this.config.currentMonth - 1);
      this.#_updateDate(date);
      this.initCalendar();
      return;
    }
  };
}
