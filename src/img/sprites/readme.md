Из файлов `sprites/svg/` генерируется файл спрайта `sprites/sprite.svg`.

Для вставки на страницу используйте <code>svg &gt; use</code> со ссылками на `id` символа:

```
  svg(width="32", height="32")
    use(xlink:href="img/sprites/sprite.svg#icon")
```
