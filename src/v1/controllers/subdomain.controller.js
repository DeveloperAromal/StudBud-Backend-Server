import {
  createSubdomain,
  getDomain,
  getSubdomainData,
} from "../services/subdomain.service.js";

export const getAllDomain = async (req, res) => {
  try {
    const domainData = await getDomain();
    res.json(domainData);
  } catch (e) {
    console.log(e);
  }
};

export const getDomainById = async (req, res) => {
  try {
    const { subdomain } = req.params;
    const getDomainDataById = await getSubdomainData(subdomain);
    res.json(getDomainDataById);
  } catch (e) {
    console.log(e);
  }
};

export const createNewSubdoamin = async (req, res) => {
  try {
    const { subdomain, name, email, phonenumber, designation, capacity } =
      req.body;
    const createDomain = await createSubdomain(
      subdomain,
      name,
      email,
      phonenumber,
      designation,
      capacity
    );
    res.json(createDomain);
  } catch (e) {
    console.log(e);
  }
};
