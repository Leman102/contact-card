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

// Exported READ function
export const getDb = async () => {
    console.log('GET from database');

    //create a connection to the db and version we want to use
    const contactDb = await openDB('contact_db',1);

    //Create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts','readonly');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .getAll() method to get all data in db
    const request = store.getAll();

    //Get request confirmation
    const result = await request;
    console.log('result.value', result);
    return result;
};

// Exported POST function
export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the database');

    //create a connection to the db and version we want to use
    const contactDb = await openDB('contact_db',1);

    //Create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts','readwrite');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .add() method on the store and pass in the content
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });
    
    //Get request confirmation
    const result = await request;
    console.log('🚀 - data saved to the database', result);
};