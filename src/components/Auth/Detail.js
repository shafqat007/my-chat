import React,{useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-datepicker';
import {Picker } from '@react-native-picker/picker';

export default function Detail({route,navigation}) {
    const {uid} =route.params;
    const [name,setName] = useState('');
    const [dob,setDob] = useState('');
    const [gender,setGender] = useState('');

    const saveDetails = async () => {
        try{
            await firestore().collection('Users').doc(uid).set({
                name,
                dob: dob.toISOString().slice(0,10),
                gender,
                displayName: name,});
            navigation.navigate('Dashboard');
             } catch(error){
                console.log('Error saving details: ', error);
            }
        };
        return (
            <View style={{
                style: 1,
                backgroundColor: '#fff',
                position: 'relative',
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    position:'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height:'25%'
                }}/>
                <View style={{
                    flex:1,
                    backgroundColor:'#ADD8E6',
                    padding:20,
                    borderTopLeftRadius:100,
                    position:'absolute',
                    top:'25%',
                    left:0,
                    right:0,
                    bottom:0,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: 20,
                    }}>Enter your details</Text>
                    <TextInput
                        placeholder='Name'
                        style={{
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                        }}
                        value={name}
                        onChangeText={setName}
                    />
                    <DatePicker
                        style={{
                            height:80,
                            width: Dimensions.get('window').width - 40,
                            marginBottom: 20,
                        }}
                        date={dob}
                        mode='date'
                        placeholder='Select Date of Birth'
                        format='YYYY-MM-DD'
                        minDate='1900-01-01'
                        maxDate={new Date()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateInput:{
                                backgroundColor: '#fff',
                                borderRadius: 5,
                            },
                        }}
                        onDateChange={(date) => setDob(date)}
                    />
                    <Picker
                    style={{
                        height:50,
                        width:"100%",
                        marginBottom:30,
                    }}
                    selectedValue={gender}
                    onValueChange = {setGender}
                    >
                <Picker.Item label="Male" value = "Male"/>
                <Picker.Item label="Female" value = "Female"/>
                </Picker>
                                <TouchableOpacity 
                                onPress={saveDetails}
                                style={{
                                    backgroundColor:"#007BFF",
                                    padding:10,
                                    borderRadius:5,
                                    marginBottom:20,
                                    alignItems:"center",
                                }}>

<Text style = {{color:"white",fontSize:18,fontWeight:"bold"}}>Save Details</Text>
</TouchableOpacity>

                </View> </View>
        );
                    }

