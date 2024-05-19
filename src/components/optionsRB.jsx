import React, { Component } from "react";
import settings from "./settings";
class OptionsRB extends Component {

    state = {
        options: this.props.options,
    };

    handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = this.props.options;
    console.log("input", input.value);
    options[input.name] = input.value;
    this.props.onOptionChange(options)
    }

    makeDropdown = (arr, values, name, label) => (
        <React.Fragment>
         <label className="form-group-label font-weight-bold">{label}</label>
        <div className="form-group">
        <select className="form-control" id={name} name={name} value={values} onChange={this.handleChange}>
         {arr.map((opt) =>(
            <option>{opt}</option>
         ))}
         </select>
        </div>
        </React.Fragment>
    );

  makeRadios = (arr, values, name, label) => (
    <React.Fragment>
     <label className="form-check-label font-weight-bold">{label}</label>
     {arr.map((opt) =>(
    <div className="form-check">
         <input className="form-check-input" type="radio" name={name} id={name} value={opt.toLowerCase()}
          checked={values ? values.substring(0,1).toUpperCase()+values.substring(1) === opt : ""} onChange={this.handleChange} />
         <label className="form-check-label">{opt}</label>
    </div>
     ))}
    </React.Fragment>
);

makeRadios1 = (arr, values, name, label) => (
    <React.Fragment>
     <label className="form-check-label font-weight-bold">{label}</label>
     {arr.map((opt) =>(
    <div className="form-check">
         <input className="form-check-input" type="radio" name={name} id={name} 
         value={opt==="Spanish" ? "es" :  opt === "Chinese" ? "zh" : opt.substring(0,2).toLowerCase()} 
         checked={opt==="Spanish" ? values === "es" : opt === "Chinese" ? values === "zh" :  values ? opt.substring(0,2).toLowerCase() === values : ""} onChange={this.handleChange} />
         <label className="form-check-label">{opt}</label>
    </div>
     ))}
    </React.Fragment>
);

render() {

    const { print } = this.props;
    //const print = settings.changeInSettings();
   // const lang = settings.changeInSettings();
   // const order = settings.changeInSettings();
    //const entry = settings.changeInSettings();
     //console.log("Apna time",print, lang, order, entry);
    let { orderBy, printType, filter, langRestrict  } = this.props.options;
    console.log("options",this.props.options);
    let { ordersBy, types, filters, languages  } = this.props;
    return(
        <div className="row border">
        <div className="col-12 border">
             {this.makeRadios1(languages, langRestrict, "langRestrict", "Language")}
         </div>
         <div className="col-12 border">
             {this.makeRadios(filters, filter, "filter", "Filter")}
         </div>
         <div className="col-12 border">
             {this.makeRadios(types, printType, "printType", "Print Type")}
         </div>
         <div className="col-12">
             {this.makeDropdown(ordersBy, orderBy, "orderBy", "Order By")}
         </div>
        </div>
    );
} 

}

export default OptionsRB;