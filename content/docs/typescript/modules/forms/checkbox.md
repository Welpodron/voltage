---
title: "voltage.checkbox"
date: 2022-08-24T18:20:52+03:00
draft: false
---

<form data-form>
    <div data-form-fieldset="">
        <div data-form-field="" data-form-field-type="checkbox">
            <input type="checkbox" />
            <!-- Validation block -->
            <div></div>
        </div>
    </div>
</form>
<!-- Checkbox group -->
<form target="_blank" data-form method="post" action="http://httpbin.org/post">
    <div data-form-fieldset="">
        <div data-form-field="colors" data-form-field-type="checkbox-group">
            <input type="checkbox" value="red" />
            <input type="checkbox" value="blue" />
            <input type="checkbox" />
            <!-- Validation block -->
            <div></div>
        </div>
    </div>
    <button>Submit</button>
</form>

