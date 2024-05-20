import star from "../../../assets/images/Shop/rating/star.png";
import halfStar from "../../../assets/images/Shop/rating/halfStar.png";
import zeroStar from "../../../assets/images/Shop/rating/zeroStar.png";

export default function DisplayRating({ rating }: { rating: number }) {
  const calculateAmountOfStars = () => {
    const ratingStars = [];
    if (rating === 0) {
      ratingStars.push(<DisplayZero />);
      return ratingStars;
    } else {
      for (let i = 0; i < rating; i++) {
        if (rating - i < 1) {
          ratingStars.push(<DisplayHalf key={i} />);
          return ratingStars;
        }
        ratingStars.push(<DisplayOne />);
      }
    }
    return ratingStars;
  };
  return (
    <div className="absolute left-[1rem] top-[.5rem] bg-white flex items-center">
      {calculateAmountOfStars()}
    </div>
  );
}

function DisplayZero() {
  return <img src={zeroStar} alt="zero" className="w-[2rem]" />;
}
function DisplayHalf() {
  return <img src={halfStar} alt="half" className="w-[2rem]" />;
}

function DisplayOne() {
  return <img src={star} alt="one" className="w-[2rem]" />;
}
