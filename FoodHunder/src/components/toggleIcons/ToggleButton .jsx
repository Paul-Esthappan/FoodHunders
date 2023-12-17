import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const ToggleButton = ({ currentVideoId, onAction, liked, disliked }) => {
  const [clickCount, setClickCount] = useState(() => {
    if (liked) return 1;
    if (disliked) return 2;
    return 0;
  });

  const handleClick = () => {
    const newClickCount = (clickCount + 1) % 4;
    setClickCount(newClickCount);
    const actionType = getActionType(newClickCount);
    onAction(actionType, currentVideoId);
  };

  const getActionType = (clickCount) => {
    switch (clickCount) {
      case 1:
        return "like";
      case 2:
        return "dislike";
      case 3:
        return "null";
      default:
        return "empty";
    }
  };

  useEffect(() => {
    const actionType = getActionType(clickCount);
    onAction(actionType, currentVideoId);
  }, [clickCount, onAction, currentVideoId]);

  const getInitialIcon = () => {
    if (liked) return <FaHeart />;
    else if (disliked) return <FaHeartBroken />;
    else return <CiHeart/>
   
  };

  const getIcon = () => {
    switch (clickCount) {
      case 0:
        return getInitialIcon();
      case 1:
        return <FaHeart />;
      case 2:
        return <FaHeartBroken />;
      case 3:
        return  <CiHeart />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        {getIcon()}
        {/* Display the current icon and click count */}
      </button>
    </div>
  );
};

export default ToggleButton;
