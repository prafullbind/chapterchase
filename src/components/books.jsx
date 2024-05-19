import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService";
import queryString from "query-string";
import OptionsRB from "./optionsRB";
import BooksList from "./booksList";
class Books extends Component {

    state = { data: {},
              ordersBy: ["Order By", "relevance", "newest",],
              types:["All", "Books", "Magazines",],
              filters:["Partial", "Full", "Free-ebooks", "Paid e-books", "Ebooks",],
              languages: ["English", "French", "Hindi", "Spanish", "Chinese",],
              searchs:"",
              startIndex:0,
              maxResults:8,
              store:[],
};

   async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        queryParams.startIndex = this.state.startIndex;
        queryParams.maxResults = this.state.maxResults;
        let { startIndex = "1" , q} = queryParams;
        let searchStr = this.makeSearchString(queryParams);
       // console.log(page);
        console.log('orderBy', queryParams);
        console.log('searchStr', searchStr);
         let response =  await http.get(`${searchStr}&key=AIzaSyCPbrjeLkEHuvpILtsr1peLAxqr-hBmWG8`)
        console.log("response",response);
        let { data } = response;
        return this.setState({ data: data, searchs:q });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps != this.props) this.fetchData();
    }

    handleChange =(e) => {
     let { currentTarget: input} = e;
     let s1 = {...this.state};
     s1.searchs = input.value;
     this.setState(s1);
    }

    handlePage = (incr) => {
        let queryParams = queryString.parse(this.props.location.search);
        console.log(queryParams);
        let newPage = +this.state.startIndex + (incr);
        this.setState({startIndex: newPage})
        queryParams.startIndex = newPage;
        queryParams.maxResults = this.state.maxResults;
        console.log(queryParams);
        let value = this.props.match.params;
       this.callURL(`/books`, queryParams);
    }

    handleOptionChange = (options) => {
        console.log(options);
        options.startIndex = "0";
        options.maxResults=this.state.maxResults;
        let s1 = {...this.state};
        s1.startIndex=0;
        s1.maxResults=s1.maxResults;
        this.setState(s1);
        this.callURL(`/books`, options);
    }

    handleAddBook = (opt) => {
        let s1 = {...this.state};
        s1.store.push(opt);
        this.setState(s1);
    }

    handleRemoveBook = (id) => {
        let s1 = {...this.state};
        let index = s1.store.findIndex((opt) => opt.id === id);
        if(index>=0){
            s1.store.splice(index,1);
        }
        this.setState(s1);
    }

    handleCart = (id) => {
        let s1 = {...this.state};
        let index = s1.store.findIndex((opt) => opt.id === id);
        if(index>=0){
            s1.store.splice(index,1);
        }
        this.setState(s1);
    }

    handleMove = (val) => {
        let s1 = {...this.state};
        s1.move = val;
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

    callURL = (url, options) => {
        let searchString = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchString,
        });
    }

    makeSearchString = (options) => {
        let { q,startIndex,maxResults, orderBy, langRestrict, printType, filter} = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "q", q);
         searchStr = this.addToQueryString(searchStr, "startIndex", startIndex);
         searchStr = this.addToQueryString(searchStr, "maxResults", maxResults);
         searchStr = this.addToQueryString(searchStr, "langRestrict", langRestrict);
         searchStr = this.addToQueryString(searchStr, "orderBy", orderBy);
         searchStr = this.addToQueryString(searchStr, "printType", printType);
         searchStr = this.addToQueryString(searchStr, "filter", filter);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => 
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    

    render() {
       console.log(this.state);
       let queryParams = queryString.parse(this.props.location.search);
       let { ordersBy, types, languages, filters, data, searchs,startIndex, maxResults, store,} = this.state;
       let { kind, totalItems, items =[]} = data;
       let move = -1;
       let {chn} = this.props.match.params;
       //<div className="text-center"><img src={(opt.volumeInfo.imageLinks.smallThumbnail)} alt="image" style={{width:"50%", height:"50%"}} /></div> 
       //console.log("number", chn);
       if(chn) (move=chn);
        return (
        <div className="container">
           { move === -1 ?
            <div className="row">
            <div className="col-3 mt-3">
            <OptionsRB options={queryParams} ordersBy={ordersBy} types={types} languages={languages} filters={filters}   onOptionChange={this.handleOptionChange}/>
            </div>
            <div className="col-9">
            <div className="text-center text-warning" style={{fontSize:"40px"}}>
               <u>{searchs}</u> 
            </div>

            <br />
            <span className="font-weight-bold text-success">{startIndex+1+"-"+(+startIndex+maxResults)+" entries of "+ totalItems}</span>
            <div className="row mt-1">
            {items.map((opt) => (
                <div className="col-4 bg-success border">
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
                  {store.findIndex((val) => val.id === opt.id) >= 0 ? 
                   <button className="btn btn-secondary btn-sm" onClick={() => this.handleRemoveBook(opt.id)}>Remove from MyBooks</button>
                  : <button className="btn btn-secondary btn-sm" onClick={() => this.handleAddBook(opt)}>Add to MyBooks</button>
    }
                  </div>
                </div>
            ))}
            </div>
            <div className="row">
            <div className="col-1">
                {startIndex > 1 ? (<button className="btn btn-warning btn-sm" onClick={() => this.handlePage(-maxResults)}>Prev</button>) : ""}
            </div>
            <div className="col-10"></div>
            <div className="col-1">
                {startIndex < totalItems -1 ? (<button className="btn btn-warning btn-sm" onClick={() => this.handlePage(maxResults)}>Next</button>) : ""}
            </div>
            </div>
            </div>
        </div>
        :
        <BooksList store={store} onRemoveBooks={this.handleCart} /> }
        </div>
            );
    }
}

export default Books;
