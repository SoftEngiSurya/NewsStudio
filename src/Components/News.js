import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {

  articles = []

  constructor(){
    super();
    this.state ={
        articles:this.articles,
        loading:false
    }
}
      async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=7cfe73c637a94127bac4a1965b716113";
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles:parsedData.articles})
      }


  render() {
    return (
      <div className="container my-3">
        <h2>News By Surya Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{

          return  <div className="col-md-3" key={element.url}>
        <NewsItems  title={element.title} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage?element.urlToImage:""} newsUrl={element.url}/>
            </div>


        })}
            
        </div>
      </div>
    )
  }
}

export default News
