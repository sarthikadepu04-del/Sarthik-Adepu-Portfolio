import jsPDF from 'jspdf';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  SKILL_CATEGORIES,
  CERTIFICATIONS_DATA,
  WORKSHOPS_DATA,
} from '../data/portfolioData';

export function downloadResumePdf() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 42;

  // Primary palette (ATS Clean: Charcoal text, Warm Peach/Terracotta accents)
  const charcoal = [36, 31, 28]; // #241F1C
  const darkBrown = [74, 57, 48]; // #4A3930
  const terracotta = [230, 104, 64]; // #E66840
  const lightPeach = [255, 235, 226]; // #FFEBE2
  const dividerLine = [229, 210, 203]; // #E5D2CB

  // Helper: Section title with subtle bottom line
  const addSectionHeader = (title: string) => {
    y += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(terracotta[0], terracotta[1], terracotta[2]);
    doc.text(title.toUpperCase(), margin, y);

    y += 4;
    doc.setDrawColor(dividerLine[0], dividerLine[1], dividerLine[2]);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + contentWidth, y);
    y += 12;
  };

  // 1. Header (Candidate Name & Tagline)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.text(PERSONAL_INFO.name.toUpperCase(), margin, y);
  y += 15;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(terracotta[0], terracotta[1], terracotta[2]);
  doc.text('B.Tech CSE (AI & ML) Student · Aspiring Software Developer', margin, y);
  y += 13;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  const contactText = `Email: ${PERSONAL_INFO.email}  |  Location: ${PERSONAL_INFO.location}  |  GitHub: ${PERSONAL_INFO.socials.github}  |  LinkedIn: ${PERSONAL_INFO.socials.linkedin}`;
  doc.text(contactText, margin, y);
  y += 6;

  // 2. Professional Summary
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  const summaryText =
    `${PERSONAL_INFO.shortBio} Continuously learning by building practical full-stack projects, experimenting with modern technologies, and developing real-world software solutions with clean code.`;
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11;

  // 3. Education
  addSectionHeader('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.text(EDUCATION_DATA.institution, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  doc.text(EDUCATION_DATA.location, margin + contentWidth, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  doc.text(`${EDUCATION_DATA.degree} in ${EDUCATION_DATA.major}`, margin, y);
  doc.text(EDUCATION_DATA.status, margin + contentWidth, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Key Focus: Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Object-Oriented Systems, Web Engineering', margin, y);
  y += 10;

  // 4. Practical Experience
  addSectionHeader('Practical Experience');
  const exp = EXPERIENCE_DATA[0];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.text(`${exp.role} — ${exp.company}`, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  doc.text(exp.period, margin + contentWidth, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const expLines = doc.splitTextToSize(
    `• ${exp.description} Designed, implemented, and deployed responsive web tools and dynamic applications with interactive state management.\n• Key Projects Developed: ${exp.projectsDeveloped.join(', ')}`,
    contentWidth
  );
  doc.text(expLines, margin, y);
  y += expLines.length * 11;

  // 5. Featured Technical Projects
  addSectionHeader('Featured Technical Projects');
  PROJECTS_DATA.slice(0, 4).forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text(proj.name, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(terracotta[0], terracotta[1], terracotta[2]);
    doc.text(proj.technologies.slice(0, 5).join(' · '), margin + contentWidth, y, { align: 'right' });
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
    const projDesc = `• ${proj.description} (Live: ${proj.live} | Code: ${proj.github})`;
    const projLines = doc.splitTextToSize(projDesc, contentWidth);
    doc.text(projLines, margin, y);
    y += projLines.length * 10 + 2;
  });

  // 6. Technical Skills
  addSectionHeader('Technical Skills');
  const skillsList = [
    { label: 'Programming', items: 'Python, C++, C, JavaScript, TypeScript' },
    { label: 'Web Technologies', items: 'React, HTML5, CSS3, Tailwind CSS, Vite, Responsive Web Design' },
    { label: 'AI & Machine Learning', items: 'Machine Learning Fundamentals, Gemini AI, Prompt Engineering, AI Integration' },
    { label: 'Developer Tools & Cloud', items: 'Git, GitHub, Vercel Serverless, Google AI Studio, REST APIs, SQL' },
    { label: 'Core Engineering', items: 'Data Structures & Algorithms, Object-Oriented Programming, Problem Solving' },
  ];

  skillsList.forEach((s) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text(`• ${s.label}: `, margin, y);

    const labelWidth = doc.getTextWidth(`• ${s.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
    doc.text(s.items, margin + labelWidth, y);
    y += 10.5;
  });

  // 7. Certifications & Key Activities
  addSectionHeader('Certifications & Key Activities');
  const certItems = [
    '• Google Cloud Certified Professional · Cloud Architect',
    '• Certified Forage and Grassland Professional (CFGP) · Technology Job Simulation',
    '• Computer Hardware and Software Certification',
    '• AI SPARKS & Robotics Workshop Participant',
  ];

  certItems.forEach((c) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
    doc.text(c, margin, y);
    y += 10;
  });

  // Save the document
  doc.save('Sarthik_Adepu_Resume.pdf');
}
