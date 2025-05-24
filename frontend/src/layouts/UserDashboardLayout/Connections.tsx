import { JSX, useEffect, useState } from "react";
import { useMatchStore } from "../../store/useMatchStore";
import LoadingMessage from "./components/LoadingMessage";
import NoMatches from "./components/NoMatches";
import IndividualMessage from "./components/IndividualMessage";
import { MdDelete } from "react-icons/md";
import ConfirmRemoveRequestPrompt from "./components/ConfirmRemoveRequestPrompt";

interface DeleteRequest {
  id: string;
  name: string;
}

const Connections = (): JSX.Element => {
  const {
    matches,
    getMatches,
    resetMatches,
    loading,
    getPendingRequest,
    request,
    resetPendingRequest,
  } = useMatchStore();

  useEffect(() => {
    getMatches();
    getPendingRequest();

    return () => {
      resetMatches();
      resetPendingRequest();
    };
  }, [getMatches, getPendingRequest, resetMatches, resetPendingRequest]);

  const [deleteRequest, setDeleteRequest] = useState<DeleteRequest | null>(
    null
  );

  return (
    <div className="bg-cbg-four rounded-2xl p-10 flex flex-col h-max shadow-xl hover:shadow-2xl flex-2/4">
      <div className="flex flex-col gap-1">
        <span className="font-fancy text-2xl md:text-3xl lg:text-4xl tracking-wider">
          Your Connections
        </span>
        <span className="text-lg">
          View conversation between you and therapists.
        </span>
      </div>
      <hr className="mt-4" />

      <div>
        {request.length > 0 && (
          <>
            <div className="flex flex-col mt-3">
              <span className="text-lg mb-2">Pending Requests:</span>
              {loading ? (
                <LoadingMessage />
              ) : (
                request.map((req, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between mb-5 rounded-xl relative border-2 border-gray-300 bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    <div className="flex gap-3 items-center cursor-not-allowed opacity-70 py-2 pl-2 w-full bg-gray-300 text-gray-500">
                      <img
                        src={req.therapist.image}
                        alt={`${req.therapist.name}'s avatar`}
                        className="size-12 object-cover rounded-full border-2 bg-white"
                      />
                      <h2 className="font-semibold text-main-text text-xl">
                        {req.therapist.name}
                      </h2>
                    </div>
                    <div>
                      <button
                        className="rounded-r-xl bg-red-700 right-0 top-0 my-auto h-full p-2 hover:bg-red-800 cursor-pointer text-white-text"
                        onClick={() =>
                          setDeleteRequest({
                            id: req._id,
                            name: req.therapist.name,
                          })
                        }
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <hr />
          </>
        )}

        <div className="flex flex-col mt-3">
          {loading ? (
            <LoadingMessage />
          ) : matches.length === 0 ? (
            <NoMatches />
          ) : (
            matches.map((match) => (
              <IndividualMessage
                key={match._id}
                id={match._id}
                name={match.name}
                image={match.image}
              />
            ))
          )}
        </div>
      </div>

      {deleteRequest && (
        <ConfirmRemoveRequestPrompt
          id={deleteRequest?.id || ""}
          toggleRemoveOption={() => setDeleteRequest(null)}
          name={deleteRequest?.name || ""}
        />
      )}
    </div>
  );
};
export default Connections;
