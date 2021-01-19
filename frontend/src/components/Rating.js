import React from "react";

const Rating = ({ value, reviews, color }) => {
  return (
    <div>
      <span>
        {value &&
          [1, 2, 3, 4, 5].map((star, i) => (
            <i
              key={i}
              style={{ color }}
              className={
                value >= star
                  ? "fas fa-star"
                  : value >= star - 0.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          ))}
      </span>{" "}
      <span>{reviews && `${reviews} reviews`}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
