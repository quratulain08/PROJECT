// pages/faculty.js
import FacultyForm from '../components/FacultyForm';
import Layout from '../components/Layout';

const FacultyPage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <FacultyForm />
            </div>
        </Layout>
    );
};

export default FacultyPage;
