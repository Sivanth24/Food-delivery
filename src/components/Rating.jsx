import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { HiStar } from 'react-icons/hi'
import { motion } from "framer-motion";

const Rating = ({ count, rating, color, onRating, index }) => {

  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
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
    filled: "#000000",
    unfilled: "#DCDCDC",
  },
};

export default React.memo(Rating);