<template>
  <div class="canvas">
    <div class="toolkit" v-if="toolkitVisible">
      <div class="hide_toolkit" @click="toolkitVisible=false">**</div>
      <div class="toolkit__item" type="circle">
        circle
      </div>
      <div class="toolkit__item" type="square">
        square
      </div>
    </div>

  </div>
</template>

<script>

  import * as d3 from "d3";

  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        toolkitVisible: true
      }
    },
    created() {
      var _t = this;


      _t.$nextTick(() => {

        var dispatch = d3.dispatch("start", "drag", "end");


        dispatch.on("start", () => {

          console.log("start...");

        });
        dispatch.on("drag", () => {
          console.log("drag...");
          var x = d3.event.x;
          var y = d3.event.y;
//          console.log(this);
//          d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
        });

        dispatch.on("end", () => {
          console.log("end...");
        });


        d3.select("body").transition()
          .style("background-color", "black");


//        return;
        // Update…
//        var p = d3.select("body")
//          .selectAll("p")
//          .data([4, 8, 15, 16, 23, 42])
//          .text(function (d) {
//            return d;
//          });
//
//// Enter…
//        p.enter().append("p")
//          .text(function (d) {
//            return d;
//          });

// Exit…
//        p.exit().remove();
//        return;

        // Create a svg canvas
        var svg = d3.select(".canvas")
          .append("svg")

          .attr("width", 600)
          .attr("height", 500);

        var nodes = [{x: 30, y: 50, type: "circle"},
          {x: 550, y: 80, type: "square"}
//          {x: 90, y: 120}
        ];

//        var nodes = [];

        var update = (nodes) => {
          console.log(nodes);
          var circles = svg.selectAll(".el")
            .data(nodes);
          circles.enter()

            .filter(d => d.type === 'circle').append("svg:circle")
            .attr("cx", function (d) {
              return d.x;
            })
            .attr("cy", function (d) {
              return d.y;
            })

            .attr("class", 'el')

            .attr("r", "20px")
            .attr("fill", "green");
          circles.enter().filter(d => d.type === 'square').append("svg:rect")
            .attr("x", function (d) {
              return d.x;
            })
            .attr("y", function (d) {
              return d.y;
            })
            .attr("width", "120px")
            .attr("height", "120px")
            .attr("fill", "red")
          circles.exit().remove();


        }
        update(nodes);

        var dragNode = null;


        var startPos = {
          left: null,
          top: null
        }
        //Drag nodes
        var drag = d3.drag()
          .on("start", function () {
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
            dispatch.call("start");
            d3.event.sourceEvent.stopPropagation();


          })
          .on("drag", dragmove)
          .on("end", (d) => {
            mx = 0;
            my = 0;

            console.log(svg);
            var _canvas = svg["_groups"][0][0].getBoundingClientRect()
            var _node = dragNode.getBoundingClientRect();


//            var nodes = [{x: 30, y: 50},
//              {x: 50, y: 80},
//              {x: 90, y: 120}];


//            console.log();
//            nodes = nodes.slice(0, 1);
            nodes.push({x: +_node.left - _canvas.left, y: _node.top - _canvas.top,type:dragNode.getAttribute("type")});
//            var nodes = [{x: 130, y: Math.random()*100}
//            ];


            update(nodes);
            dragNode.remove();


            dispatch.call("end");

          });

//        var line = svg.append("line")
//          .style("stroke", "black")
//          .attr("x1", 150)
//          .attr("y1", 100)
//          .attr("x2", 250)
//          .attr("y2", 300);
//
//
////First node
//        var g1 = svg.append("g")
//          .attr("transform", "translate(" + 150 + "," + 100 + ")")
//          .attr("class", "first")
//          .call(drag)
//          .append("circle").attr(
//            "r", 20
//          )
//          .attr("fill", "#F00")
//
////Second node
//        var g2 = svg.append("g")
//          .attr("transform", "translate(" + 250 + "," + 300 + ")")
//          .attr("class", "second")
//          .call(drag)
//          .append("circle").attr(
//            "r", 20
//          )
//          .attr("fill", "#00F")

//Drag handler

        let mx = 0, my = 0;

        function dragmove(d) {
          dispatch.apply("drag", this, arguments);
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
        }

        d3.selectAll(".toolkit__item").call(drag);
      });

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .canvas {
    width: 960px;
    height: 500px;
    background-color: aquamarine;
    position: relative;
  }

  .toolkit {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: antiquewhite;
    width: 150px;
    margin: 0;
    position: absolute;
    height: 500px;

  }

  .hide_toolkit {
    display: block;
    position: absolute;
    cursor: pointer;
    left: 150px;
    top: 20px;
  }

  .toolkit__item {
    display: block;
    /*box-sizing: content-box;*/
    width: 60px;
    height: 60px;
    background-color: red;
    padding: 0px;
    margin: 10px;
  }

  circle {
    color: black;
  }
</style>
