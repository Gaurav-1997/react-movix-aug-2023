import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { assetUrl } = useSelector((state) => state.home);

  // console.log("data: "+data?.[0].character);
 
  // data?.map(element => {
  //   console.log(element)
  // });


  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item)=>{
              // console.log("item: ", item.profile_path, assetUrl.profile);
              // console.log("loading:", loading);
              let imgUrl = item.profile_path
                ? assetUrl.profile + item.profile_path
                : avatar;
              // console.log(imgUrl);  
              return(<div key={item.id} className="listItem">
                <div className="profileImg">
                  <Img src={imgUrl} />
                </div>
                <div className="name">{item.name}</div>
                <div className="character">{item.character}</div>
              </div>);
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
