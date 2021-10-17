import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import TargetHandleResult from "../../base/TargetHandleResult";

// @PostfixHandler({ language: "javascript", label: "let" })
class LetPostfix4TsAndJs extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    datas: {}
  ): string | SnippetString | TargetHandleResult | null {
    /*
      ① new  String().let -> let varName = new String();
      ② \s+ sb.    doSth(sb.doSth(arg1, arg2), arg3).let -> let varName = sb.doSth( sb.doSth(arg1, arg2), arg3);
      ③  123.let -> let varName = 123;
      ③  a.  b.let -> let varName = 123;
     */
    let startIndex;
    let endIndex = lineText.lastIndexOf(".");
    // 找到第一个new
    let newIndex = lineText.indexOf("new");
    let replacement = lineText.substring(newIndex, endIndex);
    for (;;) {
      if (!replacement.match(/^new\s+[a-zA-Z0-9_.]+\(.*\)\.[let]{0,3}$/)) {
        newIndex = lineText.indexOf("new", newIndex + 3);
        // 如果找不到
        if (newIndex === -1) {
          break;
        }
        replacement = lineText.substring(newIndex, endIndex);
        continue;
      }
      // 匹配成功
      return {
        text: `let varName = ${replacement};`,
        detail: `postfix`,
        datas: {
          startIndex: newIndex,
          endIndex,
        },
      };
    }

    let whiteSpaceIndex = lineText.lastIndexOf(" ") + 1;
    replacement = lineText.substring(whiteSpaceIndex, endIndex);
    return {
      text: `let varName = ${replacement};`,
      deleteText: {
        startIndex: whiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
