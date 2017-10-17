import roundPathCorners from './rounding';
import * as d3 from "d3";
export default {
    drawConnector(startPos, endPos) {

        var path = d3.path();
        path.moveTo(startPos.x, startPos.y);
        path.lineTo(startPos.x + (endPos.x-startPos.x)/2 , startPos.y);
        path.lineTo(startPos.x + (endPos.x-startPos.x)/2  , endPos.y);
        path.lineTo(endPos.x , endPos.y-3)
        // path.closePath();
        // console.log(path.toString())
        var str = path.toString().replace(/,/g, ' ').replace(/([A-Z])/g, ' $1');
        // console.log("..........");
        // console.log(str)
        var aa = roundPathCorners(str, 10, false);
        // console.log(aa)

        // "M176,177L220,177L220,204"
        // console.log(roundPathCorners("M225 150 L250 150 L250 181", 10, false));
        //   d3el = etl.svg.select("path")
        //     .attr("d", aa);

        return aa;


    }

}