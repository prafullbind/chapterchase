import React, { Component } from "react";
import { Link } from "react-router-dom";
import Library from "./library.jpg";
class Home extends Component {

    state = {
       searchs:"",       
};  

handleChange = (e) => {
let {currentTarget: input} = e;
let s1 = {...this.state};
s1.searchs = input.value;
this.setState(s1);
}

handleSubmit = (e) => {
e.preventDefault();
console.log(this.state.searchs);
this.props.history.push({
pathname: '/books',
search: `?q=${this.state.searchs}`,
      })
}

    render() {
        let { searchs} = this.state;
        return (
        <div className="container">
            <div className="text-center mt-4">
            <img src={Library} alt="library-image" className="rounded-circle" />
            </div>
            <div className="row mt-3">
            <div className="col-9">
            <input className="form-control" type="text" name="search" value={searchs} placeholder="Search" onChange={this.handleChange} />
            </div>
            <div className="col-3">
                <button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>Submit</button>
            </div>
            </div>
        </div>
            );
    }
}

export default Home;
