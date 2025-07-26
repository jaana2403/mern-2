import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportToPDF = (policyData, formData) => {
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Helper function to add text with word wrapping
  const addText = (text, fontSize = 12, isBold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const pageWidth = doc.internal.pageSize.width - 40; // 20px margin on each side
    const lines = doc.splitTextToSize(text, pageWidth);
    
    lines.forEach(line => {
      if (yPosition > 270) { // Check if we need a new page
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += fontSize * 0.6;
    });
    yPosition += 5; // Add some spacing after each section
  };

  // Header
  addText('BUSINESS CONTINUITY MANAGEMENT POLICY', 20, true);
  yPosition += 10;
  
  // Organization info
  addText(`Organization: ${formData.organizationName || 'Not specified'}`, 14, true);
  addText(`Industry: ${formData.industry || 'Not specified'}`, 12);
  addText(`Effective Date: ${formData.effectiveDate || new Date().toLocaleDateString()}`, 12);
  addText(`Review Cycle: ${formData.reviewCycle || 'Annually'}`, 12);
  yPosition += 10;

  // Policy sections
  if (policyData && policyData.sections) {
    policyData.sections.forEach(section => {
      addText(section.title, 16, true);
      addText(section.content, 12);
      yPosition += 5;
    });
  }

  // Add ISO clause information if applicable
  if (formData.isoCompliance) {
    addText('ISO 22301:2019 COMPLIANCE MAPPING', 16, true);
    addText('This policy has been developed in accordance with ISO 22301:2019 requirements for Business Continuity Management Systems.', 12);
  }

  // Form data summary
  addText('POLICY CONFIGURATION SUMMARY', 16, true);
  Object.entries(formData).forEach(([key, value]) => {
    if (value && typeof value === 'string' && value.trim() !== '') {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      addText(`${label}: ${value}`, 12);
    }
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
    doc.text('Business Continuity Management Policy', 20, doc.internal.pageSize.height - 10);
  }

  const filename = `${formData.organizationName || 'Organization'}_BCM_Policy_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};

export const exportToWord = async (policyData, formData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title
        new Paragraph({
          children: [
            new TextRun({
              text: 'BUSINESS CONTINUITY MANAGEMENT POLICY',
              bold: true,
              size: 32,
            }),
          ],
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.TITLE,
        }),
        
        // Organization Information
        new Paragraph({
          children: [
            new TextRun({
              text: 'Organization Information',
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Organization: ${formData.organizationName || 'Not specified'}`,
              size: 22,
            }),
          ],
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Industry: ${formData.industry || 'Not specified'}`,
              size: 22,
            }),
          ],
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Organization Size: ${formData.size || 'Not specified'}`,
              size: 22,
            }),
          ],
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Location: ${formData.location || 'Not specified'}`,
              size: 22,
            }),
          ],
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Effective Date: ${formData.effectiveDate || new Date().toLocaleDateString()}`,
              size: 22,
            }),
          ],
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Review Cycle: ${formData.reviewCycle || 'Annually'}`,
              size: 22,
            }),
          ],
        }),

        // Policy Sections
        ...(policyData && policyData.sections ? policyData.sections.flatMap(section => [
          new Paragraph({
            children: [
              new TextRun({
                text: section.title,
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: section.content,
                size: 22,
              }),
            ],
          }),
        ]) : []),

        // Compliance Information
        ...(formData.isoCompliance ? [
          new Paragraph({
            children: [
              new TextRun({
                text: 'ISO 22301:2019 Compliance',
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'This policy has been developed in accordance with ISO 22301:2019 requirements for Business Continuity Management Systems.',
                size: 22,
              }),
            ],
          }),
        ] : []),

        // Configuration Summary
        new Paragraph({
          children: [
            new TextRun({
              text: 'Policy Configuration Summary',
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
        }),

        // Form Data
        ...Object.entries(formData)
          .filter(([key, value]) => value && typeof value === 'string' && value.trim() !== '')
          .map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return new Paragraph({
              children: [
                new TextRun({
                  text: `${label}: `,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: value,
                  size: 22,
                }),
              ],
            });
          }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = `${formData.organizationName || 'Organization'}_BCM_Policy_${new Date().toISOString().split('T')[0]}.docx`;
  saveAs(new Blob([buffer]), filename);
};

export const generatePolicyPreview = (formData, template) => {
  let policyContent = {
    title: formData.policyName || 'Business Continuity Management Policy',
    sections: []
  };

  if (template && template.sections) {
    policyContent.sections = template.sections.map(section => ({
      ...section,
      content: customizeContent(section.content, formData)
    }));
  }

  // Add organization-specific sections based on form data
  if (formData.criticalProcesses) {
    policyContent.sections.push({
      id: 'critical_processes',
      title: 'Critical Business Processes',
      content: formData.criticalProcesses
    });
  }

  if (formData.riskAssessment) {
    policyContent.sections.push({
      id: 'risk_assessment',
      title: 'Risk Assessment',
      content: formData.riskAssessment
    });
  }

  if (formData.recoveryPriorities) {
    policyContent.sections.push({
      id: 'recovery_objectives',
      title: 'Recovery Objectives and Priorities',
      content: `Recovery Time Objective (RTO): ${formData.rto || 'Not specified'}\\n` +
               `Recovery Point Objective (RPO): ${formData.rpo || 'Not specified'}\\n\\n` +
               `Recovery Priorities:\\n${formData.recoveryPriorities}`
    });
  }

  return policyContent;
};

const customizeContent = (content, formData) => {
  let customized = content;
  
  // Replace placeholders with actual data
  const replacements = {
    '[ORGANIZATION_NAME]': formData.organizationName || '[Organization Name]',
    '[INDUSTRY]': formData.industry || '[Industry]',
    '[LOCATION]': formData.location || '[Location]',
    '[EFFECTIVE_DATE]': formData.effectiveDate || '[Effective Date]',
    '[REVIEW_CYCLE]': formData.reviewCycle || '[Review Cycle]'
  };

  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    customized = customized.replace(new RegExp(placeholder, 'g'), replacement);
  });

  return customized;
};
