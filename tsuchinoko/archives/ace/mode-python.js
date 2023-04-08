define("ace/mode/python_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var PythonHighlightRules = function () {

      var keywords = (
          "もし|ならば|そうでなければ|そうでなくもし|を|が|から|まで|ずつ|ずつ増やしながら繰り返す|ずつ減らしながら繰り返す|削除|の|の間繰り返す|の要素|の要素でない|について繰り返す|関数|ラムダ式|を返す|を一旦返す|クラス"
      );

      var builtinConstants = (
          "None|True|False|NaN|Infinity"
      );

      var builtinFunctions = (
          "マップ|描画領域を開く|背景の色|四角形を描画|文字列を描画|円を描画|楕円を描画|直線を描画|線の色|線の幅|図形の色|rgb|rgba|hsl|hsla|切り捨て|切り上げ|floor|round|文字数|空|最大値|最小値|log|log2|log10|絶対値|平方根|立方根|sin|cos|tan|asin|acos|atan|整数乱数|実数乱数|数値|文字列|配列|ソート|集合|辞書|タプル|切り取り|区間|集約|初期化|表示する|入力|要素数|数値に変換|型|終了|可視化|object|math|random|datetime|__add__|__sub__|__mul__|__truediv__|__floordiv__|__mod__|__pow__|__lshift__|__rshift__|__and__|__xor__|__or__|__lt__|__le__|__eq__|__ne__|__gt__|__ge__|__radd__|__rsub__|__rmul__|__rtruediv__|__rfloordiv__|__rmod__|__rpow__|__rlshift__|__rrshift__|__rand__|__rxor__|__ror__|__iadd__|__isub__|__imul__|__itruediv__|__ifloordiv__|__imod__|__ipow__|__ilshift__|__irshift__|__iand__|__ixor__|__ior__|__getitem__"
      );
      var keywordMapper = this.createKeywordMapper({
          "support.function": builtinFunctions,
          "variable.language": "self|super",
          "constant.language": builtinConstants,
          "keyword": keywords
      }, "identifier");

      var strPre = "[uU]?";
      var strRawPre = "[rR]";
      var strFormatPre = "[fF]";
      var strRawFormatPre = "(?:[rR][fF]|[fF][rR])";
      var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
      var octInteger = "(?:0[oO]?[0-7]+)";
      var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
      var binInteger = "(?:0[bB][01]+)";
      var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

      var exponent = "(?:[eE][+-]?\\d+)";
      var fraction = "(?:\\.\\d+)";
      var intPart = "(?:\\d+)";
      var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
      var exponentFloat = "(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")";
      var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

      var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

      this.$rules = {
          "start": [{
              token: "comment",
              regex: "#.*$"
          }, {
              token: "string",           // multi line """ string start
              regex: strPre + '"{3}',
              next: "qqstring3"
          }, {
              token: "string",           // " string
              regex: strPre + '"(?=.)',
              next: "qqstring"
          }, {
              token: "string",
              regex: strRawPre + '"{3}',
              next: "rawqqstring3"
          }, {
              token: "string",
              regex: strRawPre + '"(?=.)',
              next: "rawqqstring"
          }, {
              token: "string",
              regex: strFormatPre + '"{3}',
              next: "fqqstring3"
          }, {
              token: "string",
              regex: strFormatPre + '"(?=.)',
              next: "fqqstring"
          }, {
              token: "string",
              regex: strRawFormatPre + '"{3}',
              next: "rfqqstring3"
          }, {
              token: "string",
              regex: strRawFormatPre + '"(?=.)',
              next: "rfqqstring"
          }, {
              token: "keyword.operator",
              regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|=|and|or|not|＋|－|×|÷|＊|≦|＜|≧|＞|／"
          }, {
              token: "punctuation",
              regex: ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|&=|\\|=|^=|>>=|<<=|\\*\\*="
          }, {
              token: "paren.lparen",
              regex: "[\\[\\(\\{]"
          }, {
              token: "paren.rparen",
              regex: "[\\]\\)\\}]"
          }, {
              token: "text",
              regex: "\\s+"
          }, {
              include: "constants"
          }],
          "qqstring3": [{
              token: "constant.language.escape",
              regex: stringEscape
          }, {
              token: "string", // multi line """ string end
              regex: '"{3}',
              next: "start"
          }, {
              defaultToken: "string"
          }],

          "qqstring": [{
              token: "constant.language.escape",
              regex: stringEscape
          }, {
              token: "string",
              regex: "\\\\$",
              next: "qqstring"
          }, {
              token: "string",
              regex: '"|$',
              next: "start"
          }, {
              defaultToken: "string"
          }],
          "rawqqstring3": [{
              token: "string", // multi line """ string end
              regex: '"{3}',
              next: "start"
          }, {
              defaultToken: "string"
          }],
          "rawqqstring": [{
              token: "string",
              regex: "\\\\$",
              next: "rawqqstring"
          }, {
              token: "string",
              regex: '"|$',
              next: "start"
          }, {
              defaultToken: "string"
          }],
          "fqqstring3": [{
              token: "constant.language.escape",
              regex: stringEscape
          }, {
              token: "string", // multi line """ string end
              regex: '"{3}',
              next: "start"
          }, {
              token: "paren.lparen",
              regex: "{",
              push: "fqstringParRules"
          }, {
              defaultToken: "string"
          }],
          "fqqstring": [{
              token: "constant.language.escape",
              regex: stringEscape
          }, {
              token: "string",
              regex: "\\\\$",
              next: "fqqstring"
          }, {
              token: "string",
              regex: '"|$',
              next: "start"
          }, {
              token: "paren.lparen",
              regex: "{",
              push: "fqstringParRules"
          }, {
              defaultToken: "string"
          }],
          "rfqqstring3": [{
              token: "string", // multi line """ string end
              regex: '"{3}',
              next: "start"
          }, {
              token: "paren.lparen",
              regex: "{",
              push: "fqstringParRules"
          }, {
              defaultToken: "string"
          }],
          "rfqqstring": [{
              token: "string",
              regex: "\\\\$",
              next: "rfqqstring"
          }, {
              token: "string",
              regex: '"|$',
              next: "start"
          }, {
              token: "paren.lparen",
              regex: "{",
              push: "fqstringParRules"
          }, {
              defaultToken: "string"
          }],
          "fqstringParRules": [{//TODO: nested {}
              token: "paren.lparen",
              regex: "[\\[\\(]"
          }, {
              token: "paren.rparen",
              regex: "[\\]\\)]"
          }, {
              token: "string",
              regex: "\\s+"
          }, {
              token: "string",
              regex: '"(.)*"'
          }, {
              token: "function.support",
              regex: "(!s|!r|!a)"
          }, {
              include: "constants"
          }, {
              token: 'paren.rparen',
              regex: "}",
              next: 'pop'
          }, {
              token: 'paren.lparen',
              regex: "{",
              push: "fqstringParRules"
          }],
          "constants": [{
              token: "constant.numeric", // imaginary
              regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
          }, {
              token: "constant.numeric", // float
              regex: floatNumber
          }, {
              token: "constant.numeric", // long integer
              regex: integer + "[lL]\\b"
          }, {
              token: "constant.numeric", // integer
              regex: integer + "\\b"
          }, {
              token: ["punctuation", "function.support"],// method
              regex: "(\\.)([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+|[a-zA-Z_＿]+)\\b"
          }, {
              token: keywordMapper,
              regex: "(([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf][\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]*)|([a-zA-Z_＿][a-zA-Z0-9_＿]*))"
          }]
      };
      this.normalizeRules();
  };

  oop.inherits(PythonHighlightRules, TextHighlightRules);

  exports.PythonHighlightRules = PythonHighlightRules;
});

