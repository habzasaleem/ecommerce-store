// lib/ai-config.js
//
// Central config for the AI shopping assistant.
// Keep model choice, generation settings, and the system prompt
// all in one place — the route handler and any future AI features
// (like FE-07) should import from here instead of hardcoding values.

import { google } from '@ai-sdk/google';

// -----------------------------------------------------------------------
// MODEL
// -----------------------------------------------------------------------
// Gemini 2.5 Flash: fast, cheap, and free-tier friendly — a good fit for
// a conversational assistant that doesn't need heavy reasoning per turn.
// If responses ever feel too shallow for complex questions, swap to
// 'gemini-2.5-pro' here — nothing else in the app needs to change.
export const model = google('gemini-2.5-flash');

// -----------------------------------------------------------------------
// GENERATION SETTINGS
// -----------------------------------------------------------------------
export const generationConfig = {
  // temperature: how "creative" vs. predictable responses are.
  // 0 = very deterministic, 1 = very varied. 0.7 is a balanced default
  // for a helpful, natural-sounding assistant.
  temperature: 0.7,

  // maxOutputTokens: hard ceiling on response length, mainly to protect
  // against runaway generations. ~500 tokens is roughly 350-400 words —
  // plenty for a shopping assistant reply, short enough to stream fast.
  maxOutputTokens: 500,
};

// -----------------------------------------------------------------------
// SYSTEM PROMPT
// -----------------------------------------------------------------------
// This defines the assistant's role and boundaries. Edit the persona/
// scope here as your store's catalog or tone changes — nothing else
// in the codebase should need to change when this text does.
export const systemPrompt = `You are a friendly, knowledgeable shopping assistant for an online store.

Your job:
- Help visitors find products that match what they're looking for
- Answer questions about product categories, features, and general shopping guidance
- Keep responses conversational, concise, and genuinely helpful — avoid sounding like a scripted bot
- If you don't have specific information about an exact product or its stock/price, say so honestly rather than guessing

Keep replies short (2-4 sentences) unless the visitor asks for more detail. Never invent specific prices, stock numbers, or shipping dates you don't actually have.`;