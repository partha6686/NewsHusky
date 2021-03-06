import React, {useState, useEffect} from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import _ from 'lodash';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router";

const News = (props)=> {
  const useQuery = ()=> {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const [news, setNews] = useState({
    articles: [],
    page: 1,
    loading: true,
    totalResults: 0,
    q:""
  });
  
  const newsUpdate = async ()=>{
    props.setProgress(15);
    let URL;
    if(query.get("q")){
      URL = `https://newsapi.org/v2/everything?q=${query.get("q")}&apiKey=${props.apiKey}&page=${news.page}&pageSize=${props.pageSize}`;
    }else{
      URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${news.page}&pageSize=${props.pageSize}`;
    }
    let data = await fetch(URL);
    props.setProgress(40);
    let parseData = await data.json();
    props.setProgress(70);
    setNews({
      articles: parseData.articles,
      page: news.page,
      totalResults: parseData.totalResults,
      loading: false,
      q: query.get("q")
    },props.setProgress(100));
  }
  useEffect(() => {
    document.title = `${_.capitalize(props.category)} - NewsHusky`;
    newsUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const fetchMoreData = async()=>{
    let nextPage = news.page + 1;
    let URL;
    if(query.get("q")){
      URL = `https://newsapi.org/v2/everything?q=${query.get("q")}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    }else{
      URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    }
    let data = await fetch(URL);
    let parseData = await data.json();
    setNews({
      articles: news.articles.concat(parseData.articles),
      page: nextPage,
      totalResults: parseData.totalResults,
      loading: false,
      q: query.get("q")
    }) 
  }
  return (
    <>
      <h1 className="text-center" style={{margin: '80px auto 20px'}}>NewsHusky - Top Picks</h1>
      {news.loading && <Loading />}
      {!news.q && news.loading===false &&<h5 className="text-center text-muted mb-3">Category: <span className="text-info">{_.capitalize(props.category)}</span></h5>}  
      <InfiniteScroll
        dataLength={news.articles.length}
        next={fetchMoreData}
        hasMore={news.page < Math.ceil(news.totalResults/props.pageSize)}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row">
            {news.articles.map((article) => (
              <div className="col-lg-3 col-md-4" key={article.url}>
                <NewsItem
                  title={article.title?article.title:""}
                  description={article.description?article.description:""}
                  imgUrl={article.urlToImage?article.urlToImage:"https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg"}
                  newsUrl={article.url?article.url:""}
                  author={article.author?article.author:""}
                  date={article.publishedAt?article.publishedAt:""}
                  source={article.source.name?article.source.name:""}
                />
              </div>
            ))};
            {news.loading===false && news.articles.length === 0 &&<div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Opps!</strong> No results found.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            }
          </div>
        </div>
      </InfiniteScroll>
    </>
  );

}
News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;
