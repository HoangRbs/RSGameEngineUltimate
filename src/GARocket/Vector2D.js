export default class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // add 2 vectors
    add(/** @type {Vector2D} */ vectorB, deltaTime) {
        this.x += vectorB.x * deltaTime;
        this.y += vectorB.y * deltaTime;
    }

    // multiply with a constant
    mult(constant) {
        this.x *= constant;
        this.y *= constant;
    }

    // get the angle of the current vector where it is heading to
    headingAngle(angle_type) {
        let angle = Math.atan2(this.y, this.x); // radians

        if (angle_type === "radian") {
            return angle;
        }

        if (angle_type === "degrees") {
            let degrees = 180 * angle / Math.PI;
            return (360 + Math.round(degrees)) % 360; //round number, avoid decimal fragments
        }

        throw new Error('headingAngle() requires type \" radian \" or \" degrees \"');
    }
}