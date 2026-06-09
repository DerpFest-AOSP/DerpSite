import { Link } from 'react-router-dom'

const NotFound = () => {
   return (
      <div className="p-6 text-center">
         <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
         <p className="mb-4 text-gray-300">The page you are looking for does not exist.</p>
         <Link to="/" className="colored-a">⟶ Back to main page</Link>
      </div>
   );
};

export default NotFound;