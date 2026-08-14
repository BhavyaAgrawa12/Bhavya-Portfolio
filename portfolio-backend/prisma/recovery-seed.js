import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Aiven MySQL Recovery Seed...");

  // -------------------------------------------------------------
  // 1. Seed Admin Superuser
  // -------------------------------------------------------------
  const email = process.env.ADMIN_EMAIL || "agrawalbhavya563@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "Bhumika@12";
  const username = process.env.ADMIN_USERNAME || "Bhavya";

  const existingAdmin = await prisma.admin.findFirst();

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        id: randomUUID(),
        username,
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });
    console.log("✅ Admin created successfully:", admin.email);
  } else {
    console.log("✅ Admin already exists:", existingAdmin.email);
  }

  // -------------------------------------------------------------
  // 2. Seed Main Portfolio Record (ID = 1)
  // -------------------------------------------------------------
  await prisma.portfolio.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Hi, I'm Bhavya Agrawal",
      heroSubtitle: "Computer Science Student & Full Stack Developer",
      heroDescription:
        "I'm Bhavya Agrawal, a Computer Science student and Full Stack Developer passionate about building scalable web applications, backend systems, and clean digital experiences.",
      aboutTitle: "About Me",
      aboutDescription:
        "I'm Bhavya Agrawal, a Computer Science student and Full Stack Developer passionate about building scalable web applications, backend systems, and modern digital experiences.\n\nI enjoy transforming ideas into production-ready software while continuously learning new technologies, software architecture, cloud computing, and backend engineering.",
      email: "agrawalbhavya563@gmail.com",
      github: "https://github.com/BhavyaAgrawa12",
      linkedin: "https://www.linkedin.com/in/bhavya-agrawal-212052291",
    },
  });
  console.log("✅ Main Portfolio record created/verified.");

  // -------------------------------------------------------------
  // 3. Seed Recovered Projects & Technologies (from Git history)
  // -------------------------------------------------------------
  const recoveredProjects = [
    {
      title: "Hotel PMS",
      slug: "hotel-pms",
      category: "FULL_STACK",
      featured: true,
      status: "IN_DEVELOPMENT",
      shortDescription: "Modern Hotel Property Management System.",
      description:
        "Hotel PMS is a full-stack hotel management application designed to streamline hotel operations including room booking, guest management, billing, staff management, and analytics.",
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
      technologies: ["React", "Node.js", "Express", "Prisma", "MySQL", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 1,
    },
    {
      title: "TaskFlow",
      slug: "taskflow",
      category: "FULL_STACK",
      featured: true,
      status: "IN_DEVELOPMENT",
      shortDescription: "Modern project management platform.",
      description:
        "TaskFlow helps teams manage projects through Kanban boards, task assignment, authentication, and productivity analytics.",
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
      learnings: ["MongoDB", "JWT", "State Management", "REST APIs"],
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 2,
    },
    {
      title: "Conference Website",
      slug: "conference-website",
      category: "ACADEMIC",
      featured: true,
      status: "LIVE",
      shortDescription: "Official conference website for Poornima University.",
      description:
        "Designed and developed a responsive academic conference website with paper submission details, committees, venue information, and important dates.",
      features: [
        "Responsive Design",
        "Committee Section",
        "Call For Papers",
        "Venue Information",
        "Important Dates",
      ],
      challenges: ["Responsive layouts", "Modern UI Design"],
      learnings: [
        "Tailwind CSS",
        "Responsive Design",
        "Academic Website Development",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 3,
    },
    {
      title: "Personal Portfolio",
      slug: "portfolio",
      category: "FRONTEND",
      featured: false,
      status: "IN_DEVELOPMENT",
      shortDescription: "Premium developer portfolio website.",
      description:
        "A modern portfolio showcasing projects, experience, skills, and an integrated admin panel for content management.",
      features: [
        "Responsive Design",
        "Dark Theme",
        "Animations",
        "Admin Panel",
        "Project Showcase",
      ],
      challenges: ["Component architecture", "Animation optimization"],
      learnings: ["Framer Motion", "Reusable Components", "TypeScript"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 4,
    },
    {
      title: "Employee Registration System",
      slug: "employee-registration",
      category: "FULL_STACK",
      featured: false,
      status: "LIVE",
      shortDescription: "Employee management system.",
      description:
        "A complete employee management platform with authentication, employee records, project allocation, and leave management.",
      features: [
        "Authentication",
        "Employee Records",
        "Project Allocation",
        "Leave Management",
      ],
      challenges: ["Session Management", "Database Design"],
      learnings: ["Prisma", "MySQL", "Authentication"],
      technologies: ["Node.js", "Express", "Prisma", "MySQL", "Handlebars"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 5,
    },
    {
      title: "Pixie Event Discovery",
      slug: "pixie-event-discovery",
      category: "BACKEND",
      featured: false,
      status: "LIVE",
      shortDescription: "Python event discovery tool.",
      description:
        "A Python application that scrapes event information, processes the data, and stores it for users in an organized format.",
      features: [
        "Event Scraping",
        "Google Sheets Integration",
        "Search",
        "Filtering",
      ],
      challenges: ["Web scraping limitations", "Data cleaning"],
      learnings: ["Python", "BeautifulSoup", "API Integration"],
      technologies: ["Python", "Flask", "BeautifulSoup", "Google Sheets API"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 6,
    },
    {
      title: "SecureChat",
      slug: "securechat",
      category: "BACKEND",
      featured: false,
      status: "LIVE",
      shortDescription: "Encrypted real-time chat application.",
      description:
        "SecureChat provides encrypted real-time messaging using WebSockets with secure authentication and authorization.",
      features: ["Real-time Chat", "Authentication", "Encryption", "WebSockets"],
      challenges: ["Real-time communication", "Socket synchronization"],
      learnings: ["Socket.IO", "JWT", "Real-time Systems"],
      technologies: ["React", "Node.js", "Socket.IO", "JWT", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
      displayOrder: 7,
    },
  ];

  for (const proj of recoveredProjects) {
    const { technologies, ...projData } = proj;

    const createdProject = await prisma.project.upsert({
      where: { slug: proj.slug },
      update: projData,
      create: projData,
    });

    for (const techName of technologies) {
      const tech = await prisma.technology.upsert({
        where: { name: techName },
        update: {},
        create: { name: techName },
      });

      await prisma.projecttechnology.upsert({
        where: {
          projectId_technologyId: {
            projectId: createdProject.id,
            technologyId: tech.id,
          },
        },
        update: {},
        create: {
          projectId: createdProject.id,
          technologyId: tech.id,
        },
      });
    }
  }

  console.log("✅ Recovered 7 seed projects & technologies inserted.");
}

main()
  .catch((err) => {
    console.error("❌ Recovery seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
