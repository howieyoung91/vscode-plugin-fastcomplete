import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import StringUtil from "../../util/StringUtil";

@PostfixHandler({ language: "java", label: "var" })
class VarPostfixHandler4J extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): null | LineTextHandleResult {
    // 判断是否是 new ...(...)
    let endIndex = lineText.lastIndexOf(".");
    let startIndex = firstNonWhiteSpaceIndex;
    let replacement = lineText.substring(startIndex, endIndex).trimEnd();
    let newText = null;
    if (replacement.match(/^new (.+?)\(.*\)$/)) {
      newText = VarPostfixHandler4J.handleNew(replacement);
    } else {
      newText = VarPostfixHandler4J.handleSimpleType(replacement);
    }
    if (newText === null) {
      return null;
    }
    return {
      text: newText,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }

  private static handleSimpleType(replacement: string) {
    let type = StringUtil.javaTypeOf(replacement);
    if (type === null) {
      return null;
    }
    return new SnippetString(`${type} \${1:varName} = ${replacement};`);
  }

  private static handleNew(replacement: string) {
    // 获取带泛型的类名
    let clazzWithType = replacement
      .substring(4, replacement.indexOf("("))
      .trim();
    // 纯净的类名
    let clazz = clazzWithType;
    let typeIndexInClazz = clazzWithType.indexOf("<");
    // 如果存在泛型
    // 获取纯净的类名
    if (typeIndexInClazz !== -1) {
      // 去除泛型
      clazz = clazzWithType.substring(0, typeIndexInClazz);
      replacement =
        replacement.substring(0, replacement.indexOf("<") + 1) +
        replacement.substring(replacement.lastIndexOf(">"));
    }
    return new SnippetString(
      `${clazzWithType} \${1:${clazz.toLowerCase()}} = ${replacement};`
    );
  }
}
