import config from '@src/config';

export default class Camera {

    private static instance: Camera;

    public workspaceWidth: number;
    public workspaceHeight: number;
    public positionX: number;
    public positionY: number;
    public viewportWidth: number;
    public viewportHeight: number;
    public scale: number;

    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.scale = 1;

        this.workspaceWidth = config.workspaceWidth;
        this.workspaceHeight = config.workspaceHeight;

        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
    }

    public static getInstance(): Camera {
        if (!Camera.instance) {
            Camera.instance = new Camera();
        }

        return Camera.instance;
    }

    public getFactorX(x: number): number {
        return (x + this.positionX) * this.scale;
    }

    public getFactorY(y: number) {
        return (y + this.positionY) * this.scale;
    }
}
