import React, { Component } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import _ from 'lodash';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0
    };
    document.title = `${_.capitalize(this.props.category)} - NewsHusky`
  }
  async newsUpdate(){
    this.props.setProgress(10);
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(URL);
    this.props.setProgress(40);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
        articles: parseData.articles,
        page: this.state.page,
        totalResults: parseData.totalResults,
        loading: false
    },this.props.setProgress(100));
  }
  async componentDidMount(){
      this.newsUpdate();
  }
  handleNext = async ()=>{
      this.setState({page: this.state.page + 1}, this.newsUpdate);
  }
  handlePrev = async ()=>{
    this.setState({page: this.state.page - 1}, this.newsUpdate);
  }
  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({page: this.state.page + 1},async()=>{
        const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(URL);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            page: this.state.page,
            totalResults: parseData.totalResults,
            loading: false
        });
      });
    }, 500);
  };
  render() {
    return (
      <>
        <h1 className="text-center my-3">NewsHusky - Top Picks</h1>
        <h5 className="text-center text-muted mb-3">Category: <span className="text-info">{_.capitalize(this.props.category)}</span></h5>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >

          <div className="container">
            <div className="row">
              {this.state.articles.map((article) => (
                <div className="col-lg-3 col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title?article.title:""}
                    description={article.description?article.description:""}
                    imgUrl={article.urlToImage?article.urlToImage:"https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg"}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              ))};
            </div>
          </div>

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page===1?true:false} type="button" className="btn btn-info" onClick={this.handlePrev}>← Preveous</button>
          <button disabled={this.state.page < Math.ceil(this.state.totalResults/this.props.pageSize)?false:true} type="button" className="btn btn-info" onClick={this.handleNext}>Next →</button>
        </div> */}
      </>
    );
  }
}

export default News;
