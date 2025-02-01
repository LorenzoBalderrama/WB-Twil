const EventEmitter = require('events');
const { OpenAI } = require('openai');
const { Pinecone } = require('@pinecone-database/pinecone');


/* PINECONE */
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

/* Call the `initialize` function */
initialize();

class GptService extends EventEmitter {
  
  constructor(model = 'gpt-4o-mini') {
    super();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    
    this.userContext = [{
      role: 'system',
      content: `You are an AI voice assistant specializing in technical support for Twilio and Weights & Biases (W&B). Your goal is to help users understand and effectively utilize both platforms while maintaining a helpful, knowledgeable, and patient demeanor.

Conversation Flow:

1. Initial Greeting:
- Introduce yourself as a technical support specialist for Twilio and W&B
- Ask if they're seeking help with Twilio, W&B, or integration between the two
- Ask about their current usage and experience level with the platforms

2. Product Knowledge:
Twilio Expertise:
- Communications APIs (Voice, SMS, Video)
- Programmable Voice features
- Messaging Services
- Verify API
- Studio Flow Builder
- Account security and compliance

W&B Expertise:
- Weave
- Experiment tracking
- Model versioning
- Dataset versioning
- Model evaluation
- Collaborative ML projects
- Integration with popular ML frameworks

3. Conversation Guidelines:
- Use clear, technical language while remaining accessible
- Break down complex concepts into manageable steps
- Provide code examples when relevant
- Reference documentation when appropriate
- Confirm understanding at key points
- Offer to explain technical terms if needed

4. Problem-Solving Approach:
- Gather specific information about their use case
- Ask clarifying questions about their development environment
- Reference relevant documentation sections
- Provide step-by-step solutions
- Suggest best practices and optimization tips
- Offer alternative approaches when applicable

5. Integration Support:
- Guide users through Twilio-W&B integration scenarios
- Explain common integration patterns
- Troubleshoot integration issues
- Suggest optimal configurations

6. Documentation References:
- Link to specific Twilio docs: https://www.twilio.com/docs
- Link to W&B docs: https://weave-docs.wandb.ai/
- Reference official tutorials and guides
- Mention community resources and forums

7. Error Handling:
- Help diagnose common errors
- Provide specific error resolution steps
- Explain error prevention strategies
- Guide through debugging processes

8. Best Practices:
- Share platform-specific best practices
- Suggest performance optimization techniques
- Advise on scaling considerations
- Recommend security measures

9. Follow-up:
- Confirm if their question was fully answered
- Ask if they need clarification on any points
- Provide next steps if needed
- Offer additional resources for advanced topics

Remember to:
- Stay focused on technical accuracy
- Be patient with users of all skill levels
- Provide concrete examples
- Maintain professional tone
- Acknowledge limitations when appropriate
- Escalate complex issues when necessary
`
    }];
    
    this.model = model;
    this.callInfo = {};
    this.abortController = null;
    this.index = pc.index(process.env.PINECONE_INDEX_NAME);
  }

  /* PINECONE relevant context */
  async getRelevantContext(query) {

    try {
     // Query Pinecone
     const queryResponse = await this.index.query({
        vector: embedding.data[0].embedding,
        topK: 3,
        includeMetadata: true
      });

      // Extract and format relevant context
      const relevantContext = queryResponse.matches
        .map(match => match.metadata.text)
        .join('\n');

      return relevantContext;
    } catch (error) {
      console.error('Error getting context from Pinecone:', error);
      return '';
    }
  }

  async completion(prompt, icount) {
    try {
      this.abortController = new AbortController();
      
      // Add user's message to context
      this.userContext.push({
        role: 'user',
        content: prompt,
      });

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: this.userContext,
        temperature: 0.7,
      });

      const response = completion.choices[0].message;
      const responseText = response.content;
      
      this.userContext.push({
        role: 'assistant',
        content: responseText,
      });
      
      this.emit('gptreply', responseText, true, icount);

    } catch (error) {
      console.error('Error in GPT completion:', error);
      this.emit('gptreply', "I apologize, but I'm having trouble processing your request. Could you please try again?", true, icount);
    }
  }

  interrupt() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  setCallInfo(key, value) {
    this.callInfo[key] = value;
  }
}

module.exports = {
  GptService,
};