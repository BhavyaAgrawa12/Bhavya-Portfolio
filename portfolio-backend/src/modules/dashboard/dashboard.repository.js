import prisma from "../../lib/prisma.js";

export const getDashboardStats = async () => {
  const [
    projects,
    skills,
    technologies,
    education,
    internships,
    certifications,
    achievements,
    contactMessages,
    unreadMessages,
    media,
    recentProjects,
    recentMessages,
    recentMedia,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.technology.count(),
    prisma.education.count(),
    prisma.internship.count(),
    prisma.certification.count(),
    prisma.achievement.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({
      where: {
        isRead: false,
      },
    }),
    prisma.media.count(),

    prisma.project.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        thumbnail: true,
      },
    }),

    prisma.contactMessage.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.media.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    stats: {
      projects,
      skills,
      technologies,
      education,
      internships,
      certifications,
      achievements,
      contactMessages,
      unreadMessages,
      media,
    },

    recentProjects,
    recentMessages,
    recentMedia,
  };
};