/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { indent } from "../../util/DocumentUtil";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "notnullptr" })
class NotnullptrPostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        const newText = `if (${replacement} != nullptr) {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}
