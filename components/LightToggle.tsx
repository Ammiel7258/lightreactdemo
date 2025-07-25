import {Switch, View, Text, Pressable} from 'react-native';
import {useState} from 'react';
import Color from 'color';
import {Router, useRouter} from "expo-router";
import {useLights} from "@/hooks/LightContext";

// learning and implementing TSX:
type LightToggleProps = {
	id: number;
	lightName: string;
	color: string;
	seriesName: string;
	enabled: boolean;
	setEnabled: (id: number, value: boolean) => void;
	removeLight: (id: number) => void;
};

export default function LightToggle(
	{
		lightName,
		color,
		seriesName,
		id,
		enabled,
		setEnabled,
		removeLight
	}: LightToggleProps) {

	const {lightColors} = useLights();
	const router: Router = useRouter(); // expo router

	const lightColor: string = lightColors[id] ?? color;
	const darkerColor: string = Color(lightColor).darken(0.5).hex(); // darken by 50%

	// when called flip the previousState variable
	function toggleSwitch(): void {
		setEnabled(id, !enabled);
	}

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/lights/[id]",
					params: {id: id.toString()},
				})
			}
			className="w-[98%] mx-auto my-[1px] rounded-2xl overflow-hidden border-[1px] border-black"
		>
			<View
				style={{backgroundColor: lightColor}} // this is the color of the "button"
				className="flex-row items-center justify-between px-6 h-20"
			>
				<View>
					<Text className="text-xl font-bold">
						{lightName}
					</Text>
					<Text className="text-sm">
						{seriesName}
					</Text>
				</View>

				<View className="flex-col">
					<Switch
						thumbColor={"#ffffff"}
						trackColor={{false: "#595656", true: darkerColor}}
						onValueChange={toggleSwitch}
						value={enabled}
					/>

					<View>
						<Pressable
							onPress={() => removeLight(id)}
							className="rounded-2xl bg-white overflow-hidden border-[1px] border-black px-4 py-2"
						>
							<Text className="text-center font-semibold">Remove</Text>
						</Pressable>
					</View>
				</View>

			</View>
		</Pressable>
	);
}