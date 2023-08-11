import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { FaTimes, FaCheck } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import Meta from "../../components/Meta";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteUserHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        const { data, error } = await deleteUser(userId);

        if (data) {
          toast.success(data?.message);
        } else {
          toast.error(error?.data?.message);
        }

        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container min-h-screen mt-10 mx-auto">
      <Meta title={"Ecommerce - All Users"} />
      <div className="flex justify-between items-center border-b-2 border-indigo-500 text-xl text-indigo-500 font-bold uppercase py-1">
        <div>Users</div>
      </div>

      {loadingDelete && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="py-2 w-full rounded-md bg-opacity-50 bg-red-500 text-red-500">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md rounded-lg flex flex-col justify-center items-center mb-10 mt-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-indigo-500 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  EMAIL
                </th>
                <th scope="col" align="center" className="px-6 py-3">
                  ADMIN
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white border-b">
                  <td className="px-6 py-4">{user._id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td align="center" className="px-6 py-4">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-between items-center">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <AiOutlineEdit className="text-indigo-500 cursor-pointer" />
                    </Link>
                    <button onClick={() => deleteUserHandler(user._id)}>
                      <BiTrash className="text-red-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
