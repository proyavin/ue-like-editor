export class Container {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public active: boolean;
    public ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.active = false;
    }

    update() {
        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.active ? '#30D094' : 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height);
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
