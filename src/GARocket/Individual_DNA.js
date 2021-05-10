import Vector2D from './Vector2D';

// Rocket Individual - Rocket DNA

export default class Individual_DNA {
    constructor () {
        // genes contains bunch of random force vector which push the rocket
        // a rocket will go through all force, a force each frame
        this.genes = [];
        
        for (let i = 0; i < Individual_DNA.genes_len; i++) {
            this.genes[i] = Vector2D.random2D();
            this.genes[i].mult(3);
        }
    }

    static genes_len = 200;
}