export class Camera {

    private static instance: Camera;

    public workspaceWidth: number;
    public workspaceHeight: number;
    public positionXf = 0;
    public positionYf = 0;
    public viewportWidth: number;
    public viewportHeight: number;

    constructor() {
        this.positionX = 0;
        this.positionY = 0;

        this.workspaceWidth = 2000;
        this.workspaceHeight = 2000;

        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
    }

    public static getInstance(): Camera {
        if (!Camera.instance) {
            Camera.instance = new Camera();
        }

        return Camera.instance;
    }

    set positionX(value: number) {
        this.positionXf = value;
    }

    get positionX(): number {
        return this.positionXf;
    }

    set positionY(value: number) {
        this.positionYf = value;
    }

    get positionY(): number {
        return this.positionYf;
    }
}
