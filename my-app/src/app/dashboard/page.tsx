// pages/faculty.js
import StudentDashboard from '@/app/components/Dashboard';
import Layout from '../components/Layout';

const FacultyPage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <StudentDashboard />
            </div>
        </Layout>
    );
};

export default FacultyPage;
