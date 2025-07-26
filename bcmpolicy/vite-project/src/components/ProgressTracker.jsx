import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Circle, Clock, AlertCircle, TrendingUp, Calendar, FileText } from 'lucide-react';
import { WIZARD_STEPS } from '../data/iso22301';

const ProgressTracker = () => {
  const [wizardData, setWizardData] = useState({});
  const [completedPolicy, setCompletedPolicy] = useState(null);
  const [progressStats, setProgressStats] = useState({});

  useEffect(() => {
    // Load saved wizard data
    const savedWizardData = localStorage.getItem('bcm_wizard_data');
    if (savedWizardData) {
      setWizardData(JSON.parse(savedWizardData));
    }

    // Load completed policy
    const savedCompletedPolicy = localStorage.getItem('bcm_completed_policy');
    if (savedCompletedPolicy) {
      setCompletedPolicy(JSON.parse(savedCompletedPolicy));
    }

    // Calculate progress statistics
    calculateProgressStats();
  }, []);

  const calculateProgressStats = () => {
    const savedData = localStorage.getItem('bcm_wizard_data');
    const wizardData = savedData ? JSON.parse(savedData) : {};
    
    let totalFields = 0;
    let completedFields = 0;
    let stepProgress = {};

    WIZARD_STEPS.forEach(step => {
      let stepTotal = 0;
      let stepCompleted = 0;

      step.fields.forEach(field => {
        totalFields++;
        stepTotal++;

        if (wizardData[field.name] && wizardData[field.name].toString().trim() !== '') {
          completedFields++;
          stepCompleted++;
        }
      });

      stepProgress[step.id] = {
        completed: stepCompleted,
        total: stepTotal,
        percentage: stepTotal > 0 ? Math.round((stepCompleted / stepTotal) * 100) : 0
      };
    });

    const overallProgress = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

    setProgressStats({
      overall: overallProgress,
      totalFields,
      completedFields,
      stepProgress
    });
  };

  const getStepStatus = (stepId) => {
    const progress = progressStats.stepProgress?.[stepId];
    if (!progress) return 'not-started';
    
    if (progress.percentage === 100) return 'completed';
    if (progress.percentage > 0) return 'in-progress';
    return 'not-started';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981'; // green
      case 'in-progress':
        return '#ffcc00'; // yellow
      default:
        return '#6b7280'; // gray
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getComplianceScore = () => {
    if (!wizardData.isoCompliance) return 0;
    
    const requiredFields = ['organizationName', 'industry', 'criticalProcesses', 'riskAssessment', 'rto', 'rpo'];
    const completedRequired = requiredFields.filter(field => 
      wizardData[field] && wizardData[field].toString().trim() !== ''
    ).length;
    
    return Math.round((completedRequired / requiredFields.length) * 100);
  };


  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Shield className="inline-block w-6 h-6 mr-2" />
          BCM Progress Tracker
        </div>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/wizard" className="nav-link">Wizard</Link>
          <Link to="/ai" className="nav-link">AI Help</Link>
        </div>
      </nav>

      <div className="container">
        <div className="text-center mb-4">
          <h1>Policy Development Progress</h1>
          <p className="text-gray-300">
            Track your business continuity policy creation progress and milestones
          </p>
        </div>

        {/* Overall Progress */}
        <div className="card mb-4">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
                <h3>Overall Progress</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {progressStats.overall || 0}%
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${progressStats.overall || 0}%`}}
              ></div>
            </div>
          </div>

          <div className="row">
            <div className="col text-center">
              <div className="text-2xl font-bold text-white">
                {progressStats.completedFields || 0}
              </div>
              <div className="text-gray-400">Completed Fields</div>
            </div>
            <div className="col text-center">
              <div className="text-2xl font-bold text-white">
                {progressStats.totalFields || 0}
              </div>
              <div className="text-gray-400">Total Fields</div>
            </div>
            <div className="col text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {getComplianceScore()}%
              </div>
              <div className="text-gray-400">ISO Compliance</div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Step Progress */}
          <div className="col" style={{flex: '2'}}>
            <div className="card">
              <div className="card-header">
                <h3>Step-by-Step Progress</h3>
              </div>

              <div className="space-y-4">
                {WIZARD_STEPS.map(step => {
                  const status = getStepStatus(step.id);
                  const stepStats = progressStats.stepProgress?.[step.id];
                  
                  return (
                    <div key={step.id} className="wizard-step">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(status)}
                          <div className="ml-3">
                            <h4 className="text-lg font-semibold">{step.title}</h4>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold" style={{color: getStatusColor(status)}}>
                            {stepStats?.percentage || 0}%
                          </div>
                          <div className="text-sm text-gray-400">
                            {stepStats?.completed || 0} of {stepStats?.total || 0}
                          </div>
                        </div>
                      </div>
                      
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{
                            width: `${stepStats?.percentage || 0}%`,
                            backgroundColor: getStatusColor(status)
                          }}
                        ></div>
                      </div>

                      {status === 'in-progress' && (
                        <div className="mt-2">
                          <Link to="/wizard" className="btn-secondary text-sm">
                            Continue Step {step.id}
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col">
            {/* Policy Status */}
            <div className="card mb-4">
              <div className="card-header">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                  <h4>Policy Status</h4>
                </div>
              </div>

              {completedPolicy ? (
                <div>
                  <div className="alert alert-success">
                    <CheckCircle className="inline-block w-4 h-4 mr-2" />
                    Policy Completed!
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Organization:</strong> {completedPolicy.organizationName}</div>
                    <div><strong>Template:</strong> {completedPolicy.template}</div>
                    <div><strong>Completed:</strong> {formatDate(completedPolicy.completedAt)}</div>
                    <div><strong>Effective Date:</strong> {formatDate(completedPolicy.effectiveDate)}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="alert alert-warning">
                    <AlertCircle className="inline-block w-4 h-4 mr-2" />
                    Policy In Progress
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Complete all wizard steps to finalize your policy.
                  </p>
                  <Link to="/wizard" className="btn-primary w-full">
                    Continue Policy Creation
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="card mb-4">
              <div className="card-header">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                  <h4>Quick Stats</h4>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Organization:</span>
                  <span>{wizardData.organizationName || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Industry:</span>
                  <span>{wizardData.industry || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">ISO 22301:</span>
                  <span className={wizardData.isoCompliance ? 'text-green-400' : 'text-gray-400'}>
                    {wizardData.isoCompliance ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">RTO Target:</span>
                  <span>{wizardData.rto || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">RPO Target:</span>
                  <span>{wizardData.rpo || 'Not set'}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="card">
              <div className="card-header">
                <h4>Recommended Next Steps</h4>
              </div>

              <div className="space-y-3">
                {progressStats.overall < 25 && (
                  <div className="flex items-start">
                    <Circle className="w-4 h-4 mr-2 mt-1 text-yellow-400" />
                    <div>
                      <div className="font-semibold">Complete Organization Info</div>
                      <div className="text-sm text-gray-400">Fill in basic organization details</div>
                    </div>
                  </div>
                )}

                {progressStats.overall >= 25 && progressStats.overall < 50 && (
                  <div className="flex items-start">
                    <Circle className="w-4 h-4 mr-2 mt-1 text-yellow-400" />
                    <div>
                      <div className="font-semibold">Define Compliance Requirements</div>
                      <div className="text-sm text-gray-400">Set regulatory and standard requirements</div>
                    </div>
                  </div>
                )}

                {progressStats.overall >= 50 && progressStats.overall < 75 && (
                  <div className="flex items-start">
                    <Circle className="w-4 h-4 mr-2 mt-1 text-yellow-400" />
                    <div>
                      <div className="font-semibold">Complete Risk Assessment</div>
                      <div className="text-sm text-gray-400">Identify threats and vulnerabilities</div>
                    </div>
                  </div>
                )}

                {progressStats.overall >= 75 && progressStats.overall < 100 && (
                  <div className="flex items-start">
                    <Circle className="w-4 h-4 mr-2 mt-1 text-yellow-400" />
                    <div>
                      <div className="font-semibold">Finalize Policy</div>
                      <div className="text-sm text-gray-400">Review and complete remaining fields</div>
                    </div>
                  </div>
                )}

                {progressStats.overall === 100 && !completedPolicy && (
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 mr-2 mt-1 text-green-400" />
                    <div>
                      <div className="font-semibold">Generate Final Policy</div>
                      <div className="text-sm text-gray-400">Complete the wizard to generate your policy</div>
                    </div>
                  </div>
                )}

                {completedPolicy && (
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-400" />
                    <div>
                      <div className="font-semibold">Export Policy</div>
                      <div className="text-sm text-gray-400">Download as PDF or Word document</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
