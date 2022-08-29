---
title: "voltage.tabs"
date: 2022-08-24T18:20:52+03:00
draft: false
---

<div data-tabs id="tabs_example_01" class="v-tabs">
<div class="v-tabs__header">
<ul data-tabs-tablist class="v-tabs__btns">
<li class="v-tabs__btns-item">
<button data-tabs-tablist-item="0" data-tabs-action="show" data-tabs-action-args="0" data-tabs-id="tabs_example_01" class="v-tabs__btn v-tabs__btn--active" type="button">Tab 01</button>
</li>
<li class="v-tabs__btns-item">
<button data-tabs-tablist-item="1" data-tabs-action="show" data-tabs-action-args="1" data-tabs-id="tabs_example_01" class="v-tabs__btn" type="button">Tab 02</button>
</li>
<li class="v-tabs__btns-item">
<button data-tabs-tablist-item="2" data-tabs-action="show" data-tabs-action-args="2" data-tabs-id="tabs_example_01" class="v-tabs__btn" type="button">Tab 03</button>
</li>
</ul>
</div>
<div class="v-tabs__body">
<ul class="v-tabs__panels">
<li data-tabs-item data-tabs-item-active data-tabs-item-showing class="v-tabs__panel">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac maximus sem, sed tempor sem. Fusce finibus augue tortor, feugiat condimentum mi ultricies ac. Maecenas imperdiet posuere tortor, sit amet auctor lacus interdum non. In ac orci id nunc auctor pellentesque vitae eget dui. Nunc convallis lacus sit amet urna posuere facilisis eget facilisis purus. Phasellus blandit lobortis tellus sed laoreet. Donec venenatis sollicitudin dolor tempus semper. Nulla suscipit accumsan risus eu scelerisque. Proin fringilla placerat placerat. Aenean consequat sapien sapien, eget dapibus sapien auctor et. Nam nec vestibulum odio, sit amet lacinia tellus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac maximus sem, sed tempor sem. Fusce finibus augue tortor, feugiat condimentum mi ultricies ac. Maecenas imperdiet posuere tortor, sit amet auctor lacus interdum non. In ac orci id nunc auctor pellentesque vitae eget dui. Nunc convallis lacus sit amet urna posuere facilisis eget facilisis purus. Phasellus blandit lobortis tellus sed laoreet. Donec venenatis sollicitudin dolor tempus semper. Nulla suscipit accumsan risus eu scelerisque. Proin fringilla placerat placerat. Aenean consequat sapien sapien, eget dapibus sapien auctor et. Nam nec vestibulum odio, sit amet lacinia tellus.

</li>
<li data-tabs-item class="v-tabs__panel">
Nunc convallis lacus sit amet urna posuere facilisis eget facilisis purus. Phasellus blandit lobortis tellus sed laoreet. Donec venenatis sollicitudin dolor tempus semper. Nulla suscipit accumsan risus eu scelerisque. Proin fringilla placerat placerat. Aenean consequat sapien sapien, eget dapibus sapien auctor et. Nam nec vestibulum odio, sit amet lacinia tellus.

</li>
</ul>
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
<div data-tabs id="tabs_example_01" class="v-tabs">
  <div class="v-tabs__header">
    <ul data-tabs-tablist class="v-tabs__btns">
      <li class="v-tabs__btns-item">
        <button
          data-tabs-tablist-item="0"
          data-tabs-action="show"
          data-tabs-action-args="0"
          data-tabs-id="tabs_example_01"
          class="v-tabs__btn v-tabs__btn--active"
          type="button"
        >
          Tab 01
        </button>
      </li>
      <li class="v-tabs__btns-item">
        <button
          data-tabs-tablist-item="1"
          data-tabs-action="show"
          data-tabs-action-args="1"
          data-tabs-id="tabs_example_01"
          class="v-tabs__btn"
          type="button"
        >
          Tab 02
        </button>
      </li>
      <li class="v-tabs__btns-item">
        <button
          data-tabs-tablist-item="2"
          data-tabs-action="show"
          data-tabs-action-args="2"
          data-tabs-id="tabs_example_01"
          class="v-tabs__btn"
          type="button"
        >
          Tab 03
        </button>
      </li>
    </ul>
  </div>
  <div class="v-tabs__body">
    <ul class="v-tabs__panels">
      <li
        data-tabs-item
        data-tabs-item-active
        data-tabs-item-showing
        class="v-tabs__panel"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        maximus sem, sed tempor sem. Fusce finibus augue tortor, feugiat
        condimentum mi ultricies ac. Maecenas imperdiet posuere tortor, sit amet
        auctor lacus interdum non. In ac orci id nunc auctor pellentesque vitae
        eget dui. Nunc convallis lacus sit amet urna posuere facilisis eget
        facilisis purus. Phasellus blandit lobortis tellus sed laoreet. Donec
        venenatis sollicitudin dolor tempus semper. Nulla suscipit accumsan
        risus eu scelerisque. Proin fringilla placerat placerat. Aenean
        consequat sapien sapien, eget dapibus sapien auctor et. Nam nec
        vestibulum odio, sit amet lacinia tellus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vestibulum ac maximus sem, sed tempor sem.
        Fusce finibus augue tortor, feugiat condimentum mi ultricies ac.
        Maecenas imperdiet posuere tortor, sit amet auctor lacus interdum non.
        In ac orci id nunc auctor pellentesque vitae eget dui. Nunc convallis
        lacus sit amet urna posuere facilisis eget facilisis purus. Phasellus
        blandit lobortis tellus sed laoreet. Donec venenatis sollicitudin dolor
        tempus semper. Nulla suscipit accumsan risus eu scelerisque. Proin
        fringilla placerat placerat. Aenean consequat sapien sapien, eget
        dapibus sapien auctor et. Nam nec vestibulum odio, sit amet lacinia
        tellus.
      </li>
      <li data-tabs-item class="v-tabs__panel">
        Nunc convallis lacus sit amet urna posuere facilisis eget facilisis
        purus. Phasellus blandit lobortis tellus sed laoreet. Donec venenatis
        sollicitudin dolor tempus semper. Nulla suscipit accumsan risus eu
        scelerisque. Proin fringilla placerat placerat. Aenean consequat sapien
        sapien, eget dapibus sapien auctor et. Nam nec vestibulum odio, sit amet
        lacinia tellus.
      </li>
    </ul>
  </div>
</div>
```

</div>
