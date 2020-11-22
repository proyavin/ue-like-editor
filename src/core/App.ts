import Container from '@core/Container';
import Camera from '@core/Camera';
import Canvas from '@core/Canvas';
import Helpers from '@utils/Helpers';
import Arrow from '@core/Arrow';

// scale number * param

export class App {

    public camera: Camera;
    public canvas: Canvas;

    public containers: Container[] = [];
    public arrows: Arrow[] = [];

    constructor() {
        this.canvas = Canvas.getInstance();
        this.camera = Camera.getInstance();
    }

    public run() {
        this.setCanvas();

        this.containers.push(new Container(50, 50, 100, 200, 'aqua'));
        this.containers.push(new Container(350, 250, 100, 200, 'pink'));
        this.containers.push(new Container(550, 150, 100, 200, 'mediumslateblue'));
        this.containers.push(new Container(750, 180, 100, 200, 'palegreen'));

        this.arrows.push(new Arrow(this.containers[0], this.containers[1]));
        this.arrows.push(new Arrow(this.containers[1], this.containers[2]));
        this.arrows.push(new Arrow(this.containers[2], this.containers[0]));
        this.arrows.push(new Arrow(this.containers[0], this.containers[3]));
        this.arrows.push(new Arrow(this.containers[3], this.containers[2]));

        window.requestAnimationFrame(() => {
            this.draw();
        });

        let currentContainerIdx = 0;
        let isDown = false;
        let oldMouseX = 0;
        let oldMouseY = 0;
        let oldThisX = 0;
        let oldThisY = 0;

        let isCameraDown = false;
        let oldCameraX = 0;
        let oldCameraY = 0;

        this.canvas.element.addEventListener('mousedown', (event) => {
            currentContainerIdx = this.containers.findIndex((container) => {
                return (event.x >= container.x + this.camera.positionX &&
                    event.x <= container.x + container.width + this.camera.positionX) &&
                    (event.y >= container.y + this.camera.positionY &&
                        event.y <= container.y + container.height + this.camera.positionY);
            });

            oldMouseX = event.x;
            oldMouseY = event.y;

            if (currentContainerIdx !== -1) {
                isDown = true;

                oldThisX = this.containers[currentContainerIdx].x;
                oldThisY = this.containers[currentContainerIdx].y;
            } else {
                isCameraDown = true;

                oldCameraX = this.camera.positionX;
                oldCameraY = this.camera.positionY;
            }
        });

        this.canvas.element.addEventListener('mouseleave', () => {
            isDown = false;
            isCameraDown = false;
        })

        this.canvas.element.addEventListener('mouseup', () => {
            isDown = false;
            isCameraDown = false;
        });

        this.canvas.element.addEventListener('mousemove', (event) => {
            if (isDown && currentContainerIdx !== -1) {
                const mouseXOffset = (oldMouseX - event.x);
                const mouseYOffset = (oldMouseY - event.y);

                this.containers[currentContainerIdx].translate(oldThisX - mouseXOffset, oldThisY - mouseYOffset);
            } else if (isCameraDown) {
                const mouseXOffset = oldMouseX - event.x;
                const mouseYOffset = oldMouseY - event.y;

                let newCameraPositionX = -(mouseXOffset - oldCameraX);
                let newCameraPositionY = -(mouseYOffset - oldCameraY);

                if (newCameraPositionX > 0) { newCameraPositionX = 0; }
                if (newCameraPositionY > 0) { newCameraPositionY = 0; }

                if (-(newCameraPositionX - window.innerWidth) >= this.camera.workspaceWidth) {
                    newCameraPositionX = -(this.camera.workspaceWidth - window.innerWidth);
                }

                if (-(newCameraPositionY - window.innerHeight) >= this.camera.workspaceHeight) {
                    newCameraPositionY = -(this.camera.workspaceHeight - window.innerHeight);
                }


                this.camera.positionX = newCameraPositionX;
                this.camera.positionY = newCameraPositionY;
            }

        });
    }

    private setCanvas() {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;

        this.canvas.element.width = width;
        this.canvas.element.height = height;
        this.canvas.element.style.width = width + 'px';
        this.canvas.element.style.height = height + 'px';
    }

    private draw() {
        this.canvas.ctx.beginPath();
        this.canvas.ctx.fillStyle = '#1E1F23';
        this.canvas.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.canvas.ctx.closePath();

        this.containers.forEach((container) => {
            container.update();
        });

        this.arrows.forEach((arrow) => {
            arrow.update();
        });

        Helpers.showCameraProperties(10, 20);

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}
