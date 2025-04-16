import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ActivityIndicator, ScrollView, Image as RNImage } from "react-native";
import Bird from "./Bird";
import { Ionicons } from "@expo/vector-icons";
import latSlo from '../constants/FamilyNames';
import { FlatList } from "react-native";

// flatlist was used because it supports lazy loading - scrollview is super slow
// TODO - replace flatlist with section list
// -> for this we need title: and data: [...]
// try reshaping data in mongo, so it returns that shape
// - !! field that we want to display as a title isn't unique - eagles for example can have different family names but same ordergroup
// try finding most common one like i already did in this file but on backend

export default function BirdList() {

    const [birdsList, setBirdsList] = useState([]);
    const fullList = useRef([]);

    const [inputText, setInputText] = useState('');
    const [debValue, setDebVal] = useState(inputText);

    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState('');

    const handleInputChange = (text: string) => {
        setInputText(text);
    }
    
    const clearText = () => {
        setInputText('');
    }

    useEffect(() => {
        const getBirds = async() => {
            setLoading('loading');

            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_EXPRESS_IP}/api/birds?grouped=`);

            console.log(response.status)

            if (response.status === 200) {
                fullList.current = response.data;
                setBirdsList(response.data);
                setLoading('');
            }
        };

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
            setLoading('loading');
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_EXPRESS_IP}/api/birds/search/${inputText}`);

            if (!response.data) {
                setBirdsList(fullList.current);
            }
            else {
                setBirdsList(response.data);
            }
            setStatus('');
            setLoading('');

            if (response.data.length === 0) {
              setStatus('Ni rezultatov.');
            }
        }

        getBird();
    }, [debValue]);


    // problem is as we grouped birds by similarity, its not sure we will get all names in same object that have same family name
    // example -> if we take group.birds[0] it can take "Osprey" as family name, while all others have "Hawks and Vultures"
    // so we find most common name found by bird in group and display that
    
    // UPDATE - i don't know how commonly (if even) groupOrder numbers change, 
    // but either way it's probably better to just use predefined dictionary than this function... ||
    // or aggregate on the backend
    /*const mostCommonName = (groupBirds: BirdInterface[]) => {

      const famCounts: { [key: string ]: number} = {};

      groupBirds.forEach((group: BirdInterface) => {
        famCounts[group.familyComName] = (famCounts[group.familyComName] || 0) + 1;
      })
      
      let max = 0;
      let maxEl = "";
      for (let group in famCounts) {
        if (famCounts[group] > max) {
          max = famCounts[group];
          maxEl = group;
        }
      }

      return maxEl;
    }*/


    const renderBirdGroup = ({item: group}: {item: BirdGroup}) => {
      return (
        <View>
          <View style={styles.groupCon}>
            <View style={styles.groupNameCon}>
              {latSlo[group.groupOrder] && (
                <Text style={[styles.familyNameSlo, { color: 'white'}]}>
                  {latSlo[group.groupOrder].slo} -{' '}
                </Text>
              )}
              <Text style={[styles.familyName, { color: '#c0c0c0' }]}>
                {latSlo[group.groupOrder].eng}
              </Text>
            </View>
          </View>
        
          {group.birds && (
            <FlatList
              data={group.birds}
              keyExtractor={(bird) => bird.speciesCode}
              renderItem={({ item: bird }) => <Bird key={bird.speciesCode} birdProp={bird} />}
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
                {loading === 'loading' && (
                    <ActivityIndicator size={24}/>
                )}
            </View>

            {status && (
              <Text style={{ color: 'white', padding: 10 }}>{status}</Text>
            )}

            <FlatList
              style={{ backgroundColor: '#505050' }}
              data={birdsList}
              keyExtractor={(group: BirdGroup) => group.groupOrder.toString()}
              renderItem={renderBirdGroup}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#202020',
    marginBottom: 10
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#202020',
    borderColor: '#C0C0C0',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
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
    fontSize: 24,
    color: '#c0c0c0'
  },
  status: {
    color: '#fff'
  },
  family: {
    width: 100,
    height: 30,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#6082B6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    elevation: 20,
    borderColor: 'white',
    backgroundColor: '#202020',
  },
  groupNameCon: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  familyNameSlo: {
    fontSize: 16,
    fontWeight: '600',
  },
  familyName: {
    fontSize: 14
  },
});
