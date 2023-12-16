import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
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
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults,loading:false })
  }

  handlePre = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
      
      
    }
    handleNext = async () => {
      if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
             
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        })
      }
  }

  
  
  render() {
    return (
      <div className="container my-3">
      <h1 className='text-center'>News By Suryawanshi Top Headlines</h1>
      {this.state.loading&&<Spinner/>}
      <div className="row">
        {!this.state.loading&&this.state.articles.map((element) => {

          return <div className="col-md-3" key={element.url}>
            <NewsItems title={element.title} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} />
          </div>


        })}

      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type='button' className='btn btn-dark ' onClick={this.handlePre}>&larr;</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark ' onClick={this.handleNext} > &rarr;</button>
      </div>
    </div>
  )
}
}


export default News
