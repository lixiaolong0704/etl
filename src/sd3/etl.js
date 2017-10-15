import * as d3 from "d3";
import _ from 'lodash';
const uuidv1 = require('uuid/v1');

import initDrag from './drag';


import t1 from "./toolkit__item";
import t2 from "./element";
import t3 from "./start";
import close from './close';
class etl {
    constructor() {


        this._model_close = new close(this);

        this.svg = d3.select(".canvas")
            .append("svg")
            .attr("width", 600)
            .attr("height", 500);


        this.data = [
            // { uuid: uuidv1(), x: 30, y: 50, type: "circle" },
            // { uuid: uuidv1(), x: 550, y: 80, type: "square" }
            //          {x: 90, y: 120}
        ];


        const registerDrag = {
            "toolkit__item": t1,
            "el": t2,
            "start": t3
        }
        this.drag = initDrag(registerDrag, this);
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
        _.remove(this.data, function(n) {
            console.log(n.uuid);
            return n.uuid === uuid;
        });
        console.log(this.data);
    }

    bindClose(el) {
        //g.append("svg:circle")
        var close = el
            .attr("transform", function(d) {
                return "translate(" + 120 + "," + 0 + ")";
            })
            .attr("class", "close")
            .attr("r", "15px")
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
        var circles = this.svg.selectAll(".el")
            .data(nodes);
        circles.on("mouseup", () => {
            console.log("mouse up....");

        })
        circles.attr("uuid", function(d) {
                return d.uuid;
                // return "xxx";
            })
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .select("text").text((d) => d.uuid);

        this.bindClose(circles.select(".close"));

        var g = circles.enter()
            .append("g")
            .attr("class", 'el')
            .attr("uuid", function(d) {
                return d.uuid;
                // return "xxx";
            })
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });



        g.filter(d => d.type === 'circle').append("svg:circle")
            .attr("r", "20px")
            .attr("fill", "green");



        const squareSideLength = 120;
        var rect = g.filter(d => d.type === 'square')
            .append("svg:rect")
            .attr("class", "rect")
            .attr("width", `${squareSideLength}px`)
            .attr("height", `${squareSideLength}px`)
            .attr("fill", "red");

        g.append("text").text((d) => d.uuid);
        g.append("svg:circle")
            .attr("r", "5px")
            .attr("fill", "yellow");
        this.bindClose(g.append("svg:circle"));

        rect.on("mouseup", () => {
            console.log("mouse up....");

        })


        //连接线开始
        var wStart = g.append("svg:circle")
            .attr("class", "start")
            .attr("r", "10px")
            .attr("transform", function(d) {
                return "translate(" + squareSideLength + "," + squareSideLength / 2 + ")";
            })
            .attr("fill", "purple");

        //连接线结束
        g.append("svg:circle")
            .attr("r", "10px")
            .attr("transform", function(d) {
                return "translate(" + 0 + "," + squareSideLength / 2 + ")";
            })
            .attr("fill", "purple")

        .on("mouseup", () => {
                console.log("mouse up....");

            })
            .on("mouseover", () => {
                console.log("mouse over....");

            })
            .on("mousedown", () => {

            });



        g.call(this.drag);
        wStart.call(this.drag);


        circles.exit().remove();


    }

}


export default etl;