import "../../global.css"
import {Button, Modal, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import LightToggle from "@/components/LightToggle";
import {useState} from "react";

type LightConfig = {
	id: number;
	lightName: string;
	color: string;
	seriesName: string;
	enabled: boolean;
}

const initialLights: LightConfig[] = [
	{id: 1, lightName: 'Front Door', color: '#ff0000', seriesName: 'X Series', enabled: true},
	{id: 3, lightName: 'Garage', color: '#0000ff', seriesName: 'Z Series', enabled: true},
	{id: 4, lightName: 'Hallway', color: '#ffff00', seriesName: 'Classic', enabled: true},
];

export default function App() {
	const [showModal, setShowModal] = useState(false);
	const [selected, setSelected] = useState<"lights" | "groups">("lights");
	const [lightToggles, setLightToggles] = useState<LightConfig[]>(initialLights);
	const [name, setName] = useState("initial name");
	const [color, setColor] = useState("#ffffff");
	const [series, setSeries] = useState("series name");

	function addLightToggle(name: string, color: string, series: string) {
		const newId: number = lightToggles.reduce((max, light) => Math.max(max, light.id), 0) + 1;
		const newLightToggle: LightConfig = {
			id: newId,
			lightName: name,
			color: color,
			seriesName: series,
			enabled: true,
		}

		setLightToggles([...lightToggles, newLightToggle])
	}

	function removeLightToggle(id: number) {
		setLightToggles(prev => prev.filter(light => light.id !== id));
	}

	function setEnabled(id: number, value: boolean) {
		setLightToggles(prev =>
			prev.map(light =>
				light.id === id ? {...light, enabled: value} : light
			)
		);
	}

	return (
		<ScrollView>
			<View className="flex-row">
				<Pressable
					onPress={() => setSelected("lights")}
					className="flex-1 items-center justify-center"
					style={selected === "lights" ? {backgroundColor: "#B2BEB5"} : {backgroundColor: "#ffffff"}}
				>
					<Text className="text-xl">LIGHTS/ZONES</Text>
				</Pressable>

				<Pressable
					onPress={() => setSelected("groups")}
					className="flex-1 items-center justify-center"
					style={selected === "groups" ? {backgroundColor: "#B2BEB5"} : {backgroundColor: "#ffffff"}}
				>
					<Text className="text-xl">GROUPS</Text>
				</Pressable>
			</View>

			<View className="mt-2 w-[100%]">
				{selected === "lights" ?
					<View className="flex-row">
						<Pressable
							className="flex-1 rounded-2xl overflow-hidden border-[1px] border-black items-center"
							onPress={() => setLightToggles(prev =>
								prev.map(light => ({...light, enabled: true}))
							)}
						>
							<Text>On</Text>
						</Pressable>
						<Pressable
							className="flex-1 rounded-2xl overflow-hidden border-[1px] border-black items-center"
							onPress={() => setLightToggles(prev =>
								prev.map(light => ({...light, enabled: false}))
							)}
						>
							<Text>Off</Text>
						</Pressable>
						<View className="flex-1"/>
						<View className="flex-1"/>
					</View>
					:
					<Text>Groups Selected</Text>
				}
			</View>

			{lightToggles.map(light => (
				<LightToggle
					key={light.id}
					lightName={light.lightName}
					color={light.color}
					seriesName={light.seriesName}
					id={light.id}
					enabled={light.enabled}
					setEnabled={setEnabled}
					removeLight={removeLightToggle}
				/>
			))}

			<Button title="New Light:" onPress={() => setShowModal(true)}/>
			<Modal
				visible={showModal}
				animationType="slide"
			>
				<TextInput
					className="h-[40px] border-[1px] border-black w-[98%] mx-auto mt-2"
					placeholder="Name of new Light"
					onChangeText={setName}
				/>
				<TextInput
					className="h-[40px] border-[1px] border-black w-[98%] mx-auto mt-2"
					placeholder="Color of new Light (hex)"
					onChangeText={setColor}
				/>
				<TextInput
					className="h-[40px] border-[1px] border-black w-[98%] mx-auto mt-2"
					placeholder="Series of new Light"
					onChangeText={setSeries}
				/>

				<View className="flex-row justify-between mt-5">
					<View className="flex-1">
						<Button color="gray" title="Cancel" onPress={() => setShowModal(false)}/>
					</View>
					<View className="flex-1">
						<Button
							color="blue"
							title="Save"
							onPress={() => {
								addLightToggle(name, color, series);
								setShowModal(false)
							}}/>
					</View>
				</View>
			</Modal>
		</ScrollView>
	);
}