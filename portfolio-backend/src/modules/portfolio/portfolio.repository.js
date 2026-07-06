import prisma from "../../lib/prisma.js";

// Introspected schema uses verbose relation names for portfolio media.
// We normalise them back to the short names the rest of the app expects.
const PORTFOLIO_INCLUDE = {
  media_portfolio_profileImageIdTomedia: true,
  media_portfolio_workspaceImageIdTomedia: true,
  media_portfolio_resumeIdTomedia: true,
};

const normalise = (p) => {
  if (!p) return p;
  return {
    ...p,
    profileImage: p.media_portfolio_profileImageIdTomedia ?? null,
    workspaceImage: p.media_portfolio_workspaceImageIdTomedia ?? null,
    resume: p.media_portfolio_resumeIdTomedia ?? null,
    // remove verbose keys from the response
    media_portfolio_profileImageIdTomedia: undefined,
    media_portfolio_workspaceImageIdTomedia: undefined,
    media_portfolio_resumeIdTomedia: undefined,
  };
};

export const getPortfolio = async () => {
  let portfolio = await prisma.portfolio.findUnique({
    where: { id: 1 },
    include: PORTFOLIO_INCLUDE,
  });

  if (!portfolio) {
    portfolio = await prisma.portfolio.create({
      data: { id: 1 },
      include: PORTFOLIO_INCLUDE,
    });
  }

  return normalise(portfolio);
};

export const updatePortfolio = async (data) => {
  const updated = await prisma.portfolio.update({
    where: { id: 1 },
    data,
    include: PORTFOLIO_INCLUDE,
  });
  return normalise(updated);
};
