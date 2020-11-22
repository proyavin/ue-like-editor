import Camera from '@core/Camera';
import Canvas from '@core/Canvas';
import ContainerProperty from '@core/ContainerProperty';

export default class Container {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public active: boolean;
    public color: string;

    public properties: ContainerProperty[];

    private camera: Camera;
    private canvas: Canvas;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = false;
        this.color = color;

        this.properties = [];
        this.properties.push(new ContainerProperty('Test property 1'));
        this.properties.push(new ContainerProperty('Test property 2'));

        this.camera = Camera.getInstance();
        this.canvas = Canvas.getInstance();
    }

    public update(): void {
        this.draw();
    }

    private draw(): void {
        this.canvas.ctx.beginPath();
        this.canvas.ctx.fillStyle = this.active ? '#30D094' : this.color;
        this.canvas.ctx.fillRect(this.camera.getFactorX(this.x), this.camera.getFactorY(this.y), this.width, this.height);
        this.canvas.ctx.closePath();

        this.canvas.ctx.beginPath();
        this.canvas.ctx.fillStyle = 'black';
        this.canvas.ctx.font = '12px Arial';
        this.canvas.ctx.fillText(`X: ${this.x.toString()} | Y: ${this.y.toString()}`, this.x + this.camera.positionX + 10, this.y + this.camera.positionY + 20);
        this.canvas.ctx.closePath();

        if (this.properties && this.properties.length) {
            this.properties.forEach((property) => {
                property.draw();
            });
        }
    }

    public translate(x: number, y: number): void {
        if (x + this.camera.positionX < 0) { x = -this.camera.positionX; }
        if (y + this.camera.positionY < 0) { y = -this.camera.positionY; }

        if (x + this.width > this.camera.workspaceWidth) { x = this.camera.workspaceWidth - this.width; }
        if (y + this.height > this.camera.workspaceHeight) { y = this.camera.workspaceHeight - this.height; }

        this.x = x;
        this.y = y;
    }

}
