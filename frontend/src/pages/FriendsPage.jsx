import { useEffect, useState } from "react";
import { getUserFriends, getFriendRequests, acceptFriendRequest } from "../lib/api";
import { CheckIcon, UserIcon, MessageSquareIcon } from "lucide-react";
import { Link } from "react-router";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);

  // Fetch friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoadingFriends(false);
      }
    };
    fetchFriends();
  }, []);

  // Fetch friend requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getFriendRequests();
        setFriendRequests(data.incomingReqs || []);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      } finally {
        setLoadingRequests(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    setAcceptingId(requestId);
    try {
      await acceptFriendRequest(requestId);
      // Remove from requests, refresh friends
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
      const updatedFriends = await getUserFriends();
      setFriends(updatedFriends);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* PAGE HEADER */}
        <div className="flex items-center gap-3">
          <UserIcon className="size-7 text-primary" />
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>

        {/* INCOMING FRIEND REQUESTS */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-base-content/80">
            Friend Requests
            {friendRequests.length > 0 && (
              <span className="ml-2 badge badge-primary">{friendRequests.length}</span>
            )}
          </h2>

          {loadingRequests ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md text-primary" />
            </div>
          ) : friendRequests.length === 0 ? (
            <div className="bg-base-200 rounded-xl p-6 text-center text-base-content/50">
              No pending friend requests
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {friendRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-base-200 rounded-xl p-4 flex items-center gap-4 border border-base-300"
                >
                  {/* Avatar */}
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        src={request.sender?.profilePic}
                        alt={request.sender?.fullName}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{request.sender?.fullName}</p>
                    <p className="text-xs text-base-content/50 truncate">
                      {request.sender?.nativeLanguage && `Speaks ${request.sender.nativeLanguage}`}
                    </p>
                  </div>

                  {/* Accept button */}
                  <button
                    onClick={() => handleAccept(request._id)}
                    disabled={acceptingId === request._id}
                    className="btn btn-primary btn-sm gap-1"
                  >
                    {acceptingId === request._id ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <CheckIcon className="size-4" />
                    )}
                    Accept
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* DIVIDER */}
        <div className="divider" />

        {/* YOUR FRIENDS LIST */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-base-content/80">
            Your Friends
            {friends.length > 0 && (
              <span className="ml-2 badge badge-ghost">{friends.length}</span>
            )}
          </h2>

          {loadingFriends ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md text-primary" />
            </div>
          ) : friends.length === 0 ? (
            <div className="bg-base-200 rounded-xl p-8 text-center">
              <UserIcon className="size-12 mx-auto text-base-content/20 mb-3" />
              <p className="font-semibold text-base-content/60">No friends yet</p>
              <p className="text-sm text-base-content/40 mt-1">
                Go to Home to find language partners!
              </p>
              <Link to="/" className="btn btn-primary btn-sm mt-4">
                Find Friends
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {friends.map((friend) => (
                <div
                  key={friend._id}
                  className="bg-base-200 rounded-xl p-4 flex items-center gap-4 border border-base-300 hover:border-primary transition-colors"
                >
                  {/* Avatar */}
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{friend.fullName}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {friend.nativeLanguage && (
                        <span className="badge badge-sm badge-ghost">
                          🗣 {friend.nativeLanguage}
                        </span>
                      )}
                      {friend.learningLanguage && (
                        <span className="badge badge-sm badge-ghost">
                          📖 {friend.learningLanguage}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chat button */}
                  <Link
                    to={`/chat/${friend._id}`}
                    className="btn btn-ghost btn-sm btn-circle"
                    title="Chat"
                  >
                    <MessageSquareIcon className="size-4 text-primary" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default FriendsPage;
