'use strict';

const MAP = {
  '\\forall': '∀', '\\exists': '∃', '\\nexists': '∄',
  '\\in': '∈', '\\notin': '∉', '\\ni': '∋',
  '\\subset': '⊂', '\\supset': '⊃', '\\subseteq': '⊆', '\\supseteq': '⊇',
  '\\cup': '∪', '\\cap': '∩', '\\emptyset': '∅', '\\varnothing': '∅',
  '\\setminus': '∖', '\\wedge': '∧', '\\vee': '∨', '\\neg': '¬',
  '\\leq': '≤', '\\le': '≤', '\\geq': '≥', '\\ge': '≥',
  '\\neq': '≠', '\\ne': '≠', '\\approx': '≈', '\\equiv': '≡',
  '\\sim': '∼', '\\cong': '≅', '\\propto': '∝',
  '\\times': '×', '\\div': '÷', '\\pm': '±', '\\mp': '∓', '\\cdot': '·',
  '\\ast': '∗', '\\star': '⋆', '\\circ': '∘',
  '\\infty': '∞', '\\partial': '∂', '\\nabla': '∇',
  '\\sum': '∑', '\\prod': '∏', '\\int': '∫', '\\oint': '∮',
  '\\sqrt': '√', '\\frac': '/', '\\dfrac': '/', '\\tfrac': '/',
  '\\rightarrow': '→', '\\to': '→', '\\leftarrow': '←', '\\gets': '←',
  '\\Rightarrow': '⇒', '\\Leftarrow': '⇐',
  '\\leftrightarrow': '↔', '\\Leftrightarrow': '⇔',
  '\\uparrow': '↑', '\\downarrow': '↓', '\\mapsto': '↦',
  '\\angle': '∠', '\\perp': '⊥', '\\parallel': '∥',
  '\\cdots': '⋯', '\\ldots': '…', '\\dots': '…',
  '\\prime': '′', '\\degree': '°', '\\triangle': '△',
  '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ',
  '\\epsilon': 'ε', '\\varepsilon': 'ε', '\\zeta': 'ζ', '\\eta': 'η',
  '\\theta': 'θ', '\\vartheta': 'ϑ', '\\iota': 'ι', '\\kappa': 'κ',
  '\\lambda': 'λ', '\\mu': 'μ', '\\nu': 'ν', '\\xi': 'ξ',
  '\\pi': 'π', '\\rho': 'ρ', '\\sigma': 'σ', '\\tau': 'τ',
  '\\upsilon': 'υ', '\\phi': 'φ', '\\varphi': 'φ', '\\chi': 'χ',
  '\\psi': 'ψ', '\\omega': 'ω',
  '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Theta': 'Θ', '\\Lambda': 'Λ',
  '\\Xi': 'Ξ', '\\Pi': 'Π', '\\Sigma': 'Σ', '\\Upsilon': 'Υ',
  '\\Phi': 'Φ', '\\Psi': 'Ψ', '\\Omega': 'Ω',
  '\\left': '', '\\right': '', '\\big': '', '\\Big': '',
  '\\begin': '', '\\end': '', '\\text': '', '\\mathrm': '',
  '\\mathbf': '', '\\mathit': '', '\\mathbb': '', '\\mathcal': '',
  '\\operatorname': '', '\\limits': '', '\\nolimits': ''
};

// 把 convertFormula 明确定义在顶部
const convertFormula = function(body) {
  let t = body.replace(/\\[a-zA-Z]+/g, function(m) {
    return Object.prototype.hasOwnProperty.call(MAP, m) ? MAP[m] : m.slice(1);
  });
  t = t.replace(/[{}]/g, '').replace(/\$/g, '');
  return t;
};

function latexToUnicode(input) {
  if (!input) return '';
  let s = String(input);

  // 1. 去 HTML 标签
  s = s.replace(/<[^>]+>/g, ' ');

  // 2. 解码常见 HTML 实体
  s = s.replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"')
       .replace(/&#39;/g, "'")
       .replace(/&nbsp;/g, ' ')
       .replace(/&zwnj;/g, '')
       .replace(/&zwj;/g, '');
  s = s.replace(/&#x([0-9a-f]+);/gi, function(_, h) { return String.fromCharCode(parseInt(h, 16)); });
  s = s.replace(/&#(\d+);/g, function(_, d) { return String.fromCharCode(parseInt(d, 10)); });
  s = s.replace(/&amp;/g, '&');

  // 3. 保护转义的 \$
  s = s.replace(/\\\$/g, '\u0000DOLLAR\u0000');

  // 4. 先 $$...$$，再 $...$
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, function(_, body) { return convertFormula(body); });
  s = s.replace(/\$([^$\n]+?)\$/g, function(_, body) { return convertFormula(body); });

  // 5. 还原转义美元
  s = s.replace(/\u0000DOLLAR\u0000/g, '$');

  // 6. 合并空白
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

hexo.extend.helper.register('latex2unicode', latexToUnicode);