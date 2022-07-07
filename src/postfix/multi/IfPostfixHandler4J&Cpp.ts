/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "java", label: "if" },
    { language: "c", label: "if" },
    { language: "cpp", label: "if" },
    { language: "csharp", label: "if" },
    { language: "javascript", label: "if" },
    { language: "typescript", label: "if" },
    { language: "vue", label: "if" },
    { language: "html", label: "if" }
)
class IfPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement}) {\n${indent()}$0\n}`);
    }
}
