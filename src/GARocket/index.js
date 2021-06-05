import RSGameEngine from '../RSGameEngine';
import Population from './Population';
import Target from './Target';
import TextDisplayEl from './TextDisplayEl';
import Obstacle from './Obstacle';

export default class GA_Rocket extends RSGameEngine {
    constructor() {
        super();
        this.m_pop;
        this.target;
        this.obstacle_1;
        this.m_gameObject = [];
        this.obstacleObjects = [];

        // text display: not a gameObject, prepend to html when created
        this.maxFitnessDisplay = new TextDisplayEl("max fitness: ");
    }

    importGameObjects() {
        this.gameObjects = [...this.m_pop.getRockets(), this.target, ...this.obstacleObjects];
    }

    OnCreate() {
        this.obstacleObjects.push(new Obstacle(0, 250, 350, 20, this));
        this.obstacleObjects.push(new Obstacle(300, 100, 350, 20, this));

        this.m_pop = new Population(this);
        this.target = new Target(this);

        this.importGameObjects();
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

            // reimport into gameObjects to update and render
            this.importGameObjects();

            // reset system time for new frames, since amount of calculating above process
            // is heavy, system's DELTA TIME will be very high -> leads to unprecise movement
            this.resetSystemTimer();
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