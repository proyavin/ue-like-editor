export class Canvas {

    private static instance: Canvas;

    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(id: string) {
        this.element = (document.getElementById(id) as HTMLCanvasElement);
        this.ctx = (this.element.getContext('2d') as CanvasRenderingContext2D);
    }

    public static getInstance(id?: string): Canvas {
        if (!Canvas.instance && id) {
            Canvas.instance = new Canvas(id);
        }

        return Canvas.instance;
    }
}
