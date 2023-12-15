import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {

  articles = []

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults })
  }

  handlePre = async () => {
    console.log("Previous")

    console.log("Next")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })


  }
  handleNext = async () => {
    console.log("Next")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  }

  
  
  render() {
    return (
      <div className="container my-3">
      <h2>News By Surya Top Headlines</h2>
      <div className="row">
        {this.state.articles.map((element) => {

          return <div className="col-md-3" key={element.url}>
            <NewsItems title={element.title} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} />
          </div>


        })}

      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type='button' className='btn btn-dark ' onClick={this.handlePre}>&larr;</button>
        <button type='button' className='btn btn-dark ' onClick={this.handleNext} > &rarr;</button>
      </div>
    </div>
  )
}
}


export default News
