if (typeof module !== 'undefined') {
    module.exports = el;
} else if (typeof window !== 'undefined') {
    window.el = el;
}

function el(name) {
    function isNode(n) {
        return typeof n === 'object' && n.nodeType && n.nodeName;
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
            } else {
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
