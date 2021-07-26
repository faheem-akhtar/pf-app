"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filenameRule = void 0;
function filenameRule(context) {
    var fileName = context.getFilename();
    if (!fileName.match(/[^a-z0-9.\/\-]/g)) {
        context.report({ loc: { line: 1, column: 0 }, message: 'Filename has forbidden characters [^a-z0-9.-/]' });
    }
    return {
        ExportNamedDeclaration: function (node) {
            switch (node.declaration.type) {
                case 'TSInterfaceDeclaration':
                    if (!fileName.match(/\/[a-z0-9\-]+\.interface\.ts$/g)) {
                        context.report({ node: node, message: 'Interface file name should end by "interface"' });
                    }
                    break;
                case 'TSEnumDeclaration':
                    // Check if the file refers to events
                    if (fileName.match(/(event)/i)) {
                        if (!fileName.match(/\/[a-z0-9\-]+\.event\.ts$/g)) {
                            context.report({ node: node, message: 'Event file name should end by "event"' });
                        }
                    }
                    else if (!fileName.match(/\/[a-z0-9\-]+\.enum\.ts$/g)) {
                        context.report({ node: node, message: 'Enum file name should end by "interface"' });
                    }
                    break;
            }
        },
    };
}
exports.filenameRule = filenameRule;
