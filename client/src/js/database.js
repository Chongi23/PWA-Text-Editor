import { openDB } from 'idb';
//Commented this out with suggestion from learning assistant, got rid of error messages
//import { javascript } from 'webpack';

const initdb = async () =>
//Creating new database named "jate" which will be using version 1 or the database
  openDB('jate', 1, {
    //Add our database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //Create a new object store for the data and give it a key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //Create a connection to the database and the version we want to use
  const jateDb = await openDB('jate', 1);
  //Create a new transaction and specify the database abd data privileges
  const tx = jateDb.transaction('jate', 'readWrite');
  //Open up the desired object store
  const store = tx.objectStore('jate');
  //Use the add() method on the store and pass in the content
  const request = store.add({ content });
  //Get confirmation of the request
  const result = await request;
    console.log('Data saved to database', result?.value);
//What do we need the error for, come back to this
   // console.error('putDb not implemented');
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readOnly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  return result?.value;
};
//console.error('getDb not implemented');

initdb();
