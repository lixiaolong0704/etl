import * as d3 from "d3";
import roundPathCorners from './rounding';
export default function(etl) {

    var path = null;
    var startPos = {
        x: 0,
        y: 0
    }
    var d3el = null;
    return {
        start() {
            var x = d3.event.x;
            var y = d3.event.y;
            console.log("x:" + x + "   y:" + y);
            path = d3.path();

            startPos = {
                x: x + 120,
                y: y + 120 / 2
            }
            path.moveTo(startPos.x, startPos.y);


            d3el = etl.svg.append("path")
                // .datum([pointerPos])
                // .enter
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", "5")
                // .attr("stroke-dasharray", "90")
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
            path = d3.path();

            var x = d3.event.x;
            var y = d3.event.y;


            var endPos = {
                x: x + 120,
                y: y + 120 / 2
            }

            path.moveTo(startPos.x, startPos.y);
            path.lineTo(endPos.x - 5, startPos.y);
            path.lineTo(endPos.x - 5, endPos.y - 5)
                // path.closePath();
            console.log(path.toString())
            var str = path.toString().replace(/,/g, ' ').replace(/([A-Z])/g, ' $1');
            // console.log("..........");
            // console.log(str)
            var aa = roundPathCorners(str, 10, false);
            // console.log(aa)

            // "M176,177L220,177L220,204"
            // console.log(roundPathCorners("M225 150 L250 150 L250 181", 10, false));
            etl.svg.select("path")
                .attr("d", aa);

            // d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
            //              if(d3.select(this).attr("class") == "first") {
            //                line.attr("x1", x);
            //                line.attr("y1", y);
            //              } else {
            //                line.attr("x2", x);
            //                line.attr("y2", y);
            //              }


        },
        end() {
            // var x = d3.event.x;
            // var y = d3.event.y;
            // var uuid = d3.select(this).attr("uuid");
            // var obj = etl.getBindingDataByUUID(uuid);
            // obj.x = x;
            // obj.y = y;
            // etl.update();
            //              d3.select(this).classed("dragging", false)
        }
    }
}