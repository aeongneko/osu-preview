import { Game } from "./Game.js";
import { ScoreParser } from "./ScoreParser.js";
import * as PIXI from "pixi.js";
import {loadParallel} from "./Utils.js";

export class Cursor {
    obj;
    cursor;
    trailList;

    async init() {
        const container = new PIXI.Container();

        const [cursorTexture, trailTexture] = await Promise.all([
            PIXI.Assets.load("/static/cursor.png"),
            PIXI.Assets.load("/static/cursortrail.png")
        ]);
        this.cursor = PIXI.Sprite.from(cursorTexture);
        this.cursor.anchor.set(0.5);
        this.cursor.width = (128 * (1024 / 640)) / (Game.WIDTH / 512);
        this.cursor.height = (128 * (1024 / 640)) / (Game.WIDTH / 512);

        const trailList = [...Array(10).keys()].map(() => PIXI.Sprite.from(trailTexture));
        this.trailList = trailList;

        trailList.forEach((cursor) => {
            cursor.anchor.set(0.5);
            cursor.width = (64 * (1024 / 640)) / (Game.WIDTH / 512);
            cursor.height = (64 * (1024 / 640)) / (Game.WIDTH / 512);
            container.addChild(cursor);
        });
        container.addChild(this.cursor);
        container.x = Game.OFFSET_X;
        container.y = Game.OFFSET_Y;

        this.obj = container;
        this.obj.alpha = 0;
    }

    constructor() {

    }

    update(index, current_x, current_y) {
        if (!ScoreParser.CURSOR_DATA) return;
        this.obj.x = Game.OFFSET_X + current_x * (Game.WIDTH / 512);
        this.obj.y = Game.OFFSET_Y + current_y * (Game.WIDTH / 512);

        index--;

        this.trailList.toReversed().forEach((graphic, graphic_idx) => {
            if (index < 0) return;

            const x_delta = (ScoreParser.CURSOR_DATA[index].x - current_x) * (Game.WIDTH / 512);
            const y_delta = (ScoreParser.CURSOR_DATA[index].y - current_y) * (Game.WIDTH / 512);

            graphic.x = x_delta;
            graphic.y = y_delta;
            graphic.alpha = 1 - graphic_idx / this.trailList.length;

            index--;
            return;
        });
    }
}
