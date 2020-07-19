/** @format */

import React, { useState } from "react";

export const useAnimation = (initialValue) => {
	const [animation, setAnimation] = useState(initialValue);
	return [
		animation,
		(e) => {
			setAnimation({ ...animation, [e.target.name]: e.target.value });
		},
	];
};
