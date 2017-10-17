import * as d3 from "d3";
import roundPathCorners from './rounding';
import connect from './elements/connect';
import helper from './helper';
const uuidv1 = require('uuid/v1');
export default function (etl) {

  var path = null;

  var startPos = {
    x: 0,
    y: 0
  }
  var d3el = null;

  var currentDataModel=null;




  return {
 
    start() {
      this.tm = 0;
      var x = d3.event.x;
      var y = d3.event.y;
   
      path = d3.path();

      var uuid= d3.select(this.parentNode).attr("uuid");
      currentDataModel= etl.getBindingDataByUUID(uuid);
      startPos = currentDataModel.rc();
   
      path.moveTo(startPos.x, startPos.y);
      d3el = etl.svg.append("path")
      // .datum([pointerPos])
      // .enter
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("stroke-dasharray", "2")
        //   stroke-miterlimit="6"
        // stroke-width="0"
        // stroke-dasharray: 720;
        // stroke-dashoffset: -720;
        // .attr("stroke-linejoin", "round")
        //stroke-linejoin="round"
        // stroke="#000000"
        .attr("d", path.toString());

      // var path = d3.path();
      // path.moveTo(1, 2);
      // path.lineTo(3, 4);
      // path.closePath();
      // console.log( d3.select(this).attr("data"));
      //              d3.select(this).classed("dragging", true)
      // d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
    },
    drag() {

      // debugger
      path = d3.path();

    
      var coordinates = [0, 0];
      coordinates = d3.mouse(etl.svg._groups[0][0]);
      var x = coordinates[0];
      var y = coordinates[1];
      var endPos = {
        x: x ,
        y: y
      }
     var d= helper.drawConnector(startPos,endPos);
      d3el.attr("d", d);
 

    },
    end() {

      console.log("end  ....");
      setTimeout(() => {
        // console.log("remvoe"+ tm);
        d3el.remove();
      },1);

      // var x = d3.event.x;
      // var y = d3.event.y;
      // var uuid = d3.select(this).attr("uuid");
      // var obj = etl.getBindingDataByUUID(uuid);
      // obj.x = x;
      // obj.y = y;
      // etl.update();
      //              d3.select(this).classed("dragging", false)
    },
    cancelRemove(endd){

      
      if(endd.uuid !== currentDataModel.uuid){ //结束点不能和起始点相同
        etl.data.push(new connect(currentDataModel, endd));
        etl.update();
      }
      // currentDataModel.start =
      // currentDataModel.end =
      // console.log("cancel"+this.tm);
      // clearTimeout(tm);
    }
  }
}
