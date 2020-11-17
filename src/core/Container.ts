export class Container {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }

    update() {
        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }
}
