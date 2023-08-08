import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { BiLeftArrowCircle } from "react-icons/bi";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] =
    useUpdateUserMutation(userId);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      });

      toast.success("User updated successfully");

      refetch();

      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container max-w-screen-lg mx-auto">
      <div className="py-5 text-gray-600">
        <Link to="/admin/userlist">
          <BiLeftArrowCircle className="w-10 h-10" />
        </Link>
      </div>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-10">
        <div className="grid gap-4 gap-y-2 text-sm sm:grid-cols-1 grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Edit User</p>
            <p>Please edit all the fields correctly.</p>
          </div>
          <form onSubmit={submitHandler} className="col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : error ? (
              <div className="py-2 w-full rounded-md bg-opacity-50 bg-red-500 text-red-500">
                {error?.data?.message || error.error}
              </div>
            ) : (
              <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3">
                  <label className="font-medium text-gray-900">Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    value={name}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="font-medium text-gray-900">Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    value={email}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Enter Email"
                  />
                </div>

                <div className="flex items-center pl-4 border border-gray-200 rounded">
                  <input
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    checked={isAdmin}
                    disabled={userInfo._id === userId}
                    id="bordered-checkbox-2"
                    type="checkbox"
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="bordered-checkbox-2"
                    className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                  >
                    Admin
                  </label>
                </div>

                <div className="md:col-span-5 text-right mt-5">
                  {loadingUpdate && <Loader />}

                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditScreen;
