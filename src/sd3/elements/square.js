
const uuidv1 = require('uuid/v1');

class square{

    constructor(x,y){
        this.uuid =uuidv1();
        this.x =x;
        this.y =y;

        this.w = 50;
        this.type="square";
        this.connect = null;
        // this.rc =this.getRightCenter();
    }

 

    rc(){

        var _t=this;
        return {
            x:_t.x +_t.w,
            y:_t.y+_t.w/2
        }

    }
    lc(){
        var _t=this;
        return {
            x:_t.x,
            y:_t.y+_t.w/2
        }
    }

}
square.style=function(rect){

    var squareSideLength=50;
    rect.attr("class", "rect")
    .attr("width", `${squareSideLength}px`)
    .attr("height", `${squareSideLength}px`)
    .attr("fill", "red");


}

export default square;