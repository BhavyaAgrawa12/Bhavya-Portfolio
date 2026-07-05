import { getPortfolio, updatePortfolio } from "./portfolio.repository.js";

export const fetchPortfolio = async () => {
    return await getPortfolio();
};

export const editPortfolio = async (data) => {
    return await updatePortfolio(data);
};
