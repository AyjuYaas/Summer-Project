import { JSX, useEffect, useState } from "react";
import { useAdminStore } from "../../../../store/useAdminStore";
import { pendingTherapist } from "../../../../types/therapist.types";
import OpenIndividualTherapist from "./OpenIndividualTherapist";
import { MdOutlinePersonSearch } from "react-icons/md";

const PendingTherapists = (): JSX.Element => {
  const {
    loadingPendingTherapists,
    pendingTherapists,
    getPendingTherapists,
    resetPendingTherapists,
  } = useAdminStore();

  const [therapistId, setTherapistId] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTherapists = pendingTherapists.filter(
    (therapist: pendingTherapist) =>
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getPendingTherapists();

    return () => {
      resetPendingTherapists();
    };
  }, [getPendingTherapists, resetPendingTherapists]);

  return (
    <div className="max-h-full pr-10 overflow-auto scrollbar-horizontal">
      {loadingPendingTherapists ? (
        <div>loading...</div>
      ) : pendingTherapists.length === 0 ? (
        <div>
          <p className="text-2xl font-bold text-main-text font-fancy tracking-widest">
            No pending therapists
          </p>
        </div>
      ) : (
        <div>
          <div className="relative h-max mb-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded border border-gray-300 w-full bg-gray-200 pl-9"
            />
            <div className="w-max absolute top-0 left-1 h-full flex items-center">
              <MdOutlinePersonSearch className="size-6" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredTherapists.map(
              (therapist: pendingTherapist, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 items-center text-lg bg-[#758abb] p-5 rounded-lg text-white cursor-pointer hover:bg-[#83699d] duration-150"
                  onClick={() => setTherapistId(therapist._id)}
                >
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="size-15 rounded-full"
                  />

                  <div>
                    <h1 className="font-bold">{therapist.name}</h1>
                    <p className="font-light text-base">{therapist.email}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {therapistId && (
        <OpenIndividualTherapist
          therapistId={therapistId}
          close={() => setTherapistId("")}
        />
      )}
    </div>
  );
};
export default PendingTherapists;
