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

{{< example-calendar >}}

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