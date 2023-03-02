import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'; 
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'white'}
          centerComponent={{
            text: '𝐌𝐨𝐧𝐤𝐞𝐲 𝐂𝐡𝐮𝐧𝐤𝐲',
            style: { color: '#black', fontSize: 20, marginLeft: -25, },
          }}
        />

        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]?(
            this.setState({ chunks: db[word].chunks }),
            this.setState({ phonicSounds: db[word].phones })
            ):
            alert("The word does not exist in our database");
          }}>
          <Text style={styles.buttonText}>Start
          
    
          </Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  inputBox: {
    backgroundColor: 'white',
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 325,
    textAlign: 'center',
    borderWidth: 1,
    outline: 'none',
  },
  goButton: {
    backgroundColor: 'white',
    width: '50%',
    height: 60,
    alignSelf: 'center',
    padding: 10,
    margin: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 50,
    height: 50,
    marginLeft: 240,
    marginTop: -50,
  }
});
