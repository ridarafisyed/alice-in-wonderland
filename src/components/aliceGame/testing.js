/** @format */

var cake = document.getElementById("eat-me");
var bottle = document.getElementById("bottle");

// Keyframes for bouncing the controls
var tryMeKeys = [
	{ transform: "translateY(0) scale(1, 1) rotate(0)", easing: "ease-in" },
	{ transform: "translateY(0) scale(1.1, .9) rotate(0)" },
	{ transform: "translateY(-10%) scale(.9, 1.1) rotate(0)", offset: 0.4 },
	{ transform: "translateY(-10%) scale(1, 1) rotate(10deg)", offset: 0.5 },
	{ transform: "translateY(-10%) scale(1, 1) rotate(-10deg)", offset: 0.7 },
	{
		transform: "translateY(-10%) scale(1,1) rotate(0deg)",
		offset: 0.8,
		easing: "ease-in",
	},
	{ transform: "translateY(0) scale(1, 1) rotate(0)" },
];

// Functions that animates the cake and bottle
function trytheCake() {
	cake.animate(tryMeKeys, {
		id: "bounce",
		delay: 7000,
		duration: 2000,
		iterations: 2,
	});
}
trytheCake();
var trytheCakeTimer = setInterval(trytheCake, 12000);

function trytheBottle() {
	bottle.animate(tryMeKeys, { id: "bounce", duration: 2000, iterations: 2 });
}
trytheBottleTimer = setInterval(trytheBottle, 12000);

// Growing and shrinking Alice
var aliceChange = document
	.getElementById("alice")
	.animate(
		[
			{ transform: "translate(-50%, -50%) scale(.5)" },
			{ transform: "translate(-50%, -50%) scale(2)" },
		],
		{
			duration: 8000,
			easing: "ease-in-out",
			fill: "both",
		}
	);

aliceChange.pause();
aliceChange.currentTime = aliceChange.effect.timing.duration / 2;

var stopPlayingAlice = function () {
	aliceChange.pause();
	nommingCake.pause();
	drinking.pause();
};

var ponytail = document.getElementById("ponytail");
var ponytailTiming = {
	duration: 250,
	direction: "alternate",
	iterations: 2,
};

var nommingCake = document
	.getElementById("eat-me_sprite")
	.animate(
		[{ transform: "translateY(0)" }, { transform: "translateY(-80%)" }],
		{
			fill: "forwards",
			easing: "steps(4, end)",
			duration: aliceChange.effect.timing.duration / 2,
		}
	);
nommingCake.pause();

var growAlice = function () {
	aliceChange.playbackRate = 1;
	aliceChange.play();
	// stop jiggling the cake.
	clearInterval(trytheCakeTimer);
	if (cake.getAnimations()[0]) {
		cake.getAnimations()[0].cancel();
	}

	nommingCake.play();

	ponytail.animate(
		[
			{ transform: "scale(1, 1) rotate(0)" },
			{
				transform: "scale(.85, 1.15) rotate(2deg)",
				easing: "cubic-bezier(.35,.97,.13,1.14)",
			},
		],
		ponytailTiming
	);
};

var drinking = document
	.getElementById("liquid")
	.animate([{ height: "100%" }, { height: "0" }], {
		fill: "forwards",
		duration: aliceChange.effect.timing.duration / 2,
	});
drinking.pause();

var shrinkAlice = function () {
	aliceChange.playbackRate = -1;
	aliceChange.play();
	// stop jiggling the bottle.
	clearInterval(trytheBottleTimer);
	if (bottle.getAnimations()[0]) {
		bottle.getAnimations()[0].cancel();
	}

	drinking.play();

	ponytail.animate(
		[
			{ transform: "scale(1,1) rotate(0)" },
			{
				transform: "scale(1.15, .85) rotate(2deg)",
				easing: "cubic-bezier(.35,.97,.13,1.14)",
			},
		],
		ponytailTiming
	);
};

// On tap or click, Alice will change size.
cake.addEventListener("mousedown", growAlice, false);
cake.addEventListener("touchstart", growAlice, false);
cake.addEventListener("mouseup", stopPlayingAlice, false);
cake.addEventListener("mouseout", stopPlayingAlice, false);
cake.addEventListener("touchend", stopPlayingAlice, false);

bottle.addEventListener("mousedown", shrinkAlice, false);
bottle.addEventListener("touchstart", shrinkAlice, false);
bottle.addEventListener("mouseup", stopPlayingAlice, false);
bottle.addEventListener("mouseout", stopPlayingAlice, false);
bottle.addEventListener("touchend", stopPlayingAlice, false);

// When either drink me or eat me animations finish, the game is "over."
// You get a different ending depending on how big or small Alice is
// (that is to say how far along her animation timeline is!)
var endGame = function () {
	// get Alice's timeline's playhead location
	var alicePlayhead = aliceChange.currentTime;
	var aliceTimeline = aliceChange.effect.activeDuration;

	stopPlayingAlice();

	// depending on which third it falls into
	var aliceHeight = alicePlayhead / aliceTimeline;

	if (aliceHeight <= 0.333) {
		// Alice got smaller!
		showEndings.play();
		showSmall.play();
		exclaming.play();
		armWave.play();
		aliceShrank.play();
		bringUI.effect.timing.delay = 2000;
		bringUI.play();
	} else if (aliceHeight >= 0.666) {
		// Alice got bigger!
		showEndings.play();
		showCrying.play();
		pool.play();
		tears.forEach(function (el) {
			el.playState = "playing";
		});
		bringUI.effect.timing.delay = 2000;
		bringUI.play();
	} else {
		// Alice didn't change significantly
		bringUI.effect.timing.delay = 0;
		bringUI.play();
	}
};

// When the cake or runs out...
nommingCake.onfinish = endGame;
drinking.onfinish = endGame;

// ...or Alice reaches the end of her animation
aliceChange.onfinish = endGame;

// Reset the 3 animations: alice, the bottle, and the cupcake
var restartGame = function () {
	aliceChange.currentTime = aliceChange.effect.timing.duration / 2;
	nommingCake.currentTime = 0;
	drinking.currentTime = 0;
};
