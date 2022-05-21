import React, { Component } from "react";

export class Card extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author, source} = this.props;
    return (
      <div>
        <div className="card my-2">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">published by {!author?"Unknown":author} on {date} </small></p>
            <div className="d-flex justify-content-between">
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-dark"
              rel="noreferrer"
            >
              Read More
            </a>
             <p className="badge bg-success">{source}</p>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
