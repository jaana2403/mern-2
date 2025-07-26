import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Users, Settings, ChevronRight, Info } from 'lucide-react';

const Home = () => {

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Shield className="inline-block w-6 h-6 mr-2" />
          BCM Policy Manager
        </div>
        <div className="navbar-nav">
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <div className="text-center mt-4">
          <h1>Business Continuity Management Policy</h1>
          <p style={{fontSize: '1.2rem', color: '#cccccc', marginBottom: '3rem'}}>
            Create, manage, and document your organization's continuity policies with 
            compliance to globally recognized standards like ISO 22301:2019
          </p>
        </div>

        {/* Feature Cards */}
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <FileText className="inline-block w-8 h-8 mr-3 text-yellow-400" />
                <h3 style={{display: 'inline-block', margin: 0}}>Policy Creation</h3>
              </div>
              <p>Build comprehensive BCM policies from scratch or using pre-built templates aligned with ISO 22301:2019 standards.</p>
              <div className="mt-4">
                <Link to="/wizard" className="btn-primary mr-4">
                  Start Policy Wizard <ChevronRight className="inline-block w-4 h-4 ml-1" />
                </Link>
                <Link to="/templates" className="btn-secondary">
                  View Templates
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-header">
                <Users className="inline-block w-8 h-8 mr-3 text-yellow-400" />
                <h3 style={{display: 'inline-block', margin: 0}}>Collaboration & Roles</h3>
              </div>
              <p>Streamlined workflow for policy development and management with collaborative features for teams.</p>
              <div className="mt-4">
                <div className="text-sm text-gray-300">
                  <div>📝 <strong>Create:</strong> Build policies from templates or scratch</div>
                  <div>🔄 <strong>Collaborate:</strong> Work together on policy development</div>
                  <div>📊 <strong>Track:</strong> Monitor progress and completion status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <Settings className="inline-block w-8 h-8 mr-3 text-yellow-400" />
                <h3 style={{display: 'inline-block', margin: 0}}>AI-Powered Assistant</h3>
              </div>
              <p>Get intelligent recommendations and guidance throughout the policy creation process with our AI assistant.</p>
              <div className="mt-4">
                <Link to="/ai" className="btn-primary">
                  Get AI Help <ChevronRight className="inline-block w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-header">
                <Info className="inline-block w-8 h-8 mr-3 text-yellow-400" />
                <h3 style={{display: 'inline-block', margin: 0}}>Progress Tracking</h3>
              </div>
              <p>Monitor your policy development progress with visual indicators and completion tracking.</p>
              <div className="mt-4">
                <Link to="/progress" className="btn-primary">
                  View Progress <ChevronRight className="inline-block w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
