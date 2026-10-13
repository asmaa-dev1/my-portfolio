import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const uploadedPdf = 'C:\\Users\\elhin\\.gemini\\antigravity\\brain\\24607839-2c25-445c-af5f-1064e122be59\\.user_uploaded\\media_1791848195779.pdf';
const artifactDir = 'C:\\Users\\elhin\\.gemini\\antigravity\\brain\\24607839-2c25-445c-af5f-1064e122be59';
const desktopDir = 'c:\\Users\\elhin\\OneDrive\\Desktop';

const photoBase64 = fs.readFileSync(path.join(rootDir, 'public', 'photo_base64.txt'), 'utf-8').trim();
const imgSrc = `data:image/jpeg;base64,${photoBase64}`;

// EXACT SIZES MATCHING CANVA PDF EXTRACTED METRICS
const commonCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #111827;
      background: #ffffff;
      width: 595.5pt;
      height: 842.25pt;
      max-height: 842.25pt;
      padding: 18pt 24pt 16pt 24pt;
      margin: 0 auto;
      font-size: 8.8pt;
      line-height: 1.25;
      position: relative;
      overflow: hidden;
    }

    /* Top Header Profile */
    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0px;
      gap: 12pt;
    }

    .header-photo-wrapper {
      width: 125pt;
      height: 110pt;
      flex-shrink: 0;
      overflow: hidden;
      border: none;
      background: transparent;
      margin-bottom: 0px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-self: flex-end;
    }

    .profile-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 8%;
      display: block;
    }

    .header-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-bottom: 2pt;
    }

    .name {
      font-size: 10.4pt;
      font-weight: 800;
      color: #000000;
      letter-spacing: -0.1px;
      line-height: 1.15;
      margin-top: 0;
      margin-bottom: 2pt;
      text-transform: uppercase;
    }

    .role-title {
      font-size: 10.4pt;
      font-weight: 800;
      color: #000000;
      text-transform: uppercase;
      letter-spacing: 0.1px;
      margin-bottom: 4pt;
    }

    .bio-summary {
      font-size: 9.6pt;
      color: #27272a;
      line-height: 1.45;
      text-align: left;
    }

    .header-right-socials {
      width: 125pt;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      gap: 7pt;
      margin-top: 0;
      padding-top: 26pt;
      margin-bottom: 0;
    }

    .social-item {
      display: flex;
      align-items: center;
      gap: 5pt;
      font-size: 9pt;
      font-weight: 600;
      color: #111827;
      text-decoration: none;
    }

    .social-icon {
      width: 11pt;
      height: 11pt;
      flex-shrink: 0;
    }

    /* Black Contact Banner */
    .contact-banner {
      background-color: #000000;
      color: #ffffff;
      border-radius: 2px;
      padding: 6pt 10pt;
      display: grid;
      grid-template-columns: 1.35fr 1.1fr 1.15fr;
      row-gap: 4pt;
      column-gap: 10pt;
      font-size: 8.2pt;
      font-weight: 500;
      margin-top: 6pt;
      margin-bottom: 12pt;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 5pt;
      color: #ffffff;
      text-decoration: none;
      white-space: nowrap;
    }

    .contact-icon {
      width: 9.5pt;
      height: 9.5pt;
      flex-shrink: 0;
      fill: none;
      stroke: #ffffff;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Main Grid Layout */
    .main-content {
      display: grid;
      grid-template-columns: 63% 34%;
      gap: 3%;
    }

    /* Section Headings */
    .section-title {
      font-size: 11.2pt;
      font-weight: 800;
      color: #000000;
      letter-spacing: 0.1px;
      margin-bottom: 5pt;
    }

    .section-block {
      margin-bottom: 8pt;
    }

    /* Timeline Container on Left */
    .timeline-container {
      position: relative;
      padding-left: 14pt;
    }

    .timeline-track {
      position: absolute;
      left: 3pt;
      top: 4pt;
      bottom: 6pt;
      width: 1.2pt;
      background-color: #cbd5e1;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 7pt;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-node {
      position: absolute;
      left: -13.5pt;
      top: 2.5pt;
      width: 6.5pt;
      height: 6.5pt;
      border-radius: 50%;
      background-color: #ffffff;
      border: 1.2pt solid #111827;
      z-index: 2;
    }

    .item-header {
      margin-bottom: 0.5pt;
    }

    .item-title {
      font-size: 9.7pt;
      font-weight: 700;
      color: #000000;
      line-height: 1.2;
    }

    .item-company-role {
      font-size: 9.6pt;
      font-weight: 700;
      color: #000000;
      margin-bottom: 1pt;
      line-height: 1.2;
    }

    .item-period-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 0.5pt;
    }

    .item-location-right {
      font-size: 9.3pt;
      font-style: italic;
      color: #000000;
      font-weight: 500;
      text-transform: uppercase;
    }

    .item-subtitle {
      font-size: 9.2pt;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5pt;
    }

    .item-period {
      font-size: 9.2pt;
      font-weight: 600;
      color: #000000;
    }

    .item-period-meta {
      font-size: 8.4pt;
      font-weight: 500;
      color: #4b5563;
      margin-bottom: 2pt;
    }

    /* Bullet Lists */
    .bullet-list {
      list-style-type: none;
      padding-left: 0;
      margin-top: 1.5pt;
    }

    .bullet-list li {
      position: relative;
      padding-left: 9pt;
      font-size: 8.8pt;
      color: #27272a;
      line-height: 1.22;
      margin-bottom: 1.5pt;
      text-align: left;
    }

    .bullet-list li::before {
      content: "•";
      position: absolute;
      left: 1pt;
      color: #000000;
      font-size: 8pt;
      top: -0.5pt;
      line-height: 1;
    }

    /* Right Column (Skills & Certifications) */
    .skill-category {
      margin-bottom: 5.5pt;
    }

    .skill-category-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #000000;
      margin-bottom: 2pt;
    }

    .skill-items {
      list-style-type: none;
      padding-left: 0;
    }

    .skill-items li {
      position: relative;
      padding-left: 9pt;
      font-size: 9.5pt;
      color: #1f2937;
      line-height: 1.25;
      margin-bottom: 0.5pt;
    }

    .skill-items li::before {
      content: "•";
      position: absolute;
      left: 1pt;
      color: #000000;
      font-size: 8pt;
      top: -0.5pt;
    }

    /* Certifications List */
    .cert-item {
      margin-bottom: 4pt;
    }

    .cert-title-year {
      font-size: 9.7pt;
      font-weight: 700;
      color: #000000;
      line-height: 1.2;
    }

    .cert-issuer {
      font-size: 9.1pt;
      color: #4b5563;
      padding-left: 8pt;
      position: relative;
    }

    .cert-issuer::before {
      content: "•";
      position: absolute;
      left: 1pt;
      color: #6b7280;
    }

    /* Languages Box in Left Column */
    .languages-box-left {
      margin-top: 6pt;
    }

    .languages-box-left .bullet-list li {
      font-size: 9pt;
      font-weight: 500;
      text-align: left;
      line-height: 1.38;
      margin-bottom: 1pt;
    }

    .languages-box-left .bullet-list li strong {
      font-weight: 700;
      color: #000000;
    }

    /* Footer text exactly at bottom */
    .footer-note {
      position: absolute;
      bottom: 12pt;
      right: 24pt;
      font-size: 8pt;
      color: #4b5563;
      text-align: right;
    }
