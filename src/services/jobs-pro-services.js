import getJobClient from "./api-fecth";
export const dataJobs = "jobs";

export async function getJobs() {
  const data = await getJobClient("/jobs", {
    method: "GET",
  });
  localStorage.setItem(dataJobs, JSON.stringify(data));
  return data;
}

export async function createJobs(info) {
  const data = await getJobClient("/jobs", {
    method: "POST",
    body: info,
  });
  // localStorage.setItem(dataJobs, JSON.stringify(data));
  return data;
}

export async function getJobRecruiter(id) {
  const data = await getJobClient(`/jobs/${id}`, {
    method: "GET",
  });
  // localStorage.setItem(dataJobs, JSON.stringify(data));
  return data;
}

export async function showJob(id) {
  const data = await getJobClient(`/jobs/${id}`, {
    method: "GET",
  });
  localStorage.setItem(dataJobs, JSON.stringify(data));
  return data;
}

export async function deleteJob(id) {
  const data = await getJobClient(`/jobs/${id}`, {
    method: "DELETE",
  });
  return data;
}

export async function closeJob(id) {
  const data = await getJobClient(`/jobs/${id}`, {
    method: "PATCH",
    body: {
      job_status: false,
    },
  });
  return data;
}
