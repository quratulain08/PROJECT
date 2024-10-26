// pages/faculty.js
import DepartmentDashboard from '../components/departmentForm';
import Layout from '../components/Layout';

const FacultyPage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <DepartmentDashboard />
            </div>
        </Layout>
    );
};

export default FacultyPage;