`;

function buildHtml({ lang, title, roleTitle, bio, contactFlexible, contactLocation, eduTitle, eduItems, expTitle, expItems, langTitle, langItems, skillsTitle, skillCats, certTitle, certItems, footerText }) {
  const eduHtml = eduItems.map(item => `
          <!-- Education -->
          <div class="timeline-item">
            <div class="timeline-node"></div>
            <div class="item-header">
              <div class="item-title">${item.title}</div>
            </div>
            <div class="item-subtitle">${item.subtitle}</div>
            <div class="item-period-row">
              <span class="item-period">${item.period}</span>
              <span class="item-location-right">${item.location}</span>
            </div>
          </div>`).join('\n');

  const expHtml = expItems.map(item => `
          <!-- Experience -->
          <div class="timeline-item">
            <div class="timeline-node"></div>
            <div class="item-company-role">${item.role}</div>
            <div class="item-period-meta">${item.periodMeta}</div>
            <ul class="bullet-list">
              ${item.bullets.map(b => `<li>${b}</li>`).join('\n              ')}
            </ul>
          </div>`).join('\n');

  const langHtml = `
      <!-- Languages Section (Bottom of Left Column) -->
      <div class="section-block languages-box-left">
        <h2 class="section-title">${langTitle}</h2>
        <ul class="bullet-list">
          ${langItems.map(l => `<li><strong>${l.label}:</strong> ${l.level}</li>`).join('\n          ')}
        </ul>
      </div>`;

  const skillsHtml = skillCats.map(cat => `
        <div class="skill-category">
          <div class="skill-category-title">${cat.title}</div>
          <ul class="skill-items">
            ${cat.items.map(it => `<li>${it}</li>`).join('\n            ')}
          </ul>
        </div>`).join('\n');

  const certsHtml = certItems.map(cert => `
        <div class="cert-item">
          <div class="cert-title-year">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer}</div>
        </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${commonCss}
  </style>
