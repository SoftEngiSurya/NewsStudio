import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from './Spinner'
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51f7f7893f244f8e9d4e7471212e01ab&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });

    }


  async componentDidMount() {
     this.updateNews()
  }

  handlePre = async () => {
    
      this.setState ({page: this.state.page - 1});
      this.updateNews()
      
    };
    handleNext = async () => {
      this.setState ({page: this.state.page + 1});
    this.updateNews()
    
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News By Suryawanshi Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
        <div className="container d-flex justify-content-between">
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
        </div>
      </div>
    );
  }
}

export default News;
