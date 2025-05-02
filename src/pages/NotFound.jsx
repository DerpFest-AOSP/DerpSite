import { Link } from 'react-router-dom'

const NotFound = () => {
   return (
      <div className="p-6">
         404 Page Not Found <br />
         <Link to="/" className="colored-a">⟶ Back to main page</Link>
      </div>
   );
};

export default NotFound;