import RSGameEngine from '../RSGameEngine';
import Population from './Population';

export default class GA_Rocket extends RSGameEngine {
    constructor() {
        super();
        this.m_pop;
        this.m_gameObject = [];
    }

    OnCreate() {
        this.m_pop = new Population(this); 
        this.gameObjects = [...this.m_pop.getRockets()];
        
    }

    Update(deltaTime) {
        this.gameObjects.forEach(ob => ob.update(deltaTime));
    }

    Render() {
        this.gameObjects.forEach(ob => ob.render());
    }
}