import config from '@src/config';

export default class Canvas {

    private static instance: Canvas;

    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        this.element = (document.getElementById(config.appContainerId) as HTMLCanvasElement);
        this.ctx = (this.element.getContext('2d') as CanvasRenderingContext2D);
    }

    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }

        return Canvas.instance;
    }
}
