loadLocalStorage();

// Init
const mainGame = new Game();

let selectedHitCircleTemplate;
let hitCircleTemplate;
let hitCircleLegacyTemplate;
let hitCircleOverlayTemplate;
let hitCircleOverlayLegacyTemplate;
let approachCircleTemplate;
let sliderBallTemplate;
let reverseArrowTextures;
let sliderBallTexture;
let sliderBallGradientTexture;

document.querySelector(".loading").style.display = "none";
if (urlParams.get("b") && /[0-9]+/g.test(urlParams.get("b"))) {
    beatmapFile = new BeatmapFile(urlParams.get("b"));
    document.querySelector("#mapInput").value = urlParams.get("b");
}

window.onresize = debounce(() => {
    setTimeout(() => {
        Game.appResize();

        if (!playingFlag) {
            if (beatmapFile !== undefined && beatmapFile.beatmapRenderData !== undefined) {
                beatmapFile.beatmapRenderData.objectsController.draw(beatmapFile.audioNode.getCurrentTime(), true);
            }
        }
    }, 200);
});

screen.orientation.onchange = debounce(() => {
    // console.log("Orientation Changed");
    setTimeout(() => {
        Game.appResize();

        if (!playingFlag) {
            if (beatmapFile !== undefined && beatmapFile.beatmapRenderData !== undefined) {
                beatmapFile.beatmapRenderData.objectsController.draw(beatmapFile.audioNode.getCurrentTime(), true);
            }
        }
    }, 200);
});
