"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CarbonAds = ({ className }: { className: string }) => {
	const router = useRouter();

	useEffect(() => {
		const isCarbonExist = document.querySelector("#carbonads");

		if (isCarbonExist) {
			// _carbonads.refresh();
			return;
		}

		const script = document.createElement("script");
		script.src =
			"//cdn.carbonads.com/carbon.js?serve=CKYIL2QN&placement=nedim&format=cover";
		script.id = "_carbonads_js";
		script.async = true;

		document.querySelectorAll("#carbon-container")[0].appendChild(script);
	}, []);

	return <div id="carbon-container" className={className} />;
};

export default CarbonAds;
