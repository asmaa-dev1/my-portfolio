export const portfolioData = {
  personal: {
    name: "ASMAA ELHINT",
    firstName: "Asmaa",
    lastName: "Elhint",
    role: "Full Stack Developer",
    shortBio: "Passionate Full Stack Developer focused on creating innovative digital solutions, robust web applications, and intelligent task automation.",
    fullBio: "Passionate Full Stack Developer focused on creating innovative digital solutions. Specialized in modern web technologies and task automation. Currently a student in Professional Bachelor's Degree in Computer Development at Hassan II University, with solid experience in creating robust and efficient web applications.",
    location: "Casablanca, Morocco",
    timezone: "Africa/Casablanca",
    email: "asmaaelhint0@gmail.com",
    phone: "+212 632-804247",
    website: "portfolioasmaa.com",
    github: "https://github.com/asmaa-dev1",
    linkedin: "https://www.linkedin.com/in/asmaa-elhint-b69176342/",
    status: "Available for Work",
    statusDetail: "Flexible: remote or on-site (Full-time & Freelance)",
  },

  education: [
    {
      degree: "Professional Bachelor's Degree in Computer Development",
      institution: "Hassan II University of Casablanca",
      location: "Casablanca",
      period: "2025 – 2026",
      status: "In Progress",
      color: "#d4547e",
    },
    {
      degree: "Specialized Technician in Full Stack Web Development",
      institution: "ISTA CFP-HASSANIA",
      location: "Casablanca",
      period: "2023 – 2025",
      status: "Graduate",
      color: "#22c55e",
    },
    {
      degree: "Baccalaureate in Life and Earth Sciences",
      institution: "Ben M'sik High School",
      location: "Casablanca",
      period: "2022 – 2023",
      status: "Graduate",
      color: "#3b82f6",
    }
  ],

  experiences: [
    {
      role: "Full Stack Developer & IT Project Manager",
      company: "VTC France",
      period: "November 2024 – May 2025",
      duration: "6 months",
      type: "Casablanca, On-site",
      color: "#d4547e",
      description: "Full Stack development of internal commercial applications and project management for GPS tracking solutions.",
      highlights: [
        "Full Stack development of web applications using PHP, MySQL, and JavaScript, including JB Manager — VTC France's internal commercial management application.",
        "Built and maintained frontend and backend features, API integrations, and project upkeep.",
        "IT Project Manager — JB Tracking (Secoreg Project): client coordination, requirements gathering, and overseeing the development of a vehicle and driver tracking solution for Secoreg.",
        "Acted as the key interface between the Secoreg client and the internal technical team to deliver JB Tracking."
      ],
      skills: ["PHP", "MySQL", "JavaScript", "REST APIs", "IT Project Management", "GPS Tracking"]
    },
    {
      role: "Full Stack Developer",
      company: "Elite Solutions Maroc",
      period: "September – December 2025",
      duration: "4 months",
      type: "Casablanca, On-site",
      color: "#3b82f6",
      description: "Development and maintenance of company web portals and full-stack enterprise applications.",
      highlights: [
        "Development and maintenance of the company website and internal applications.",
        "Built complete web features (frontend + backend) using Laravel, React, and SQL.",
        "Integrated responsive UI components and optimized application performance.",
        "Collaborated with the technical team in an Agile environment."
      ],
      skills: ["Laravel", "React", "SQL", "Tailwind CSS", "Agile / Scrum"]
    },
    {
      role: "Full Stack Developer",
      company: "Seeward (France, Remote)",
      period: "March – April 2025",
      duration: "3 months",
      type: "Remote · France",
      color: "#10b981",
      description: "Development of REST APIs and frontend interfaces for cybersecurity threat intelligence platforms.",
      highlights: [
        "Development of REST APIs with Node.js for vulnerability data integration.",
        "Creation of front-end interfaces with React and Tailwind CSS.",
        "Connection between front-end and back-end via REST APIs.",
        "Contribution to the development of a platform unifying asset information, vulnerability data, and threat intelligence.",
        "Technologies used: Python, React, Node.js, REST APIs, Tailwind CSS."
      ],
      skills: ["Python", "React", "Node.js", "REST APIs", "Tailwind CSS"]
    }
  ],

  skillsCategories: [
    {
      name: "Programming Languages",
      skills: [
        { name: "JavaScript (React)", level: "Advanced", color: "#F7DF1E", icon: "js" },
        { name: "Python", level: "Advanced", color: "#3776AB", icon: "python" },
        { name: "PHP", level: "Advanced", color: "#777BB4", icon: "php" },
      ]
    },
    {
      name: "Front-end",
      skills: [
        { name: "HTML / CSS / JavaScript", level: "Expert", color: "#E34F26", icon: "html" },
        { name: "Bootstrap / Tailwind CSS", level: "Expert", color: "#06B6D4", icon: "tailwind" },
        { name: "React.js", level: "Expert", color: "#61DAFB", icon: "react" },
      ]
    },
    {
      name: "Back-end",
      skills: [
        { name: "Laravel", level: "Advanced", color: "#FF2D20", icon: "laravel" },
        { name: "Node.js", level: "Advanced", color: "#339933", icon: "nodejs" },
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: "MySQL", level: "Advanced", color: "#4479A1", icon: "mysql" },
        { name: "MongoDB", level: "Proficient", color: "#47A248", icon: "mongodb" },
      ]
    },
    {
      name: "Tools & Methodologies",
      skills: [
        { name: "Git", level: "Expert", color: "#F05032", icon: "git" },
        { name: "Docker", level: "Proficient", color: "#2496ED", icon: "docker" },
        { name: "Agile / Scrum", level: "Certified", color: "#f59e0b", icon: "scrum" },
        { name: "REST API", level: "Expert", color: "#009688", icon: "api" },
      ]
    }
  ],

  projects: [
    {
      id: "jb-manager",
      title: "JB Manager — VTC Enterprise Suite",
      subtitle: "Commercial & Fleet Management Web Application",
      category: "Full Stack Platform",
      period: "2024 – 2025",
      accentColor: "#d4547e",
      image: "/projects/jb-manager.png",
      description: "A centralized internal enterprise web application built for VTC France to manage commercial bookings, driver assignments, client contracts, invoicing, and real-time operations.",
      technologies: ["PHP", "MySQL", "JavaScript", "REST APIs", "Bootstrap", "Analytics"],
      features: [
        "Automated booking dispatch & driver shift scheduler",
        "Client billing, dynamic PDF invoice generation & payments",
        "Role-based access control (Admin, Dispatcher, Driver, Accountant)",
        "Real-time operational KPI dashboard and revenue tracking"
      ],
      stat: "60% faster dispatching"
    },
    {
      id: "jb-tracking",
      title: "JB Tracking — GPS Fleet & Telematics (Client Secoreg)",
      subtitle: "Real-time Vehicle & Driver Telematics Solution built for Secoreg",
      category: "IoT & Web System",
      period: "2024 – 2025",
      accentColor: "#18CCFC",
      image: "/projects/secoreg.jpg",
      description: "An advanced vehicle and driver telematics management system (JB Tracking) developed for the client Secoreg alongside the JB Manager ecosystem, featuring live GPS tracking, route geofencing, speed alerts, and trip history telemetry.",
      technologies: ["JavaScript", "Node.js", "MySQL", "Leaflet / GPS APIs", "WebSockets"],
      features: [
        "Live interactive map tracking with ultra-low latency updates",
        "Custom geofencing with instant breach notifications",
        "Driver behavior scoring and fuel consumption diagnostics",
        "Multi-tenant fleet management portal"
      ],
      stat: "Real-Time Telemetry"
    },
    {
      id: "seeward-threat-intel",
      title: "Seeward — Threat & Vulnerability Platform",
      subtitle: "Cybersecurity Asset & Threat Intelligence Hub",
      category: "Cybersecurity & Data",
      period: "2025",
      accentColor: "#22c55e",
      image: "/projects/seeward.png",
      description: "A unified cybersecurity intelligence platform designed to ingest, aggregate, and visualize asset vulnerability data across enterprise IT infrastructure.",
      technologies: ["Python", "React.js", "Node.js", "Tailwind CSS", "REST APIs", "CVE Data"],
      features: [
        "Continuous vulnerability data ingestion pipeline via REST APIs",
        "Dynamic risk matrix and severity heatmaps",
        "Automated compliance tracking & CVE remediation workflows",
        "Fast interactive filtering on tens of thousands of security alerts"
      ],
      stat: "Unified Intel Aggregator"
    },
    {
      id: "elite-solutions-portal",
      title: "Elite Solutions — Télédéclaration Fiscale & Sociale",
      subtitle: "Plateforme de Moulinettes de Télédéclaration Marocaine",
      category: "FinTech & Web App",
      period: "2025",
      accentColor: "#06b6d4",
      image: "/projects/elite-solutions.png",
      description: "Plateforme web d'automatisation des formalités fiscales et sociales marocaines (TVA, CNSS, CIMR, DPF, DTS, TPI), permettant un gain de temps majeur et une conformité réglementaire absolue.",
      technologies: ["Laravel", "React", "SQL", "Tailwind CSS", "REST APIs", "Fiscalité Maroc"],
      features: [
        "Moulinettes automatisées de télédéclaration (TVA, CNSS, CIMR, DTS, TPI, DPF)",
        "Traitement, conversion et validation des fichiers déclaratifs normalisés",
        "Interface moderne et intuitive avec gestion multi-entreprises",
        "Conformité rigoureuse aux standards de télédéclaration marocains"
      ],
      stat: "Conformité Fiscale 100%"
    }
  ],

  certifications: [
    {
      id: "scrum-foundation",
      title: "Agile/Scrum Methodologies",
      issuer: "@certiprof",
      year: "2024",
      validity: "Verified Credential",
      credentialId: "101481237",
      pdf: "/certificates/scrum-foundation.pdf",
      image: "/certificates/scrum-foundation.png",
      color: "#f59e0b",
      icon: "trophy",
      badge: "CertiProf",
      description: "Validation officielle de la maîtrise des méthodologies Agile et du framework Scrum pour la gestion de projets logiciels."
    },
    {
      id: "bi-foundation",
      title: "Business Intelligence Foundation",
      issuer: "@certiprof",
      year: "2024",
      validity: "Verified Credential",
      credentialId: "101505566",
      pdf: "/certificates/business-intelligence-foundation.pdf",
      image: "/certificates/business-intelligence-foundation.png",
      color: "#3b82f6",
      icon: "chart",
      badge: "CertiProf",
      description: "Expertise certifiée en Business Intelligence, modélisation de données et tableaux de bord décisionnels."
    },
    {
      id: "cisco-javascript",
      title: "JavaScript",
      issuer: "@cisco",
      year: "2024",
      validity: "Verified Credential",
      credentialId: "Cisco Networking Academy",
      pdf: "/certificates/cisco-javascript-essentials.pdf",
      image: "/certificates/cisco-javascript-essentials.png",
      color: "#F7DF1E",
      icon: "code",
      badge: "Cisco",
      description: "Certification officielle Cisco validant la maîtrise approfondie de JavaScript, programmation asynchrone et manipulation du DOM."
    },
    {
      id: "cisco-python",
      title: "Python",
      issuer: "@cisco",
      year: "2024",
      validity: "Verified Credential",
      credentialId: "Cisco Networking Academy",
      pdf: "/certificates/cisco-python-essentials.pdf",
      image: "/certificates/cisco-python-essentials.png",
      color: "#10b981",
      icon: "terminal",
      badge: "Cisco",
      description: "Certification officielle Cisco validant les compétences fondamentales et avancées en programmation Python 3 et algorithmique."
    }
  ],

  stats: [
    { value: "3+", label: "Professional Experiences", color: "#d4547e" },
    { value: "4", label: "Professional Certs (2024)", color: "#f59e0b" },
    { value: "10+", label: "Core Technologies", color: "#22c55e" },
    { value: "3", label: "Academic Diplomas", color: "#3b82f6" }
  ],

  languages: [
    { name: "Arabic", level: "Native language" },
    { name: "Amazigh", level: "Native language" },
    { name: "French", level: "Fluent" },
    { name: "English", level: "Professional" }
  ]
};
