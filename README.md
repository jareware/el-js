# el-js

Utility function for generating HTML/XML DOM trees in the browser.

## API

Returns [a node](https://developer.mozilla.org/en-US/docs/Web/API/element) with the given name. The rest are var-args, so that:

 * an object sets attributes as key/value-pairs
 * a string/number/boolean sets the text content of the node
 * a node is treated as a child node
 * an array is treated as a list of child nodes

For convenience, falsy values in the list of children are ignored.

There's three special cases for the name argument:

 * when `""`, a text node is created, with content from the 2nd arg
 * when `"<!"`, a comment node is created, with content from the 2nd arg
 * when an existing node, that node is used instead of creating a new one

## Examples

Creating elements, comments and text nodes:

```js
el('p',
    el('<!', 'this is a comment'),
    el('a', 'Click here', {
        href: '#some-location'
    }),
    el('', 'Text after link')
);
```

produces:

```html
<p>
    <!--this is a comment-->
    <a href="#some-location">Click here</a>
    Text after link
</p>
```

Mapping arrays into child elements, and filtering by returning falsy values (in this case `undefined`):

```js
el('ul',
    [ 1, 2, 3, 4, 5 ].map(function(i) {
        if (i % 2) return el('li', i);
    })
);
```

produces:

```html
<ul>
    <li>1</li>
    <li>3</li>
    <li>5</li>
</ul>
```

Appending children into existing elements:

```js
el(document.querySelector('#existing-root'),
    el('p', 'New node added under root')
);
```

produces:

```html
<div id="existing-root">
    <p>Possible previous content</p>
    <p>New node added under root</p>
</div>
```

## Acknowledgements

Hand-crafted by [@jareware](https://twitter.com/jareware)/[jrw.fi](http://jrw.fi/), with the [loving support of Futurice](http://futurice.com/blog/sponsoring-free-time-open-source-activities).

## License

[The MIT license](http://opensource.org/licenses/MIT).

## History

Because `el-js` is so tiny, it was originally published in 2014 as [just a gist](https://gist.github.com/jareware/8dc0cc1a948c122edce0). This repository and [npm-presence](https://www.npmjs.com/package/el-js) were added for convenience.
