import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="_404 absolute top-0 overflow-hidden min-h-screen min-w-full text-center bg-white flex justify-center items-center">
      <div className="flex flex-col justify-between items-center gap-5 w-[800px]">
        <div className="font-bold text-[12rem]">
          Oops!
        </div>
        <div className="uppercase font-bold text-[2rem]">
          404 - page not found
        </div>
        <div className="font-semibold">
          The page you are looking for might have been removed had it's name
          changed or is temporarily unavailable.
        </div>
        <Link to="/">
          <div className="uppercase font-semibold px-4 py-2 text-white bg-cyan-500 cursor-pointer rounded-full hover:bg-cyan-400 transition">
            Go to homepage
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
