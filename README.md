# rehtml

## TODO

- Fix path lookup in [findFile](https://github.com/yoursdearboy/rehtml/blob/main/src/utils.js#L43C17-L43C25)
- Fix fragment handling in `include`, `layout`, `replace`
- Add template string support, e.g.

```
re:text="${last_name} is ${age} years old"
```

- Add default to `re:text` in case of null?
- Add scripts with rehype support
- Add context support, e.g.

```
re:replace="component.html" re:context="{a: 1, b: 2}"
```

or?

```
re:replace="component.html" re:a="1" re:b="2"
```

- LSP or VSCode extension for syntax highlighting, ESLint support
