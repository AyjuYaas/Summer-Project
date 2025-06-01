import { useContext } from "react";
import specializationData from "../data/specializations-data";
import QualificationSelector from "./QualificationSelector";
import { TherapistFormData } from "./TherapistFormContext";

const EducationData = () => {
  const { formData, setFormData, handleChange } = useContext(TherapistFormData);

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialization: checked
        ? [...prevFormData.specialization, value]
        : prevFormData.specialization.filter((item) => item !== value),
    }));
  };
  return (
    <div>
      {/* ========== Specialization ========= */}
      <div>
        <label
          htmlFor="specialization"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Specialization (Check all that apply)
        </label>
      </div>
      <div className="mb-5 flex flex-col justify-start items-start p-1 gap-5">
        {specializationData.map((specialization: string, index: number) => (
          <div
            key={index}
            className="flex gap-1.5 h-full items-center justify-center"
          >
            <input
              type="checkbox"
              name="specialization"
              id={`${index}`}
              value={specialization}
              checked={formData.specialization.includes(specialization)}
              onChange={handleSpecializationChange}
              className="border border-button-border rounded-lg h-4 w-4"
            />
            <label htmlFor={`${index}`}>{specialization}</label>
          </div>
        ))}
      </div>

      {/* ========== Experience ========= */}
      <div>
        <label
          htmlFor="experience"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Experience (in Years)
        </label>
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="experience"
          id="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Year/s of experience"
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* ========== Qualification ========= */}
      <QualificationSelector
        qualifications={formData.qualification || []}
        onAddQualification={(value) => {
          if (!formData.qualification?.includes(value)) {
            setFormData((prev) => ({
              ...prev,
              qualification: [...(prev.qualification || []), value],
            }));
          }
        }}
        onRemoveQualification={(index) => {
          setFormData((prev) => ({
            ...prev,
            qualification:
              prev.qualification?.filter((_, i) => i !== index) || [],
          }));
        }}
      />
    </div>
  );
};
export default EducationData;
