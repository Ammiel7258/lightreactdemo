import {Tabs} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import LightsProviderWrapper from "@/hooks/LightContext";

type IconProps = {
	name: string;
	type: "FontAwesome5" | "MaterialIcons" | "Entypo";
	focused: boolean;
	size?: number;
}

// TabIcon function returns the correct icon and color based on parameters
function TabIcon({name, type, focused, size = 24}: IconProps) {
	const color: string = focused ? "#130c81" : "#000000"; // if the tab is selected, it will be blue, otherwise black

	switch (type) {
		case "Entypo":
			return (
				<Entypo name={name as any} size={size} color={color}/>
			);
		case "FontAwesome5":
			return (
				<FontAwesome5 name={name as any} size={size} color={color}/>
			);
		case "MaterialIcons":
			return <MaterialIcons name={name as any} size={size} color={color}/>;
		default:
			return null;
	}
}

export default function _Layout() {
	return (
		<LightsProviderWrapper>
			<Tabs>
				<Tabs.Screen
					name="index"
					options={{
						title: "Lights",
						headerShown: false,
						tabBarIcon: ({focused}) => (
							<TabIcon
								type="FontAwesome5"
								name="lightbulb"
								focused={focused}
							/>
						)
					}}
				/>

				<Tabs.Screen
					name="scenes"
					options={{
						title: "Scenes",
						headerShown: false,
						tabBarIcon: ({focused}) =>
							<TabIcon
								type="MaterialIcons"
								name="landscape"
								focused={focused}
							/>
					}}
				/>

				<Tabs.Screen
					name="events"
					options={{
						title: "Events",
						headerShown: false,
						tabBarIcon: ({focused}) =>
							<TabIcon
								type="Entypo"
								name="calendar"
								focused={focused}
							/>
					}}
				/>

				<Tabs.Screen
					name="lights/[id]"
					options={{
						href: null,
						headerShown: false,
					}}
				/>

			</Tabs>
		</LightsProviderWrapper>

	);
}