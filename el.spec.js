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

});
