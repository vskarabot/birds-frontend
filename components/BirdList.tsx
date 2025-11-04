import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ActivityIndicator, ScrollView, Image as RNImage } from "react-native";
import Bird from "./Bird";
import { Ionicons } from "@expo/vector-icons";
import latSlo from '../constants/FamilyNames';
import { FlatList } from "react-native";

export default function BirdList() {

    const [birdsList, setBirdsList] = useState([]);
    const fullList = useRef([]);

    const [inputText, setInputText] = useState('');
    const [debValue, setDebVal] = useState(inputText);

    const [status, setStatus] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const handleInputChange = (text: string) => {
        setInputText(text);
    }
    
    const clearText = () => {
        setInputText('');
    }

    const getBirds = async() => {
      setRefreshing(true);

      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_EXPRESS_IP}/api/birds?grouped=`);
      if (response.status === 200) {
          fullList.current = response.data;
          setBirdsList(response.data);
      }

      setRefreshing(false);
    };

    useEffect(() => {
        getBirds();
    }, []);

    useEffect(() => {
      const time = setTimeout(() => {
        setDebVal(inputText);
      }, 500);

      return () => clearTimeout(time);
    }, [inputText]);

    useEffect(() => {
        const getBird = async() => {
            setRefreshing(true);
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_EXPRESS_IP}/api/birds/search/${inputText}`);

            if (!response.data) {
                setBirdsList(fullList.current);
            }
            else {
                setBirdsList(response.data);
            }
            setStatus('');
            setRefreshing(false);

            if (response.data.length === 0) {
              setStatus('Ni rezultatov.');
            }
        }

        getBird();
    }, [debValue]);

    const renderBirdGroup = ({item: group}: {item: BirdGroup}) => {
      return (
        <View>
          <View style={styles.groupCon}>
            <View style={styles.groupNameCon}>
              {latSlo[group.groupOrder] && (
                <Text style={[styles.familyNameSlo]}>
                  {latSlo[group.groupOrder].slo} ~{' '}
                </Text>
              )}

              <Text style={[styles.familyName]}>
                {latSlo[group.groupOrder].eng}
              </Text>
            </View>
          </View>

          {group.birds && (
            <FlatList
              data={group.birds}
              keyExtractor={(bird) => bird.speciesCode}
              renderItem={({ item: bird }) => <Bird key={bird.speciesCode} birdProp={bird} />
            }
            />
          )}
        </View>
      );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.searchContainer}>
                <View style={styles.search}>
                    <Ionicons name={'search'} style={styles.searchIcon} />         
                    <TextInput style={styles.searchBar} placeholder='Išči ptice...' placeholderTextColor={'#c0c0c0'} value={inputText} onChangeText={handleInputChange} /> 
                    
                    {inputText.length > 0 && (
                        <TouchableOpacity onPress={clearText}>
                            <Ionicons name={'close-circle-outline'} style={styles.cancel}/>
                        </TouchableOpacity>
                    )}            
                </View>
            </View>

            {status && (
              <Text style={{ color: 'white', padding: 10 }}>{status}</Text>
            )}

            <FlatList
              data={birdsList}
              keyExtractor={(group: BirdGroup) => group.groupOrder.toString()}
              renderItem={renderBirdGroup}
              initialNumToRender={15}
              onRefresh={getBirds}
              refreshing={refreshing}
            />

        </View>
    );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingBottom: 32,
    paddingHorizontal: 10,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 40,
    alignItems: 'center'
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    height: '100%',
    color: 'white'
  },
  searchIcon: {
    fontSize: 18,
    color: '#c0c0c0'
  },
  cancel: {
    fontSize: 18,
    color: '#c0c0c0'
  },
  status: {
    color: '#fff'
  },
  groupCon: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#292929',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#505050',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  groupNameCon: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  familyNameSlo: {
    fontSize: 12,
    color: 'white'
  },
  familyName: {
    fontSize: 12,
    color: '#c0c0c0'
  },
});
