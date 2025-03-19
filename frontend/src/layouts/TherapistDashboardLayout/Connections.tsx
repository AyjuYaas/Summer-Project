import { JSX, useEffect } from "react";
import { useMatchStore } from "../../store/useMatchStore";
import LoadingMessage from "./components/LoadingMessage";
import NoMatches from "./components/NoMatches";
import IndividualMessage from "./components/IndividualMessage";

const Connections = (): JSX.Element => {
  const { matches, getMatches, loading } = useMatchStore();

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  return (
    <div className="bg-cbg-four rounded-2xl p-10 flex flex-col h-max shadow-xl hover:shadow-2xl flex-2/3">
      <div className="flex flex-col gap-1">
        <span className="font-fancy text-2xl md:text-3xl lg:text-4xl tracking-wider">
          Your Connections
        </span>
        <span className="text-lg">View conversation between you and user.</span>
      </div>
      <hr className="mt-4" />

      <div>
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
