---
title: "voltage.calendar"
date: 2022-08-24T18:20:52+03:00
draft: false
---

<form>
<p>Input type "date"</p>
<input name="date" type="date" />
<p>Input type "datetime-local"</p>
<input name="datetime-local" type="datetime-local" />
<p>Input type "time"</p>
<input name="time" type="time" />
</form>

<p>Custom</p>
<p>Input type "date"</p>
<div class="v-field-date" data-form-field="date" data-form-field-type="date" data-form-field-date>
    <input />
    <button data-form-field-date-action="show" type="button" data-popover-action="show" data-popover-id="calendar_example">Open calendar</button>
    <dialog class="v-field-date__dialog" id="calendar_example" data-popover>
    <div class="v-field-date__dialog-container">
    <div class="v-field-date__calendar-controls">
        <button data-form-field-date-action="changeMonth" data-form-field-date-action-args="before">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
    </button>
    <button type="button" data-popover-action="show" data-popover-id="roulette_month">Month</button>
    <button>Year</button>
    <button data-form-field-date-action="changeMonth" data-form-field-date-action-args="after">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
    </button>
    </div>
    <table class="v-field-date__calendar-table">
    <thead class="v-field-date__calendar-header">
    <tr class="v-field-date__calendar-row">
    <th>Пн</th>
    <th>Вт</th>
    <th>Ср</th>
    <th>Чт</th>
    <th>Пт</th>
    <th>Сб</th>
    <th>Вс</th>
    </tr>
    </thead>
    <tbody class="v-field-date__calendar-body" data-form-field-date-calendar>
    </tbody>
    </table>
    </div>
    <dialog class="v_roulette-dialog" id="roulette_month" data-popover>
    <div class="v_roulette-dialog__dialog-container">
        <div data-roulette class="v_roulette">
            <button data-tooltip aria-label="Пролистать наверх" type="button" data-roulette-action="scrollBy" data-roulette-action-args="-45">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
</svg>
        </button>
        <button data-tooltip aria-label="Пролистать выше" type="button" data-roulette-action="scrollBy" data-roulette-action-args="-45">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>
        </button>
        <div class="v_roulette__body" data-roulette-screen>
            <button>01 Январь</button>
            <button>02 Февраль</button>
            <button>03 Март</button>
            <button>04 Апрель</button>
            <button>05 Май</button>
            <button>06 Июнь</button>
            <button>07 Июль</button>
            <button>08 Август</button>
            <button>09 Сентябрь</button>
            <button>10 Октябрь</button>
            <button>11 Ноябрь</button>
            <button>12 Декабрь</button>
        </div>
        <button data-tooltip aria-label="Пролистать ниже" type="button" data-roulette-action="scrollBy" data-roulette-action-args="45">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
        </button>
        <button data-tooltip aria-label="Пролистать вниз" type="button" data-roulette-action="scrollBy" data-roulette-action-args="45">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
</svg>
        </button>
    </div>
    </div>
    </dialog>
    </dialog>
</div>

<p>Custom</p>
<p>Input type "time"</p>
<button type="button" data-popover-action="show" data-popover-id="roulette_example">Open roulettes</button>
<dialog class="v-selectbox__dialog" id="roulette_example" data-popover>
<div class="v-selectbox__dialog-container">
<div class="TIME_EXAMPLE">
    <div data-roulette class="v_roulette">
            <button data-tooltip aria-label="Пролистать наверх" type="button" data-roulette-action="scrollBy" data-roulette-action-args="-45">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
</svg>
        </button>
        <button data-tooltip aria-label="Пролистать выше" type="button" data-roulette-action="scrollBy" data-roulette-action-args="-45">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>
        </button>
        <div class="v_roulette__body" data-roulette-screen>
            <button>24</button>
            <button>23</button>
            <button>22</button>
            <button>21</button>
            <button>20</button>
            <button>19</button>
            <button>18</button>
            <button>17</button>
            <button>16</button>
        </div>
        <button data-tooltip aria-label="Пролистать ниже" type="button" data-roulette-action="scrollBy" data-roulette-action-args="45">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
        </button>
        <button data-tooltip aria-label="Пролистать вниз" type="button" data-roulette-action="scrollBy" data-roulette-action-args="45">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
</svg>
        </button>
    </div>
    <div class="v_roulette">
        <button>59</button>
    </div>
    <div class="v_roulette">
        <button>59</button>
    </div>
</div>
</div>
</dialog>