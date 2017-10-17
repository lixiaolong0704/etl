import roundPathCorners from './rounding';
import * as d3 from "d3";
export default {
    drawConnector(startPos, endPos) {

        var path = d3.path();
        path.moveTo(startPos.x, startPos.y);
        path.lineTo(startPos.x + (endPos.x - startPos.x) / 2, startPos.y);
        path.lineTo(startPos.x + (endPos.x - startPos.x) / 2, endPos.y);
        path.lineTo(endPos.x, endPos.y - 3)
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
    },
    intersects(circle, polygon) {
        return this.pointInPolygon(circle, polygon)
            || this.polygonEdges(polygon).some(function (line) { return this.pointLineSegmentDistance(circle, line) < circle[2]; });
    },
    pointInPolygon(point, polygon) {
        for (var n = polygon.length, i = 0, j = n - 1, x = point[0], y = point[1], inside = false; i < n; j = i++) {
            var xi = polygon[i][0], yi = polygon[i][1],
                xj = polygon[j][0], yj = polygon[j][1];
            if ((yi > y ^ yj > y) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
        }
        return inside;
    },
    pointPointSquaredDistance(v, w) {
        var dx = v[0] - w[0], dy = v[1] - w[1];
        return dx * dx + dy * dy;
    },
    polygonEdges(polygon) {
        return polygon.map(function (p, i) {
            return i ? [polygon[i - 1], p] : [polygon[polygon.length - 1], p];
        });
    }

}