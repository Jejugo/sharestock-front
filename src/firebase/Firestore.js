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
} from 'firebase/firestore';

export default function initalizeFirestore (){
	const db = getFirestore();

	return {
		addToArray: async function({ collection, id, itemKey, item }){
			try {
				const docRef = doc(db, collection, id);
				const docSnap = await getDoc(docRef);
				if(docSnap.exists()){
					await updateDoc(docRef, {
						[itemKey]: arrayUnion(item),
					});
              
					console.info('Adding data to existing collection.');
				}
				else {
					await setDoc(docRef, {
						[itemKey]: arrayUnion(item),
					});
              
					console.info('Creating a new collection and adding the item.');
				}
			}

			catch(err){
				console.error('There was an error when adding data to firestore.');
				throw err;
			}
		},

		removeFromArray: async function ({ collection, id, item }){
			try{
				const docRef = doc(db, collection, id);
				await updateDoc(docRef, {
					shares: arrayRemove(item)
				});
				console.info('Data was successfully updated.');
			}
			catch(err){
				console.error('There was an error when removing data from firebase.');
				throw err;
			}
		},

		deleteFieldFromObject: async function ({ collection, id, field }){
			try{
				const docRef = doc(db, collection, id);
				await updateDoc(docRef, {
					[field]: deleteField()
				});
				console.info('Data was successfully deleted.');
			}
			catch(err){
				console.error('There was an error when removing data from firebase.');
				throw err;
			}
		},

		getAllItems: async function ({ collection, id }){
			const docRef = doc(db, collection, id);
			const docSnap = await getDoc(docRef);
			if(docSnap.exists()){
				return docSnap.data();
			}
		},

		addSingleItem: async function({ collection, id, item }){
			const docRef = doc(db, collection, id);
			const docSnap = await getDoc(docRef);

			if(docSnap.exists()) await updateDoc(docRef, item);
			else await setDoc(docRef, item);
		},

		getSingleItem: async function({ collection, id }){
			const docRef = doc(db, collection, id);
			const docSnap = await getDoc(docRef);
			if(docSnap.exists()) return docSnap.data();
		},

		addListAsObjects: async function({collection, id, list, key = null}){
			try { 
				const docRef = doc(db, collection, id);
				const docSnap = await getDoc(docRef);

				const firebaseState = list.reduce((acc, item, index) => {
					return {
						...acc,
						[key || index]: {
							...item
						},
					};
				}, {});

				if(!Object.keys(firebaseState).length) {
					await deleteDoc(docRef);
					return;
				}
				if(docSnap.exists()) await updateDoc(docRef, firebaseState);
				else await setDoc(docRef, firebaseState);
			}
			catch(err){
				console.error('There was an error while adding the list as an object to Firestore.');
				throw err;
			}
		},

		addListAsObjectsWithList: async function({collection, id, list, key = null}){
			const docRef = doc(db, collection, id);
			const docSnap = await getDoc(docRef);
			const firebaseState = list.reduce((acc, item, index) => {
				return {
					...acc,
					[key || index]: [
						...acc[key],
						item
					]
				};
			}, {
				[key]: []
			});

			if(!Object.keys(firebaseState).length) {
				await deleteDoc(docRef);
				return;
			}
			if(docSnap.exists()) await updateDoc(docRef, firebaseState);
			else await setDoc(docRef, firebaseState);
      
		},

		removeObjectKey: async function({ collection, id, item }){
			try {
				const firebaseState = await this.getAllItems({ collection, id });
				const keyToDelete = Object.keys(firebaseState).filter(key => 
					firebaseState[key].statement === item);
        
				delete firebaseState[keyToDelete];

				const docRef = doc(db, collection, id);
				const docSnap = await getDoc(docRef);
  
				if(docSnap.exists()) {
					await updateDoc(docRef, firebaseState);
					console.info('Data was successfully updated.');
				}
				else throw new Error('Collection does not exist.');
			}
			catch(err){
				console.error('There was an error when removing the key from Firestore.');
				throw err;
			}
		}
	};
}
