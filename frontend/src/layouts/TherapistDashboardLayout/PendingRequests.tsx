import { JSX, useEffect, useState } from "react";
import { useMatchStore } from "../../store/useMatchStore";
import LoadingMessage from "./components/LoadingMessage";
import IndividualRequest from "./components/IndividualRequest";
import OpenRequestingUser from "./components/OpenRequestingUser";
import NoRequest from "./components/NoRequest";
import { RequestingUser } from "../../types/match.types";

const PendingRequests = (): JSX.Element => {
  const {
    request,
    getPendingRequest,
    loadingPending: loading,
  } = useMatchStore();

  const [selectedUser, setSelectedUser] = useState<RequestingUser | null>(null);

  const handlePendingUser = (user: RequestingUser) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    getPendingRequest();
  }, [getPendingRequest]);

  return (
    <div className="bg-cbg-three rounded-2xl p-10 flex flex-col h-max shadow-xl hover:shadow-2xl flex-1/3">
      <div className="flex flex-col gap-1">
        <span className="font-fancy text-2xl md:text-3xl lg:text-4xl tracking-wider">
          Your Requests
        </span>
      </div>
      <hr className="mt-4" />

      <div>
        <div className="flex flex-col mt-3">
          {loading ? (
            <LoadingMessage />
          ) : request.length === 0 ? (
            <NoRequest />
          ) : (
            request.map((req) => (
              <div
                key={req.user._id}
                onClick={() =>
                  handlePendingUser({ ...req.user, requestId: req._id })
                }
              >
                <IndividualRequest
                  name={req.user.name}
                  image={req.user.image}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {selectedUser && (
        <OpenRequestingUser
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};
export default PendingRequests;
