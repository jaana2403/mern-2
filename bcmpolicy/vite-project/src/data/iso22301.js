export const ISO22301_CLAUSES = {
  "4": {
    title: "Context of the Organization",
    subclauses: {
      "4.1": {
        title: "Understanding the organization and its context",
        description: "The organization shall determine external and internal issues relevant to its purpose and that affect its ability to achieve the intended outcome(s) of its business continuity management system.",
        requirements: [
          "Identify internal and external issues",
          "Consider stakeholder needs and expectations",
          "Assess impact on business continuity objectives"
        ]
      },
      "4.2": {
        title: "Understanding the needs and expectations of interested parties",
        description: "The organization shall determine the interested parties that are relevant to the business continuity management system and the requirements of these interested parties.",
        requirements: [
          "Identify interested parties",
          "Determine requirements of interested parties",
          "Monitor and review information about interested parties"
        ]
      },
      "4.3": {
        title: "Determining the scope of the business continuity management system",
        description: "The organization shall determine the boundaries and applicability of the business continuity management system to establish its scope.",
        requirements: [
          "Define organizational boundaries",
          "Consider external and internal issues",
          "Document the scope"
        ]
      },
      "4.4": {
        title: "Business continuity management system",
        description: "The organization shall establish, implement, maintain and continually improve a business continuity management system.",
        requirements: [
          "Establish BCMS processes",
          "Maintain documented information",
          "Ensure process interactions"
        ]
      }
    }
  },
  "5": {
    title: "Leadership",
    subclauses: {
      "5.1": {
        title: "Leadership and commitment",
        description: "Top management shall demonstrate leadership and commitment with respect to the business continuity management system.",
        requirements: [
          "Demonstrate leadership commitment",
          "Ensure BCMS integration",
          "Provide necessary resources"
        ]
      },
      "5.2": {
        title: "Policy",
        description: "Top management shall establish a business continuity policy that is appropriate to the purpose of the organization.",
        requirements: [
          "Establish BC policy",
          "Communicate policy",
          "Maintain as documented information"
        ]
      },
      "5.3": {
        title: "Organizational roles, responsibilities and authorities",
        description: "Top management shall ensure that the responsibilities and authorities for relevant roles are assigned and communicated.",
        requirements: [
          "Assign roles and responsibilities",
          "Communicate authorities",
          "Ensure BCMS compliance"
        ]
      }
    }
  },
  "6": {
    title: "Planning",
    subclauses: {
      "6.1": {
        title: "Actions to address risks and opportunities",
        description: "When planning for the business continuity management system, the organization shall consider various factors.",
        requirements: [
          "Identify risks and opportunities",
          "Plan actions to address risks",
          "Integrate actions into BCMS processes"
        ]
      },
      "6.2": {
        title: "Business continuity objectives and planning to achieve them",
        description: "The organization shall establish business continuity objectives at relevant functions and levels.",
        requirements: [
          "Establish BC objectives",
          "Plan to achieve objectives",
          "Monitor and measure progress"
        ]
      },
      "6.3": {
        title: "Planning of changes",
        description: "When the organization determines the need for changes to the business continuity management system, the changes shall be carried out in a planned manner.",
        requirements: [
          "Plan changes systematically",
          "Consider purpose and consequences",
          "Maintain BCMS integrity"
        ]
      }
    }
  },
  "7": {
    title: "Support",
    subclauses: {
      "7.1": {
        title: "Resources",
        description: "The organization shall determine and provide the resources needed for the establishment, implementation, maintenance and continual improvement of the business continuity management system.",
        requirements: [
          "Determine required resources",
          "Provide adequate resources",
          "Ensure resource availability"
        ]
      },
      "7.2": {
        title: "Competence",
        description: "The organization shall determine the necessary competence of person(s) doing work under its control that affects the performance of the business continuity management system.",
        requirements: [
          "Determine required competence",
          "Ensure competence through training",
          "Maintain competence records"
        ]
      },
      "7.3": {
        title: "Awareness",
        description: "Persons doing work under the organization's control shall be aware of the business continuity policy, their contribution to the effectiveness of the business continuity management system, and the implications of not conforming with the business continuity management system requirements.",
        requirements: [
          "Ensure BC awareness",
          "Communicate responsibilities",
          "Explain non-conformity implications"
        ]
      }
    }
  }
};

