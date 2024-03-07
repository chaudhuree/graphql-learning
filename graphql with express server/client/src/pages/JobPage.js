import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { getJob,deleteJob } from '../lib/graphql/queries';
// getJob("6mA05AZxvS1R").then((data) => {
//   console.log('job',data);
// } )
function JobPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    getJob(jobId).then((data) => {
      // console.log('job',data);
      setJob(data);
      
    } )
  }, [jobId]);
  // delete job
  const handleDelete = async () => {
    try {
      const deletedJob = await deleteJob(jobId);
      navigate('/')
    } catch (error) {
      alert('An error occurred while deleting the job');
      navigate('/');
      
    }
  }
  // console.log('job', job);
  if(!job) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <h1 className="title is-2">
        {job?.title} <button className="delete" onClick={handleDelete}></button>
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>
          {job?.company.name}
        </Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(job?.date, 'long')}
        </div>
        <p className="block">
          {job?.description}
        </p>
      </div>
    </div>
  );
}

export default JobPage;
