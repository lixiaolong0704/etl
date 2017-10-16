import * as d3 from "d3";
import _ from 'lodash';

const uuidv1 = require('uuid/v1');

import initDrag from './drag';

import t1 from "./toolkit__item";
import t2 from "./element";
import connector from "./start";
import close from './close';

import square from './elements/square'

import helper from './helper';

const w=50;

class etl {
  constructor() {


    var _t = this;
    this._model_close = new close(this);

    this.svg = d3.select(".canvas")
      .append("svg")
      .attr("width", 600)
      .attr("height", 500);

    // var c1 = { uuid: uuidv1(), x: 30, y: 50, type: "circle" };
    // var c1 = new square(30, 50);
    // var s1 = new square(130, 250);
    // var con1 = { uuid: uuidv1(), start: s1, end: c1, type: "connect" };
    // this.data = [
    //   c1,
    //   s1,
    //   con1
    //   //          {x: 90, y: 120}
    // ];


    this.data=[];
    // for(var i=0;i<10;i++){
    //   this.data.push(new square(230, Math.random()*30));
    // }


    this.registerDrag = {
      "toolkit__item": new t1(_t),
      "el": new t2(_t),
      "start": new connector(_t)
    }
    this.drag = initDrag(this.registerDrag);
    d3.selectAll(".toolkit__item").call(this.drag);

    this.update();
  }


  getBindingDataByUUID(uuid) {
    return _.find(this.data, node => node.uuid === uuid);

    //remove
  }

  removeByUUID(uuid) {
    console.log("...." + uuid);
    console.log(this.data);
    _.remove(this.data, function (n) {
      console.log(n.uuid);
      return n.uuid === uuid;
    });
    console.log(this.data);
  }

  bindClose(el) {
    //g.append("svg:circle")
    var close = el
      .attr("transform", function (d) {
        return "translate(" + w + "," + 0 + ")";
      })
      .attr("class", "close")
      .attr("r", "5px")
      .attr("fill", "black")
      .on("click", (d) => {
        // alert(d3.select(this).attr("uuid"));
        // alert(d.uuid);
        this.removeByUUID(d.uuid);

        this.update();
      });

  }

  bindItem(el) {
    el.attr("width", "120px")
      .attr("height", "120px")
      .attr("fill", "red");

    g.append("text").text((d) => d.uuid);
    g.append("svg:circle")
      .attr("r", "5px")
      .attr("fill", "yellow");
  }


  update() {
    var _t = this;
    // console.log(nodes);
    var nodes = this.data;
    var element = this.svg.selectAll(".el")
      .data(nodes);
    // circles.on("mouseup", () => {
    //     console.log("mouse up....");

    // })
    element.attr("uuid", function (d) {
      return d.uuid;
      // return "xxx";
    })

      .attr("transform", function (d) {
        if (d.x) {
          return "translate(" + d.x + "," + d.y + ")";
        } else {
          return null;
        }
      })
    // .select("text").text((d) => d.uuid);

    this.bindClose(element.select(".close"));

    element.select("path")     
     .attr("d", function (d) {

      return helper.drawConnector(d.start.rc(), d.end.lc());
    })

    var g = element.enter()
      .append("g")
      .attr("class", 'el')
      .attr("uuid", function (d) {
        return d.uuid;
        // return "xxx";
      })
      .attr("transform", function (d) {
        if (d.x)
          return "translate(" + d.x + "," + d.y + ")";
      })



    g.filter(d => d.type === 'circle').append("svg:circle")
      .attr("r", "20px")
      .attr("fill", "green");

    g.filter(d => d.type === 'connect').append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "5")
      .attr("d", function (d) {
        return helper.drawConnector(d.start.rc(), d.end.lc());
      })






    const squareSideLength = w;
    var rect = g.filter(d => d.type === 'square')
      .append("svg:rect");
      square.style(rect);

    
    g.append("text").text((d) => d.uuid);
    g.append("svg:circle")
      .attr("r", "5px")
      .attr("fill", "yellow");
    this.bindClose(g.append("svg:circle"));




    //连接线开始-锚点
    var wStart = g.append("svg:circle")
      .attr("class", "start")
      .attr("r", "10px")
      // .attr("transform", function (d) {
      //   return "translate(" + squareSideLength + "," + squareSideLength / 2 + ")";
      // })
      .attr("fill", "purple");



    //连接线结束-锚点
    var end = g.append("svg:circle")
      .attr("r", "10px")
      .attr("transform", function (d) {
        return "translate(" + 0 + "," + squareSideLength / 2 + ")";
      })
      .attr("fill", "purple")

      .on("mouseup", function () {
        console.log("mouse up....");
        _t.registerDrag.start.cancelRemove();

      });



    // _t.svg.on("mousemove.drag", () => {
    //     if (d3.event.which === 1) {
    //         console.log("move...." + d3.event.which);
    //     }
    // }, true);


    // _t.svg.on("mousemove.drag", () => {
    //     d3.event.preventDefault();
    //     d3.event.stopImmediatePropagation();
    //     console.log("drag....");
    // }, true);


    g.call(this.drag);
    wStart.call(this.drag);


    element.exit().remove();


  }

}


export default etl;
