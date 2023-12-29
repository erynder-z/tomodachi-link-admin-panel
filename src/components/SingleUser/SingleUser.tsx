import { format } from 'date-fns/format';
import { useLocation } from 'react-router-dom';

export default function SingleUser() {
  const location = useLocation();
  const userData = location.state.userData;
  const {
    _id,
    firstName,
    lastName,
    username,
    userpic,
    email,
    accountType,
    joined,
    lastSeen,
  } = userData;
  const joinedDate = joined ? format(new Date(joined), 'MMM dd, yyyy') : '';
  const lastSeenDate = lastSeen
    ? format(new Date(lastSeen), 'MMM dd, yyyy')
    : '';
  const userImage = userpic?.data;
  return (
    <div className="p-4">
      <section className="flex flex-col md:flex-row gap-4 break-all">
        <img
          loading="lazy"
          className="w-8 h-8 object-cover rounded-full"
          src={`data:image/png;base64,${userImage}`}
          alt="User avatar"
        />{' '}
        {username}
        <div className="md:ml-auto font-bold">ID: {_id}</div>
      </section>
      <section className="flex flex-col text-sm ">
        <div className="flex gap-2">
          <span className="font-bold">Full name: </span>
          {firstName} {lastName}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Email: </span>
          {email}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Account type: </span>
          {accountType}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Joined: </span>
          {joinedDate}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Last seen: </span>
          {lastSeenDate}
        </div>
      </section>
    </div>
  );
}
