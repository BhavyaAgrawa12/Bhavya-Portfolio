import type { Project } from "../types/portfolio";


export const projects: Project[] = [
  {
    id: "hotel-pms",
    title: "Hotel PMS",
    category: "Full Stack",
    featured: true,

    shortDescription:
      "Modern Hotel Property Management System.",

    description:
      "Hotel PMS is a full-stack hotel management application designed to streamline hotel operations including room booking, guest management, billing, staff management, and analytics.",

    image: "",
    gallery: [],

    status: "In Development",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "MySQL",
      "Tailwind CSS",
    ],

    features: [
      "Room Booking",
      "Guest Management",
      "Billing System",
      "Role Management",
      "Analytics Dashboard",
      "Responsive Dashboard",
    ],

    challenges: [
      "Database schema design",
      "Authentication & authorization",
      "Room availability management",
    ],

    learnings: [
      "Prisma ORM",
      "REST API Design",
      "Database Relationships",
      "Authentication",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },

  {
    id: "taskflow",
    title: "TaskFlow",
    category: "Full Stack",
    featured: true,

    shortDescription:
      "Modern project management platform.",

    description:
      "TaskFlow helps teams manage projects through Kanban boards, task assignment, authentication, and productivity analytics.",

    image: "",
    gallery: [],

    status: "In Development",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],

    features: [
      "Kanban Board",
      "Authentication",
      "Task Assignment",
      "Analytics",
      "Team Collaboration",
    ],

    challenges: [
      "Managing application state",
      "JWT Authentication",
      "Scalable API Design",
    ],

    learnings: [
      "MongoDB",
      "JWT",
      "State Management",
      "REST APIs",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },

  {
    id: "conference-website",
    title: "Conference Website",
    category: "Academic",
    featured: true,

    shortDescription:
      "Official conference website for Poornima University.",

    description:
      "Designed and developed a responsive academic conference website with paper submission details, committees, venue information, and important dates.",

    image: "",
    gallery: [],

    status: "Live",

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
    ],

    features: [
      "Responsive Design",
      "Committee Section",
      "Call For Papers",
      "Venue Information",
      "Important Dates",
    ],

    challenges: [
      "Responsive layouts",
      "Modern UI Design",
    ],

    learnings: [
      "Tailwind CSS",
      "Responsive Design",
      "Academic Website Development",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },

  {
    id: "portfolio",
    title: "Personal Portfolio",
    category: "Frontend",
    featured: false,

    shortDescription:
      "Premium developer portfolio website.",

    description:
      "A modern portfolio showcasing projects, experience, skills, and an integrated admin panel for content management.",

    image: "",
    gallery: [],

    status: "In Development",

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],

    features: [
      "Responsive Design",
      "Dark Theme",
      "Animations",
      "Admin Panel",
      "Project Showcase",
    ],

    challenges: [
      "Component architecture",
      "Animation optimization",
    ],

    learnings: [
      "Framer Motion",
      "Reusable Components",
      "TypeScript",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },

  {
    id: "employee-registration",
    title: "Employee Registration System",
    category: "Full Stack",
    featured: false,

    shortDescription:
      "Employee management system.",

    description:
      "A complete employee management platform with authentication, employee records, project allocation, and leave management.",

    image: "",
    gallery: [],

    status: "Live",

    technologies: [
      "Node.js",
      "Express",
      "Prisma",
      "MySQL",
      "Handlebars",
    ],

    features: [
      "Authentication",
      "Employee Records",
      "Project Allocation",
      "Leave Management",
    ],

    challenges: [
      "Session Management",
      "Database Design",
    ],

    learnings: [
      "Prisma",
      "MySQL",
      "Authentication",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },

  {
    id: "pixie-event-discovery",
    title: "Pixie Event Discovery",
    category: "Backend",
    featured: false,

    shortDescription:
      "Python event discovery tool.",

    description:
      "A Python application that scrapes event information, processes the data, and stores it for users in an organized format.",

    image: "",
    gallery: [],

    status: "Live",

    technologies: [
      "Python",
      "Flask",
      "BeautifulSoup",
      "Google Sheets API",
    ],

    features: [
      "Event Scraping",
      "Google Sheets Integration",
      "Search",
      "Filtering",
    ],

    challenges: [
      "Web scraping limitations",
      "Data cleaning",
    ],

    learnings: [
      "Python",
      "BeautifulSoup",
      "API Integration",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },

  {
    id: "securechat",
    title: "SecureChat",
    category: "Backend",
    featured: false,

    shortDescription:
      "Encrypted real-time chat application.",

    description:
      "SecureChat provides encrypted real-time messaging using WebSockets with secure authentication and authorization.",

    image: "",
    gallery: [],

    status: "Live",

    technologies: [
      "React",
      "Node.js",
      "Socket.IO",
      "JWT",
      "MongoDB",
    ],

    features: [
      "Real-time Chat",
      "Authentication",
      "Encryption",
      "WebSockets",
    ],

    challenges: [
      "Real-time communication",
      "Socket synchronization",
    ],

    learnings: [
      "Socket.IO",
      "JWT",
      "Real-time Systems",
    ],

    githubUrl: "#",
    liveUrl: "#",
  },
];