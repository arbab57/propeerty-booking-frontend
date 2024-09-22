const Users = ({ users }) => {
  return (
    <div>
      <p className="text-[#212529] font-bold mb-4 text-xl">New Users</p>
      {users?.map((user, i) => {
        return (
          <div
            key={i}
            className="bg-white px-4 py-3 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-2"
          >
            <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
