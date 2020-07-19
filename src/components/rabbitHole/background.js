/** @format */

import React from "react";
import useWebAnimations from "@wellyshen/use-web-animations";

import "./style.css";

export const Background = () => {
	const { ref, playState } = useWebAnimations({
		id: "alice",
		keyframes: [{ transform: "translate3D(0, -300px, 0)" }],
		timing: {
			duration: 1000,
			iterations: Infinity,
		},
	});

	return (
		<div className="tunnel" ref={ref}>
			<h1>Hello </h1>
		</div>
	);
};
