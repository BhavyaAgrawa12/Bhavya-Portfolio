import prisma from "../../lib/prisma.js";

// Introspected schema relation names:
// project.media         = thumbnail (Media relation)
// project.projecttechnology = technologies join table
// project.projectimage  = gallery images
// projecttechnology.technology = the Technology record

const PROJECT_INCLUDE = {
  media: true,                          // thumbnail
  projecttechnology: {
    include: { technology: true },
  },
  projectimage: {
    include: { media: true },
    orderBy: { displayOrder: "asc" },
  },
};

// Adapter: normalise introspected shape to what controllers/services expect
const normalise = (p) => {
  if (!p) return p;
  return {
    ...p,
    thumbnail: p.media ?? null,
    technologies: (p.projecttechnology ?? []).map((pt) => ({
      projectId: pt.projectId,
      technologyId: pt.technologyId,
      technology: pt.technology,
    })),
    images: (p.projectimage ?? []).map((pi) => ({
      id: pi.id,
      projectId: pi.projectId,
      mediaId: pi.mediaId,
      displayOrder: pi.displayOrder,
      media: pi.media,
    })),
  };
};

export const createProject = async (projectData, technologyIds = []) => {
  return await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({ data: projectData });

    if (technologyIds.length > 0) {
      await tx.projecttechnology.createMany({
        data: technologyIds.map((technologyId) => ({
          projectId: project.id,
          technologyId,
        })),
      });
    }

    const full = await tx.project.findUnique({
      where: { id: project.id },
      include: PROJECT_INCLUDE,
    });
    return normalise(full);
  });
};

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany({
    include: PROJECT_INCLUDE,
    orderBy: { displayOrder: "asc" },
  });
  return projects.map(normalise);
};

export const getProjectBySlug = async (slug) => {
  const p = await prisma.project.findUnique({ where: { slug }, include: PROJECT_INCLUDE });
  return normalise(p);
};

export const getProjectById = async (id) => {
  const p = await prisma.project.findUnique({ where: { id }, include: PROJECT_INCLUDE });
  return normalise(p);
};

export const updateProject = async (id, projectData, technologyIds = []) => {
  return await prisma.$transaction(async (tx) => {
    await tx.project.update({ where: { id }, data: projectData });

    await tx.projecttechnology.deleteMany({ where: { projectId: id } });

    if (technologyIds.length > 0) {
      await tx.projecttechnology.createMany({
        data: technologyIds.map((technologyId) => ({
          projectId: id,
          technologyId,
        })),
      });
    }

    const full = await tx.project.findUnique({ where: { id }, include: PROJECT_INCLUDE });
    return normalise(full);
  });
};

export const deleteProject = async (id) => {
  return await prisma.project.delete({ where: { id } });
};

export const getProjectByTitle = async (title) => {
  return await prisma.project.findFirst({ where: { title } });
};

export const updateProjectThumbnail = async (projectId, thumbnailId) => {
  const p = await prisma.project.update({
    where: { id: projectId },
    data: { thumbnailId },
    include: PROJECT_INCLUDE,
  });
  return normalise(p);
};

export const removeProjectThumbnail = async (projectId) => {
  const p = await prisma.project.update({
    where: { id: projectId },
    data: { thumbnailId: null },
    include: PROJECT_INCLUDE,
  });
  return normalise(p);
};

export const addProjectImage = async (projectId, mediaId, displayOrder = 0) => {
  return await prisma.projectimage.create({
    data: { projectId, mediaId, displayOrder },
    include: { media: true },
  });
};

export const getProjectImages = async (projectId) => {
  return await prisma.projectimage.findMany({
    where: { projectId },
    include: { media: true },
    orderBy: { displayOrder: "asc" },
  });
};

export const deleteProjectImage = async (id) => {
  return await prisma.projectimage.delete({ where: { id } });
};
