/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { ToDoItemComponent } from './ToDoItem';
import { ToDoItem } from './models';
import { getDBConnection, getTodoItems, saveTodoItems, createTable, clearTable, deleteTodoItem } from './db-service';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [{ id: 0, value: 'Lavar louça' }, { id: 1, value: 'Passear com o cachorro' }];
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      } else {
        await saveTodoItems(db, initTodos);
        setTodos(initTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const newTodos = [...todos, {
        id: todos.length ? todos.reduce((acc, cur) => {
          if (cur.id > acc.id) return cur;
          return acc;
        }).id + 1 : 0, value: newTodo
      }];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };
  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <StatusBar backgroundColor={"#2d3a4a"} />
      <View style={[styles.appTitleView]}>
        <Text style={styles.appTitleText}> Lista de Tarefas </Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">

        <View>
          {todos.map((todo) => (
            <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem}/>
          ))}
        </View>
      </ScrollView>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} value={newTodo} onChangeText={text => setNewTodo(text)} />
        <TouchableHighlight style={styles.btnConfirma} onPress={addTodo} >
          <Image style={{ height: 35, width: 35, tintColor: '#0f0' }} source={require('./imgs/plus.png')} />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomColor: '#2d3a4a',
    borderBottomWidth:5
  },
  appTitleText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2d3a4a'
  },
  textInputContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderColor: '#2d3a4a',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    width: '80%',
    margin: 10,
    color:"#2d3a4a",
    backgroundColor: 'white',
    
  },
  btnTarefa: {
    borderRadius: 100,
    borderWidth: 2
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
export default App;