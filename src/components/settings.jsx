import React, { Component } from "react";
import { Link } from "react-router-dom";

/*function changeInSettings(print) {
    let s1 = {...this.state};
    let print = s1.printType;
    let lang = s1.langRestrict;
    let order = s1.orderBy;
    let entry = s1.entries;
    return (print);
}*/

class Settings extends Component {

    state = {
           printType:"",
           langRestrict:"",
           filter:"",
           orderBy:"",  
           entries:"", 
};  


handleChange = (e) => {
    const { currentTarget: input  }=  e;
    console.log(input.value);
    let s1 = {...this.state};
    if (input.name === "printType"){
      if(input.checked) s1.printType = input.checked;
      else s1.printType = "";
    }
    if (input.name === "langRestrict"){
    if(input.checked) s1.langRestrict = input.checked;
    else s1.langRestrict="";
    }
    if (input.name === "filter"){
    if(input.checked) s1.filter = input.checked;
    else s1.filter = "";
    }
    if (input.name === "orderBy"){
    if(input.checked) s1.orderBy = input.checked;
    else s1.orderBy = "";
    }
    if (input.name === "entries") s1.entries = input.value;
    this.setState(s1);
};


    render() {
        let {printType, langRestrict, filter, orderBy, entries } = this.state;
    console.log(printType, langRestrict, filter, orderBy);
        return (
        <div className="container">
        <span className="text-danger">Select Option for Filtering on Left Panel</span>
        <br />
    <div className="form-check">
         <input className="form-check-input" type="checkbox" name="printType" value={printType} checked={printType} onChange={this.handleChange} />
         <label className="form-check-label">printType--(Restrict to books or magazines)</label>
    </div>
    <div className="form-check">
         <input className="form-check-input" type="checkbox" name="langRestrict" value={langRestrict} checked={langRestrict} onChange={this.handleChange} />
         <label className="form-check-label">languages--(Restrict the volumes returned to those that are tagged with the specified language)</label>
    </div>
    <div className="form-check">
         <input className="form-check-input" type="checkbox" name="filter" value={filter} checked={filter} onChange={this.handleChange} />
         <label className="form-check-label">filter--(Filter search results by volume type and availability.)</label>
    </div>
    <div className="form-check">
         <input className="form-check-input" type="checkbox" name="orderBy" value={orderBy} checked={orderBy} onChange={this.handleChange} />
         <label className="form-check-label">orderBy--(Order of the volume search results.)</label>
    </div>
    <span className="text-success" style={{fontSize:"20px"}}>No. of entries on a page</span>
    <br/>
    <input type="text" name="entries" value={entries} onChange={this.handleChange} />
        </div>
            );
    }
}

export default  Settings;

