import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Rating = ({ value, text }) => {
  return (
    <div className="flex justify-between items-center">
      <Link>
        <div className="flex gap-1">
          <span>
            {value >= 1 ? (
              <FaStar />
            ) : value >= 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
          <span>
            {value >= 2 ? (
              <FaStar />
            ) : value >= 1.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
          <span>
            {value >= 3 ? (
              <FaStar />
            ) : value >= 2.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
          <span>
            {value >= 4 ? (
              <FaStar />
            ) : value >= 3.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
          <span>
            {value >= 5 ? (
              <FaStar />
            ) : value >= 4.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        </div>
      </Link>
      <Link>
        <span className="font-semibold">{text && text} reviews</span>
      </Link>
    </div>
  );
};

export default Rating;
