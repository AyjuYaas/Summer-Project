import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../../lib/Axios";
import { adminTherapist } from "../../../../types/therapist.types";
import { IoMdMail, IoMdClose } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { useAdminStore } from "../../../../store/useAdminStore";

interface Props {
  therapistId: string;
  close: () => void;
}

const OpenIndividualTherapist = ({ therapistId, close }: Props) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { respondTherapist } = useAdminStore();

  const [therapist, setTherapist] = useState<adminTherapist>({
    _id: "",
    name: "",
    email: "",
    image: "",
    phone: "",
    gender: "",
    languages: [],
    specialization: [],
    experience: "",
    qualification: [],
    validationStatus: "",
    createdAt: new Date(),
  });

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflowY = "visible";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  useEffect(() => {
    const getTherapistDetails = async () => {
      const res = await axiosInstance.get(
        `/admin/get-therapist/${therapistId}`
      );

      if (res.data.success) {
        setTherapist(res.data.therapist);
      }
    };

    getTherapistDetails();
  });

  const submitRequest = async (status: string) => {
    const res = await respondTherapist(therapistId, status);

    if (res) {
      close();
    }
  };

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full backdrop-blur-md flex justify-center items-center">
      <div
        ref={menuRef}
        className="bg-cbg-three p-10 rounded-lg flex flex-col gap-5 relative"
      >
        <div className="flex flex-col text-3xl text-[#006e5e]">
          <span className="font-light">Therapist</span>
          <span className="font-fancy">Details</span>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <h1 className="text-2xl font-fancy tracking-wider text-[#2f4858]">
            Basic Info
          </h1>
          <div className="flex gap-5 items-center">
            <a href={therapist.image} target="_blank">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="size-17 rounded-full"
              />
            </a>

            <div className="text-lg flex flex-col">
              <h1 className="font-bold">{therapist.name}</h1>
              <p className="text-base">
                <span className="font-bold">Gender:</span> {therapist.gender}
              </p>
              <a
                href={`mailto:${therapist.email}`}
                className="text-base flex gap-1 items-center hover:underline"
              >
                <IoMdMail size={20} />
                {therapist.email}
              </a>
              <a
                href={`tel:+977${therapist.phone}`}
                className="text-base flex gap-1 items-center hover:underline"
              >
                <FaPhoneSquareAlt />
                {therapist.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-fancy tracking-wider text-[#2f4858]">
            Specialization and Qualifications
          </h1>

          <div className="flex flex-col gap-2">
            <div>
              <span className="font-bold text-xl">Languages: </span>{" "}
              <div className="text-base flex gap-3">
                {therapist.languages.map((language, index: number) => (
                  <span key={index}>|| {language} ||</span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-xl">Specialization: </span>{" "}
              <div className="text-base flex gap-3">
                {therapist.specialization.map(
                  (specialization, index: number) => (
                    <span key={index}>|| {specialization} ||</span>
                  )
                )}
              </div>
            </div>

            <div>
              <span className="font-bold text-xl">Qualification: </span>{" "}
              <div className="text-base flex flex-col">
                <ul className="list-disc">
                  {therapist.qualification.map(
                    (qualification, index: number) => (
                      <li key={index}>{qualification}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-center">
          <button
            className="bg-[#6e9675] py-2 px-7 rounded-lg text-white font-bold cursor-pointer hover:bg-[#a2cca9] duration-100"
            onClick={() => submitRequest("approve")}
          >
            Accept
          </button>
          <button
            className="bg-red-800 py-2 px-7 rounded-lg text-white font-bold cursor-pointer hover:bg-red-600 duration-100"
            onClick={() => submitRequest("reject")}
          >
            Reject
          </button>
        </div>

        <div
          className="absolute right-10 bg-red-700 p-1 rounded-full text-white hover:bg-red-600 cursor-pointer"
          onClick={close}
        >
          <IoMdClose className="size-5" />
        </div>
      </div>
    </div>
  );
};
export default OpenIndividualTherapist;
