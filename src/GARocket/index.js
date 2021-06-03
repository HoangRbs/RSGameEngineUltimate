import RSGameEngine from '../RSGameEngine';
import Population from './Population';
import Target from './Target';

export default class GA_Rocket extends RSGameEngine {
    constructor() {
        super();
        this.m_pop;
        this.target;
        this.m_gameObject = [];
    }

    OnCreate() {
        this.m_pop = new Population(this);
        this.target = new Target(this); 
        this.gameObjects = [...this.m_pop.getRockets(), this.target];
    }

    // place this function inside a loop to create generations (put in the Update() function)
    StartGeneticAlgorithm() {
        Population.updateGenesIndexCount();

        if (Population.isReachGenesLength()) {
            Population.genes_index_count = 0;

            // regerarate with a new population
            this.m_pop = new Population(this);
            this.gameObjects = [...this.m_pop.getRockets(), this.target];
        }
    }

    Update(deltaTime) {
        this.StartGeneticAlgorithm();
        this.gameObjects.forEach(ob => ob.update(deltaTime));
    }

    Render() {
        this.gameObjects.forEach(ob => ob.render());
    }
}