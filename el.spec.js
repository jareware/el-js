var el = require('./el');
var outputEl = document.querySelector('#el-js');

function assertDomContent(elTree, expected) {
    el(outputEl, elTree);
    var actual = outputEl.innerHTML.replace(/\s+/g, ' ').trim();
    if (actual === expected) return;
    throw new Error('Unexpected element output; to debug this, break on errors and inspect the DOM');
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

});
