function roundPathCorners(pathString, radius, useFractionalRadius) {
    function moveTowardsLength(movingPoint, targetPoint, amount) {
        var width = (targetPoint.x - movingPoint.x);
        var height = (targetPoint.y - movingPoint.y);

        var distance = Math.sqrt(width * width + height * height);

        return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
    }

    function moveTowardsFractional(movingPoint, targetPoint, fraction) {
        return {
            x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
            y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction
        };
    }


    function adjustCommand(cmd, newPoint) {
        if (cmd.length > 2) {
            cmd[cmd.length - 2] = newPoint.x;
            cmd[cmd.length - 1] = newPoint.y;
        }
    }

    function pointForCommand(cmd) {
        return {
            x: parseFloat(cmd[cmd.length - 2]),
            y: parseFloat(cmd[cmd.length - 1]),
        };
    }

    var pathParts = pathString
        .split(/[,\s]/)
        .reduce(function(parts, part) {
            var match = part.match("([a-zA-Z])(.+)");
            if (match) {
                parts.push(match[1]);
                parts.push(match[2]);
            } else {
                parts.push(part);
            }

            return parts;
        }, []);

    // Group the commands with their arguments for easier handling
    var commands = pathParts.reduce(function(commands, part) {
        if (parseFloat(part) == part && commands.length) {
            commands[commands.length - 1].push(part);
        } else {
            commands.push([part]);
        }

        return commands;
    }, []);


    var resultCommands = [];

    if (commands.length > 1) {
        var startPoint = pointForCommand(commands[0]);


        var virtualCloseLine = null;
        if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
            virtualCloseLine = ["L", startPoint.x, startPoint.y];
            commands[commands.length - 1] = virtualCloseLine;
        }


        resultCommands.push(commands[0]);

        for (var cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
            var prevCmd = resultCommands[resultCommands.length - 1];

            var curCmd = commands[cmdIndex];

            // Handle closing case
            var nextCmd = (curCmd == virtualCloseLine) ?
                commands[1] :
                commands[cmdIndex + 1];


            if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {

                var prevPoint = pointForCommand(prevCmd);
                var curPoint = pointForCommand(curCmd);
                var nextPoint = pointForCommand(nextCmd);

                var curveStart, curveEnd;

                if (useFractionalRadius) {
                    curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
                    curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
                } else {
                    curveStart = moveTowardsLength(curPoint, prevPoint, radius);
                    curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
                }


                adjustCommand(curCmd, curveStart);
                curCmd.origPoint = curPoint;
                resultCommands.push(curCmd);


                var startControl = moveTowardsFractional(curveStart, curPoint, .5);
                var endControl = moveTowardsFractional(curPoint, curveEnd, .5);


                var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];

                curveCmd.origPoint = curPoint;
                resultCommands.push(curveCmd);
            } else {

                resultCommands.push(curCmd);
            }
        }


        if (virtualCloseLine) {
            var newStartPoint = pointForCommand(resultCommands[resultCommands.length - 1]);
            resultCommands.push(["Z"]);
            adjustCommand(resultCommands[0], newStartPoint);
        }
    } else {
        resultCommands = commands;
    }

    return resultCommands.reduce(function(str, c) { return str + c.join(" ") + " "; }, "");
}

export default roundPathCorners;