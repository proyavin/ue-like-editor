import {Camera} from '@core/Camera';

export class Container {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public active: boolean;
    public ctx: CanvasRenderingContext2D;

    public camera: Camera;

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.active = false;

        this.camera = Camera.getInstance();
    }

    public update(): void {
        this.draw();
    }

    private draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.active ? '#30D094' : 'white';
        this.ctx.fillRect(this.x + this.camera.positionX, this.y + this.camera.positionY, this.width, this.height);
        this.ctx.closePath();

        // this.ctx.beginPath();
        // this.ctx.moveTo(this.x + this.camera.positionX, this.y + this.camera.positionY);
        // this.ctx.lineTo(this.x + this.width + this.camera.positionX, this.y + this.height + this.camera.positionY);
        // this.ctx.strokeStyle = 'red';
        // this.ctx.stroke();
        // this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = 'blue';
        this.ctx.font = "12px Arial";
        this.ctx.fillText(`X: ${this.x.toString()} | Y: ${this.y.toString()}`, this.x + this.camera.positionX + 10, this.y + this.camera.positionY + 20);
        this.ctx.closePath();
    }

    public translate(x: number, y: number): void {

        if (x + this.camera.positionX < 0) { x = -this.camera.positionX; }
        if (y + this.camera.positionY < 0) { y = -this.camera.positionY; }

        this.x = x;
        this.y = y;
    }

}