export const POLICY_TEMPLATES = {
  basic: {
    name: "Basic BCM Policy Template",
    description: "A fundamental business continuity policy template covering essential elements",
    category: "General",
    sections: [
      {
        id: "purpose",
        title: "Purpose and Scope",
        content: "This Business Continuity Policy establishes the framework for ensuring organizational resilience and the ability to continue critical business operations during and after disruptive incidents.",
        required: true
      },
      {
        id: "objectives",
        title: "Policy Objectives",
        content: "To minimize the impact of disruptions on business operations, protect stakeholder interests, and ensure rapid recovery of critical business functions.",
        required: true
      },
      {
        id: "responsibilities",
        title: "Roles and Responsibilities",
        content: "Management is responsible for implementing and maintaining the BCM program, while all employees must understand their roles in business continuity plans.",
        required: true
      },
      {
        id: "governance",
        title: "Governance Structure",
        content: "The Business Continuity Management System will be governed by a dedicated committee reporting to senior management.",
        required: false
      }
    ]
  },
  iso22301: {
    name: "ISO 22301:2019 Business Continuity",
    description: "Comprehensive template aligned with ISO 22301:2019 standard requirements",
    category: "International Standards",
    sections: [
      {
        id: "context",
        title: "Organizational Context (Clause 4.1)",
        content: "The organization has identified internal and external factors that may impact business continuity, including stakeholder expectations and regulatory requirements.",
        isoClause: "4.1",
        required: true
      },
      {
        id: "scope",
        title: "BCMS Scope (Clause 4.3)",
        content: "This Business Continuity Management System applies to all critical business processes and functions as defined in the Business Impact Analysis.",
        isoClause: "4.3",
        required: true
      },
      {
        id: "leadership",
        title: "Leadership Commitment (Clause 5.1)",
        content: "Top management demonstrates commitment to the BCMS through resource allocation, policy communication, and active participation in business continuity activities.",
        isoClause: "5.1",
        required: true
      },
      {
        id: "policy_statement",
        title: "Business Continuity Policy (Clause 5.2)",
        content: "The organization is committed to implementing and maintaining an effective Business Continuity Management System to ensure operational resilience.",
        isoClause: "5.2",
        required: true
      },
      {
        id: "roles",
        title: "Roles and Authorities (Clause 5.3)",
        content: "Clear roles, responsibilities, and authorities are established for all personnel involved in business continuity management.",
        isoClause: "5.3",
        required: true
      },
      {
        id: "risk_management",
        title: "Risk Management (Clause 6.1)",
        content: "The organization systematically identifies, analyzes, and treats risks that could impact business continuity objectives.",
        isoClause: "6.1",
        required: true
      }
    ]
  },
  nist: {
    name: "NIST Cybersecurity Framework",
    description: "Business continuity aligned with NIST cybersecurity framework requirements",
    category: "Cybersecurity Standards",
    sections: [
      {
        id: "identify",
        title: "Identify Function",
        content: "The organization identifies and understands cybersecurity risks to systems, assets, data, and capabilities that could impact business continuity.",
        required: true
      },
      {
        id: "protect",
        title: "Protect Function",
        content: "Appropriate safeguards are implemented to ensure delivery of critical infrastructure services and limit the impact of potential cybersecurity events.",
        required: true
      },
      {
        id: "detect",
        title: "Detect Function",
        content: "Activities are implemented to identify the occurrence of cybersecurity events that could affect business operations.",
        required: true
      },
      {
        id: "respond",
        title: "Respond Function",
        content: "Response activities are coordinated to contain the impact of detected cybersecurity incidents on business continuity.",
        required: true
      },
      {
        id: "recover",
        title: "Recover Function",
        content: "Recovery planning and processes are maintained to restore systems and services affected by cybersecurity incidents.",
        required: true
      }
    ]
  },
  sox: {
    name: "Sarbanes-Oxley (SOX) Compliance",
    description: "Business continuity policy for SOX compliance requirements",
    category: "Financial Regulations",
    sections: [
      {
        id: "financial_controls",
        title: "Financial Reporting Controls",
        content: "Business continuity plans ensure the integrity and availability of financial reporting systems and controls during disruptions.",
        required: true
      },
      {
        id: "data_integrity",
        title: "Data Integrity and Retention",
        content: "Financial data integrity is maintained during business disruptions with appropriate backup and recovery procedures.",
        required: true
      },
      {
        id: "audit_compliance",
        title: "Audit and Compliance",
        content: "Business continuity procedures support ongoing compliance with SOX requirements and facilitate audit processes.",
        required: true
      }
    ]
  },
  hipaa: {
    name: "HIPAA Healthcare Compliance",
    description: "Business continuity for healthcare organizations under HIPAA requirements",
    category: "Healthcare Regulations",
    sections: [
      {
        id: "phi_protection",
        title: "Protected Health Information (PHI)",
        content: "Business continuity plans ensure the confidentiality, integrity, and availability of PHI during operational disruptions.",
        required: true
      },
      {
        id: "security_measures",
        title: "Administrative, Physical, and Technical Safeguards",
        content: "Continuity plans maintain HIPAA security safeguards to protect electronic PHI during recovery operations.",
        required: true
      },
      {
        id: "breach_notification",
        title: "Breach Notification Procedures",
        content: "Procedures are established for breach notification and reporting in accordance with HIPAA requirements during incidents.",
        required: true
      }
    ]
  },
  custom: {
    name: "Custom Compliance Standard",
    description: "Create a business continuity policy based on your specific compliance requirements",
    category: "Custom",
    isCustom: true,
    sections: []
  }
};

