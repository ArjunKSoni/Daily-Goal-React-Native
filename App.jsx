import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable, Modal, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [Data, setdata] = useState([])
  const [task, settask] = useState("")
  const [hide, sethide] = useState(false)
  const [hide2, sethide2] = useState(true)
  const changedText = (e) => {
    settask(e)
  }
  const deleteTask = (id) => {
    setdata(Data.filter((e) => {
      return e.id !== id
    }))
    sethide(true); setTimeout(() => { sethide(false) }, 1000);
  }
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={{ backgroundColor: "#4B4453" }} className="flex-1 pt-10">
        <View className="flex-1 flex items-center justify-start">
          <Pressable onPress={() => { sethide2(true) }} className="px-16 rounded-xl py-3 my-2 bg-blue-400">
            <Text className="text-white text-lg font-bold">Add Task</Text>
          </Pressable>

          <Modal visible={hide2} animationType="slide">
            <View className="flex flex-1 gap-3 items-center justify-center" style={{ backgroundColor: "#11BCBE" }}>
              {/* <Image style={{ width: "45%", height: "25%" }} source={require("./assets/arrow.png")} /> */}
              <View className="flex flex-row">
                <Feather name="target" size={150} color="white" />
              </View>
              <TextInput keyboardType="default" autoFocus={true} focusable={true} value={task} onChangeText={changedText} style={{ width: "80%" }} className="border-2 px-3 py-1 bg-white rounded overflow-scroll" placeholder='enter your task' />
              <View className="flex flex-row items-center justify-around w-full">
                <TouchableOpacity style={{ width: "30%" }} onPress={(e) => { task !== "" && setdata(Data.concat({ task, "id": Math.random().toString() })); settask(""); task !== "" && sethide2(false) }} activeOpacity={0.5} className="bg-green-500 px-4 py-2 rounded">
                  <Text className="text-white text-center font-bold text-lg">Add Goal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "30%" }} onPress={(e) => { sethide2(false) }} activeOpacity={0.5} className="bg-green-500 text-center px-4 py-2 rounded">
                  <Text className="text-white text-center font-bold text-lg">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={{ height: "0.2%", width: "90%" }} className="bg-gray-200 m-3" />
          <View style={{ height: "80%" }} className="w-screen flex justify-center">
            {Data.length === 0 ? <View className="flex h-3/4 items-center justify-center"><Text className="text-gray-400">Your task will be shown here</Text></View> :
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Data}
                renderItem={({ item }) => <View style={{ width: "100%" }} className="py-2 text-center flex items-center justify-center "><Pressable android_ripple={{ color: "#white" }} onPress={e => deleteTask(item.id)} style={{ width: "80%", backgroundColor: "#48BA9B" }} className="flex items-center justify-center rounded-xl"><Text className="text-white font-bold text-lg py-3 ">{item.task}</Text></Pressable></View>}
              />}
          </View>

          <Modal visible={hide} transparent={true} animationType="fade">
            <View className="flex items-center justify-center h-full">
              <Pressable onPress={() => sethide(false)} className="flex items-center justify-center p-5 rounded-xl bg-blue-400">
                <Text className="text-white font-bold text-lg">Task is Removed</Text>
                <Text className="text-slate-200 text-xs">click on the Add Goals to add tasks</Text>
              </Pressable>
            </View>
          </Modal>

        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
