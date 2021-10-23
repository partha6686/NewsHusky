import React from 'react'

const NewsItem = (props)=> {
  const {title, description, imgUrl, newsUrl, author, date, source} = props;
  return (
      <div className="my-3">
          <div className="card">
            <div  style={{display: 'flex', justifyContent: 'end', position: 'absolute',right: '-10px'}}>
              <span className="badge rounded-pill bg-info text-dark">
                {source}
              </span>
            </div>
            <img src={imgUrl} className="card-img-top" alt="..." height="180px" />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toUTCString()}</small></p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More..</a>
            </div>
          </div>
      </div>
  );
}

export default NewsItem
