import { useParams ,Link} from 'react-router';
import { getCompany } from '../lib/graphql/queries';
import { useEffect,useState } from 'react';
import {JobItem} from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company:null,
    loading:true,
    error:false
  });
  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId);
        setState({
          company,
          loading:false,
          error:false
        });
      } catch (error) {
        setState({
          company:null,
          loading:false,
          error:true
        });
      }
    })()
  }
  , [companyId]);
  // console.log('company', company);
  const {company,loading,error} = state;
  
  if (loading) {
    return <p>Loading...
    </p>;
  }
  if (error) {
    return <p className='has-text-danger'>No Data Found
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
