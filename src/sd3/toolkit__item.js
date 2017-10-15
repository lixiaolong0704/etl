import * as d3 from "d3";
const uuidv1 = require('uuid/v1');
var dragNode = null;
var startPos = {
    left: null,
    top: null
}
var mx = 0,
    my = 0;


export default function(etl) {
    return {
        start() {
            dragNode = this.cloneNode(true);
            document.querySelector('body').appendChild(dragNode);
            dragNode.style.position = "absolute";
            mx = 0, my = 0;
            var bounding = this.getBoundingClientRect();
            startPos.left = (window.scrollX + bounding.left);
            startPos.top = (window.scrollY + bounding.top);

            dragNode.style.left = startPos.left + "px";
            dragNode.style.top = startPos.top + "px";


            dragNode.style.width = bounding.width;
            dragNode.style.height = bounding.height;
            dragNode.style.margin = "0px";

            dragNode.style.backgroundColor = "green";
            //            dispatch.call("start");
            //            if(this.nodeName==="toolkit__item"){
            //              dispatch.apply("start", this, arguments);
            //            }

        },
        drag() {
            //          console.log(this);
            console.log("....");
            //          dispatch.apply("drag", this, arguments);
            var x = d3.event.x;
            var y = d3.event.y;
            //          console.log(this);
            var node = this["dragNode"];


            mx = mx + d3.event.dx;

            my = my + d3.event.dy;
            console.log(mx);
            //
            dragNode.style.left = (startPos.left + mx) + "px";
            dragNode.style.top = (startPos.top + my) + "px";
            //          d3.select(this).attr("transform", "translate(" +100+ "," + 100+ ")");
            //          d3.select(dragNode).style("transform", "translate(" + mx + "px," + my + "px)");
            //          if (d3.select(this).attr("class") == "first") {
            //            line.attr("x1", x);
            //            line.attr("y1", y);
            //          } else {
            //            line.attr("x2", x);
            //            line.attr("y2", y);
            //          }
        },
        end() {
            mx = 0;
            my = 0;

            var _canvas = etl.svg["_groups"][0][0].getBoundingClientRect()
            var _node = dragNode.getBoundingClientRect();

            var nodes = etl.data;
            nodes.push({
                uuid: uuidv1(),
                x: _node.left - _canvas.left,
                y: _node.top - _canvas.top,
                type: dragNode.getAttribute("type")
            });
            etl.update();
            dragNode.remove();
        }
    }
}