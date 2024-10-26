// models/Faculty.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IFaculty extends Document {
    honorific: string;
    name: string;
    gender: string;
    cnic: string;
    address: string;
    province: string;
    city: string;
    contractType: string;
    academicRank: string;
    joiningDate: Date;
    leavingDate?: Date;
    isCoreComputingTeacher: boolean;
    lastAcademicQualification: {
        degreeName: string;
        degreeType: string;
        fieldOfStudy: string;
        degreeAwardingCountry: string;
        degreeAwardingInstitute: string;
        degreeStartDate: Date;
        degreeEndDate: Date;
    };
}

const FacultySchema: Schema = new Schema({
    honorific: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    contractType: { type: String, required: true },
    academicRank: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    leavingDate: { type: Date },
    isCoreComputingTeacher: { type: Boolean, default: false },
    lastAcademicQualification: {
        degreeName: { type: String, required: true },
        degreeType: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        degreeAwardingCountry: { type: String, required: true },
        degreeAwardingInstitute: { type: String, required: true },
        degreeStartDate: { type: Date, required: true },
        degreeEndDate: { type: Date, required: true },
    },
});

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);
