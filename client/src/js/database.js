import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');

  // Open the object store
  const store = tx.objectStore('jate');

  // Use the put() method to update an entry in the database
  const request = store.put({ id: 1, value: content }); // `id: 1` ensures only one entry in the DB

  // Confirm the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readonly');

  // Open the object store
  const store = tx.objectStore('jate');

  // Use the get() method to get data by id
  const request = store.get(1); // Retrieves content with id 1

  // Confirm the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();