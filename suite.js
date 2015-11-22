(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof module !== 'undefined') {
    module.exports = el;
} else if (typeof window !== 'undefined') {
    window.el = el;
}

function el(name) {
    function isNode(n) {
        return n && typeof n === 'object' && n.nodeType && n.nodeName;
    }
    if (name === '<!') {
        return document.createComment(arguments[1]);
    } else if (name === '') {
        return document.createTextNode(arguments[1]);
    }
    var node = isNode(name) ? name : document.createElement(name);
    Array.prototype.slice.call(arguments, 1).forEach(function(arg) {
        if (arg instanceof Array) {
            arg.forEach(function(child) {
                child && node.appendChild(child);
            });
        } else if (typeof arg === 'object') {
            if (isNode(arg)) {
                node.appendChild(arg);
            } else if (arg) {
                Object.keys(arg).forEach(function(key) {
                    node.setAttribute(key, arg[key]);
                });
            }
        } else if ([ 'string', 'number', 'boolean' ].indexOf(typeof arg) >= 0) {
            node.textContent = arg;
        }
    });
    return node;
}

},{}],2:[function(require,module,exports){
var el = require('./el');
var outputEl = document.querySelector('#el-js');

function assertDomContent(elTree, expected) {
    el(outputEl, elTree);
    var actual = outputEl.innerHTML.replace(/\s+/g, ' ').trim();
    if (actual === expected) return;
    throw new Error('\n\nExpected: ' + expected + '\n  Actual: ' + actual + '\n\n');
}

function resetOutputEl() {
    outputEl.innerHTML = '';
}

describe('el.js', function() {

    afterEach(resetOutputEl);

    it('produces the simplest possible element', function() {
        assertDomContent(
            el('div', 'Hello World'),
            '<div>Hello World</div>'
        );
    });

    it('produces more complex elements', function() {
        assertDomContent(
            el('p', { class: 'cool' },
                el('<!', 'this is a comment'),
                el('a', 'Click here', {
                    href: '#some-location'
                }),
                el('', 'Text after link')
            ),
            '<p class="cool"><!--this is a comment--><a href="#some-location">Click here</a>Text after link</p>'
        );
    });

    it('filters falsy array children out', function() {
        assertDomContent(
            el('ul',
                [ 1, 2, 3, 4, 5 ].map(function(i) {
                    if (i % 2) return el('li', i);
                })
            ),
            '<ul><li>1</li><li>3</li><li>5</li></ul>'
        );
    });

    it('filters falsy args children out', function() {
        assertDomContent(
            el('ul',
                null,
                el('li', 1),
                undefined
            ),
            '<ul><li>1</li></ul>'
        );
    });

    it('allows mixing array children and args children', function() {
        assertDomContent(
            el('ul',
                el('li', 1),
                [ el('li', 2) ],
                el('li', 3),
                [ null ],
                [ el('li', 4) ]
            ),
            '<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>'
        );
    });

});

},{"./el":1}]},{},[2]);