export const TEMPLATE_SPECIFIC_STEPS = {
  basic: [
    {
      id: 1,
      title: "Organization Information",
      description: "Basic information about your organization",
      fields: [
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "industry", label: "Industry Sector", type: "select", required: true, options: ["Financial Services", "Healthcare", "Manufacturing", "Technology", "Government", "Other"] },
        { name: "size", label: "Organization Size", type: "select", required: true, options: ["Small (1-50)", "Medium (51-250)", "Large (251-1000)", "Enterprise (1000+)"] },
        { name: "location", label: "Primary Location", type: "text", required: true }
      ]
    },
    {
      id: 2,
      title: "Business Impact Assessment",
      description: "Assess your business continuity requirements",
      fields: [
        { name: "businessImpact", label: "Maximum Tolerable Downtime", type: "select", required: true, options: ["< 1 hour", "1-4 hours", "4-24 hours", "1-3 days", "> 3 days"] },
        { name: "criticalProcesses", label: "Critical Business Processes", type: "textarea", required: true, placeholder: "List your organization's critical business processes..." },
        { name: "keyPersonnel", label: "Key Personnel", type: "textarea", required: true, placeholder: "Identify critical roles and key personnel..." }
      ]
    },
    {
      id: 3,
      title: "Recovery Planning",
      description: "Define your recovery objectives and strategies",
      fields: [
        { name: "rto", label: "Recovery Time Objective (RTO)", type: "select", required: true, options: ["< 1 hour", "1-4 hours", "4-8 hours", "8-24 hours", "> 24 hours"] },
        { name: "recoveryStrategies", label: "Recovery Strategies", type: "textarea", required: true, placeholder: "Describe your recovery strategies and procedures..." },
        { name: "communicationPlan", label: "Communication Plan", type: "textarea", required: true, placeholder: "How will you communicate during incidents?" }
      ]
    },
    {
      id: 4,
      title: "Policy Finalization",
      description: "Finalize your basic BCM policy",
      fields: [
        { name: "policyName", label: "Policy Document Name", type: "text", required: true, defaultValue: "Business Continuity Management Policy" },
        { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
        { name: "reviewCycle", label: "Review Cycle", type: "select", required: true, options: ["Annually", "Bi-annually", "Quarterly"] },
        { name: "approver", label: "Policy Approver", type: "text", required: true, placeholder: "Name and title of policy approver" }
      ]
    }
  ],
  iso22301: [
    {
      id: 1,
      title: "Organizational Context (ISO 4.1)",
      description: "Understanding the organization and its context",
      fields: [
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "industry", label: "Industry Sector", type: "select", required: true, options: ["Financial Services", "Healthcare", "Manufacturing", "Technology", "Government", "Other"] },
        { name: "internalIssues", label: "Internal Issues", type: "textarea", required: true, placeholder: "Identify internal factors that may affect business continuity..." },
        { name: "externalIssues", label: "External Issues", type: "textarea", required: true, placeholder: "Identify external factors (economic, regulatory, environmental)..." },
        { name: "interestedParties", label: "Interested Parties", type: "textarea", required: true, placeholder: "List stakeholders, customers, suppliers, regulators..." }
      ]
    },
    {
      id: 2,
      title: "BCMS Scope & Leadership (ISO 4.3, 5.1)",
      description: "Define scope and demonstrate leadership commitment",
      fields: [
        { name: "bcmsScope", label: "BCMS Scope", type: "textarea", required: true, placeholder: "Define what processes, locations, and activities are covered..." },
        { name: "leadershipCommitment", label: "Leadership Commitment", type: "textarea", required: true, placeholder: "How does top management demonstrate commitment to BCM?" },
        { name: "resourceAllocation", label: "Resource Allocation", type: "textarea", required: true, placeholder: "What resources are allocated for business continuity?" },
        { name: "bcmObjectives", label: "BCM Objectives", type: "textarea", required: true, placeholder: "Define specific, measurable BCM objectives..." }
      ]
    },
    {
      id: 3,
      title: "Risk Management (ISO 6.1)",
      description: "Address risks and opportunities",
      fields: [
        { name: "riskIdentification", label: "Risk Identification Process", type: "textarea", required: true, placeholder: "How do you identify and assess risks?" },
        { name: "riskTreatment", label: "Risk Treatment Options", type: "multiselect", required: true, options: ["Accept", "Avoid", "Transfer", "Mitigate"] },
        { name: "riskCriteria", label: "Risk Acceptance Criteria", type: "textarea", required: true, placeholder: "Define criteria for accepting risks..." },
        { name: "businessImpactAnalysis", label: "Business Impact Analysis", type: "textarea", required: true, placeholder: "Describe your BIA methodology and findings..." }
      ]
    },
    {
      id: 4,
      title: "Support & Resources (ISO 7.1, 7.2)",
      description: "Define resources and competence requirements",
      fields: [
        { name: "requiredResources", label: "Required Resources", type: "textarea", required: true, placeholder: "What human, financial, and technical resources are needed?" },
        { name: "competenceRequirements", label: "Competence Requirements", type: "textarea", required: true, placeholder: "Define competence requirements for BCM roles..." },
        { name: "awarenessProgram", label: "Awareness Program", type: "textarea", required: true, placeholder: "How will you ensure BC awareness across the organization?" },
        { name: "trainingProgram", label: "Training Program", type: "textarea", required: true, placeholder: "Describe BCM training and education programs..." }
      ]
    },
    {
      id: 5,
      title: "Recovery Objectives & Strategies (ISO 8.2)",
      description: "Define recovery requirements and strategies",
      fields: [
        { name: "rto", label: "Recovery Time Objective (RTO)", type: "select", required: true, options: ["< 1 hour", "1-4 hours", "4-8 hours", "8-24 hours", "> 24 hours"] },
        { name: "rpo", label: "Recovery Point Objective (RPO)", type: "select", required: true, options: ["< 15 minutes", "15 minutes - 1 hour", "1-4 hours", "4-24 hours", "> 24 hours"] },
        { name: "recoveryStrategies", label: "Recovery Strategies", type: "textarea", required: true, placeholder: "Detail recovery strategies for critical processes..." },
        { name: "alternativeArrangements", label: "Alternative Arrangements", type: "textarea", required: true, placeholder: "Describe alternative facilities, suppliers, staff arrangements..." }
      ]
    },
    {
      id: 6,
      title: "Monitoring & Review (ISO 9.1, 10.1)",
      description: "Performance evaluation and improvement",
      fields: [
        { name: "performanceMetrics", label: "Performance Metrics", type: "textarea", required: true, placeholder: "How will you measure BCMS effectiveness?" },
        { name: "testingProgram", label: "Testing Program", type: "textarea", required: true, placeholder: "Describe your BC plan testing and exercise program..." },
        { name: "reviewFrequency", label: "Management Review Frequency", type: "select", required: true, options: ["Monthly", "Quarterly", "Bi-annually", "Annually"] },
        { name: "improvementProcess", label: "Improvement Process", type: "textarea", required: true, placeholder: "How will you implement continual improvement?" }
      ]
    },
    {
      id: 7,
      title: "ISO 22301 Policy Finalization",
      description: "Complete your ISO 22301 compliant policy",
      fields: [
        { name: "policyName", label: "Policy Document Name", type: "text", required: true, defaultValue: "ISO 22301:2019 Business Continuity Management Policy" },
        { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
        { name: "reviewCycle", label: "Review Cycle", type: "select", required: true, options: ["Annually", "Bi-annually", "Quarterly"] },
        { name: "approver", label: "Policy Approver", type: "text", required: true, placeholder: "Name and title of policy approver" },
        { name: "certificationGoal", label: "Certification Goal", type: "checkbox", required: false, defaultValue: true }
      ]
    }
  ],
  nist: [
    {
      id: 1,
      title: "Organization & Cybersecurity Context",
      description: "Understand your cybersecurity and business continuity context",
      fields: [
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "cybersecurityRisk", label: "Primary Cybersecurity Risks", type: "multiselect", required: true, options: ["Data Breaches", "Ransomware", "DDoS Attacks", "Insider Threats", "Supply Chain Attacks", "IoT Vulnerabilities"] },
        { name: "criticalAssets", label: "Critical Assets", type: "textarea", required: true, placeholder: "Identify critical IT systems, data, and infrastructure..." },
        { name: "dataClassification", label: "Data Classification", type: "textarea", required: true, placeholder: "How do you classify and protect sensitive data?" }
      ]
    },
    {
      id: 2,
      title: "Identify Function",
      description: "Asset management, governance, and risk assessment",
      fields: [
        { name: "assetInventory", label: "Asset Inventory Process", type: "textarea", required: true, placeholder: "How do you maintain an inventory of devices, systems, and platforms?" },
        { name: "cyberGovernance", label: "Cybersecurity Governance", type: "textarea", required: true, placeholder: "Describe cybersecurity policies, procedures, and processes..." },
        { name: "riskManagementStrategy", label: "Risk Management Strategy", type: "textarea", required: true, placeholder: "How do you identify, assess, and manage cybersecurity risks?" },
        { name: "supplyChainRisk", label: "Supply Chain Risk Management", type: "textarea", required: true, placeholder: "How do you manage third-party and supply chain risks?" }
      ]
    },
    {
      id: 3,
      title: "Protect Function",
      description: "Safeguards to ensure delivery of critical services",
      fields: [
        { name: "accessControl", label: "Access Control Measures", type: "textarea", required: true, placeholder: "Describe identity management and access controls..." },
        { name: "securityAwareness", label: "Security Awareness Program", type: "textarea", required: true, placeholder: "How do you train users on cybersecurity?" },
        { name: "dataProtection", label: "Data Protection Measures", type: "textarea", required: true, placeholder: "How do you protect data at rest and in transit?" },
        { name: "protectivetech", label: "Protective Technology", type: "textarea", required: true, placeholder: "What technical security measures are in place?" }
      ]
    },
    {
      id: 4,
      title: "Detect Function",
      description: "Activities to identify cybersecurity events",
      fields: [
        { name: "continuousMonitoring", label: "Continuous Monitoring", type: "textarea", required: true, placeholder: "How do you monitor networks and systems for anomalies?" },
        { name: "detectionProcesses", label: "Detection Processes", type: "textarea", required: true, placeholder: "What processes detect cybersecurity events?" },
        { name: "maliciousCode", label: "Malicious Code Detection", type: "textarea", required: true, placeholder: "How do you detect and prevent malware?" }
      ]
    },
    {
      id: 5,
      title: "Respond Function",
      description: "Response activities to contain cybersecurity incidents",
      fields: [
        { name: "responseTeam", label: "Incident Response Team", type: "textarea", required: true, placeholder: "Who is responsible for incident response?" },
        { name: "responseProcedures", label: "Response Procedures", type: "textarea", required: true, placeholder: "What are your incident response procedures?" },
        { name: "communicationPlan", label: "Incident Communication", type: "textarea", required: true, placeholder: "How do you communicate during incidents?" },
        { name: "containment", label: "Containment Measures", type: "textarea", required: true, placeholder: "How do you contain and mitigate incidents?" }
      ]
    },
    {
      id: 6,
      title: "Recover Function",
      description: "Recovery planning and processes",
      fields: [
        { name: "recoveryPlanning", label: "Recovery Planning", type: "textarea", required: true, placeholder: "How do you plan for recovery from cyber incidents?" },
        { name: "systemRecovery", label: "System Recovery Procedures", type: "textarea", required: true, placeholder: "What are your system restoration procedures?" },
        { name: "rto", label: "Recovery Time Objective (RTO)", type: "select", required: true, options: ["< 1 hour", "1-4 hours", "4-8 hours", "8-24 hours", "> 24 hours"] },
        { name: "lessonsLearned", label: "Lessons Learned Process", type: "textarea", required: true, placeholder: "How do you capture and apply lessons learned?" }
      ]
    },
    {
      id: 7,
      title: "NIST Framework Policy Finalization",
      description: "Complete your NIST-aligned cybersecurity continuity policy",
      fields: [
        { name: "policyName", label: "Policy Document Name", type: "text", required: true, defaultValue: "NIST Cybersecurity Framework Business Continuity Policy" },
        { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
        { name: "reviewCycle", label: "Review Cycle", type: "select", required: true, options: ["Quarterly", "Bi-annually", "Annually"] },
        { name: "approver", label: "Policy Approver", type: "text", required: true, placeholder: "Name and title of policy approver" }
      ]
    }
  ],
  sox: [
    {
      id: 1,
      title: "Organization & Financial Context",
      description: "Understanding SOX compliance and financial reporting requirements",
      fields: [
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "publicCompany", label: "Public Company Status", type: "select", required: true, options: ["SEC Registered", "Subsidiary of Public Company", "Pre-IPO", "Other"] },
        { name: "fiscalYear", label: "Fiscal Year End", type: "text", required: true, placeholder: "e.g., December 31" },
        { name: "significantAccounts", label: "Significant Financial Statement Accounts", type: "textarea", required: true, placeholder: "List significant accounts and balances..." }
      ]
    },
    {
      id: 2,
      title: "Internal Controls Over Financial Reporting",
      description: "SOX Section 404 compliance requirements",
      fields: [
        { name: "icfrFramework", label: "ICFR Framework", type: "select", required: true, options: ["COSO 2013", "COSO 1992", "Other"] },
        { name: "keyControls", label: "Key Financial Controls", type: "textarea", required: true, placeholder: "Describe key controls over financial reporting..." },
        { name: "itControls", label: "IT General Controls", type: "textarea", required: true, placeholder: "Describe IT controls supporting financial reporting..." },
        { name: "entityLevel", label: "Entity-Level Controls", type: "textarea", required: true, placeholder: "Describe tone at top, risk assessment, control activities..." }
      ]
    },
    {
      id: 3,
      title: "Business Continuity for Financial Reporting",
      description: "Ensuring continuity of financial reporting during disruptions",
      fields: [
        { name: "financialSystems", label: "Critical Financial Systems", type: "textarea", required: true, placeholder: "List ERP, GL, and other critical financial systems..." },
        { name: "reportingDeadlines", label: "Reporting Deadlines", type: "textarea", required: true, placeholder: "List SEC filing deadlines and other critical dates..." },
        { name: "backupProcedures", label: "Financial Data Backup", type: "textarea", required: true, placeholder: "How do you backup and protect financial data?" },
        { name: "alternativeSites", label: "Alternative Processing Sites", type: "textarea", required: true, placeholder: "Describe alternative facilities for financial processing..." }
      ]
    },
    {
      id: 4,
      title: "Audit & Compliance Continuity",
      description: "Maintaining audit trails and compliance during incidents",
      fields: [
        { name: "auditTrails", label: "Audit Trail Protection", type: "textarea", required: true, placeholder: "How do you maintain audit trails during disruptions?" },
        { name: "documentRetention", label: "Document Retention", type: "textarea", required: true, placeholder: "How do you ensure SOX document retention compliance?" },
        { name: "externalAuditor", label: "External Auditor Communication", type: "textarea", required: true, placeholder: "How do you communicate with auditors during incidents?" },
        { name: "rto", label: "Financial Reporting RTO", type: "select", required: true, options: ["< 4 hours", "4-8 hours", "8-24 hours", "1-2 days", "2-5 days"] }
      ]
    },
    {
      id: 5,
      title: "SOX Compliance Policy Finalization",
      description: "Complete your SOX-compliant business continuity policy",
      fields: [
        { name: "policyName", label: "Policy Document Name", type: "text", required: true, defaultValue: "SOX Business Continuity Management Policy" },
        { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
        { name: "reviewCycle", label: "Review Cycle", type: "select", required: true, options: ["Quarterly", "Bi-annually", "Annually"] },
        { name: "approver", label: "Policy Approver", type: "text", required: true, placeholder: "CFO or other executive approver" },
        { name: "auditCompliance", label: "Annual Audit Compliance", type: "checkbox", required: false, defaultValue: true }
      ]
    }
  ],
  hipaa: [
    {
      id: 1,
      title: "Healthcare Organization Context",
      description: "Understanding HIPAA compliance and healthcare operations",
      fields: [
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "entityType", label: "HIPAA Entity Type", type: "select", required: true, options: ["Covered Entity", "Business Associate", "Hybrid Entity", "Other"] },
        { name: "healthcareServices", label: "Healthcare Services Provided", type: "textarea", required: true, placeholder: "Describe the healthcare services you provide..." },
        { name: "phiVolume", label: "PHI Volume", type: "select", required: true, options: ["< 1,000 records", "1,000 - 10,000 records", "10,000 - 100,000 records", "> 100,000 records"] }
      ]
    },
    {
      id: 2,
      title: "PHI Protection & Security",
      description: "HIPAA Security Rule compliance for business continuity",
      fields: [
        { name: "phiSystems", label: "PHI Systems", type: "textarea", required: true, placeholder: "List systems that store, process, or transmit PHI..." },
        { name: "accessControls", label: "PHI Access Controls", type: "textarea", required: true, placeholder: "How do you control access to PHI?" },
        { name: "encryptionMethods", label: "Encryption Methods", type: "textarea", required: true, placeholder: "How do you encrypt PHI at rest and in transit?" },
        { name: "auditControls", label: "Audit Controls", type: "textarea", required: true, placeholder: "How do you log and monitor PHI access?" }
      ]
    },
    {
      id: 3,
      title: "Business Continuity for Healthcare",
      description: "Ensuring continuity of healthcare services and PHI protection",
      fields: [
        { name: "criticalServices", label: "Critical Healthcare Services", type: "textarea", required: true, placeholder: "List critical patient care services..." },
        { name: "patientSafety", label: "Patient Safety Measures", type: "textarea", required: true, placeholder: "How do you ensure patient safety during disruptions?" },
        { name: "phiBackup", label: "PHI Backup & Recovery", type: "textarea", required: true, placeholder: "How do you backup and recover PHI?" },
        { name: "rto", label: "Healthcare Services RTO", type: "select", required: true, options: ["< 1 hour", "1-4 hours", "4-8 hours", "8-24 hours", "> 24 hours"] }
      ]
    },
    {
      id: 4,
      title: "Breach Notification & Incident Response",
      description: "HIPAA breach notification and incident response procedures",
      fields: [
        { name: "breachProcedures", label: "Breach Notification Procedures", type: "textarea", required: true, placeholder: "How do you handle suspected PHI breaches?" },
        { name: "incidentResponse", label: "Security Incident Response", type: "textarea", required: true, placeholder: "Describe your security incident response process..." },
        { name: "patientNotification", label: "Patient Notification Process", type: "textarea", required: true, placeholder: "How do you notify patients of breaches?" },
        { name: "businessAssociates", label: "Business Associate Agreements", type: "textarea", required: true, placeholder: "How do you manage BA agreements during incidents?" }
      ]
    },
    {
      id: 5,
      title: "HIPAA Compliance Policy Finalization",
      description: "Complete your HIPAA-compliant business continuity policy",
      fields: [
        { name: "policyName", label: "Policy Document Name", type: "text", required: true, defaultValue: "HIPAA Business Continuity Management Policy" },
        { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
        { name: "reviewCycle", label: "Review Cycle", type: "select", required: true, options: ["Quarterly", "Bi-annually", "Annually"] },
        { name: "approver", label: "Policy Approver", type: "text", required: true, placeholder: "HIPAA Security Officer or executive approver" },
        { name: "privacyOfficer", label: "Privacy Officer", type: "text", required: true, placeholder: "Name of designated Privacy Officer" }
      ]
    }
  ],
  custom: [
    {
      id: 1,
      title: "Organization & Custom Requirements",
      description: "Define your organization and specific compliance needs",
      fields: [
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "industry", label: "Industry Sector", type: "select", required: true, options: ["Financial Services", "Healthcare", "Manufacturing", "Technology", "Government", "Energy", "Education", "Other"] },
        { name: "customCompliance", label: "Custom Compliance Requirements", type: "textarea", required: true, placeholder: "Describe your specific regulatory or compliance requirements..." },
        { name: "complianceDeadlines", label: "Compliance Deadlines", type: "textarea", required: true, placeholder: "List important compliance deadlines and reporting requirements..." }
      ]
    },
    {
      id: 2,
      title: "Custom Risk Assessment",
      description: "Identify risks specific to your compliance requirements",
      fields: [
        { name: "specificRisks", label: "Specific Compliance Risks", type: "textarea", required: true, placeholder: "What risks are specific to your compliance requirements?" },
        { name: "regulatoryPenalties", label: "Regulatory Penalties", type: "textarea", required: true, placeholder: "What are the penalties for non-compliance?" },
        { name: "criticalSystems", label: "Critical Compliance Systems", type: "textarea", required: true, placeholder: "What systems are critical for maintaining compliance?" },
        { name: "keyStakeholders", label: "Key Compliance Stakeholders", type: "textarea", required: true, placeholder: "Who are the key internal and external stakeholders?" }
      ]
    },
    {
      id: 3,
      title: "Custom Recovery Requirements",
      description: "Define recovery objectives for your specific needs",
      fields: [
        { name: "complianceRTO", label: "Compliance Recovery Time", type: "textarea", required: true, placeholder: "How quickly must compliance functions be restored?" },
        { name: "dataProtection", label: "Data Protection Requirements", type: "textarea", required: true, placeholder: "What are your specific data protection requirements?" },
        { name: "reportingRequirements", label: "Emergency Reporting", type: "textarea", required: true, placeholder: "What reporting is required during incidents?" },
        { name: "recoveryStrategies", label: "Custom Recovery Strategies", type: "textarea", required: true, placeholder: "Describe recovery strategies for your compliance needs..." }
      ]
    },
    {
      id: 4,
      title: "Custom Policy Finalization",
      description: "Complete your custom compliance-focused policy",
      fields: [
        { name: "policyName", label: "Policy Document Name", type: "text", required: true, defaultValue: "Custom Business Continuity Management Policy" },
        { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
        { name: "reviewCycle", label: "Review Cycle", type: "select", required: true, options: ["Monthly", "Quarterly", "Bi-annually", "Annually"] },
        { name: "approver", label: "Policy Approver", type: "text", required: true, placeholder: "Name and title of policy approver" },
        { name: "complianceOfficer", label: "Compliance Officer", type: "text", required: false, placeholder: "Name of designated compliance officer" }
      ]
    }
  ]
};

// Legacy export for backward compatibility
export const WIZARD_STEPS = TEMPLATE_SPECIFIC_STEPS.basic;
