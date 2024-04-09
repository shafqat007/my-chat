import React ,{useState,useEffect} from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation ,useIsFocused} from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";

export default function Dashboard({route}) {
    const [users,setUsers] = useState([]);
    const [userName,setUserName] = useState("");
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        //fetch the list of users
        const fetchUsers = async () => {
            try{
                const userSnapshot = await firestore().collection('Users').get();
                const usersData = userSnapshot.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data(),}));
                setUsers(usersData);
            }catch(error){
                console.log("Error fetching users: ",error);
            }};
            //fetch the current user's name from firestore
            const fetchUserName = async ()=>{
                try{
                    const currentUser = auth().currentUser;
                    if (currentUser){
                        const userDocument = await firestore().collection("users").doc(currentUser.uid).get();
                        setUserName(userDocument.data()?.name || "");
                    }

                }catch (error){
                    console.log("Error fetching user name: ",error);
                }
            };
            //fetch users and users name only when screen is focused
            if (!isFocused){
                fetchUsers();
                fetchUserName();
            }
        },[isFocused]);
        const navigateToChat = (userId,userName) => {
            //navigate to the chat screen with the selected user's ID and name
            navigation.navigate('ChatScreen', { userId, userName });};
        
            const handleLogout = async () => {
                try{
                    await auth().signOut();
                    navigation.navigate("Login")
                }catch (error){
                    console.log("Error logging out: ",error);
                }};
                return {<View style={{}}
                }