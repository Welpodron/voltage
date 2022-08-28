---
title: "voltage.scroller"
date: 2022-08-24T18:20:52+03:00
draft: false
---

<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vestibulum feugiat pretium. Sed vestibulum rhoncus nisi sit amet malesuada. Integer ullamcorper leo at leo maximus, at dignissim nisl fermentum. Nunc est est, dictum id lorem vel, accumsan ornare arcu. Integer ut urna et turpis dictum sodales at id magna. Donec justo metus, dignissim ut orci a, sodales rhoncus ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Aliquam hendrerit felis felis, a lobortis sapien scelerisque facilisis. Donec eros urna, tempor ac elementum rhoncus, convallis id diam. Ut ut ornare lorem, eu aliquet ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac placerat magna. Nullam ex dui, aliquet eget nisi in, elementum accumsan magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis nec erat in tincidunt. Duis semper mi massa, nec vehicula mauris sagittis id. Aenean posuere condimentum lacus non rhoncus. Curabitur a diam in turpis congue rhoncus. Integer ante nisl, iaculis nec porta in, semper eu arcu. Nulla fringilla justo eget libero hendrerit, ullamcorper maximus erat luctus. Maecenas id placerat libero, non viverra nibh. Nam sodales egestas est, ac facilisis eros malesuada eu.

Praesent at vestibulum massa. Ut ornare nulla ac tristique efficitur. Nam vestibulum semper augue ut aliquam. Vivamus scelerisque velit metus, rutrum pretium nisi vulputate nec. Nulla facilisi. Aliquam accumsan et enim nec blandit. Cras efficitur massa eu nisl convallis ultrices. Suspendisse egestas a velit vitae cursus. Sed mattis rhoncus purus id eleifend. Pellentesque et bibendum lorem.

Ut cursus diam eu neque condimentum, nec congue elit bibendum. Integer malesuada mi nulla, non imperdiet ante vestibulum ut. Sed mattis finibus auctor. Aliquam semper faucibus condimentum. Vestibulum a arcu sed mauris bibendum luctus. Nulla nisi lorem, porta consequat nulla et, bibendum ullamcorper felis. Pellentesque facilisis non orci non ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In nec pharetra ante. Mauris tempor mi commodo commodo consequat. Etiam varius nulla nisi, sit amet sodales felis tempus eget. Aliquam ullamcorper, ipsum sit amet sagittis accumsan, sem augue fringilla sem, in dignissim magna mi vitae lectus. Nulla aliquam interdum mauris sit amet sollicitudin.

Morbi efficitur dui quis nisl pretium blandit. Cras lobortis neque tincidunt felis mattis tincidunt. Sed augue risus, aliquam vitae mi eget, venenatis consequat ex. Curabitur facilisis velit sed dictum blandit. Cras id vestibulum orci. Quisque sollicitudin interdum magna quis elementum. Nullam in ligula a metus posuere consequat nec quis lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

</div>

```typescript
import { Popover } from "./_popover";

interface ISelectBoxConfig {
  name?: string;
  defaultValue?: string;
}

export class SelectBox {
  // TODO: errors
  // TODO: multiple
  // TODO: validation
  value: string;
  name: string;

  element: HTMLElement;
  input: HTMLInputElement;
  controls: Array<HTMLElement>;

  //   menu: Popover;

  constructor(element: HTMLElement, config: ISelectBoxConfig = {}) {
    this.element = element;

    this.input = <HTMLInputElement>this.element.querySelector("input");

    this.name =
      config.name ||
      this.element.getAttribute("data-form-field-name") ||
      this.input.name;

    this.input.name = this.name;

    this.value =
      config.defaultValue ||
      this.element.getAttribute("data-form-field-default-value") ||
      this.input.value;

    this.input.value = this.value;

    this.controls = <Array<HTMLElement>>[
      ...document.querySelectorAll(
        `[data-form-selectbox-id=${this.element.id}][data-form-selectbox-action]`
      ),
    ];

    this.destroyEventListeners();
    this.initEventListeners();
  }

  initEventListeners = () => {
    this.input.addEventListener("click", this.handleInputClick);

    this.controls.forEach((control) => {
      control.addEventListener("click", this.handleControlClick);
    });
  };

  destroyEventListeners = () => {
    this.input.removeEventListener("click", this.handleInputClick);

    this.controls.forEach((control) => {
      control.removeEventListener("click", this.handleControlClick);
    });
  };

  handleInputClick = (evt: MouseEvent) => {};

  handleControlClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const currentTarget = <HTMLElement>evt.currentTarget;

    const action = currentTarget.getAttribute("data-form-selectbox-action");

    if (action && this[action] instanceof Function) {
      const args = currentTarget.getAttribute(
        "data-form-selectbox-action-args"
      );
      this[action](args);
    }
  };

  change = (value: string) => {
    this.value = value;
    this.input.value = this.value;
  };
}
```
