import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";

type SEAT_GEOMETRY = PIXI.Sprite | PIXI.Graphics;

const app = new PIXI.Application({
  width: 900,
  height: 900,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

function addSeatEvent(seat: SEAT_GEOMETRY) {
  const SELECTED_SEAT = 0x883200;
  const FREE_SEAT = 0x00ff49;
  seat.buttonMode = true;
  seat.interactive = true;
  seat.on("pointerdown", () => {
    if (seat.tint === SELECTED_SEAT) {
      seat.tint = FREE_SEAT;
    } else {
      seat.tint = SELECTED_SEAT;
    }
  });
}

function createSectorBySprites(rows: number, seatsPerRow: number) {
  const RADIUS = 50;
  let radiusScalable = RADIUS;
  let seats = seatsPerRow;
  const seatTexture = PIXI.Texture.from("images/seat.svg");
  for (let i = 0; i < rows; i += 1) {
    // Если количество мест растет с ростом ряда
    seats += 1;
    radiusScalable = (RADIUS * seats) / seatsPerRow;
    for (let j = 0; j < seats; j += 1) {
      const seat = PIXI.Sprite.from(seatTexture);
      seat.anchor.set(0.5);
      seat.scale = { x: 0.002, y: 0.002 };
      seat.position.set(
        (100 * seats) / seatsPerRow +
          Math.cos(((0.6 * j) / seats) * Math.PI) * radiusScalable,
        (100 * seats) / seatsPerRow +
          Math.sin(((0.6 * j) / seats) * Math.PI) * radiusScalable
      );
      addSeatEvent(seat);
      container.addChild(seat);
    }
  }
}

function createSectorByGraphics(rows: number, seatsPerRow: number) {
  const RADIUS = 50;
  let radiusScalable = RADIUS;
  let seats = seatsPerRow;
  for (let i = 0; i < rows; i += 1) {
    // Если количество мест растет с ростом ряда
    seats += 1;
    radiusScalable = (RADIUS * seats) / seatsPerRow;
    for (let j = 0; j < seats; j += 1) {
      const seat = new PIXI.Graphics();
      seat.beginFill(0x00ff49);
      seat.lineStyle({ width: 1 });
      seat.drawCircle(
        (100 * seats) / seatsPerRow +
          Math.cos(((0.6 * j) / seats) * Math.PI) * radiusScalable,
        (100 * seats) / seatsPerRow +
          Math.sin(((0.6 * j) / seats) * Math.PI) * radiusScalable,
        4
      );
      seat.endFill();
      seat.x += 150;
      addSeatEvent(seat);
      container.addChild(seat);
    }
  }
}

createSectorBySprites(5, 10);
createSectorByGraphics(5, 10);
