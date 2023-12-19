import React, { Component } from 'react'

export class NewsItems extends Component {
       
  render() {
     let  {title, description, imageUrl,newsUrl,publishedAt,source}=this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'50%'}}>
    {source}
  </span>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title"> {title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">{new Date (publishedAt).toGMTString()}</small></p>
    
    <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">More...</a>
    {/* <link rel='noreferrer' to={DetailNews} target="_blank" className="btn btn-sm btn-dark">More...</link> */}
  </div>
</div>
      </div>
    )
  }
}

export default NewsItems
