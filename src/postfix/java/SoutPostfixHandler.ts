import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import TargetHandleResult from "../../base/TargetHandleResult";

@PostfixHandler({ language: "java", label: "sout" })
class SoutPostfixHandler4J extends BasePostfixHandler {
  @Target.Slice({})
  handleLineText(replacement: string, datas: {}): TargetHandleResult {
    let res = {
      text: null,
      deleteText: null,
    };
    // 判断是否为空
    if (replacement.length === 0) {
      res.text = new SnippetString(`System.out.println($1);`);
    } else {
      res.text = new SnippetString(`System.out.println(${replacement});`);
      res.deleteText = {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      };
    }
    return res;
  }
}
