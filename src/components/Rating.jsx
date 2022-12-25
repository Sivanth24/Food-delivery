import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { HiStar } from 'react-icons/hi'
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";

const Rating = ({ count, rating, color, onRating, index }) => {
  const [{ theme }] = useStateValue()
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return theme ? color.redfilled : color.bluefilled;
    } else if (!hoverRating && rating >= index) {
      return theme ? color.RedFilled : color.bluefilled;
    }
    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <motion.div key={idx} whileHover={{scale: 1.5}} className="transition-all ease-in-out duration-75">
          <HiStar
            className="cursor-pointer"
            icon="star"
            onClick={() => {onRating(index,idx);}}
            style={{ color: getColor(idx) }}
            onMouseEnter={() => setHoverRating(idx)}
            onMouseLeave={() => setHoverRating(0)}
          />
        </motion.div>
      ));
      // eslint-disable-next-line
  }, [count, rating, hoverRating]);

  return <div key={index} className="flex flex-row">{starRating}</div>;
};

Rating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: PropTypes.shape({
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  }),
};

Rating.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    bluefilled: "#30475E",
    redfilled: "#F05454",
    unfilled: "#DCDCDC",
  },
};

export default React.memo(Rating);