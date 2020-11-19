import { Container } from '@core/Container';
import {Camera} from '@core/Camera';
import {Canvas} from '@core/Canvas';
import {Helpers} from "@utils/Helpers";

export class App {

    public camera: Camera;
    public canvas: Canvas;

    public element: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public containers: Container[] = [];

    constructor(id: string) {
        this.canvas = Canvas.getInstance(id);
        this.element = this.canvas.element;
        this.ctx = this.canvas.ctx;

        this.camera = Camera.getInstance();
    }

    public run() {
        this.setCanvas();

        this.containers.push(new Container(50, 50, 100, 200, this.ctx));
        this.containers.push(new Container(350, 250, 100, 200, this.ctx));

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

        this.element.addEventListener('mousedown', (event) => {
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

        this.element.addEventListener('mouseup', () => {
            isDown = false;
            isCameraDown = false;
        });

        this.element.addEventListener('mousemove', (event) => {
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

                if (-(newCameraPositionX - window.innerWidth) >= 2000) { newCameraPositionX = -(2000 - window.innerWidth); }
                if (-(newCameraPositionY - window.innerHeight) >= 2000) { newCameraPositionY = -(2000 - window.innerHeight); }

                this.camera.positionX = newCameraPositionX;
                this.camera.positionY = newCameraPositionY;
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

    private draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#1E1F23';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.closePath();

        this.containers.forEach((container) => {
            container.update();
        });

        Helpers.showCameraProperties(10, 20);

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}
