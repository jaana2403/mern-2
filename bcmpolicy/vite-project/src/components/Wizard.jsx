import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronLeft, ChevronRight, Download, FileText, HelpCircle } from 'lucide-react';
import { WIZARD_STEPS, POLICY_TEMPLATES, ISO22301_CLAUSES, TEMPLATE_SPECIFIC_STEPS } from '../data/iso22301';
import { exportToPDF, exportToWord, generatePolicyPreview } from '../utils/exportUtils';

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [policyPreview, setPolicyPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Auto-save functionality and template loading
  useEffect(() => {
    const savedData = localStorage.getItem('bcm_wizard_data');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    // Load selected template from template viewer
    const selectedTemplateKey = localStorage.getItem('selected_template');
    if (selectedTemplateKey && POLICY_TEMPLATES[selectedTemplateKey]) {
      setSelectedTemplate(selectedTemplateKey);
      localStorage.removeItem('selected_template'); // Clear after use
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bcm_wizard_data', JSON.stringify(formData));
  }, [formData]);

  // Generate policy preview when on final step
  useEffect(() => {
    const templateSteps = TEMPLATE_SPECIFIC_STEPS[selectedTemplate] || WIZARD_STEPS;
    if (currentStep === templateSteps.length) {
      const template = POLICY_TEMPLATES[selectedTemplate];
      const preview = generatePolicyPreview(formData, template);
      setPolicyPreview(preview);
    }
  }, [currentStep, formData, selectedTemplate]);

  const validateStep = (stepId) => {
    const templateSteps = TEMPLATE_SPECIFIC_STEPS[selectedTemplate] || WIZARD_STEPS;
    const step = templateSteps.find(s => s.id === stepId);
    const errors = {};
    
    if (step) {
      step.fields.forEach(field => {
        if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
          errors[field.name] = `${field.label} is required`;
        }
      });
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const templateSteps = TEMPLATE_SPECIFIC_STEPS[selectedTemplate] || WIZARD_STEPS;
      if (currentStep < templateSteps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[fieldName]) {
      setValidationErrors({
        ...validationErrors,
        [fieldName]: null
      });
    }
  };

  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
  };

  const handleExportPDF = () => {
    exportToPDF(policyPreview, formData);
  };

  const handleExportWord = () => {
    exportToWord(policyPreview, formData);
  };

  const renderField = (field) => {
    const error = validationErrors[field.name];
    
    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span style={{color: '#ffcc00'}}>*</span>}
            </label>
            <input
              type="text"
              className={`form-input ${error ? 'border-red-500' : ''}`}
              value={formData[field.name] || field.defaultValue || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
          </div>
        );
      
      case 'textarea':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span style={{color: '#ffcc00'}}>*</span>}
            </label>
            <textarea
              className={`form-textarea ${error ? 'border-red-500' : ''}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
          </div>
        );
      
      case 'select':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span style={{color: '#ffcc00'}}>*</span>}
            </label>
            <select
              className={`form-input ${error ? 'border-red-500' : ''}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            >
              <option value="">Select {field.label}</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label flex items-center">
              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                className="mr-2"
              />
              {field.label}
            </label>
          </div>
        );
      
      case 'multiselect':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span style={{color: '#ffcc00'}}>*</span>}
            </label>
            <div className="space-y-2">
              {field.options.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(formData[field.name] || []).includes(option)}
                    onChange={(e) => {
                      const currentValues = formData[field.name] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter(v => v !== option);
                      handleInputChange(field.name, newValues);
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
          </div>
        );
      
      case 'date':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span style={{color: '#ffcc00'}}>*</span>}
            </label>
            <input
              type="date"
              className={`form-input ${error ? 'border-red-500' : ''}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderTooltip = (clause) => {
    if (!clause || !ISO22301_CLAUSES[clause.split('.')[0]]) return null;
    
    const mainClause = clause.split('.')[0];
    const subClause = ISO22301_CLAUSES[mainClause].subclauses[clause];
    
    return (
      <div className="tooltip">
        <HelpCircle className="w-4 h-4 text-yellow-400" />
        <span className="tooltip-text">
          <strong>ISO {clause}:</strong> {subClause?.title}
        </span>
      </div>
    );
  };

  const renderCustomFields = () => (
    POLICY_TEMPLATES.custom.isCustom ? (
      <div className="mt-4">
        <div className="form-group">
          <label className="form-label">Enter custom compliance requirements</label>
          <textarea 
            className="form-textarea"
            placeholder="List specific compliance requirements..."
            value={formData.customCompliance || ''}
            onChange={(e) => handleInputChange('customCompliance', e.target.value)}
          />
        </div>
      </div>
    ) : null
  );


  // Get template-specific steps
  const templateSteps = TEMPLATE_SPECIFIC_STEPS[selectedTemplate] || WIZARD_STEPS;
  const currentStepData = templateSteps.find(step => step.id === currentStep);
  const progress = (currentStep / templateSteps.length) * 100;

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Shield className="inline-block w-6 h-6 mr-2" />
          BCM Policy Wizard
        </div>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/ai" className="nav-link">AI Help</Link>
          <Link to="/progress" className="nav-link">Progress</Link>
        </div>
      </nav>

      <div className="container">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2>Step {currentStep} of {templateSteps.length}</h2>
            <span className="text-yellow-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${progress}%`}}></div>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-400">
              Template: {POLICY_TEMPLATES[selectedTemplate]?.name}
            </span>
          </div>
        </div>

        {/* Template Selection (Step 1) */}
        {currentStep === 1 && (
          <div className="card mb-4">
            <div className="card-header">
              <h3>Choose Policy Template</h3>
            </div>
            <div className="row">
              {Object.entries(POLICY_TEMPLATES).map(([key, template]) => (
                <div key={key} className="col">
                  <div 
                    className={`card cursor-pointer ${selectedTemplate === key ? 'border-yellow-400' : ''}`}
                    onClick={() => handleTemplateChange(key)}
                    style={{
                      border: selectedTemplate === key ? '2px solid #ffcc00' : '1px solid #333333',
                      cursor: 'pointer'
                    }}
                  >
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                    {selectedTemplate === key && (
                      <div className="text-yellow-400 font-bold">✓ Selected</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Step */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3>{currentStepData.title}</h3>
                <p className="text-gray-300">{currentStepData.description}</p>
              </div>
              {formData.isoCompliance && (
                renderTooltip(`${currentStep}.1`)
              )}
            </div>
          </div>

          {/* Step Fields */}
          <div className="wizard-step">
            {currentStepData.fields.map(field => renderField(field))}
            {selectedTemplate === 'custom' && renderCustomFields()}
          </div>

          {/* Policy Preview (Final Step) */}
          {currentStep === templateSteps.length && policyPreview && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <h4>Policy Preview</h4>
                <div>
                  <button 
                    onClick={() => setShowPreview(!showPreview)} 
                    className="btn-secondary mr-2"
                  >
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                  <button onClick={handleExportPDF} className="btn-primary mr-2">
                    <Download className="inline-block w-4 h-4 mr-1" />
                    Export PDF
                  </button>
                  <button onClick={handleExportWord} className="btn-primary">
                    <FileText className="inline-block w-4 h-4 mr-1" />
                    Export Word
                  </button>
                </div>
              </div>

              {showPreview && (
                <div className="card">
                  <div className="card-header">
                    <h4>{policyPreview.title}</h4>
                  </div>
                  {policyPreview.sections.map(section => (
                    <div key={section.id} className="mb-4">
                      <h5 className="text-yellow-400 mb-2">{section.title}</h5>
                      <p className="text-gray-200">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'btn-secondary opacity-50' : 'btn-secondary'}
          >
            <ChevronLeft className="inline-block w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="text-center">
            <span className="text-gray-400">
              Step {currentStep} of {templateSteps.length}
            </span>
          </div>

          {currentStep < templateSteps.length ? (
            <button onClick={handleNext} className="btn-primary">
              Next
              <ChevronRight className="inline-block w-4 h-4 ml-1" />
            </button>
          ) : (
            <button 
              onClick={() => {
                // Save completed policy
                const completedPolicy = {
                  ...formData,
                  template: selectedTemplate,
                  completedAt: new Date().toISOString(),
                  preview: policyPreview
                };
                localStorage.setItem('bcm_completed_policy', JSON.stringify(completedPolicy));
                alert('Policy creation completed! Your policy has been saved.');
              }}
              className="btn-primary"
            >
              Complete Policy
              <FileText className="inline-block w-4 h-4 ml-1" />
            </button>
          )}
        </div>

        {/* Auto-save indicator */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          <span>Auto-saved ✓</span>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
