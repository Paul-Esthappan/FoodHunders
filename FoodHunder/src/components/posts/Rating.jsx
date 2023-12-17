import { CiHeart } from "react-icons/ci";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const Rating = ({ rating }) => {
  const getIcon = () => {
    switch (rating) {
      case "good":
        return <CiHeart />;
      case "average":
        return <FaHeart />;
      case "bad":
        return <FaHeartBroken />;
      default:
        return null;
    }
  };

  return (
    <button >
      {getIcon()}
      {/* Display the current icon  */}
    </button>
  );
};



export default Rating