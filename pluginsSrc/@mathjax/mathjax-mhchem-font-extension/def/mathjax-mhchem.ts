import {CHARS} from '@mathjax/font-tools/js/CharMap.js';
import {Font, GlyphNames} from '@mathjax/font-tools/js/Font.js';
import {Variants} from '@mathjax/font-tools/js/Variant.js';
import {Delimiters, ProtoData} from '@mathjax/font-tools/js/Delimiters.js';
import {FontDef} from '@mathjax/font-tools/js/CommonFont.js';
import {SVGFont} from '@mathjax/font-tools/js/SVGFont.js';
import {CHTMLFont} from '@mathjax/font-tools/js/CHTMLFont.js';
import {Components} from '@mathjax/font-tools/js/Components.js';
import {FontData} from '@mathjax/src/mjs/output/common/FontData.js';

import {GenericFont as GenericSVGFont} from '@mathjax/fonts/generic/mjs/svg.js';
import {GenericFont as GenericCHTMLFont} from '@mathjax/fonts/generic/mjs/chtml.js';

/***********************************************************************************/

try {

  //
  // Name-to-Unicode mapping needed for extra characters
  //
  const charNames: GlyphNames = [
    ['uacute', 0xFA], ['ucircumflex', 0xFB], ['udieresis', 0xFC], ['udotbelow', 0x1EE5],
    ['space_uni0309', 0xEA35], ['space_uni030F', 0xEA26], ['space_uni0323', 0xEB19],
    ['space_uni0326', 0xEA1F], ['space_uni0331', 0xEA3E],
    ['copyleft', 0xEB0F], ['died', 0xEB16], ['threequartersemdash', 0xF6DE],
    ['leaf', 0xEB40], ['perthousandzero', 0xEB4D],
    ['star', 0x22C6], ['S_S', 0x1E9E], ['f_k', 0xE803],
  ];

  const charOptions = {
    charNames,
    ignore: /^\.notdef$|\.(?:sc|sts|dup)$/,
    autoPUA: 0xE780
  };

  Font.load({
    'MHC-M': ['fonts/NewCMMath-Book.otf', charOptions],
  });

  Font.get('MHC-M')
    .addGlyph(Font.buildH('MHC-M', [[0x21C1, 'lft'], [0x21CC, 'lft']], 0xE400, 'uniE400', [0, -290], 95))
    .addGlyph(Font.buildH('MHC-M', [[0x21BD, 'lft'], [0x21BD, 'ex'], [0x21C1, 'lft']], 0xE401,  'uniE401',
                          [0, -109, -512], [-95, -95, 95]))
    .addGlyph(Font.buildH('MHC-M', [[0x21BD, 'rt'], [0x21BD, 'ex'], [0x21C0, 'rt']], 0xE405,  'uniE405',
                          [0, -512, -114], [-95, 95, 95]))
    .addGlyph(Font.buildH('MHC-M', [[0x21CC, 'rt'], [0x21BD, 'rt']], 0xE406, 'uniE406', [0, -292], [0, -95]))
    .addGlyph(Font.buildH('MHC-M', [0x296B, 0x296C], 0xE408, 'uniE408', [0, -517]))
    .addGlyph(Font.buildH('MHC-M', [0x2504], 0xE410, 'uniE410', 81, 0, 81))
    .addGlyph(Font.buildH('MHC-M', [0x21BD, [0x21C0, 'lft'], [0x21C0, 'ex'], [0x21C0, 'rt']], 0xE409, 'uniE409',
                          [226, -1182, -15], [-95, 95, 95, 95], 56))
    .addGlyph(Font.buildH('MHC-M', [0x21C0, [0x21BD, 'lft'], [0x21BD, 'ex'], [0x21BD, 'rt']], 0xE40A, 'uniE40A',
                          [232, -1176, -15], [95, -95, -95, -95], 56))
    .addGlyph(Font.buildH('MHC-M', [0x2500, 0x2504], 0xE411, 'uniE411', [81, -691], [-95, 95], 81))
    .addGlyph(Font.buildH('MHC-M', [0x2500, 0x2500, 0x2504], 0xE412, 'uniE412', [81, -691, -691], [-190, 0, 190], 81))
    .addGlyph(Font.buildH('MHC-M', [0x2500, 0x2504, 0x2500], 0xE413, 'uniE413', [81, -691, -691], [-190, 0, 190], 81))
    .addGlyph(Font.buildH('MHC-M', [0x2190, 0x2192], 0xE42A, 'uniE42A', [-1, -477], 0, -1))
    .addGlyph(Font.buildH('MHC-M', [0x27F5, 0x27F6], 0xE42B, 'uniE42B', [0, -1407], [-161, 161]))
;

  /***********************************************************************************/

  const MathJaxMhchemVariants = Variants.define({
    '-mhchem': ['MHC-M', [
      CHARS.At(0xE400, 0xE401, 0xE405, 0xE406, 0xE408, 0xE409, 0xE40A),
      CHARS.Map({0xE402: 0x21CC}).feature('lft'),
      CHARS.Map({0xE403: 0x21CB}).feature('ex'),
      CHARS.Map({0xE404: 0x21CC}).feature('rt'),
      CHARS.At(0xE410, 0xE411, 0xE412, 0xE413),
      CHARS.Map({0xE420: 0x2190, 0xE423: 0x21C4}).feature('lft'),
      CHARS.Map({0xE421: 0x2190, 0xE424: 0x21C4}).feature('ex'),
      CHARS.Map({0xE422: 0x2192, 0xE425: 0x21C4}).feature('rt'),
      CHARS.Map({0xE428: 0x27F5, 0xE429: 0x27F6}),
      CHARS.At(0xE42A, 0xE42B),
      CHARS.Map({0xE42C: 0x2190, 0xE42D: 0x2192, 0xE42E: 0x2194}),
    ]],
  }, {
  });

  /***********************************************************************************/

  const MathJaxMhchemDelimiters = {
    font: 'MHC-M',
    variants: MathJaxMhchemVariants,
    sizeVariants: ['-mhchem'],
    stretchVariants: ['-mhchem'],
    readMathTable: false,
    add: {
      0xE408: {dir: 'H', parts: [[0xE402, '-mhchem'], [0xE403, '-mhchem'], [0xE404, '-mhchem']]} as ProtoData,
      0xE409: {dir: 'H', parts: [[0xE400, '-mhchem'], [0xE403, '-mhchem'], [0xE405, '-mhchem']]} as ProtoData,
      0xE40A: {dir: 'H', parts: [[0xE401, '-mhchem'], [0xE403, '-mhchem'], [0xE406, '-mhchem']]} as ProtoData,
      0xE428: {dir: 'H', parts: [[0xE420, '-mhchem'], [0xE421, '-mhchem']]} as ProtoData,
      0xE429: {dir: 'H', parts: [0, [0xE421, '-mhchem'], [0xE422, '-mhchem']]} as ProtoData,
      0xE42A: {dir: 'H', parts: [[0xE420, '-mhchem'], [0xE421, '-mhchem'], [0xE422, '-mhchem']]} as ProtoData,
      0xE42B: {dir: 'H', parts: [[0xE423, '-mhchem'], [0xE424, '-mhchem'], [0xE425, '-mhchem']]} as ProtoData,
      0xE42C: {dir: 'H', sizes: 1, parts: [[0xE420, '-mhchem'], [0xE421, '-mhchem']]} as ProtoData,
      0xE42D: {dir: 'H', sizes: 1, parts: [0, [0xE421, '-mhchem'], [0xE422, '-mhchem']]} as ProtoData,
      0xE42E: {dir: 'H', sizes: 1, parts: [[0xE420, '-mhchem'], [0xE421, '-mhchem'], [0xE422, '-mhchem']]} as ProtoData,
    }
  };

  /***********************************************************************************/

  const MathJaxMhchemData: FontDef = {
    name: 'MathJaxMhchem',
    prefix: 'MHC',
    variants: MathJaxMhchemVariants,
    delimiters: null,
    legal: {
      addCopyright: 'Copyright (c) 2024 MathJax, Inc. (www.mathjax.org)'
    }
  };

  const MathJaxMhchemSVGData: FontDef = {
    ...MathJaxMhchemData,
    delimiters: Delimiters.define({
      ...MathJaxMhchemDelimiters,
      extends: {
        fontClass: GenericSVGFont as typeof FontData,
        path: '@mathjax/fonts/generic/mjs/svg.js'
      },
    })
  };

  const MathJaxMhchemCHTMLData: FontDef = {
    ...MathJaxMhchemData,
    delimiters: Delimiters.define({
      ...MathJaxMhchemDelimiters,
      extends: {
        fontClass: GenericCHTMLFont as typeof FontData,
        path: '@mathjax/fonts/generic/mjs/chtml.js'
      },
    })
  };

  Components.define('svg', MathJaxMhchemSVGData).writeExtension();
  SVGFont.define(MathJaxMhchemSVGData).writeExtension('mathjax-mhchem');

  Components.define('chtml', MathJaxMhchemCHTMLData).writeExtension();
  CHTMLFont.define(MathJaxMhchemCHTMLData).writeExtension('mathjax-mhchem').makeWoffFonts('MHC-M', false);

} catch (err) {
  console.log(err);
  process.exit(1);
}
