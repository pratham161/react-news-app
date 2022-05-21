import React, { Component } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"; 


export class News extends Component {
  apikey = "c4c5e6f7eec04cc7919c0d4b76616ade";
  static defaultProps = {
    country:"in",
    pageSize: 6,
  }

   static propTypes  = {
      country:PropTypes.string,
      category:PropTypes.string,
      pageSize:PropTypes.number
   }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  updateNews = async()=>{
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4c5e6f7eec04cc7919c0d4b76616ade&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
   this.setState({page: this.state.page + 1});
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4c5e6f7eec04cc7919c0d4b76616ade&page=${this.state.page}&pagesize=${this.props.pageSize}`;
   this.setState({loading:true});
   let data = await fetch(url);
   let parsedData = await data.json();
   this.setState({
     articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
   });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:"35px 0px"}}>NewsMonkey - Top {this.props.category} Headlines </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
               <div className="col-md-4" key={element.url}>
                <Card
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://img.bfmtv.com/c/630/420/871/7b9f41477da5f240b24bd67216dd7.jpg"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
