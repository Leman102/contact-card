import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () => {
    //create a new db named 'contact_db' version 1
    openDB('contact_db', 1,{
        //add db schema if it hasn't been initialized
        upgrade(db){
            if(db.objectStoreNames.contains('contacts')){
                console.log('contacts store already exists');
                return;
            }
            //Create a new obj store for the data and give it a key name
            //of 'id' which will increment automatically
            db.createObjectStore('contacts', {keyPath: 'id', autoIncrement: true});
            console.log('contacts store created');
        }
    })
}
