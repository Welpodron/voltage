---
title: "Уведомления"
draft: false
---

<div class="v-alert">
<div class="v-alert__header">
<p class="v-alert__title">Базовый компонент</p>
</div>
<div class="v-alert__body">
<p class="v-alert__text"> 
Перед подключением компонента убедитесь, что все необходимые для требуемого компонента зависимости установлены и подключены!
</p>
</div>
</div>

<div class="v-alert v-alert--primary">
<div class="v-alert__header">
<p class="v-alert__title">Только хэдер и заголовок, он ограничен по длине, поэтому не подходит для большого текста</p>
</div>
</div>

<div class="v-alert v-alert--danger">
<div class="v-alert__header">
<p class="v-alert__title">
<svg class="v-alert__title-icon-left" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
<span class="v-alert__title-text">Иконка слева</span></p>
</div>
<div class="v-alert__body">
<p class="v-alert__text"> 
Перед подключением компонента убедитесь, что все необходимые для требуемого компонента зависимости установлены и подключены!
</p>
</div>
</div>

<div class="v-alert v-alert--warning">
<div class="v-alert__header">
<p class="v-alert__title">
<span class="v-alert__title-text">Иконка справа</span>
<svg class="v-alert__title-icon-right" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
</svg>
</p>
</div>
<div class="v-alert__body">
<p class="v-alert__text"> 
Перед подключением компонента убедитесь, что все необходимые для требуемого компонента зависимости установлены и подключены!
</p>
</div>
</div>

<div class="v-alert v-alert--success">
<div class="v-alert__header">
<p class="v-alert__title">С кнопкой закрытия</p>
<button data-tooltip aria-label="Закрыть" class="v-btn v-btn--success" type="button">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
</svg>
</button>
</div>
<div class="v-alert__body">
<p class="v-alert__text"> 
При нажатии на кнопку закрытия, данное уведомление будет удалено
</p>
</div>
</div>

<div class="v-alert v-alert--info">
<div class="v-alert__body">
<p class="v-alert__text"> 
Без хэдера уведомления, без иконок, без кнопок просто текст
</p>
</div>
</div>