# Assets

Assets makes one script and one stylesheet for the whole instance. Folders and snippets register here, and the build reads them in order and serves the result at `/assets/build.js` and `/assets/build.css`.

- Package: `addon-assets`, slug `onetype/addon/assets`
- Depends on: nothing. It registers its two routes on `commands` where that is loaded, and does nothing where it is not.
- Sides: `back/` only

## Not to be confused with `onetype.assets`

Two different things carry the name:

| | what it is | who uses it |
| --- | --- | --- |
| `onetype.assets` | framework runtime, records which front folder belongs to which addon | every addon, through `onetype.assets.ItemAdd` |
| `assets` (this package) | the build, reads folders and snippets and joins them | `platform`, through `assets.Item` |

An addon registering its front folder wants the first. This package reads what the first collected and turns it into a served file.

## Register something to build

```js
assets.Item({
    type: 'js',
    order: 20,
    path: '/absolute/path/to/front'
});

assets.Item({
    type: 'css',
    order: 10,
    content: ':root { --gap: 8px; }'
});
```

An entry carries either a `path` to read or `content` written out. `content` may be a function, called with the request context, so a snippet can differ per request.

`order` decides where it lands; lower goes in first. Within a folder, `index` and `addon` files are read before the rest.

## Leave something out

```js
assets.Item({
    type: 'js',
    order: 30,
    path: '/some/front',
    ignore: ['/vendor/', '.min.js'],
    condition: function()
    {
        return !this.http.state.runtime;
    }
});
```

`ignore` skips files whose path carries any of its fragments. `condition` is called with the request context; answering `false` leaves the entry out of that build. Files under `/items/tests/` and files ending `.back.js` are never read.

## Build it

```js
const script = assets.Fn('get.js', context);
const styles = assets.Fn('get.css', context);
```

Both are the same call underneath, `assets.Fn('get.build', type, context)`.

The script build strips every `import` and `export` line and closes the result in one `(function(){ … })();`, so nothing a module wrote leaks onto the page. The stylesheet build only trims and joins.

## Serve it

```js
assets.get.commands();
```

Registers `assets:js` and `assets:css`, answering `GET /assets/build.js` and `GET /assets/build.css`. Both accept `v` (a cache busting token the build ignores) and `scope`. `platform` makes this call at load; nothing happens on its own.

The `<script>` and `<link>` tags that point at these routes are `platform`'s to write, not this package's.
