import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, Send, Bot, User, Lightbulb, FileText, AlertTriangle } from 'lucide-react';
import { ISO22301_CLAUSES } from '../data/iso22301';

const AIHelp = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  // Mock AI responses based on common BCM policy questions
  const aiKnowledgeBase = {
    'iso22301': {
      keywords: ['iso', '22301', 'standard', 'compliance', 'certification'],
      response: "ISO 22301:2019 is the international standard for Business Continuity Management Systems (BCMS). Key requirements include:\n\n• Context analysis (Clause 4)\n• Leadership commitment (Clause 5)\n• Risk-based planning (Clause 6)\n• Resource management (Clause 7)\n• Operational controls (Clause 8)\n• Performance evaluation (Clause 9)\n• Continuous improvement (Clause 10)\n\nWould you like me to explain any specific clause in detail?"
    },
    'rto_rpo': {
      keywords: ['rto', 'rpo', 'recovery time', 'recovery point', 'objectives'],
      response: "Recovery Time Objective (RTO) and Recovery Point Objective (RPO) are critical metrics:\n\n**RTO (Recovery Time Objective):**\n• Maximum acceptable time to restore services after disruption\n• Measured from incident occurrence to full service restoration\n• Typical values: < 1 hour to > 24 hours depending on criticality\n\n**RPO (Recovery Point Objective):**\n• Maximum acceptable data loss measured in time\n• How much data can you afford to lose?\n• Determines backup frequency requirements\n\nFor mission-critical processes, aim for RTO < 4 hours and RPO < 1 hour."
    },
    'risk_assessment': {
      keywords: ['risk', 'threat', 'vulnerability', 'assessment', 'analysis'],
      response: "Effective risk assessment for BCM involves:\n\n**1. Threat Identification:**\n• Natural disasters (earthquakes, floods, fires)\n• Cyber attacks and data breaches\n• Pandemics and health emergencies\n• Supply chain disruptions\n• Key personnel loss\n\n**2. Impact Analysis:**\n• Financial impact\n• Operational disruption\n• Regulatory compliance\n• Reputation damage\n\n**3. Risk Treatment:**\n• Accept, Avoid, Transfer, or Mitigate\n• Implement appropriate controls\n• Regular monitoring and review"
    },
    'business_impact': {
      keywords: ['bia', 'business impact', 'analysis', 'critical processes'],
      response: "Business Impact Analysis (BIA) is fundamental to BCM:\n\n**Purpose:**\n• Identify critical business processes\n• Determine dependencies and resources\n• Establish recovery priorities\n• Define RTOs and RPOs\n\n**Key Steps:**\n1. Process inventory and mapping\n2. Impact assessment (financial, operational, regulatory)\n3. Dependency analysis (people, technology, facilities)\n4. Time-sensitivity evaluation\n5. Recovery resource requirements\n\n**Outputs:**\n• Critical process rankings\n• Recovery time requirements\n• Resource dependencies\n• Continuity strategy inputs"
    },
    'roles_responsibilities': {
      keywords: ['roles', 'responsibilities', 'governance', 'team', 'organization'],
      response: "Clear roles and responsibilities are essential for effective BCM:\n\n**Executive Leadership:**\n• Policy approval and resource allocation\n• Strategic oversight and accountability\n• Crisis communication with stakeholders\n\n**BCM Manager/Coordinator:**\n• Program development and maintenance\n• Training and awareness coordination\n• Testing and exercise management\n\n**Process Owners:**\n• Business impact analysis participation\n• Recovery strategy development\n• Plan testing and maintenance\n\n**Crisis Management Team:**\n• Incident response and decision-making\n• Communications management\n• Recovery coordination\n\n**All Employees:**\n• Understanding their role in continuity plans\n• Participation in training and exercises\n• Incident reporting"
    }
  };

  const predefinedQuestions = [
    "What are the key requirements of ISO 22301:2019?",
    "How do I determine appropriate RTO and RPO values?",
    "What should be included in a risk assessment?",
    "How do I conduct a Business Impact Analysis?",
    "What roles and responsibilities should be defined?",
    "What are the most common business continuity threats?",
    "How often should I test my continuity plans?",
    "What documentation is required for compliance?"
  ];

  const findBestResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    for (const [topic, data] of Object.entries(aiKnowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }
    
    // Default response for unmatched queries
    return "I understand you're asking about business continuity management. While I don't have a specific answer for that question, I can help with:\n\n• ISO 22301:2019 compliance requirements\n• Risk assessment and Business Impact Analysis\n• Recovery objectives (RTO/RPO)\n• Organizational roles and responsibilities\n• Continuity planning best practices\n\nCould you please rephrase your question or select from one of the common topics above?";
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = findBestResponse(userMessage);
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }]);
      
      setIsLoading(false);
    }, 1500);
  };

  const handlePredefinedQuestion = (question) => {
    setCurrentMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Shield className="inline-block w-6 h-6 mr-2" />
          BCM AI Assistant
        </div>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/wizard" className="nav-link">Wizard</Link>
          <Link to="/progress" className="nav-link">Progress</Link>
        </div>
      </nav>

      <div className="container">
        <div className="text-center mb-4">
          <h1>AI-Powered BCM Assistant</h1>
          <p className="text-gray-300">
            Get intelligent recommendations and guidance for your business continuity policy development
          </p>
        </div>

        <div className="row">
          {/* Chat Interface */}
          <div className="col" style={{flex: '2'}}>
            <div className="card">
              <div className="card-header">
                <div className="flex items-center">
                  <Bot className="w-6 h-6 mr-2 text-yellow-400" />
                  <h3>Chat with AI Assistant</h3>
                </div>
              </div>

              {/* Messages */}
              <div 
                className="chat-messages"
                style={{
                  height: '400px',
                  overflowY: 'auto',
                  padding: '1rem',
                  background: '#0a0a0a',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}
              >
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 mt-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                    <p>Hello! I'm your BCM AI Assistant. I can help you with:</p>
                    <ul className="text-left mt-4 space-y-2">
                      <li>• ISO 22301:2019 compliance guidance</li>
                      <li>• Risk assessment methodologies</li>
                      <li>• Business impact analysis</li>
                      <li>• Recovery objectives (RTO/RPO)</li>
                      <li>• Policy development best practices</li>
                    </ul>
                    <p className="mt-4">Ask me anything about business continuity management!</p>
                  </div>
                )}

                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                    }}
                  >
                    <div 
                      className="message-avatar"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: message.sender === 'user' ? '#ffcc00' : '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: message.sender === 'user' ? '0 0 0 0.5rem' : '0 0.5rem 0 0'
                      }}
                    >
                      {message.sender === 'user' ? 
                        <User className="w-4 h-4 text-black" /> : 
                        <Bot className="w-4 h-4 text-yellow-400" />
                      }
                    </div>
                    <div 
                      className="message-content"
                      style={{
                        background: message.sender === 'user' ? '#ffcc00' : '#1a1a1a',
                        color: message.sender === 'user' ? '#000' : '#fff',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        maxWidth: '70%',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="message ai-message" style={{display: 'flex', alignItems: 'flex-start'}}>
                    <div 
                      className="message-avatar"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '0.5rem'
                      }}
                    >
                      <Bot className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div 
                      className="message-content"
                      style={{
                        background: '#1a1a1a',
                        color: '#fff',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px'
                      }}
                    >
                      <div className="loading"></div>
                      <span className="ml-2">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <textarea
                  className="form-textarea flex-1"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about business continuity management..."
                  rows="2"
                  style={{resize: 'none'}}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="btn-primary"
                  style={{alignSelf: 'flex-end'}}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col">
            {/* Quick Questions */}
            <div className="card mb-4">
              <div className="card-header">
                <div className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                  <h4>Common Questions</h4>
                </div>
              </div>
              <div className="space-y-2">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedQuestion(question)}
                    className="btn-secondary w-full text-left"
                    style={{justifyContent: 'flex-start', padding: '0.5rem'}}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* ISO Clauses Reference */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                  <h4>ISO 22301 Quick Reference</h4>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {Object.entries(ISO22301_CLAUSES).map(([clause, data]) => (
                  <div key={clause} className="border-l-2 border-yellow-400 pl-2">
                    <div className="font-bold text-yellow-400">Clause {clause}</div>
                    <div>{data.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="card mt-4">
              <div className="card-header">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                  <h4>AI Assistant Tips</h4>
                </div>
              </div>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Be specific with your questions</li>
                <li>• Ask about ISO 22301 requirements</li>
                <li>• Inquire about best practices</li>
                <li>• Request examples and templates</li>
                <li>• Ask for clarification on complex topics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHelp;
