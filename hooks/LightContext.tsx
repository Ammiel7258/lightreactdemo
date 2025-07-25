import React, {useState, createContext, useContext} from "react";

type LightColors = {
	[id: number]: string;
};

type LightsContextType = {
	lightColors: LightColors;
	setLightColor: (id: number, color: string) => void;
};

const LightsContext = createContext<LightsContextType | undefined>(undefined);

export default function LightsProviderWrapper({children}: { children: React.ReactNode }) {
	const [lightColors, setLightColors] = useState<LightColors>({});

	function setLightColor(id: number, color: string) {
		setLightColors(prev => ({
			...prev,
			[id]: color,
		}));
	}

	return (
		<LightsContext.Provider value={{lightColors, setLightColor}}>
			{children}
		</LightsContext.Provider>
	);
}

export function useLights(): LightsContextType {
	const context = useContext(LightsContext);
	if (!context) {
		throw new Error("useLights must be used within a LightsProvider");
	}
	return context;
}