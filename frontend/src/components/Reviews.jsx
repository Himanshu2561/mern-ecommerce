import Rating from "./Rating";

const Reviews = ({ review }) => {
  return (
    <div className="w-full rounded-lg shadow-lg">
      <div className="bg-[#f3f6fa] p-2 py-5 flex items-center gap-x-4 rounded-[0.5rem_0.5rem_0_0]">
        <div className="border-r-2 pr-4 font-bold border-gray-600 text-lg">
          {review.name}
        </div>
        <div className="font-bold text-lg">{review.rating}.0</div>
        <Rating value={review.rating} />
      </div>
      <div className="p-2 flex font-semibold text-sm gap-x-4 py-5">
        <div className="w-4/5">
          <p>{review.comment}</p>
        </div>
        <div className="w-1/5">{review.createdAt.substring(0, 10)}</div>
      </div>
    </div>
  );
};

export default Reviews;
