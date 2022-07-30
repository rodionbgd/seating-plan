import * as PIXI from "pixi.js";
import ScalingSeat from "./scaling";
import SeatingPlan from "./seatingPlan";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);
let container: PIXI.Container;

function showScale() {
  if (container) {
    container.destroy();
  }
  container = new PIXI.Container();
  app.stage.addChild(container);
  const scalingSeat = new ScalingSeat(container, app);
  scalingSeat.createRow(3);
  scalingSeat.animate();
}

function showSector() {
  if (container) {
    container.destroy();
  }
  container = new PIXI.Container();
  app.stage.addChild(container);
  const seatingPlan = new SeatingPlan(container, app);
  seatingPlan.createSectorBySprites(5, 10);
  seatingPlan.createSectorByGraphics(5, 10);
}

const mode = <HTMLInputElement>document.getElementById("mode");
mode.addEventListener("input", () => {
  if (mode.checked) {
    showScale();
  } else {
    showSector();
  }
});

showSector();
