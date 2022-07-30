import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

type SEAT_GEOMETRY = PIXI.Sprite | PIXI.Graphics;

export default class SeatingPlan {
  readonly SELECTED_SEAT = 0x883200;

  readonly FREE_SEAT = 0x00ff49;

  constructor(
    readonly container: PIXI.Container,
    readonly app: PIXI.Application,
  ) {}

  addSeatEvent(seat: SEAT_GEOMETRY) {
    seat.interactive = true;
    seat.buttonMode = true;
    seat.on('pointerdown', () => {
      if (seat.tint === this.SELECTED_SEAT) {
        seat.tint = this.FREE_SEAT;
      } else {
        seat.tint = this.SELECTED_SEAT;
      }
    });
  }

  createSectorBySprites(rows: number, seatsPerRow: number) {
    const RADIUS = 50;
    let radiusScalable = RADIUS;
    let seats = seatsPerRow;
    const seatTexture = PIXI.Texture.from('images/seat.svg');
    for (let i = 0; i < rows; i += 1) {
      // Если количество мест возрастает с увеличением номером ряда
      seats += 1;
      radiusScalable = (RADIUS * seats) / seatsPerRow;
      for (let j = 0; j < seats; j += 1) {
        const seat = PIXI.Sprite.from(seatTexture);
        seat.anchor.set(0.5);
        seat.position.set(
          (100 * seats) / seatsPerRow
            + Math.cos(((0.6 * j) / seats) * Math.PI) * radiusScalable,
          (100 * seats) / seatsPerRow
            + Math.sin(((0.6 * j) / seats) * Math.PI) * radiusScalable,
        );
        this.addSeatEvent(seat);
        this.container.addChild(seat);
      }
    }
  }

  createSectorByGraphics(rows: number, seatsPerRow: number) {
    const RADIUS = 50;
    let radiusScalable = RADIUS;
    let seats = seatsPerRow;
    for (let i = 0; i < rows; i += 1) {
      // Если количество мест возрастает с увеличением номером ряда
      seats += 1;
      radiusScalable = (RADIUS * seats) / seatsPerRow;
      for (let j = 0; j < seats; j += 1) {
        const seat = new PIXI.Graphics();
        seat.beginFill(this.FREE_SEAT);
        seat.lineStyle({ width: 1 });
        seat.drawCircle(
          (100 * seats) / seatsPerRow
            + Math.cos(((0.6 * j) / seats) * Math.PI) * radiusScalable,
          (100 * seats) / seatsPerRow
            + Math.sin(((0.6 * j) / seats) * Math.PI) * radiusScalable,
          4,
        );
        seat.endFill();
        seat.x += 200;
        this.addSeatEvent(seat);
        this.container.addChild(seat);
      }
    }
  }
}
