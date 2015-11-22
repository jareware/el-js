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
