"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathJaxMhchemFontExtension = void 0;
var DynamicFonts_js_1 = require("@mathjax/src/cjs/output/chtml/DynamicFonts.js");
var Direction_js_1 = require("@mathjax/src/cjs/output/common/Direction.js");
exports.MathJaxMhchemFontExtension = {
    name: 'mathjax-mhchem',
    variants: { '[+]': [
            ['-mhchem', 'normal']
        ] },
    chars: (0, DynamicFonts_js_1.AddFontIds)({
        M: {
            '-mhchem': {
                0xE400: [.369, .098, .736],
                0xE401: [.368, .095, .744],
                0xE402: [.369, .098, .514],
                0xE403: [.369, -.131, .343],
                0xE404: [.598, -.131, .515],
                0xE405: [.594, -.131, .741],
                0xE406: [.598, -.131, .736],
                0xE408: [.6, .099, 1.463],
                0xE409: [.594, .098, 1.463],
                0xE40A: [.598, .095, 1.463],
                0xE410: [.274, -.226, .828],
                0xE411: [.369, -.131, .828],
                0xE412: [.464, -.036, .828],
                0xE413: [.464, -.036, .828],
                0xE420: [.51, .01, .507],
                0xE421: [.274, -.226, .337],
                0xE422: [.51, .01, .507],
                0xE423: [.432, .172, .515],
                0xE424: [.432, -.065, .343],
                0xE425: [.669, -.065, .514],
                0xE428: [.51, .01, 1.463],
                0xE429: [.51, .01, 1.463],
                0xE42A: [.51, .01, 1.463],
                0xE42B: [.671, .171, 1.463],
                0xE42C: [.51, .01, 1],
                0xE42D: [.51, .01, 1],
                0xE42E: [.51, .01, 1]
            }
        },
        N: {
            'normal': {}
        }
    }, 'MHC'),
    delimiters: {
        0xE408: {
            dir: Direction_js_1.H,
            stretch: [0xE402, 0xE403, 0xE404],
            stretchv: [-1, -1, -1],
            HDW: [0.598, 0.098, 0],
            hd: [.369, -.131]
        },
        0xE409: {
            dir: Direction_js_1.H,
            stretch: [0xE400, 0xE403, 0xE405],
            stretchv: [-1, -1, -1],
            HDW: [0.594, 0.098, 0],
            hd: [.369, -.131]
        },
        0xE40A: {
            dir: Direction_js_1.H,
            stretch: [0xE401, 0xE403, 0xE406],
            stretchv: [-1, -1, -1],
            HDW: [0.598, 0.095, 0],
            hd: [.369, -.131]
        },
        0xE428: {
            dir: Direction_js_1.H,
            stretch: [0xE420, 0xE421],
            stretchv: [-1, -1],
            HDW: [0.51, 0.01, 0],
            hd: [.274, -.226]
        },
        0xE429: {
            dir: Direction_js_1.H,
            stretch: [0, 0xE421, 0xE422],
            stretchv: [0, -1, -1],
            HDW: [0.51, 0.01, 0],
            hd: [.274, -.226]
        },
        0xE42A: {
            dir: Direction_js_1.H,
            stretch: [0xE420, 0xE421, 0xE422],
            stretchv: [-1, -1, -1],
            HDW: [0.51, 0.01, 0],
            hd: [.274, -.226]
        },
        0xE42B: {
            dir: Direction_js_1.H,
            stretch: [0xE423, 0xE424, 0xE425],
            stretchv: [-1, -1, -1],
            HDW: [0.669, 0.172, 0],
            hd: [.432, -.065]
        },
        0xE42C: {
            dir: Direction_js_1.H,
            sizes: [0],
            stretch: [0xE420, 0xE421],
            stretchv: [-1, -1],
            HDW: [0.51, 0.01, 0],
            hd: [.274, -.226]
        },
        0xE42D: {
            dir: Direction_js_1.H,
            sizes: [0],
            stretch: [0, 0xE421, 0xE422],
            stretchv: [0, -1, -1],
            HDW: [0.51, 0.01, 0],
            hd: [.274, -.226]
        },
        0xE42E: {
            dir: Direction_js_1.H,
            sizes: [0],
            stretch: [0xE420, 0xE421, 0xE422],
            stretchv: [-1, -1, -1],
            HDW: [0.51, 0.01, 0],
            hd: [.274, -.226]
        }
    },
    sizeVariants: { '[+]': ['-mhchem'] },
    stretchVariants: { '[+]': ['-mhchem'] },
    fonts: [
        'MJX-MHC-M',
        'MJX-MHC-N'
    ]
};
//# sourceMappingURL=chtml.js.map