(function() {

    function $(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function html(domNode) {
        return domNode.innerHTML.replace(/\s+/g, '');
    }

    $('.el-js-example').forEach(function(exampleEl) {

        var inputEl = exampleEl.querySelector('script[type="el-js-input"]');
        var expectedOutputEl = exampleEl.querySelector('script[type="el-js-output"]');
        var inputCode = 'el(actualOutputEl, ' + inputEl.innerHTML + ')';

        el(exampleEl,
            window.actualOutputEl = el('output'),
            el('script', inputCode)
        );

        var success = html(actualOutputEl) === html(expectedOutputEl);

        exampleEl.className += success ? ' el-js-success' : ' el-js-failure';

        if (!success) {
            el(exampleEl,
                el('pre',
                    'Running this code:\n\n' +
                    inputCode +
                    '\n\nExpected output:\n\n' +
                    expectedOutputEl.innerHTML +
                    '\n\nActual output:\n\n' +
                    actualOutputEl.innerHTML
                )
            )
        }

    });

})();
