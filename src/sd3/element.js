import * as d3 from "d3";
export default function(etl) {

    return {
        start() {
            var x = d3.event.x;
            var y = d3.event.y;
            d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
        },
        drag(d) {
            var x = d3.event.x;
            var y = d3.event.y;
            d.x = x;
            d.y = y;
            // d3.select(this).attr("transform", function (d) {
            //     return "translate(" + d.x + "," + d.y + ")";
            // });
            etl.update();
 

        },
        end(d) {
            var x = d3.event.x;
            var y = d3.event.y;
            d.x = x;
            d.y = y;
            d3.select(this).attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            etl.update();
            //              d3.select(this).classed("dragging", false)
        }
    }
}