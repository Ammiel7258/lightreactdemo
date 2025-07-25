import {Drawer} from 'expo-router/drawer';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import LightsProviderWrapper from "@/hooks/LightContext";

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<LightsProviderWrapper>
				<Drawer>
					<Drawer.Screen
						name="(tabs)"
						options={{
							headerShown: true,
							title: "Ammiel's Apartment",
						}}
					/>
				</Drawer>
			</LightsProviderWrapper>
		</GestureHandlerRootView>
	);
}