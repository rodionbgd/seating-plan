import * as PIXI from 'pixi.js';
import { SeatOptions } from './types';

export default class ScalingSeat {
  private rowScaled: PIXI.Text[][] = [];

  private currentRow: PIXI.Text[] | undefined;

  private SCALE_FRAMES = 25;

  constructor(
    readonly container: PIXI.Container,
    readonly app: PIXI.Application,
  ) {}

  createRow(seatsPerRow: number) {
    const fontSize = 20;
    for (let scale = 1; scale <= this.SCALE_FRAMES; scale += 1) {
      const row = [];
      for (let i = 1; i <= seatsPerRow; i += 1) {
        const text = new PIXI.Text('\u25EF', {
          fontSize: fontSize * scale,
          fontFamily: 'Arial',
          fill: '#00eaff',
          lineJoin: 'round',
        });
        text.x = i * 1.2 * fontSize * scale + 20;
        text.y = 40;

        text.interactive = true;
        text.buttonMode = true;
        text.on('click', () => {
          const seatIndex = this.container.getChildIndex(text);
          if (text.style.fill === '#00eaff') {
            this.updateSeat(seatIndex, { color: '#b42eb4' });
            text.style.fill = '#b42eb4';
          } else {
            this.updateSeat(seatIndex, { color: '#00eaff' });
            text.style.fill = '#00eaff';
          }
        });
        row.push(text);
      }
      this.rowScaled.push(row);
    }
  }

  updateSeat(index: number, { color }: SeatOptions) {
    this.rowScaled.forEach((row) => {
      row[index].style.fill = color;
    });
  }

  animate() {
    const t = Date.now() * 0.001;
    const scale = 1 + (this.SCALE_FRAMES - 1) * (Math.sin(t) * 0.5 + 0.5);
    if (this.currentRow) {
      this.container.removeChild(...this.currentRow);
    }
    this.currentRow = this.rowScaled[Math.floor(scale)];
    this.container.addChild(...this.currentRow);
    this.app.renderer.render(this.app.stage);
    requestAnimationFrame(this.animate.bind(this));
  }
}
