import WheelColorPicker from 'react-native-wheel-color-picker';
import {View, Button, Modal} from 'react-native'
import {useLocalSearchParams} from "expo-router";
import {useLights} from "@/hooks/LightContext";
import {useState} from "react";

export default function Id() {
	const {id} = useLocalSearchParams();
	const lightId: number = Number(id);

	const {lightColors, setLightColor} = useLights();
	const currentColor: string = lightColors[lightId] ?? "#ffffff";
	const [tempColor, setTempColor] = useState(currentColor);

	function handleConfirm() {
		setLightColor(lightId, tempColor);
		setShowModal(false);
	}

	const [showModal, setShowModal] = useState(false);

	return (
		<View>
			<Button title="Color Picker" onPress={() => setShowModal(true)}/>

			<Modal visible={showModal} animationType="slide">
				<WheelColorPicker
					color={tempColor}
					onColorChangeComplete={setTempColor}
					sliderHidden={false}
				/>

				<View className="flex-row justify-between mt-5">
					<View className="flex-1">
						<Button color="gray" title="Cancel" onPress={() => setShowModal(false)}/>
					</View>
					<View className="flex-1">
						<Button color="blue" title='Save' onPress={handleConfirm}/>
					</View>
				</View>
			</Modal>
		</View>
	);
}