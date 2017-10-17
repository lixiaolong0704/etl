import * as d3 from "d3";
export default function(etl) {

    return {
        start() {
            var x = d3.event.x;
            var y = d3.event.y;

            // console.log(this.d);
            // console.log("x:" + x + "   y:" + y);
            // console.log( d3.select(this).attr("data"));
            //              d3.select(this).classed("dragging", true)
            d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
        },
        drag() {
            console.log("element drag");
            // var x = d3.event.x;
            // var y = d3.event.y;
            // d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
            var x = d3.event.x;
            var y = d3.event.y;
            var uuid = d3.select(this).attr("uuid");
            var obj = etl.getBindingDataByUUID(uuid);
            obj.x = x;
            obj.y = y;
            etl.update();

            // d3.select(this).datum(obj);
      
      
            //              if(d3.select(this).attr("class") == "first") {
            //                line.attr("x1", x);
            //                line.attr("y1", y);
            //              } else {
            //                line.attr("x2", x);
            //                line.attr("y2", y);
            //              }


        },
        end() {
            var x = d3.event.x;
            var y = d3.event.y;
            var uuid = d3.select(this).attr("uuid");
            var obj = etl.getBindingDataByUUID(uuid);
            // obj.x = x;
            // obj.y = y;
            etl.update();
            //              d3.select(this).classed("dragging", false)
        }
    }
}