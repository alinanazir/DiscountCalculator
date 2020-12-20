import React, { useState , useEffect, useLayoutEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TextInputComponent, ScrollView, TouchableOpacity, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 function homescreen({ navigation, route }){

  const [price, setprice] = useState('')
  const [dsc, setdsc] = useState('')
  const [fp, setfp] = useState('')
  const [sav, setsav] = useState('')
  const [datah, setdatah] = useState([])

  
  const pricefunc = (e) =>{
    if(e >= 0){
      setprice(e)
      }
    else{
      alert("Postive number only");
    }
  }

  const getdscfunc = (e) =>{
    if(e < 100){
      setdsc(e)
     }
    else{
      alert("Discount should be less then 100");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title = "History"  onPress={() =>
          navigation.navigate('History',{historydata: datah})} ></Button>
      ),
    })
  })

  const calculatefp =()=>{
    var disc_price = price - (price * (dsc/100));
    return disc_price;
  };

  const saved = () => {
    var save = price - calculatefp();
    return save;
  };

  function newlist(){
    if (!price.trim() || !dsc.trim()) {
      return;
    }
    else{
      setdatah([
                ...datah,
                {key: Math.random().toString(), op: price, dsc: dsc, fp: calculatefp()}
                ])
      setprice('')
      setdsc('')
    }
  }

  
  return(
      <View style={styles.container}>
      <View style={{justifyContent:'center', backgroundColor:'#5b02b4', borderRadius:100}}>
      <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:35, color: '#fff', margin:10}}>DISCOUNT CALCULATOR</Text>
      </View>
      <View style={{flexDirection: "row"}}>
       
        <View style={{justifyContent:'center'}}>
        <Text>{"\n"}</Text>
        <Text style={{fontWeight:'bold', fontSize:25, color: '#fff', marginLeft:10}}>Enter The Price:</Text>
          <TextInput style={styles.input}
          color = 'Black'
          keyboardType = 'numeric'
          onChangeText = {pricefunc}
          ></TextInput>
        </View>
      </View>

      <View style={{flexDirection: "row"}}>
      
        <View>
          <Text style={{fontWeight:'bold', fontSize:25, color: '#fff', marginLeft:10}}>Enter The Discount %:</Text>
          <TextInput 
          style={styles.input}
          keyboardType = 'numeric'
          onChangeText = {getdscfunc}
          ></TextInput>
        </View>
      </View>
      <Text>{"\n"}</Text>
      <TouchableOpacity 
        style={{}}
        onPress={() => newlist()}

      >
        <Text style={{color: '#fff', backgroundColor: '#5b02b4', fontWeight:'bold', fontSize: 25, borderRadius: 10, alignSelf: 'center', padding: 10}}>Save</Text>
      </TouchableOpacity>
      <Text>{"\n"}</Text>
      
      <Text>{"\n"}</Text>
      <View style={{backgroundColor:'#5b02b4', borderRadius: 10, borderWidth:2}}>
      <Text style={{ fontSize: 30, color: '#fff', fontWeight:'bold'}}> Final Price :  {calculatefp()}</Text>
      <Text style={{fontSize: 30, color: '#fff', fontWeight:'bold'}}> You Save :  {saved()}</Text>
      </View>
      <Text>{"\n"}</Text>
      
      </View>
    );
  }

function historyscreen({ navigation, route }){


  const {historydata} = route.params;
  const [datah,setdatah] = useState(historydata)

  const deletelistitem =(itemkey)=>{
    setdatah(list => datah.filter(item => item.key != itemkey));
  }

  function clearhistory(){
    setdatah([])
  }

   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title = "Clear"  onPress={clearhistory} ></Button>
      ),
    })
  })

   return(
     <View style={styles.container}>   
     <Text style={{alignSelf: 'center', fontWeight:'bold', color:'white', fontSize:40}}>HISTORY</Text>
     <ScrollView style={styles.scrollview}>
      {datah.map((item) =>
      <TouchableOpacity
      key={item.key}
      activeOpacity= {0.5}
      >
      <View
      style={styles.scrollViewItem}
      >
      <Text style={{fontWeight:'bold', fontSize:25}}>{item.op}</Text>
      <Text style={{fontWeight:'bold', fontSize:25}}>{item.dsc}</Text>
      <Text style={{fontWeight:'bold', fontSize:25}}>{item.fp}</Text>
      <TouchableOpacity
      onPress={()=>deletelistitem(item.key)}
      >
      <View style={styles.crossview}>
      <Text style={styles.cross}>x</Text>
      </View>
      </TouchableOpacity>
      </View>
      </TouchableOpacity>
      )}
    </ScrollView>
     </View>
   )
 }

export default function App() {

  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={homescreen} 
    options={({ navigation, route }) => ({
            headerRight:()=> (
              <Button
                title="HISTORY"
                color="#00cc00"
              />
            ),
          })}/>
    <Stack.Screen name="History" component={historyscreen}
    options={({ navigation, route }) => ({
            headerRight:()=> (
              <Button
                onPress={() => alert('This is a bueetton!')}
                title="Clear"
                color="#00cc00"
              />
            ),
          })} />
    </Stack.Navigator>
    </NavigationContainer>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor:'#000'

  },
  input:{
    alignSelf:"center",
    borderWidth: 4,
    padding: 10,
    borderRadius: 15,
    width: 300,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#5b02b4'
  },
  scrollViewItem:{
    width : '100%',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    justifyContent: "space-between",
    flexDirection : 'row',
    backgroundColor: '#5b02b4',
    borderRadius: 5,
    
  },
  scrollview:{
    width : '100%',
    color: '#fff'
  },
  cross:{
    fontWeight:'bold',
    color:'red'
  },
  crossview:{
    backgroundColor:'black',
    borderRadius: 50,padding : 5, width:30,
    justifyContent: 'center',
    alignItems:"center"
  }
}
)