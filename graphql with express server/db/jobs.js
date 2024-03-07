import { connection } from "./connection.js";
import { generateId } from "./ids.js";

const getJobTable = () => connection.table("job");

export async function getJobs() {
  return await getJobTable().select();
}

export async function getJobsByCompany(companyId) {
  return await getJobTable().select().where({ companyId });
}

export async function getJob(id) {
  return await getJobTable().first().where({ id });
}

export async function createJob({ companyId, title, description }) {
  const job = {
    id: generateId(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  await getJobTable().insert(job);
  return job;
}

export async function deleteJob(id,companyId) {
  // id is for searching tha job with id . but amra aikhane companyId add koci
  // ai companyId hocce loggedin user er company id. aivabe amra korte pari ki
  // logged in user tar company bade onno kono companyr job delete korte parbe na.
  const job = await getJobTable().first().where({ id,companyId });
  if (!job) {
    return null;
  }
  await getJobTable().delete().where({ id });
  return job;
}

export async function updateJob({ id, title, description,companyId }) {
  const job = await getJobTable().first().where({ id,companyId });
  if (!job) {
    return null;
  }
  const updatedFields = { title, description };
  await getJobTable().update(updatedFields).where({ id });
  return { ...job, ...updatedFields };
}
