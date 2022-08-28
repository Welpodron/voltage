---
title: "voltage.collapse"
date: 2022-08-24T18:20:52+03:00
draft: false
---

## Демонстрация работы компонента

<button data-popover-action="show" data-popover-id="popover_example_01" class="v-btn v-btn--primary" type="button">Open popover</button>

<dialog data-popover id="popover_example_01">
  <button class="v-btn v-btn--primary" type="button">Hello from popover</button>
  <button class="v-btn v-btn--danger" type="button">Example</button>
  <button class="v-btn v-btn--secondary" type="button">Some popover action</button>
</dialog>

<div class="v-collapse-box">
  <div class="v-collapse-box__header">
  <button class="v-collapse-box__btn" type="button"><span>Collapse box 01</span>
    <svg class="v-collapse-box__btn-icon-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </button>
  </div>
  <div class="v-collapse-box__body">
    <p>
      Curabitur at pellentesque quam. Nam magna turpis, bibendum eget molestie eget, pulvinar ut nunc. Donec at efficitur nisl. Pellentesque eget aliquet felis. Vivamus sed luctus erat. Pellentesque egestas tortor elit, in mollis sapien lobortis non. Fusce venenatis nec mi nec vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ex metus, luctus non mollis et, gravida eget leo. Integer vel tortor in justo molestie malesuada in eget felis. Donec urna eros, blandit et commodo vitae, bibendum nec dui. Integer laoreet imperdiet sapien, non laoreet ante.
    </p>
  </div>
</div>

<div class="v-code">
<div class="v-code__header">
<span>html</span><button data-tooltip aria-label="Скопировать код" class="v-btn v-btn--primary" type="button">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
</svg>
</button>
</div>

```html
<div class="v-collapse-box">
  <div class="v-collapse-box__header">
    <button class="v-collapse-box__btn" type="button">
      <span>Collapse box 01</span>
      <svg
        class="v-collapse-box__btn-icon-right"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  </div>
  <div class="v-collapse-box__body">
    <p>
      Curabitur at pellentesque quam. Nam magna turpis, bibendum eget molestie
      eget, pulvinar ut nunc. Donec at efficitur nisl. Pellentesque eget aliquet
      felis. Vivamus sed luctus erat. Pellentesque egestas tortor elit, in
      mollis sapien lobortis non. Fusce venenatis nec mi nec vulputate. Orci
      varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Sed ex metus, luctus non mollis et, gravida eget leo.
      Integer vel tortor in justo molestie malesuada in eget felis. Donec urna
      eros, blandit et commodo vitae, bibendum nec dui. Integer laoreet
      imperdiet sapien, non laoreet ante.
    </p>
  </div>
</div>
```

</div>

<div class="v-alert v-alert--danger">
<div class="v-alert__header">
<span class="v-alert__title">Внимание</span>
<button data-tooltip aria-label="Закрыть" class="v-btn v-btn--danger" type="button">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
</svg>
</button>
</div>
<div class="v-alert__body">
<p class="v-alert__text"> 
Перед подключением компонента убедитесь, что все необходимые для требуемого компонента зависимости установлены и подключены!
</p>
</div>
</div>
