import { type Context } from "grammy";
import type { Conversation, ConversationFlavor } from "@grammyjs/conversations";

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
