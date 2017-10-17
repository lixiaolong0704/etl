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

const w = 50;

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


    this.data = [];
    // for(var i=0;i<102;i++){
    //   this.data.push(new square(230, Math.random()*300));
    // }


    this.registerDrag = {
      "toolkit__item": new t1(_t),
      "el": new t2(_t),
      "start": new connector(_t)
    }
    this.drag = initDrag(this.registerDrag);
    d3.selectAll(".toolkit__item").call(this.drag);

    this.update();


    var isSelecting=false;
    var rect=null;



    var getMouse=function(){
      var coordinates = [0, 0];
      coordinates = d3.mouse(_t.svg._groups[0][0]);
      var x = coordinates[0];
      var y = coordinates[1];
      return {
        x,
        y
      }
    }

    var st=null;
    this.svg.on("mousedown",()=>{
      if(d3.event.which){
        isSelecting=true;
        console.log("选取1");
        rect=this.svg.append("rect");
 
        var pos=getMouse();
        st =pos;
        // rect.attr("width", `${pos.x}px`)
        rect.attr("transform", "translate(" + pos.x + "," + pos.y+ ")")
        .attr("fill", "rgba(20,20,20,0.2)");

      }
     
    });
    this.svg.on("mouseup",()=>{
      if(d3.event.which && rect){
        isSelecting=false;
        // rect.attr("width", `${pos.x}px`)
        rect.remove();

      }
     
    });
    this.svg.on("mousemove",()=>{
      if(d3.event.which && isSelecting){
        console.log("选取");
          var n = getMouse();


          var px=n.x-st.x;
          var py =n.y - st.y;

          var x=Math.abs(px);
          var y =Math.abs(py);

          rect.attr("transform", "translate(" +(px>=0?st.x:(st.x-x)) + "," + (py>=0? st.y:(st.y-y))+ ")")

        rect.attr("width", `${x}px`)
        .attr("height", `${y}px`)
      }
     
    });

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
        var binding = this.getBindingDataByUUID(d.uuid);
        if (binding.connect) {
          this.removeByUUID(binding.connect.uuid);
          binding.connect.release();
          binding.connect = null;
         
        }
    
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
    element.attr("type", function (d) {
      return d.type;
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
      .attr("type", function (d) {
        return d.type;
        // return "xxx";
      }).each(function () {

        var $t = d3.select(this);
        var type = $t.attr("type");
        //拖拽元素正方形
        if (type === "square") {
          $t.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          })



          const squareSideLength = w;
          var $rect = $t.append("rect");
          square.style($rect);

          $t.append("text").text((d) => d.uuid);
          // $t.append("svg:circle")
          //   .attr("r", "5px")
          //   .attr("fill", "yellow");
          _t.bindClose($t.append("circle"));


          //连接线开始-锚点
          var wStart = $t.append("circle")
            .attr("class", "start")
            .attr("r", "10px")
            // .attr("transform", function (d) {
            //   return "translate(" + squareSideLength + "," + squareSideLength / 2 + ")";
            // })
            .attr("cx", () => squareSideLength)
            .attr("cy", () => squareSideLength / 2)
            .attr("fill", "orange");

          //连接线结束-锚点
          var end = $t.append("circle")
            .attr("r", "10px")
            // .attr("transform", function (d) {
            //   return "translate(" + 0 + "," + squareSideLength / 2 + ")";
            // })
            .attr("cx", () => 0)
            .attr("cy", () => squareSideLength / 2)
            .attr("fill", "purple")

            .on("mouseup", function (d) {
              console.log("mouse up....");
              _t.registerDrag.start.cancelRemove(d);

            });
          $t.call(_t.drag);
          wStart.call(_t.drag);



        } else if (type === "connect") {
          $t.append("path")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("d", function (d) {
              return helper.drawConnector(d.start.rc(), d.end.lc());
            })

        }




      });


    element.exit().remove();


  }

}


export default etl;
