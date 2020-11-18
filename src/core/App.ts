import { Container } from '@core/Container';

export class App {

    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public containers: Container[] = [];

    public FPS = 0;
    public FPSFinal = 0;

    constructor(id: string) {
        this.element = <HTMLCanvasElement>document.getElementById(id);
        this.ctx = <CanvasRenderingContext2D>this.element.getContext('2d');

        setInterval(() => {
            this.FPSFinal = this.FPS;
            this.FPS = 0;
        }, 1000)

    }

    public run() {
        this.setCanvas();
        this.drawBackground();

        this.containers.push(new Container(50, 50, 100, 200, this.ctx));

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }

    private setCanvas() {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;

        this.element.width = width;
        this.element.height = height;
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    }

    private drawBackground() {
        this.ctx.fillRect(0, 0, 1920, 1080)
    }

    private draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.element.width, this.element.height)

        this.containers.forEach((container) => {
            container.update();
        });

        this.showFPS();

        window.requestAnimationFrame(() => {
            this.FPS += 1;
            this.draw();
        });
    }

    private showFPS() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`FPS: ${this.FPSFinal}`, 10, this.element.height - 10)
    }
}
