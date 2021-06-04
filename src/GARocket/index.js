import RSGameEngine from '../RSGameEngine';
import Population from './Population';
import Target from './Target';
import TextDisplayEl from './TextDisplayEl';

export default class GA_Rocket extends RSGameEngine {
    constructor() {
        super();
        this.m_pop;
        this.target;
        this.m_gameObject = [];

        // text display: not a gameObject, prepend to html when created
        this.maxFitnessDisplay = new TextDisplayEl("max fitness: ");
    }

    OnCreate() {
        this.m_pop = new Population(this);
        this.target = new Target(this);
        this.gameObjects = [...this.m_pop.getRockets(), this.target];
    }

    // place this function inside a loop to create generations (put in the Update() function)
    StartGeneticAlgorithm() {
        Population.updateGenesIndexCount(); // update new force in each rocket for current frame

        if (Population.isReachGenesLength()) {
            // genetic algorithm process 
            // only do the process when the rocket goes through all the genes
            // and evaluate rockets' final positions to the target 
            this.m_pop.evaluate();
            this.m_pop.naturalSelection();

            Population.genes_index_count = 0;

            // import into gameObjects to update and render
            this.gameObjects = [...this.m_pop.getRockets(), this.target];
        }
    }

    Update(deltaTime) {
        this.gameObjects.forEach(ob => ob.update(deltaTime));
        this.StartGeneticAlgorithm();
    }

    Render() {
        this.gameObjects.forEach(ob => ob.render());
    }
}