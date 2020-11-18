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

        let isDown = false;
        let oldMouseX = 0;
        let oldMouseY = 0;
        let oldThisX = 0;
        let oldThisY = 0;

        document.addEventListener('mousedown', (event) => {

            if (
                (event.x >= this.x && event.x <= this.x + this.width) &&
                (event.y >= this.y && event.y <= this.y + this.height)
            ) {
                isDown = true;
                oldMouseX = event.x;
                oldMouseY = event.y;

                oldThisX = this.x;
                oldThisY = this.y;
            }
        });

        document.addEventListener('mouseup', () => {
            isDown = false;
        });

        document.addEventListener('mousemove', (event) => {
            if (isDown) {
                const mouseXOffset = oldMouseX - event.x;
                const mouseYOffset= oldMouseY - event.y;

                this.x = oldThisX - mouseXOffset;
                this.y = oldThisY - mouseYOffset;
            }
        })
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
