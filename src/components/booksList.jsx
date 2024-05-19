import React, { Component } from "react";
import { Link } from "react-router-dom";
class BooksList extends Component {

    state = {
              
};  

handleRemove = (id) => {
    this.props.onRemoveBooks(id);
}

    render() {
        let {store} = this.props;
        return (
        <div className="container">
        <div className="bg-info text-center text-warning">
        <span style={{fontSize:"30px"}}>{store.length > 0 ? "My Books List" : "No book added to MyBooks"}</span> 
        </div>
          <div className="row mt-1">
          {store.map((opt) => (
                <div className="col-3 bg-success border">
               <div className="text-center"><img src={(opt.volumeInfo.imageLinks.smallThumbnail)} alt="image" style={{width:"50%", height:"50%"}} /></div> 
                  <br />
                  <span className="font-weight-bold">
                  Title :  {opt.volumeInfo.title}
                  <br />
                  Author : {opt.volumeInfo.authors}
                  </span>
                  <br />
                  <a  href={opt.volumeInfo.previewLink} className="text-warning" target="_blank">Preview</a>
                  <br/>
                  <div className="text-center">
                  <button className="btn btn-secondary btn-sm" onClick={() => this.handleRemove(opt.id)}>Remove from MyBooks</button>
                  </div>
                </div>
            ))}
            </div>
        </div>
            );
    }
}

export default BooksList;