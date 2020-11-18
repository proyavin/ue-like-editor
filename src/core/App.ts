import { Container } from '@core/Container';

export class App {

    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public containers: Container[] = [];

    public FPS = 0;
    public FPSFinal = 0;

    constructor(id: string) {
        this.element = (document.getElementById(id) as HTMLCanvasElement);
        this.ctx = (this.element.getContext('2d') as CanvasRenderingContext2D);

        setInterval(() => {
            this.FPSFinal = this.FPS;
            this.FPS = 0;
        }, 1000);

    }

    public run() {
        this.setCanvas();
        this.drawBackground();

        this.containers.push(new Container(50, 50, 100, 200, this.ctx));
        this.containers.push(new Container(350, 250, 100, 200, this.ctx));

        window.requestAnimationFrame(() => {
            this.draw();
        });

        let cc = 0;
        let isDown = false;
        let oldMouseX = 0;
        let oldMouseY = 0;
        let oldThisX = 0;
        let oldThisY = 0;

        this.element.addEventListener('mousedown', (event) => {
            cc = this.containers.findIndex((container) => {
                return (event.x >= container.x && event.x <= container.x + container.width) &&
                    (event.y >= container.y && event.y <= container.y + container.height);
            });

            if (cc !== -1) {
                isDown = true;
                oldMouseX = event.x;
                oldMouseY = event.y;

                oldThisX = this.containers[cc].x;
                oldThisY = this.containers[cc].y;
            }
        });

        this.element.addEventListener('mouseup', () => {
            isDown = false;
        });

        this.element.addEventListener('mousemove', (event) => {

            const cc2 = this.containers.findIndex((container) => {
                return (event.x >= container.x && event.x <= container.x + container.width) &&
                    (event.y >= container.y && event.y <= container.y + container.height);
            });

            if (cc2 !== -1) {
                document.body.style.cursor = 'pointer';
                this.containers[cc2].active = true;
            } else {
                document.body.style.cursor = 'default';
                this.containers[cc2].active = false;
            }

            if (isDown && cc !== -1) {
                const mouseXOffset = oldMouseX - event.x;
                const mouseYOffset = oldMouseY - event.y;

                this.containers[cc].x = oldThisX - mouseXOffset;
                this.containers[cc].y = oldThisY - mouseYOffset;
            }
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
        this.ctx.fillRect(0, 0, 1920, 1080);
    }

    private draw() {
        this.ctx.fillStyle = '#1E1F23';
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);

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
        this.ctx.fillText(`FPS: ${this.FPSFinal}`, 10, this.element.height - 10);
    }
}
