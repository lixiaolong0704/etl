import * as d3 from "d3";
import _ from 'lodash';


import {drag}  from '../lib/d3-drag';

// d3.drag= d3.dragfun;

// console.log(drag);
// console.log(typeof drag);
//Drag nodes
export default function(registerDrag, etl) {

    function create(el) {
        var fun = registerDrag[el.getAttribute("class")];
        return fun(etl);
    }

    registerDrag = _.mapValues(registerDrag, (fun) => new fun(etl))

    const aa = drag()
        .on("start", function() {
            //console.log(this);
            console.log("className:" + this.getAttribute("class"));


            registerDrag[this.getAttribute("class")].start.apply(this, arguments);
            // d3.event.sourceEvent.stopPropagation();
        })
        .on("drag", function() {
            registerDrag[this.getAttribute("class")].drag.apply(this, arguments);
        })
        .on("end", function() {
            registerDrag[this.getAttribute("class")].end.apply(this, arguments);
        });

    return aa;

};
