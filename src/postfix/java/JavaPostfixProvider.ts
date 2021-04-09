import BasePostfixProvider from "../abs/BasePostfixProvider";
import PostfixProvider from "../decorator/PostfixProvider";

@PostfixProvider("java")
export default class JavaPostfixProvider extends BasePostfixProvider {}
