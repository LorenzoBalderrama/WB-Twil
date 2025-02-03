# Twilio-W&B Technical Support Assistant

An intelligent voice assistant that provides technical support for both Twilio and Weights & Biases (W&B) platforms using OpenAI's GPT-4, Pinecone for RAG (Retrieval Augmented Generation), and Twilio's Programmable Voice.

## Features
- 🤖 AI-powered voice conversations using GPT-4  
- 📞 Real-time voice communication via Twilio  
- 🔍 Context-aware responses using Pinecone vector database  
- 📚 Comprehensive knowledge base for both Twilio and W&B platforms  
- 🔄 Seamless integration support between platforms  

## Prerequisites
- Node.js >= 14.0.0  
- Twilio Account and credentials  
- OpenAI API key  
- Pinecone API key and environment  
- Weights & Biases account (for Weave integration)  

## Environment Variables  
Create a `.env` file in the root directory with the following values:
ACCOUNT_SID=your_twilio_account_sid
AUTH_TOKEN=your_twilio_auth_token
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
TWILIO_PHONE_NUMBER=your_twilio_phone_number
TO_PHONE_NUMBER=destination_phone_number

##Installation
# Clone the repository
git clone https://github.com/LorenzoBalderrama/WB-Twil.git

# Install dependencies
npm install

# Start the development server
npm start

# Deploy to Twilio
npm run deploy


## Project Structure
wb-twil/
├── services/
│   ├── gpt-service.js      # OpenAI and RAG integration
│   ├── recording-service.js # Voice recording handling
│   └── text-service.js     # Text processing
├── functions/
│   └── initiateCall.js     # Twilio call initialization
├── assets/
│   └── index.html          # Web interface
└── package.json

## Key Concepts
1. GPT Service
- Handles conversation context
- Integrates with OpenAI's GPT-4
- Manages Pinecone RAG pipeline
2. Twilio Integration
- Voice call handling
- Real-time audio streaming
- Call recording management
3. W&B Integration
- Weave integration for ML workflows
- Technical support for W&B features
- Integration guidance

## Usage
1. Deploy the application to Twilio
2. Configure your Twilio phone number webhook to point to your deployed function
3. Make a call to your Twilio number
4. Interact with the AI assistant for technical support

## Development
# Start local development
npm start

# Deploy changes
npm run deploy

## Security
- All API keys should be stored securely in environment variables
- Never commit sensitive credentials to version control
- Follow Twilio's security best practices for voice applications

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Support
For support, please open an issue in the repository or contact the maintainers.
