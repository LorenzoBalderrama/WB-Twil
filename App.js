require('dotenv').config();

const OpenAI = require('openai');
const weave = require('weave')
const express = require('express');
const ExpressWs = require('express-ws');
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const { GptService } = require('./services/gpt-service');
const { recordingService } = require('./services/recording-service');
const { TextService } = require('./services/text-service');
const { twilioDocs } = require('./rag-pipeline/RAG');
const app = express();
const expressWs = ExpressWs(app);
const port = 3000;

/* Weave */
const openai = weave.wrapOpenAI(new OpenAI());

// FIGURE OUT HOW TO INITIALIZE WEAVE
async function initializeWeave() {}



// POST /incoming: Returns a TwiML response with the conversation relay setup
app.post('/incoming', async (req, res) => {
    try {
      console.log('=== Incoming Call Request ===');
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
  
      // Create a new TwiML response
      const twiml = new VoiceResponse();
      const connect = twiml.connect();
  
      // Conversation relay required parameters
      const relay = connect.conversationRelay({
        url: `wss://${process.env.NEGROK_URL}/sockets`,
        dtmfDetection: true,
        voice: 'Google.en-US-Wavenet-C',
        language: 'en-US',
        transcriptionProvider: 'google'
      });
  
      // Supported languages
      relay.language({
        code: 'es-MX',
        ttsProvider: 'google',
        voice: 'es-MX-Neural2-B'
      });
      relay.language({
        code: 'es-ES',
        ttsProvider: 'google',
        voice: 'es-ES-Neural2-B'
      });
  
      // Set response headers and send the TwiML
      res.set({
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      return res.status(200).send(twiml.toString());
    } catch (err) {
      console.error('Error in /incoming:', err);
      
      // In case of error, send a basic error TwiML response
      const twiml = new VoiceResponse();
      twiml.say('I am sorry, but an application error has occurred.');
      res.set({
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      return res.status(200).send(twiml.toString());
    }
  });
  
  // WebSocket endpoint at /sockets
  app.ws('/sockets', (ws, req) => {
    console.log('WebSocket connection established');
  
    ws.on('message', (msg) => {
      console.log('Received message:', msg);
      // Process incoming WebSocket messages as needed
    });
  
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
  






/* Start the server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});