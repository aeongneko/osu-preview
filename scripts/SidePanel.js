import { Game } from "./Game";
import * as TWEEN from "@tweenjs/tween.js";
import { Component } from "./WindowManager";
import { TimingPanel } from "./TimingPanel";

const toggleTimingPanel = (forceOpen) => {
    if (forceOpen === true) {
        document.querySelector(".metadataPanel").classList.remove("show");
        document.querySelector(".timingPanel").classList.add("show");
        return;
    }

    if (document.querySelector(".metadataPanel").classList.contains("show")) {
        document.querySelector(".metadataPanel").classList.remove("show");
    }

    document.querySelector(".timingPanel").classList.toggle("show");
};
document.querySelector(".timings").onclick = () => toggleTimingPanel();

const toggleMetadataPanel = (forceOpen) => {
    if (forceOpen) {
        document.querySelector(".timingPanel").classList.remove("show");
        document.querySelector(".metadataPanel").classList.add("show");
        return;
    }

    if (document.querySelector(".timingPanel").classList.contains("show")) {
        document.querySelector(".timingPanel").classList.remove("show");
    }

    document.querySelector(".metadataPanel").classList.toggle("show");
};
document.querySelector(".metadatas").onclick = () => toggleMetadataPanel();

const openSidePanel = () => {
    document.querySelector(".sidePanel").classList.remove("slideInAnim");
    document.querySelector(".sidePanel").classList.add("slideOutAnim");
};

const closeSidePanel = () => {
    document.querySelector(".sidePanel").classList.remove("slideOutAnim");
    document.querySelector(".sidePanel").classList.add("slideInAnim");
    // document.querySelector(".timingPanel").classList.remove("show");
    document.querySelector(".metadataPanel").classList.remove("show");
};
document.querySelector(".closeSidepanel").onclick = closeSidePanel;

export const toggleSidePanel = (type) => {
    if (document.querySelector(".sidePanel").classList.contains("slideOutAnim")) {
        if (type === "timing" && document.querySelector(".metadataPanel").classList.contains("show")) {
            toggleTimingPanel(true);
            return;
        }

        if (type === "metadata" && document.querySelector(".timingPanel").classList.contains("show")) {
            toggleMetadataPanel(true);
            return;
        }

        closeSidePanel();
        return;
    }

    openSidePanel();

    if (type === "timing") {
        toggleTimingPanel(true);
        return;
    }

    toggleMetadataPanel(true);
};

const testX = () => {
    Game.SHOW_TIMING_PANEL = !Game.SHOW_TIMING_PANEL;

    const reduction = !Game.SHOW_TIMING_PANEL ? 0 : 400;
    const tween = new TWEEN.Tween({ reduction: !Game.SHOW_TIMING_PANEL ? 400 : 0 })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ reduction }, 100)
        .onUpdate((obj) => {
            Game.REDUCTION = obj.reduction
        })
        .start();
};

// document.querySelector(".timingContainer").onclick = () => toggleSidePanel("timing");
document.querySelector(".timingContainer").onclick = () => testX();

export class MetadataPanel {
    static MASTER_CONTAINER;

    static init() {
        this.MASTER_CONTAINER = new Component(0, 0, 400, Game.APP.renderer.height - 60);
    }
}