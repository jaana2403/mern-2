import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Eye, Star, CheckCircle, ChevronRight } from 'lucide-react';
import { POLICY_TEMPLATES } from '../data/iso22301';

const TemplateViewer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(Object.values(POLICY_TEMPLATES).map(t => t.category))];

  const filteredTemplates = selectedCategory === 'All' 
    ? Object.entries(POLICY_TEMPLATES)
    : Object.entries(POLICY_TEMPLATES).filter(([key, template]) => template.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'International Standards': return '🌍';
      case 'Cybersecurity Standards': return '🔒';
      case 'Financial Regulations': return '💰';
      case 'Healthcare Regulations': return '🏥';
      case 'General': return '📋';
      case 'Custom': return '⚙️';
      default: return '📄';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'International Standards': return '#10b981';
      case 'Cybersecurity Standards': return '#3b82f6';
      case 'Financial Regulations': return '#f59e0b';
      case 'Healthcare Regulations': return '#ef4444';
      case 'General': return '#8b5cf6';
      case 'Custom': return '#ffcc00';
      default: return '#6b7280';
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Shield className="inline-block w-6 h-6 mr-2" />
          BCM Template Library
        </div>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/wizard" className="nav-link">Wizard</Link>
          <Link to="/ai" className="nav-link">AI Help</Link>
          <Link to="/progress" className="nav-link">Progress</Link>
        </div>
      </nav>

      <div className="container">
        <div className="text-center mb-4">
          <h1>Policy Template Library</h1>
          <p className="text-gray-300">
            Browse and explore our comprehensive collection of business continuity policy templates
          </p>
        </div>

        {/* Category Filter */}
        <div className="card mb-4">
          <div className="card-header">
            <h3>Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn-secondary ${selectedCategory === category ? 'bg-yellow-400 text-black' : ''}`}
                style={{
                  backgroundColor: selectedCategory === category ? '#ffcc00' : undefined,
                  color: selectedCategory === category ? '#000' : undefined
                }}
              >
                {category !== 'All' && getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          {/* Template List */}
          <div className="col" style={{flex: selectedTemplate ? '1' : '1'}}>
            <div className="card">
              <div className="card-header">
                <h3>Available Templates ({filteredTemplates.length})</h3>
              </div>
              
              <div className="space-y-4">
                {filteredTemplates.map(([key, template]) => (
                  <div 
                    key={key}
                    className={`wizard-step cursor-pointer ${selectedTemplate === key ? 'border-yellow-400' : ''}`}
                    onClick={() => setSelectedTemplate(selectedTemplate === key ? null : key)}
                    style={{
                      border: selectedTemplate === key ? '2px solid #ffcc00' : '1px solid #333',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-3 text-2xl"
                          style={{backgroundColor: getCategoryColor(template.category) + '20'}}
                        >
                          {getCategoryIcon(template.category)}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{template.name}</h4>
                          <p className="text-gray-400 text-sm">{template.description}</p>
                          <div className="flex items-center mt-1">
                            <span 
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: getCategoryColor(template.category) + '40',
                                color: getCategoryColor(template.category)
                              }}
                            >
                              {template.category}
                            </span>
                            {template.sections && (
                              <span className="text-xs text-gray-400 ml-2">
                                {template.sections.length} sections
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {selectedTemplate === key ? (
                          <Eye className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {selectedTemplate === key && (
                      <div className="mt-4 pt-4 border-t border-gray-600">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-yellow-400">Template Details</h5>
                          <Link 
                            to="/wizard" 
                            className="btn-primary"
                            onClick={() => {
                              // Set the selected template in localStorage for the wizard
                              localStorage.setItem('selected_template', key);
                            }}
                          >
                            Use This Template
                          </Link>
                        </div>
                        
                        {template.isCustom ? (
                          <div className="text-gray-300">
                            <p>Create a custom business continuity policy tailored to your specific compliance requirements and organizational needs.</p>
                            <div className="mt-3">
                              <h6 className="font-semibold mb-2">Features:</h6>
                              <ul className="text-sm space-y-1">
                                <li>• Customizable compliance requirements</li>
                                <li>• Flexible section configuration</li>
                                <li>• Industry-specific adaptations</li>
                                <li>• Regulatory alignment options</li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          template.sections && (
                            <div>
                              <h6 className="font-semibold mb-2">Policy Sections:</h6>
                              <div className="space-y-2">
                                {template.sections.map(section => (
                                  <div key={section.id} className="border-l-2 border-gray-600 pl-3">
                                    <div className="flex items-center">
                                      {section.required ? (
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                      ) : (
                                        <div className="w-4 h-4 border border-gray-400 rounded mr-2"></div>
                                      )}
                                      <span className="font-medium">{section.title}</span>
                                      {section.isoClause && (
                                        <span className="text-xs text-yellow-400 ml-2">
                                          ISO {section.isoClause}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1 ml-6">
                                      {section.content.substring(0, 100)}...
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template Statistics */}
          <div className="col">
            <div className="card mb-4">
              <div className="card-header">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <h4>Template Statistics</h4>
                </div>
              </div>
              
              <div className="space-y-4">
                {categories.filter(cat => cat !== 'All').map(category => {
                  const count = Object.values(POLICY_TEMPLATES).filter(t => t.category === category).length;
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{getCategoryIcon(category)}</span>
                        <span className="text-sm">{category}</span>
                      </div>
                      <span 
                        className="text-sm font-bold px-2 py-1 rounded"
                        style={{
                          backgroundColor: getCategoryColor(category) + '40',
                          color: getCategoryColor(category)
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h4>Quick Actions</h4>
              </div>
              
              <div className="space-y-3">
                <Link to="/wizard" className="btn-primary w-full">
                  <FileText className="inline-block w-4 h-4 mr-2" />
                  Start New Policy
                </Link>
                
                <button className="btn-secondary w-full">
                  <Eye className="inline-block w-4 h-4 mr-2" />
                  Compare Templates
                </button>
                
                <Link to="/progress" className="btn-secondary w-full">
                  <CheckCircle className="inline-block w-4 h-4 mr-2" />
                  View Progress
                </Link>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-header">
                <h4>Need Help?</h4>
              </div>
              
              <div className="text-sm text-gray-300 space-y-2">
                <p>Not sure which template to choose?</p>
                <Link to="/ai" className="btn-secondary w-full">
                  Get AI Recommendations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateViewer;
