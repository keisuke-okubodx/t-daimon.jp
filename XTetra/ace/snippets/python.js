ace.define("ace/snippets/python", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";
  exports.snippetText =
      "#\nsnippet kakutyoukurikaeshi\n	${1:Things} の要素 ${2:x} について繰り返す:\n		${3:# 処理}\n" +
      "#\nsnippet huyashinagara\n	${1:i} を ${2:0} から ${3:10} まで ${4:1} ずつ増やしながら繰り返す:\n		${5:# 処理}\n" +
      "#\nsnippet herashinagara\n	${1:i} を ${2:10} から ${3:0} まで ${4:1} ずつ減らしながら繰り返す:\n		${5:# 処理}\n" +
      "#\nsnippet kansu\n	関数 ${1?:name}(${2:args}):\n		${3:#処理}\n" +
      "#\nsnippet kansu-kaesu\n	関数 ${1?:name}(${2:args}):\n		${4:value} を返す\n" +
      "#\nsnippet kansu-yield\n	関数 ${1?:name}(${2:args}):\n		${4:value} を一旦返す\n" +
      "#\nsnippet kurasu\n	クラス ${1?:name}:\n\n		関数 初期化(${2:args}):\n			${3:# 処理}\n" +
      "#\nsnippet kurasu-keisyou\n	クラス ${1?:name}(${2?:parent}):\n\n		関数 初期化(${3:args}):\n			${4:# 処理}\n" +
      "#\nsnippet maejyouken-kurikaeshi\n	${1:True} の間繰り返す:\n		${0:#処理}\n" +
      "#\nsnippet moshi\n	もし ${1:True} ならば:\n		${2:#処理}\n" +
      "#\nsnippet moshi-soudenakereba\n	もし ${1:True} ならば:\n		${2:#処理}\n	そうでなければ:\n		${3:#処理}\n" +
      "#\nsnippet moshi-soudenakumoshi\n	もし ${1:True} ならば:\n		${2:#処理}\n	そうでなくもし ${3:True} ならば:\n		${4:#処理}\n" +
      "#\nsnippet moshi-soudenakumoshi-soudenakereba\n	もし ${1:True} ならば:\n		${2:#処理}\n	そうでなくもし ${3:True} ならば:\n		${4:#処理}\n	そうでなければ:\n		${5:#処理}\n" +
      "#\nsnippet dainyu\n	${1:x} = ${2:value}\n" +
      "#\nsnippet sakujyo\n	削除 ${1:x}\n" +
      "#\nsnippet kaesu\n	${1:value} を返す\n" +
      "#\nsnippet ittankaesu\n	${1:value} を一旦返す\n" +
      "#\nsnippet nyuryoku\n	${1:x} = 入力()\n" +
      "#\nsnippet hyoujisuru\n	表示する(${1:\"HELLO\"})\n";
  exports.scope = "python";
}); (function () {
  ace.require(["ace/snippets/python"], function (m) {
      if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = m;
      }
  });
})();
