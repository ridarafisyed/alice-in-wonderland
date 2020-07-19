/** @format */

import React from "react";
import useWebAnimations from "@wellyshen/use-web-animations";
import "./style.css";

export const AliceGame = () => {
	const alice = useWebAnimations({
		playbackRate: 0.5,
		autoPlay: false,
		keyframes: [{ transform: "scale(0)" }, { transform: "scale(2)" }],
		timing: {
			duration: 1000,
			iterations: 1,
		},
	});
	const aliceGrow = () => {
		alice.getAnimation().play();
	};
	const aliceShrink = () => {
		alice.getAnimation().reverse();
	};

	return (
		<div>
			<div className="cube" ref={alice.ref}></div>
			<div className="control">
				<button onClick={aliceGrow}>grow</button>
				<button onClick={aliceShrink}>shrink</button>
			</div>
		</div>
	);
};
