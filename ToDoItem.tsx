import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { ToDoItem } from './models';
export const ToDoItemComponent: React.FC<{
  todo: ToDoItem;
  deleteItem: Function;
}> = ({ todo: { id, value }, deleteItem }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoTextContainer}>
        <Text
          style={styles.sectionTitle}>
          {value}
        </Text>
      </View>
      <TouchableHighlight style={styles.btnConfirma} onPress={() => deleteItem(id)}
        accessibilityLabel="add todo item" >
        <Image style={{ height: 35, width: 35, tintColor: '#0f0' }} source={require('./imgs/correct.png')} />
      </TouchableHighlight>
      
    </View>
  );
};
const styles = StyleSheet.create({
  todoContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 3,
    justifyContent:"center",
    alignItems:'center'
  },
  todoTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems:'center',
    textAlign:'center',
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#2d3a4a",
    
  },
  btnConfirma: {
    backgroundColor: '#2B3B4A',
    height: 70,
    width: 70,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
});