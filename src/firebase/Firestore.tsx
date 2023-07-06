import {
  getFirestore,
  updateDoc,
  setDoc,
  getDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  deleteField
} from '@firebase/firestore'

import {
  IFirebaseAddToArray,
  IFirebaseRemoveFromArray,
  IFirebaseRemoveFieldFromObject,
  IFirebasegetData,
  IFirebaseAddListAsObject,
  IFirebaseAddListsAsObjectWithList,
  IFirebaseRemoveObjectKey,
  IFirebaseSetData,
  IFirebaseRemoveFromArrayByIndex
} from './interfaces'

export default function initalizeFirestore() {
  const db = getFirestore()

  return {
    /**
     * {
     *    [key: string]: string[]
     * }
     */
    addArrayItemToFirestoreKey: async function ({
      collection,
      id,
      itemKey,
      item
    }: IFirebaseAddToArray) {
      try {
        const docRef = doc(db, collection, id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          console.info('Adding data to existing collection.')
          await updateDoc(docRef, {
            [itemKey]: arrayUnion(item)
          })
        } else {
          console.info(`
            Creating a new collection and adding the item. 
            Collection name: ${collection}`)
          await setDoc(docRef, {
            [itemKey]: arrayUnion(item)
          })
        }
      } catch (err) {
        console.error('There was an error when adding data to firestore.')
        throw err
      }
    },

    /**
     * {
     *    [key: string]: string[]
     * }
     */
    removeArrayItemFromFirestoreKey: async function ({
      collection,
      id,
      item,
      key
    }: IFirebaseRemoveFromArray) {
      try {
        const docRef = doc(db, collection, id)
        await updateDoc(docRef, {
          [key]: arrayRemove(item)
        })
        console.info('Data was successfully updated.')
      } catch (err) {
        console.error('There was an error when removing data from firebase.')
        throw err
      }
    },

    removeArrayItemFromFirestoreKeyByIndex: async function ({
      collection,
      id,
      index,
      key
    }: IFirebaseRemoveFromArrayByIndex) {
      try {
        const docRef = doc(db, collection, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data && Array.isArray(data[key])) {
            // Remove the item at the specified index
            data[key].splice(index, 1)

            // Update the document
            await updateDoc(docRef, { [key]: data[key] })

            console.info('Data was successfully updated.')
          } else {
            console.error('Invalid data structure.')
          }
        } else {
          console.error('No such document.')
        }
      } catch (err) {
        console.error('There was an error when removing data from firebase.')
        throw err
      }
    },

    /**
     * {
     *    [field1: whatever]: {
     *
     *    },
     *    [field2: whatever]: {
     *
     *    }
     * }
     */
    deleteKeyValue: async function ({
      collection,
      id,
      field
    }: IFirebaseRemoveFieldFromObject) {
      try {
        const docRef = doc(db, collection, id)
        await updateDoc(docRef, {
          [field]: deleteField()
        })
        console.info('Data was successfully deleted.')
      } catch (err) {
        console.error('There was an error when removing data from firebase.')
        throw err
      }
    },

    getData: async function ({
      collection,
      id
    }: IFirebasegetData): Promise<any> {
      const docRef = doc(db, collection, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) return docSnap.data()
      return
    },

    /**
     * item = {
     *    [key1]: {}
     *    [key1]: {}
     *    [key1]: {}
     *    [key1]: {}
     * }
     *
     */
    setData: async function ({ collection, id, item }: IFirebaseSetData) {
      const docRef = doc(db, collection, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) await updateDoc(docRef, item)
      else await setDoc(docRef, item)
    },

    /**
     * Asynchronously sets a Firestore document with a given list by a specified key.
     * It first retrieves the current document snapshot, then reduces the provided list
     * to an object with keys corresponding to the specified key or index and values as
     * individual items. This object is then used to set or update the Firestore document.
     *
     * @param {object} params - The parameters for the method.
     * @param {string} params.collection - The name of the Firestore collection.
     * @param {string} params.id - The ID of the document in the collection.
     * @param {Array} params.list - The list of items to be added to the document.
     * @param {string} [params.key=undefined] - The key to be used for each item in the list.
     *                                          If not provided, the index will be used.
     *
     * @returns {Promise} - A promise that resolves when the set operation is complete.
     * @throws Will throw an error if the Firestore operation fails.
     *
     * @example
     *
     * const params = {
     *   collection: 'users',
     *   id: '123',
     *   list: [{ statement: "John Doe" }, { statement: "Jane Doe" }],
     *   key: 'employees'
     * }
     *
     * setDataByKey(params).then(() => console.log('Data set successfully'))
     *                     .catch((error) => console.error('Error setting data:', error));
     *
     * // If the 'users' collection has a document with ID '123', after calling this function
     * // with the above parameters, the document will be updated to:
     * // { "employees": { statement: "John Doe" }, "employees": { statement: "Jane Doe" } }
     */
    setDataByKey: async function ({
      collection,
      id,
      list,
      key = undefined
    }: IFirebaseAddListAsObject) {
      try {
        const docRef = doc(db, collection, id)
        const docSnap = await getDoc(docRef)

        const firebaseState = list.reduce((acc, item, index) => {
          return {
            ...acc,
            [key || index]: {
              ...item
            }
          }
        }, {})

        if (!Object.keys(firebaseState).length) {
          await deleteDoc(docRef)
          return
        }
        if (docSnap.exists()) await updateDoc(docRef, firebaseState)
        else await setDoc(docRef, firebaseState)
      } catch (err) {
        console.error(
          'There was an error while adding the list as an object to Firestore.'
        )
        throw err
      }
    },

    /**
     * Asynchronously updates a Firestore document with a given list by a specified key.
     * It first retrieves the current document snapshot, then reduces the provided list
     * to an object with keys corresponding to the specified key or index and values as
     * an array of items. This object is then used to update or set the Firestore document.
     *
     * @param {object} params - The parameters for the method.
     * @param {string} params.collection - The name of the Firestore collection.
     * @param {string} params.id - The ID of the document in the collection.
     * @param {Array} params.list - The list of items to be added to the document.
     * @param {string} [params.key=undefined] - The key to be used for each item in the list.
     *                                          If not provided, the index will be used.
     *
     * @returns {Promise} - A promise that resolves when the set operation is complete.
     * @throws Will throw an error if the Firestore operation fails.
     *
     * @example
     *
     * const params = {
     *   collection: 'users',
     *   id: '123',
     *   list: [{ statement: "John Doe" }, { statement: "Jane Doe" }],
     *   key: 'employees'
     * }
     *
     * setListByKey(params).then(() => console.log('List set successfully'))
     *                     .catch((error) => console.error('Error setting list:', error));
     *
     * // If the 'users' collection has a document with ID '123', after calling this function
     * // with the above parameters, the document will be updated to:
     * // { "employees": [{ statement: "John Doe" }, { statement: "Jane Doe" }] }
     */
    setListByKey: async function ({
      collection,
      id,
      list,
      key = undefined
    }: IFirebaseAddListsAsObjectWithList) {
      const docRef = doc(db, collection, id)
      const docSnap = await getDoc(docRef)
      if (key) {
        const firebaseState = list.reduce(
          (
            acc: { [key: string]: IStatement[] },
            item: IStatement,
            index: number
          ) => {
            return {
              ...acc,
              [key || index]: [...acc[key], item]
            }
          },
          {
            [key]: []
          }
        )

        if (!Object.keys(firebaseState).length) {
          await deleteDoc(docRef)
          return
        }
        if (docSnap.exists()) await updateDoc(docRef, firebaseState)
        else await setDoc(docRef, firebaseState)
      }
      return
    },

    /**
     * Asynchronously removes an object key in Firestore database.
     * It finds the key of the object where the statement is the item
     * to be deleted, then removes it.
     *
     * @param {object} params - The parameters for the method.
     * @param {string} params.collection - The name of the Firestore collection.
     * @param {string} params.id - The ID of the document in the collection.
     * @param {string} params.item - The statement value of the key to be removed.
     *
     * @returns {Promise} - A promise that resolves when the update operation is complete.
     * @throws Will throw an error if the Firestore operation fails.
     *
     * @example
     *
     * const params = {
     *   collection: 'users',
     *   id: '123',
     *   item: 'John Doe'
     * }
     *
     * removeObjectKey(params).then(() => console.log('Key removed successfully'))
     *                        .catch((error) => console.error('Error removing key:', error));
     *
     * // If the 'users' collection has a document with ID '123', which contains an object like:
     * // { "a": { statement: "John Doe" }, "b": { statement: "Jane Doe" } }
     * // After calling this function with the above parameters, the document will be:
     * // { "b": { statement: "Jane Doe" } }
     */
    removeObjectKey: async function ({
      collection,
      id,
      item
    }: IFirebaseRemoveObjectKey) {
      try {
        const firebaseState = await this.getData({ collection, id })
        if (firebaseState) {
          const keyToDelete = Object.keys(firebaseState).find(
            (key) => firebaseState[key].statement === item
          )

          if (keyToDelete) delete firebaseState[keyToDelete]

          const docRef = doc(db, collection, id)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            await updateDoc(docRef, firebaseState)
            console.info('Data was successfully updated.')
          } else throw new Error('Collection does not exist.')
        }
      } catch (err) {
        console.error(
          'There was an error when removing the key from Firestore.'
        )
        throw err
      }
    }
  }
}
