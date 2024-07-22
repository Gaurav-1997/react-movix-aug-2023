import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import { getDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MoveCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    getDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPagedata = () => {
    getDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.rersults, ...res.results] });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResult">
      {loading ? (<>
        <Spinner initial={true} />
      </>
      ) : (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              {/* <MovieCard/> */}
              <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPagedata}
              hasMore ={pageNum <= data?.total_pages}
              loader={<Spinner/>}
              >
                {data.results.map((movie, index) => {
                  if (movie.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={movie} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span classname="resultNotFound"></span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
