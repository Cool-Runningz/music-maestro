import React from "react";
import Divider from "@/components/catalyst/divider";

export default function LoadingRow() {
	return (
		<div className="bg-gray-900 px-4 h-full overflow-y-auto">
			<div className="rounded-md p-4 max-w-sm w-full mx-auto">
				<div className="animate-pulse flex space-x-4">
					<div className="rounded-[20%] bg-slate-300 h-11 w-11"></div>
					<div className="flex-1 space-y-6 py-1">
						<div className="h-2 bg-slate-300 rounded"></div>
						<div className="h-2 bg-slate-300 rounded"></div>
					</div>
					<div className="rounded-full bg-slate-300 h-11 w-11"></div>
				</div>
				<Divider className="bg-slate-300 mt-4" />
			</div>
		</div>
	);
}
