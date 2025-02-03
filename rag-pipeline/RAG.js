/*
TODO

Fetch the Content: Use the URL list to retrieve your documents.
Parse: Extract text from HTML if needed.
Chunk: Use a function with a constant chunk size (and overlap if desired) to split the text.
Embed: Send each chunk to an embedding API.
Store: Upload the resulting vectors to your Pinecone vector database.

*/

const twilioDocs = [
  "https://www.twilio.com/en-us/blog/conversation-relay-aws-reference-architecture",
  "https://www.twilio.com/docs/voice/twiml/connect/conversationrelay",
  "https://www.twilio.com/en-us/blog/conversationrelay-voice-ai-made-human",
  "https://www.twilio.com/docs/voice/twiml/connect/conversationrelay/onboarding",
  "https://www.twilio.com/en-us/blog/voice-ai-build-voice-bots-conversation-relay",
  "https://www.twilio.com/docs/alpha/ai-assistants",
  "https://www.twilio.com/docs/alpha/ai-assistants/customer-memory",
  "https://www.twilio.com/docs/alpha/ai-assistants/tools",
  "https://www.twilio.com/docs/alpha/ai-assistants/knowledge",
  "https://www.twilio.com/docs/alpha/ai-assistants/channels",
  "https://www.twilio.com/docs/alpha/ai-assistants/ai-constellations",
  "https://www.twilio.com/docs/alpha/ai-assistants/simulator",
  "https://www.twilio.com/docs/alpha/ai-assistants/quickstart",
  "https://www.twilio.com/docs/alpha/ai-assistants/pricing-and-limits",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/assistants",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/assistants/tools",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/assistants/knowledge",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/assistants/messages",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/tools",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/knowledge",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/knowledge/chunks",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/sessions",
  "https://www.twilio.com/docs/alpha/ai-assistants/api/conversation-history",
  "https://www.twilio.com/docs/alpha/ai-assistants/guides/evals"
];

export { twilioDocs };