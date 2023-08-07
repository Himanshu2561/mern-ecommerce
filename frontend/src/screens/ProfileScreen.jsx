import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import ProfileOrders from "../components/ProfileOrders";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const ProfileScreen = () => {
  const [disableName, setDisableName] = useState(true);
  const [disableEmail, setDisableEmail] = useState(true);
  const [disablePass, setDisablePass] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));

        setDisableName(true);
        setDisableEmail(true);
        setDisablePass(true);

        toast.success("Profile updated");
      } catch (err) {
        if (err?.status == 500) {
          toast.error("Password length must be greater than 8");
        } else {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  };

  return (
    <div className="container pt-20 h-[80vh] mx-auto flex justify-center gap-x-4">
      <div className="w-fit px-5">
        <div className="text-lg mb-5 border-b font-bold text-gray-700 uppercase">
          Update User Profile
        </div>
        <div className="relative overflow-x-auto">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="flex items-baseline gap-4">
              <label
                htmlFor="name"
                className="block mb-2 font-medium w-[10rem] text-gray-900"
              >
                Your Name:
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[12rem] py-1 px-2.5"
                placeholder={disableName ? userInfo.name : "first last"}
                disabled={disableName}
                autoComplete="true"
              />
              <AiOutlineEdit
                onClick={() => setDisableName(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-baseline gap-4">
              <label
                htmlFor="email"
                className="block mb-2 font-medium w-[10rem] text-gray-900"
              >
                Your Email:
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[12rem] py-1 px-2.5"
                placeholder={
                  disableEmail ? userInfo.email : "example@email.com"
                }
                disabled={disableEmail}
                autoComplete="true"
              />
              <AiOutlineEdit
                onClick={() => setDisableEmail(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-baseline gap-4">
              <label
                htmlFor="pass"
                className="block mb-2 font-medium w-[10rem] text-gray-900"
              >
                Password:
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="pass"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[12rem] py-1 px-2.5"
                placeholder={disablePass ? "••••••••" : ""}
                disabled={disablePass}
                autoComplete="true"
              />
              <AiOutlineEdit
                onClick={() => setDisablePass(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-baseline gap-4">
              <label
                htmlFor="confPass"
                className="block mb-2 font-medium w-[10rem] text-gray-900"
              >
                Confirm Password:
              </label>
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                name="confPass"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[12rem] py-1 px-2.5"
                placeholder={disablePass ? "••••••••" : ""}
                disabled={disablePass}
                autoComplete="true"
              />
            </div>
            <div className="flex flex-col justify-center items-center h-14">
              {loadingUpdateProfile && <Loader />}
              <button
                type="submit"
                className="w-[10rem] bg-ecom-3 text-white transition bg-opacity-50 hover:bg-opacity-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="rounded-md">
        <div className="text-lg font-bold border-b text-gray-700 mb-5">
          ORDERS
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="">{error?.data?.message || error.error}</div>
        ) : (
          <ProfileOrders orders={orders} />
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
