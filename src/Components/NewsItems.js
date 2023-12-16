import React, { Component } from 'react'

export class NewsItems extends Component {
       
  render() {
     let  {title, description, imageUrl,newsUrl}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: '18rem'}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title"> {title}...</h5>
    <p className="card-text">{description}...</p>
    
    <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">More...</a>
    {/* <link rel='noreferrer' to={DetailNews} target="_blank" className="btn btn-sm btn-dark">More...</link> */}
  </div>
</div>
      </div>
    )
  }
}

export default NewsItems
