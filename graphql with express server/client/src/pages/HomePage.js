import JobList from '../components/JobList';
import { jobs } from '../lib/fake-data';

function HomePage() {
  
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList/>
    </div>
  );
}

export default HomePage;