</head>
<body>

  <!-- Top Header Profile -->
  <div class="top-header">
    <div class="header-photo-wrapper">
      <img class="profile-photo" src="${imgSrc}" alt="Asmaa Elhint">
    </div>

    <div class="header-left">
      <h1 class="name">ASMAA ELHINT</h1>
      <div class="role-title">${roleTitle}</div>
      <p class="bio-summary">
        ${bio}
      </p>
    </div>

    <div class="header-right-socials">
      <a href="https://www.linkedin.com/in/asmaa-elhint-b69176342/" target="_blank" class="social-item">
        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.78-1.72 1.73s.77 1.72 1.72 1.72 1.73-.77 1.73-1.72-.78-1.73-1.73-1.73z"/>
        </svg>
        <span>@ASMAA ELHINT</span>
      </a>

      <a href="http://github.com/asmaa-dev1" target="_blank" class="social-item">
        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        <span>@ASMAA EL HINT</span>
      </a>

      <a href="https://huggingface.co/ASMAA-ELHINT" target="_blank" class="social-item">
        <span style="font-size: 10pt; line-height: 1; display: inline-block;">🤗</span>
        <span>@ASMAA EL HINT</span>
      </a>

      <a href="https://www.portfolioasmaa.com" target="_blank" class="social-item">
        <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>portfolioasmaa.com</span>
      </a>
    </div>
  </div>

  <!-- Contact Bar (Black) -->
  <div class="contact-banner">
    <a href="mailto:asmaaelhint0@gmail.com" class="contact-item">
      <svg class="contact-icon" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      <span>asmaaelhint0@gmail.com</span>
    </a>

    <a href="tel:+212632804247" class="contact-item">
      <svg class="contact-icon" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      <span>+212 632-804247</span>
    </a>

    <a href="https://www.portfolioasmaa.com" target="_blank" class="contact-item">
      <svg class="contact-icon" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
      <span>portfolioasmaa.com</span>
    </a>

    <div class="contact-item">
      <svg class="contact-icon" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
      <span>${contactFlexible}</span>
    </div>

    <div class="contact-item">
      <svg class="contact-icon" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <span>${contactLocation}</span>
    </div>
  </div>

  <!-- Main Content Grid -->
  <div class="main-content">

    <!-- Left Column: Education, Experience & Languages -->
    <div class="left-col">

      <!-- Education Section -->
      <div class="section-block">
        <h2 class="section-title">${eduTitle}</h2>
        
        <div class="timeline-container">
          <div class="timeline-track"></div>
          ${eduHtml}
        </div>
      </div>

      <!-- Professional Experience Section -->
      <div class="section-block">
        <h2 class="section-title">${expTitle}</h2>

        <div class="timeline-container">
          <div class="timeline-track"></div>
          ${expHtml}
        </div>
      </div>

      ${langHtml}

    </div>

    <!-- Right Column: Skills & Certifications -->
    <div class="right-col">

      <!-- Technical Skills -->
      <div class="section-block">
        <h2 class="section-title">${skillsTitle}</h2>
        ${skillsHtml}
      </div>

      <!-- Certifications -->
      <div class="section-block">
        <h2 class="section-title">${certTitle}</h2>
        ${certsHtml}
      </div>

    </div>

  </div>

  <div class="footer-note">
    ${footerText}
  </div>
