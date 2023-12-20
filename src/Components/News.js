import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from './Spinner'
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-News-Studio`;
  }
  async updateNews() {
      this.props.setProgress(10);
      
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51f7f7893f244f8e9d4e7471212e01ab&page=${this.props.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePre = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };


  fetchMoreData = async() => {
    this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51f7f7893f244f8e9d4e7471212e01ab&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          News By Suryawanshi Top{" "}
          {this.capitalizeFirstLetter(this.props.category)} Headlines{" "}
        </h1>
        {/* {this.state.loading && <Spinner/>} */}

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
                <div className="col-md-3" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                    newsUrl={element.url}
                    source={element.source.name}
                    publishedAt={element.publishedAt}
                    />
                </div>
              );
            })}
            </div>
        </div>
          </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark "
            onClick={this.handlePre}
          >
            &larr;
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark "
            onClick={this.handleNext}
          >
            {" "}
            &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
