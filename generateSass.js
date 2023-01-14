const { parse } = require("node-html-parser");

const generateSass = (html) => {
    let outputString = "";
    const _goThrough = (root, i = 0) => {
        if (!root.childNodes) {
            return;
        }

        root.childNodes.forEach((node) => {
            if (node.rawTagName) {
                let identifier = null;
                const id = node.id;

                const exp1 = new RegExp(/className="(.*?)"/);
                const exp2 = new RegExp(/class="(.*?)"/);

                if (id) {
                    identifier = `#${id}`;
                } else {
                    identifier = node.rawTagName;
                    if (exp1.test(node.rawAttrs) || exp2.test(node.rawAttrs)) {
                        // identifier += `.${}`
                        let exp = null;
                        if (exp1.test(node.rawAttrs)) exp = exp1;
                        if (exp2.test(node.rawAttrs)) exp = exp2;
                        let className = exp.exec(node.rawAttrs)[1];

                        // in case of multiple classes separated by spaces, pick the first one.
                        className = className.split(" ")[0];

                        identifier += `.${className}`;
                    }
                }

                outputString += `${"\t".repeat(i)}${identifier} {\n`;
            }
            _goThrough(node, i + 1);
            if (node.rawTagName) outputString += `${"\t".repeat(i)}}\n`;
        });
    };
    const root = parse(html);
    _goThrough(root);
    return outputString;
};

module.exports = generateSass;