define("ace/mode/folding/pythonic", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (require, exports, module) {
  "use strict";

  var oop = require("../../lib/oop");
  var BaseFoldMode = require("./fold_mode").FoldMode;

  var FoldMode = exports.FoldMode = function (markers) {
      this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
  };
  oop.inherits(FoldMode, BaseFoldMode);

  (function () {

      this.getFoldWidgetRange = function (session, foldStyle, row) {
          var line = session.getLine(row);
          var match = line.match(this.foldingStartMarker);
          if (match) {
              if (match[1])
                  return this.openingBracketBlock(session, match[1], row, match.index);
              if (match[2])
                  return this.indentationBlock(session, row, match.index + match[2].length);
              return this.indentationBlock(session, row);
          }
      };

  }).call(FoldMode.prototype);

});

define("ace/mode/python", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/python_highlight_rules", "ace/mode/folding/pythonic", "ace/range"], function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  var PythonHighlightRules = require("./python_highlight_rules").PythonHighlightRules;
  var PythonFoldMode = require("./folding/pythonic").FoldMode;
  var Range = require("../range").Range;

  var Mode = function () {
      this.HighlightRules = PythonHighlightRules;
      this.foldingRules = new PythonFoldMode("\\:");
      this.$behaviour = this.$defaultBehaviour;
  };
  oop.inherits(Mode, TextMode);

  (function () {

      this.lineCommentStart = "#";

      this.getNextLineIndent = function (state, line, tab) {
          var indent = this.$getIndent(line);

          var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
          var tokens = tokenizedLine.tokens;

          if (tokens.length && tokens[tokens.length - 1].type == "comment") {
              return indent;
          }

          if (state == "start") {
              var match = line.match(/^.*[\{\(\[:]\s*$/);
              if (match) {
                  indent += tab;
              }
          }

          return indent;
      };

      var outdents = {
          "を返す": 1
      };

      this.checkOutdent = function (state, line, input) {
          if (input !== "\r\n" && input !== "\r" && input !== "\n")
              return false;

          var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

          if (!tokens)
              return false;
          do {
              var last = tokens.pop();
          } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

          if (!last)
              return false;

          return (last.type == "keyword" && outdents[last.value]);
      };

      this.autoOutdent = function (state, doc, row) {

          row += 1;
          var indent = this.$getIndent(doc.getLine(row));
          var tab = doc.getTabString();
          if (indent.slice(-tab.length) == tab)
              doc.remove(new Range(row, indent.length - tab.length, row, indent.length));
      };

      this.$id = "ace/mode/python";
      this.snippetFileId = "ace/snippets/python";
  }).call(Mode.prototype);

  exports.Mode = Mode;
}); (function () {
  window.require(["ace/mode/python"], function (m) {
      if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = m;
      }
  });
})();
