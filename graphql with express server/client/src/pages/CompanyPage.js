import { useParams ,Link} from 'react-router';
import { getCompany } from '../lib/graphql/queries';
import { useEffect,useState } from 'react';
import {JobItem} from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  useEffect(() => {
    getCompany(companyId).then((data
    ) => {
      setCompany(data);
    }
    );
  }
  , [companyId]);
  console.log('company', company);
  
  if (!company) {
    return <p>Loading...
    </p>;
  }
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h2 className='title is-5'>
        Jobs at {company.name}
      </h2>
      {company.jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
}

export default CompanyPage;
