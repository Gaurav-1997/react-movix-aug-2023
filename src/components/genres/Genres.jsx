import React from "react";
import "./style.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((gId) => {
        // if the genre data is not availble simply return avoiding
        // application from crashing
        if (!genres[gId]?.name) return;
        return (
          <div className="genre" key={gId}>
            {genres[gId]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
