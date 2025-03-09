import { JSX, useEffect } from "react";
import { useMatchStore } from "../../store/useMatchStore";
import LoadingMessage from "./components/LoadingMessage";
import NoMatches from "./components/NoMatches";
import IndividualMessage from "./components/IndividualMessage";

const Connections = (): JSX.Element => {
  const { matches, getMatches, loading, getPendingRequest, request } =
    useMatchStore();

  useEffect(() => {
    getMatches();
    getPendingRequest();
  }, []);

  return (
    <div className="bg-[var(--cbg-four)] rounded-2xl p-10 flex flex-col h-max shadow-xl hover:shadow-2xl flex-2/4">
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
                    className="flex gap-3 items-center mb-5 p-2 rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed opacity-70 "
                  >
                    <img
                      src={req.therapist.image}
                      alt={`${name}'s avatar`}
                      className="size-12 object-cover rounded-full border-2"
                    />
                    <h2 className="font-semibold text-[var(--text)] text-xl">
                      {req.therapist.name}
                    </h2>
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
    </div>
  );
};
export default Connections;
