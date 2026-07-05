import prisma from "../../lib/prisma.js";


export const createProject = async (projectData, technologyIds = []) => {
  return await prisma.$transaction(async (tx) => {
    
    const project = await tx.project.create({
      data: projectData,
    });

    
    if (technologyIds.length > 0) {
      await tx.projectTechnology.createMany({
        data: technologyIds.map((technologyId) => ({
          projectId: project.id,
          technologyId,
        })),
      });
    }

    return await tx.project.findUnique({
      where: {
        id: project.id,
      },
      include: {
        thumbnail: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        images: {
          include: {
            media: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  });
};

export const getAllProjects = async () => {
  return await prisma.project.findMany({
    include: {
      thumbnail: true,

      technologies: {
        include: {
          technology: true,
        },
      },

      images: {
        include: {
          media: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },

    orderBy: {
      displayOrder: "asc",
    },
  });
};


export const getProjectBySlug = async (slug) => {
  return await prisma.project.findUnique({
    where: {
      slug,
    },

    include: {
      thumbnail: true,

      technologies: {
        include: {
          technology: true,
        },
      },

      images: {
        include: {
          media: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
};


export const getProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: {
      id,
    },

    include: {
      thumbnail: true,

      technologies: {
        include: {
          technology: true,
        },
      },

      images: {
        include: {
          media: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
};

export const updateProject = async (
  id,
  projectData,
  technologyIds = []
) => {
  return await prisma.$transaction(async (tx) => {
    await tx.project.update({
      where: {
        id,
      },
      data: projectData,
    });

    
    await tx.projectTechnology.deleteMany({
      where: {
        projectId: id,
      },
    });

    
    if (technologyIds.length > 0) {
      await tx.projectTechnology.createMany({
        data: technologyIds.map((technologyId) => ({
          projectId: id,
          technologyId,
        })),
      });
    }

    return await tx.project.findUnique({
      where: {
        id,
      },

      include: {
        thumbnail: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        images: {
          include: {
            media: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  });
};

export const deleteProject = async (id) => {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
};

export const getProjectByTitle = async (title) => {
  return await prisma.project.findFirst({
    where: {
      title,
    },
  });
};


export const updateProjectThumbnail = async (projectId, thumbnailId) => {
  return await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      thumbnailId,
    },
    include: {
      thumbnail: true,
      technologies: {
        include: {
          technology: true,
        },
      },
      images: {
        include: {
          media: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
};


export const removeProjectThumbnail = async (projectId) => {
  return await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      thumbnailId: null,
    },
    include: {
      thumbnail: true,
      technologies: {
        include: {
          technology: true,
        },
      },
      images: {
        include: {
          media: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
};


export const addProjectImage = async (
  projectId,
  mediaId,
  displayOrder = 0
) => {
  return await prisma.projectImage.create({
    data: {
      projectId,
      mediaId,
      displayOrder,
    },
    include: {
      media: true,
    },
  });
};


export const getProjectImages = async (projectId) => {
  return await prisma.projectImage.findMany({
    where: {
      projectId,
    },
    include: {
      media: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });
};


export const deleteProjectImage = async (id) => {
  return await prisma.projectImage.delete({
    where: {
      id,
    },
  });
};