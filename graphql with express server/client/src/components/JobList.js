import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { useEffect, useState } from "react";
import { getJobs } from "../lib/graphql/queries";

// getJobs().then((data) => {
//   console.log(data);
// });

function JobList() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

export const JobItem = ({ job }) => {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(job.date)}</div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
    </li>
  );
};

export default JobList;
