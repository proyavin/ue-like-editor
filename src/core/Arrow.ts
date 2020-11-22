import Camera from '@core/Camera';
import Container from '@core/Container';
import Canvas from '@core/Canvas';

export default class Arrow {
    public container1: Container;
    public container2: Container;
    private camera: Camera;
    private canvas: Canvas;

    constructor(container1: Container, container2: Container) {
        this.container1 = container1;
        this.container2 = container2;

        this.camera = Camera.getInstance();
        this.canvas = Canvas.getInstance();
    }

    public update(): void {
        this.draw();
    }

    private draw() {
        const fromX = this.container1.x + (this.container1.width / 2) + this.camera.positionX;
        const fromY = this.container1.y + (this.container1.height / 2) + this.camera.positionY;

        const toX = this.container2.x + (this.container2.width / 2) + this.camera.positionX;
        const toY = this.container2.y + (this.container2.height / 2) + this.camera.positionY;

        const dX = toX - fromX;
        const dY = toY - fromY;

        const headlen = 10;
        const angle = Math.atan2(dY, dX);

        this.canvas.ctx.beginPath();
        this.canvas.ctx.strokeStyle = 'purple';
        this.canvas.ctx.moveTo(fromX, fromY);
        this.canvas.ctx.lineTo(toX, toY);
        this.canvas.ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        this.canvas.ctx.moveTo(toX, toY);
        this.canvas.ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        this.canvas.ctx.stroke();
        this.canvas.ctx.closePath();
    }
}
