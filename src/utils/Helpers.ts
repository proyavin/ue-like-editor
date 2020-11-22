import Canvas from '@core/Canvas';
import Camera from '@core/Camera';

export default class Helpers {
    public static showCameraProperties(x: number, y: number) {
        const ctx = Canvas.getInstance().ctx;
        const camera = Camera.getInstance();

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillText(`[Camera] | X: ${-camera.positionX} | Y: ${-camera.positionY}`, x, y);
        ctx.fillText(`[Viewport] | Width: ${camera.viewportWidth} | Height: ${camera.viewportHeight}`, x, y + 20);
        ctx.closePath();
    }
}
