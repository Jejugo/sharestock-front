import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthUserContext';
import Firestore from '../firebase/Firestore';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import StrategyDefinition from './StrategyDefinition';

export default function StrategyForm() {
	const db = getFirestore();
	const { authUser } = useAuth();
	const [inputStatement, setInputStatement] = useState('');
	const [inputWeight, setInputWeight] = useState('');

	const [statements, setStatements] = useState([]);

	const addStatement = e => {
		e.preventDefault();
		if (!inputWeight) {
			alert('Coloque um peso!');
			return;
		}
		setStatements(prevState => [
			...prevState,
			{
				statement: inputStatement,
				weight: inputWeight,
				checked: false,
			},
		]);
		setInputWeight('');
		setInputStatement('');
	};

	const removeStatement = async (e, { statement }, index) => {
		if (
			confirm('Are you sure you want to save this thing into the database?')
		) {
			await Firestore().deleteFieldFromObject({
				collection: 'userStrategyStatements',
				id: authUser.uid,
				field: index,
			});
			setStatements(prevState => [
				...prevState.filter((item, i) => index !== i),
			]);
		}
	};

	const storeStatements = async e => {
		try {
			e.preventDefault();
			await Firestore().addListAsObjects({
				collection: 'userStrategyStatements',
				id: authUser.uid,
				list: statements,
			});
			alert('Salvo');
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputStatement = e => setInputStatement(e.target.value);

	const handleInputWeight = e => {
		if (e.target.validity.valid) setInputWeight(e.target.value);
	};

	// const handleStatementCheck = (e, index) => {
	// 	setStatements((prevState) => [
	// 		...prevState.map((state, i) =>
	// 			i === index ? { ...state, checked: !state.checked } : state
	// 		),
	// 	]);
	// };

	useEffect(async () => {
		const statementsRef = doc(db, 'userStrategyStatements', authUser.uid);
		const statementsSnap = await getDoc(statementsRef);
		if (statementsSnap.exists()) {
			const strategyStatements = statementsSnap.data();

			const cachedStrategyStatementsList = Object.keys(strategyStatements).map(
				(companyName, index) => ({
					statement: strategyStatements[companyName].statement,
					weight: strategyStatements[companyName].weight,
					checked: false,
				}),
			);
			setStatements(cachedStrategyStatementsList);
		}
	}, []);

	return (
		<section className="strategy-form">
			<StrategyDefinition
				handleInputStatement={handleInputStatement}
				inputStatement={inputStatement}
				handleInputWeight={handleInputWeight}
				inputWeight={inputWeight}
				statements={statements}
				addStatement={addStatement}
				storeStatements={storeStatements}
				removeStatement={removeStatement}
			></StrategyDefinition>
			<style>{`
      .strategy-form{
        margin: auto 23.5%;
      }
      .strategy-form__title, .strategy-form__subtitle, .strategy-form__form{
        text-align: center;
      }
      `}</style>
		</section>
	);
}