</body>
</html>
`;
}

// 1. ENGLISH DATA
const enData = {
  lang: 'en',
  title: 'CV - ASMAA ELHINT - Full Stack Developer',
  roleTitle: 'FULL STACK DEVELOPER',
  bio: "Passionate Full Stack Developer focused on creating innovative digital solutions. Specialized in modern web technologies and task automation. Currently a student in Professional Bachelor's Degree in Computer Development at Hassan II University, with solid experience in creating robust and efficient web applications.",
  contactFlexible: 'Flexible : remote or on-site',
  contactLocation: 'Casablanca',
  eduTitle: 'Diplômes et Formations',
  eduItems: [
    {
      title: "Professional Bachelor's Degree in Computer Development)",
      location: 'CASABLANCA',
      subtitle: 'Hassan II University of Casablanc',
      period: '2025 –2026'
    },
    {
      title: 'Specialized Technician in Full Stack Web Development',
      location: 'CASABLANCA',
      subtitle: 'ISTA CFP-HASSANIA',
      period: '2023 - 2025'
    },
    {
      title: 'Baccalaureate in Life and Earth Sciences',
      location: 'CASABLANCA',
      subtitle: 'BEN M\'SIK HIGH SCHOOL',
      period: '2022 - 2023'
    }
  ],
  expTitle: 'PROFESSIONAL EXPERIENCE',
  expItems: [
    {
      role: 'VTC France — Full Stack Developer & IT Project Manager',
      periodMeta: 'December 2025 – May 2026 | 6 months | Casablanca, On-site',
      bullets: [
        'Full Stack development of web applications using PHP, MySQL, and JavaScript, including JB Manager — VTC France\'s internal commercial management application.',
        'Built and maintained frontend and backend features, API integrations, and project upkeep.',
        'IT Project Manager — Secoreg Project (GPS Tracking): client coordination, requirements gathering, and overseeing the development of a vehicle and driver tracking solution.',
        'Acted as the interface between the Secoreg client and the internal technical team.'
      ]
    },
    {
      role: 'Elite Solutions Maroc — Full Stack Developer',
      periodMeta: 'September – December 2025 | 4 months | Casablanca, On-site',
      bullets: [
        'Development and maintenance of the company website and internal applications.',
        'Built complete web features (frontend + backend) using Laravel, React, and SQL.',
        'Integrated responsive UI components and optimized application performance.',
        'Collaborated with the technical team in an Agile environment.'
      ]
    },
    {
      role: 'Seeward (France, Remote) — Full Stack Developer',
      periodMeta: 'March - April 2025 | 3 months | Remote',
      bullets: [
        'Development of REST APIs with Node.js for vulnerability data integration',
        'Creation of front-end interfaces with React and Tailwind CSS',
        'Connection between front-end and back-end via REST APIs',
        'Contribution to the development of a platform unifying asset information, vulnerability data, and threat intelligence',
        'Technologies used: Python, React, Node.js, REST APIs, Tailwind CSS'
      ]
    }
  ],
  langTitle: 'Langues',
  langItems: [
    { label: 'Arabic', level: 'Native language' },
    { label: 'Amazigh', level: 'Native language' },
    { label: 'French', level: 'Fluent' },
    { label: 'English', level: 'Professional' }
  ],
  skillsTitle: 'TECHNICAL SKILLS',
  skillCats: [
    {
      title: 'Programming Languages',
      items: ['JavaScript (React)', 'Python', 'PHP']
    },
    {
      title: 'Front-end',
      items: ['Html / Css / JavaScript', 'Bootstrap / Tailwind css', 'React.js']
    },
    {
      title: 'Back-end',
      items: ['Laravel', 'Node.js']
    },
    {
      title: 'Databases',
      items: ['MySQL', 'MongoDB']
    },
    {
      title: 'Tools & Methodologies',
      items: ['Git', 'Docker', 'Agile/Scrum', 'REST API']
    }
  ],
  certTitle: 'CERTIFICATIONS',
  certItems: [
    { title: 'Agile/Scrum Methodologies | 2024', issuer: '@certiprof' },
    { title: 'Business Intelligence Foundation | 2024', issuer: '@certiprof' },
    { title: 'JavaScript | 2024', issuer: '@cisco' },
    { title: 'Python | 2024', issuer: '@cisco' }
  ],
  footerText: 'For more projects on GitHub and Huggingface, visit my portfolio @portfolioasmaa.com'
};

// 2. FRENCH DATA
const frData = {
  lang: 'fr',
  title: 'CV - ASMAA ELHINT - Développeuse Full Stack',
  roleTitle: 'DÉVELOPPEUSE FULL STACK',
  bio: "Développeuse Full Stack passionnée, axée sur la création de solutions numériques innovantes. Spécialisée dans les technologies web modernes et l'automatisation des tâches. Actuellement étudiante en Licence Professionnelle en Développement Informatique à l'Université Hassan II, avec une solide expérience dans la création d'applications web robustes et performantes.",
  contactFlexible: 'Flexible : télétravail ou sur site',
  contactLocation: 'Casablanca',
  eduTitle: 'Diplômes et Formations',
  eduItems: [
    {
      title: 'Licence Professionnelle en Développement Informatique',
      location: 'CASABLANCA',
      subtitle: 'Université Hassan II de Casablanca',
      period: '2025 – 2026'
    },
    {
      title: 'Technicien Spécialisé en Développement Web Full Stack',
      location: 'CASABLANCA',
      subtitle: 'ISTA CFP-HASSANIA',
      period: '2023 - 2025'
    },
    {
      title: 'Baccalauréat en Sciences de la Vie et de la Terre',
      location: 'CASABLANCA',
      subtitle: 'Lycée Ben M\'sik',
      period: '2022 - 2023'
    }
  ],
  expTitle: 'EXPÉRIENCES PROFESSIONNELLES',
  expItems: [
    {
      role: 'VTC France — Développeuse Full Stack & Chef de Projet IT',
      periodMeta: 'Décembre 2025 – Mai 2026 | 6 mois | Casablanca, Présentiel',
      bullets: [
        'Développement Full Stack d\'applications web avec PHP, MySQL et JavaScript, incluant JB Manager — l\'application interne de gestion commerciale de VTC France.',
        'Conception et maintenance des fonctionnalités frontend et backend, intégration d\'APIs et maintenance applicative.',
        'Chef de Projet IT — Projet Secoreg (GPS Tracking) : coordination client, recueil des besoins et pilotage du développement d\'une solution de géolocalisation et suivi.',
        'Interface technique clé entre le client Secoreg et l\'équipe technique interne.'
      ]
    },
    {
      role: 'Elite Solutions Maroc — Développeuse Full Stack',
      periodMeta: 'Septembre – Décembre 2025 | 4 mois | Casablanca, Présentiel',
      bullets: [
        'Développement et maintenance du site web de l\'entreprise et des applications métiers internes.',
        'Création de fonctionnalités complètes (frontend + backend) avec Laravel, React et SQL.',
        'Intégration de composants UI responsives et optimisation des performances applicatives.',
        'Collaboration active avec l\'équipe technique au sein d\'un environnement Agile/Scrum.'
      ]
    },
    {
      role: 'Seeward (France, Télétravail) — Développeuse Full Stack',
      periodMeta: 'Mars – Avril 2025 | 3 mois | Télétravail',
      bullets: [
        'Développement d\'APIs REST avec Node.js pour l\'intégration de données de vulnérabilité de sécurité.',
        'Création d\'interfaces frontend modernes et dynamiques avec React et Tailwind CSS.',
        'Connexion fluide et sécurisée entre frontend et backend via APIs REST.',
        'Contribution au développement d\'une plateforme unifiant la télémétrie des actifs, les données CVE et la Threat Intelligence.',
        'Technologies utilisées : Python, React, Node.js, REST APIs, Tailwind CSS.'
      ]
    }
  ],
  langTitle: 'Langues',
  langItems: [
    { label: 'Arabe', level: 'Langue maternelle' },
    { label: 'Amazighe', level: 'Langue maternelle' },
    { label: 'Français', level: 'Courant' },
    { label: 'Anglais', level: 'Professionnel' }
  ],
  skillsTitle: 'COMPÉTENCES TECHNIQUES',
  skillCats: [
    {
      title: 'Langages de Programmation',
      items: ['JavaScript (React)', 'Python', 'PHP']
    },
    {
      title: 'Front-end',
      items: ['Html / Css / JavaScript', 'Bootstrap / Tailwind css', 'React.js']
    },
    {
      title: 'Back-end',
      items: ['Laravel', 'Node.js']
    },
    {
      title: 'Bases de Données',
      items: ['MySQL', 'MongoDB']
    },
    {
      title: 'Outils & Méthodologies',
      items: ['Git', 'Docker', 'Agile/Scrum', 'REST API']
    }
  ],
  certTitle: 'CERTIFICATIONS',
  certItems: [
    { title: 'Méthodologies Agile / Scrum | 2024', issuer: '@certiprof' },
    { title: 'Business Intelligence Foundation | 2024', issuer: '@certiprof' },
    { title: 'JavaScript | 2024', issuer: '@cisco' },
    { title: 'Python | 2024', issuer: '@cisco' }
  ],
  footerText: 'Pour voir mes projets sur GitHub et Huggingface, visitez mon portfolio @portfolioasmaa.com'
};

// 3. GERMAN DATA
const deData = {
  lang: 'de',
  title: 'CV - ASMAA ELHINT - Full-Stack-Entwicklerin',
  roleTitle: 'FULL-STACK-ENTWICKLERIN',
  bio: "Leidenschaftliche Full-Stack-Entwicklerin, fokussiert auf innovative digitale Lösungen. Spezialisiert auf moderne Webtechnologien und Aufgabenautomatisierung. Derzeit Studentin im Berufsbachelor Informatikentwicklung an der Universität Hassan II, mit fundierter Erfahrung in der Entwicklung robuster und effizienter Webanwendungen.",
  contactFlexible: 'Flexibel: Remote oder vor Ort',
  contactLocation: 'Casablanca',
  eduTitle: 'Diplome und Ausbildungen',
  eduItems: [
    {
      title: 'Berufsbachelor in Informatikentwicklung',
      location: 'CASABLANCA',
      subtitle: 'Universität Hassan II Casablanca',
      period: '2025 – 2026'
    },
    {
      title: 'Spezialisierte Technikerin für Full-Stack-Webentwicklung',
      location: 'CASABLANCA',
      subtitle: 'ISTA CFP-HASSANIA',
      period: '2023 – 2025'
    },
    {
      title: 'Abitur in Lebens- und Geowissenschaften',
      location: 'CASABLANCA',
      subtitle: 'Gymnasium Ben M\'sik',
      period: '2022 – 2023'
    }
  ],
  expTitle: 'BERUFSERFAHRUNG',
  expItems: [
    {
      role: 'VTC France — Full-Stack-Entwicklerin & IT-Projektleiterin',
      periodMeta: 'Dezember 2025 – Mai 2026 | 6 Monate | Casablanca, Vor Ort',
      bullets: [
        'Full-Stack-Entwicklung von Webanwendungen mit PHP, MySQL und JavaScript, einschließlich JB Manager — der internen Geschäftsverwaltungsanwendung von VTC France.',
        'Konzeption und Wartung von Frontend- und Backend-Funktionen, API-Integrationen und Softwarepflege.',
        'IT-Projektleitung — Projekt Secoreg (GPS Tracking): Kundenkoordination, Anforderungserfassung und Steuerung der Entwicklung einer Fahrzeug- und Fahrerortungslösung.',
        'Zentrale Schnittstelle zwischen dem Secoreg-Kunden und dem internen Entwicklungsteam.'
      ]
    },
    {
      role: 'Elite Solutions Maroc — Full-Stack-Entwicklerin',
      periodMeta: 'September – Dezember 2025 | 4 Monate | Casablanca, Vor Ort',
      bullets: [
        'Entwicklung und Wartung der Unternehmens-Website und interner Geschäftsanwendungen.',
        'Entwicklung vollständiger Funktionen (Frontend + Backend) mit Laravel, React und SQL.',
        'Integration responsiver UI-Komponenten und Optimierung der Anwendungsleistung.',
        'Aktive Zusammenarbeit im Entwicklerteam in einer agilen Scrum-Umgebung.'
      ]
    },
    {
      role: 'Seeward (Frankreich, Remote) — Full-Stack-Entwicklerin',
      periodMeta: 'März – April 2025 | 3 Monate | Remote',
      bullets: [
        'Entwicklung von REST-APIs mit Node.js zur Integration von Sicherheits-Schwachstellendaten.',
        'Erstellung moderner und dynamischer Frontend-Oberflächen mit React und Tailwind CSS.',
        'Sichere und nahtlose Verbindung zwischen Frontend und Backend über REST-APIs.',
        'Beitrag zur Entwicklung einer Plattform zur Vereinheitlichung von IT-Asset-Telemetrie und Threat Intelligence.',
        'Eingesetzte Technologien: Python, React, Node.js, REST APIs, Tailwind CSS.'
      ]
    }
  ],
  langTitle: 'Sprachen',
  langItems: [
    { label: 'Arabisch', level: 'Muttersprache' },
    { label: 'Amazigh', level: 'Muttersprache' },
    { label: 'Französisch', level: 'Fließend' },
    { label: 'Englisch', level: 'Verhandlungssicher (Professionell)' }
  ],
  skillsTitle: 'TECHNISCHE FÄHIGKEITEN',
  skillCats: [
    {
      title: 'Programmiersprachen',
      items: ['JavaScript (React)', 'Python', 'PHP']
    },
    {
      title: 'Frontend',
      items: ['Html / Css / JavaScript', 'Bootstrap / Tailwind css', 'React.js']
    },
    {
      title: 'Backend',
      items: ['Laravel', 'Node.js']
    },
    {
      title: 'Datenbanken',
      items: ['MySQL', 'MongoDB']
    },
    {
      title: 'Tools & Methodologien',
      items: ['Git', 'Docker', 'Agile/Scrum', 'REST API']
    }
  ],
  certTitle: 'ZERTIFIKATE',
  certItems: [
    { title: 'Agile/Scrum-Methodologien | 2024', issuer: '@certiprof' },
    { title: 'Business Intelligence Foundation | 2024', issuer: '@certiprof' },
    { title: 'JavaScript | 2024', issuer: '@cisco' },
    { title: 'Python | 2024', issuer: '@cisco' }
  ],
  footerText: 'Für weitere Projekte auf GitHub und Huggingface besuchen Sie mein Portfolio @portfolioasmaa.com'
};

async function buildAll() {
  console.log('Writing exact-sizes HTML templates...');
  fs.writeFileSync(path.join(rootDir, 'src', 'templates', 'cv_en.html'), buildHtml(enData), 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'src', 'templates', 'cv_fr.html'), buildHtml(frData), 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'src', 'templates', 'cv_de.html'), buildHtml(deData), 'utf-8');
  console.log('✓ HTML templates written');

  // Handle uploaded Canva PDF for English
  const uploadedBuffer = fs.readFileSync(uploadedPdf);
  const targetEnPdf = path.join(rootDir, 'public', 'cv_asmaa_elhint_en.pdf');
  const targetFrPdf = path.join(rootDir, 'public', 'cv_asmaa_elhint_fr.pdf');
  const targetDePdf = path.join(rootDir, 'public', 'cv_asmaa_elhint_de.pdf');

  // Save raw Canva PDF as backup
  fs.writeFileSync(path.join(rootDir, 'public', 'cv_asmaa_elhint_canva_raw.pdf'), uploadedBuffer);

  const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const renderList = [
    {
      lang: 'en',
      htmlFile: path.join(rootDir, 'src', 'templates', 'cv_en.html'),
      pdfFile: targetEnPdf,
      previewArtifact: path.join(artifactDir, 'exact_size_en.png'),
      previewDesktop: path.join(desktopDir, 'cv_asmaa_elhint_en_preview.png')
    },
    {
      lang: 'fr',
      htmlFile: path.join(rootDir, 'src', 'templates', 'cv_fr.html'),
      pdfFile: targetFrPdf,
      previewArtifact: path.join(artifactDir, 'exact_size_fr.png'),
      previewDesktop: path.join(desktopDir, 'cv_asmaa_elhint_fr_preview.png')
    },
    {
      lang: 'de',
      htmlFile: path.join(rootDir, 'src', 'templates', 'cv_de.html'),
      pdfFile: targetDePdf,
      previewArtifact: path.join(artifactDir, 'exact_size_de.png'),
      previewDesktop: path.join(desktopDir, 'cv_asmaa_elhint_de_preview.png')
    }
  ];

  for (const item of renderList) {
    console.log(`Rendering PDF and preview for ${item.lang}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    const content = fs.readFileSync(item.htmlFile, 'utf-8');
    await page.setContent(content, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: item.pdfFile,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    });
    console.log(`✓ Saved PDF: ${item.pdfFile}`);

    await page.screenshot({
      path: item.previewArtifact,
      clip: { x: 0, y: 0, width: 794, height: 1123 }
    });
    console.log(`✓ Saved preview: ${item.previewArtifact}`);

    if (fs.existsSync(desktopDir)) {
      try {
        fs.copyFileSync(item.previewArtifact, item.previewDesktop);
      } catch (e) {}
    }

    await page.close();
  }

  await browser.close();

  // Desktop copies
  const desktopCopies = [
    { src: targetEnPdf, dest: path.join(desktopDir, 'cv_asmaa_elhint_en.pdf') },
    { src: targetFrPdf, dest: path.join(desktopDir, 'cv_asmaa_elhint_fr.pdf') },
    { src: targetDePdf, dest: path.join(desktopDir, 'cv_asmaa_elhint_de.pdf') },
    { src: targetEnPdf, dest: path.join(desktopDir, 'CV_Asmaa_Elhint.pdf') }
  ];

  for (const cp of desktopCopies) {
    try {
      fs.copyFileSync(cp.src, cp.dest);
      console.log(`✓ Copied to Desktop: ${cp.dest}`);
    } catch (e) {
      console.warn(`Could not copy to Desktop:`, e.message);
    }
  }

  console.log('🎉 ALL CVS PROCESSED WITH EXACT SIZES!');
}

buildAll().catch(err => {
  console.error('Error in buildAll:', err);
  process.exit(1);
});
