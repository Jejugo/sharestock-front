import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthUserContext';
import Firestore from '../firebase/Firestore';

export default function CompanyTypePercentages() {
	const { authUser } = useAuth();

	const [selectForms, setSelectForms] = useState([
		{
			name: 'agro',
			className: 'companyType__item_type_0',
			value: '',
		},
	]);

	const addNewItem = () => {
		setSelectForms(prevState => [
			...prevState,
			{
				name: 'agro',
				className: `companyType__item_type_${prevState.length}`,
				value: '',
			},
		]);
	};

	const removeItem = (e, name) => {
		e.preventDefault();
		setSelectForms(prevState => prevState.filter(item => item.name !== name));
	};

	const handleCompanyType = (e, index) => {
		setSelectForms(prevState => {
			prevState[index].name = e.target.value;
			return [
				...prevState.map((stateItem, i) =>
					i === index ? prevState[index] : stateItem,
				),
			];
		});
	};

	const handleCompanyShare = (e, index) => {
		setSelectForms(prevState => {
			prevState[index].value = e.target.value;
			return [
				...prevState.map((stateItem, i) =>
					i === index ? prevState[index] : stateItem,
				),
			];
		});
	};

	const checkIfPercentagesSum100 = () => {
		const sum = selectForms.reduce((acc, curr) => {
			return parseInt(curr.value) + acc;
		}, 0);
		return sum === 100;
	};

	const calculateAndShowChart = async () => {
		if (checkIfPercentagesSum100()) {
			try {
				const firebaseState = selectForms.reduce((acc, item) => {
					return {
						...acc,
						[item.name]: item.value,
					};
				}, {});
				await Firestore().addSingleItem({
					collection: 'userStrategyPercentages',
					id: authUser.uid,
					item: firebaseState,
				});
			} catch (error) {
				console.error(error);
			}
		}

		return;
	};

	useEffect(async () => {
		const firestorePercentages = await Firestore().getSingleItem({
			collection: 'userStrategyPercentages',
			id: authUser.uid,
		});
		const cachedPercentageList = Object.keys(firestorePercentages).map(
			(companyName, index) => ({
				name: companyName,
				className: `companyType__item_type_${index}`,
				value: firestorePercentages[companyName],
			}),
		);

		setSelectForms(cachedPercentageList);
	}, []);

	return (
		<section className="companyType">
			<>
				<h1 className="companyType__title">
          Defina a parcela de investimento nos tipos de negócio:
				</h1>
				<h6 className="companyType__title">Ações</h6>
				{checkIfPercentagesSum100() === true ? (
					<p className="companyType__feedback-positive">
            Os valores somam 100%!
					</p>
				) : (
					<p className="companyType__feedback-negative">
            Os valores tem que somar 100%.
					</p>
				)}
				<ul className="companyType__list">
					{selectForms.length > 0 &&
            selectForms.map((selectForm, index) => (
            	<li className="companyType__list_item" key={index}>
            		<select
            			className="companyType__list_item_dropdown"
            			value={selectForm.name}
            			onChange={e => handleCompanyType(e, index)}
            		>
            			<option value="agro">Agro</option>
            			<option value="ti">TI</option>
            			<option value="alimenticio">Alimenticio</option>
            		</select>
            		<Slider
            			aria-label="Custom marks"
            			defaultValue={20}
            			getAriaValueText={''}
            			step={5}
            			value={selectForm.value}
            			onChange={e => handleCompanyShare(e, index)}
            			valueLabelDisplay="auto"
            			marks={[]}
            		/>
            		<span className="companyType__list_item_value">
            			{selectForm.value}%
            		</span>
            		{/* <input
                    className="companyType__list_item_input"
                    value={selectForm.value}
                    onChange={(e) => handleCompanyShare(e, index)}
                  ></input>{" "} */}

            		<span
            			className="companyType__list_item--remove"
            			onClick={e => removeItem(e, selectForm.name)}
            		>
            			<DeleteIcon />
            		</span>
            	</li>
            ))}
				</ul>
				<button className="companyType__btn" onClick={addNewItem}>
          Adicionar
				</button>
				<button className="companyType__btn" onClick={calculateAndShowChart}>
          Salvar
				</button>
			</>
			<style>
				{`
        .companyType__title{
          font-size: 26px;
        }
        .companyType{
          text-align: center;
        }
        .companyType__chart_button{
          margin: 2% 0;
          padding: 5px 15px;
          margin: 10px;
        }
        .companyType__list{
            list-style: none;
            padding: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .companyType__list_item{
          margin: 5px 0;
          display: flex;
          width: 60%;
          justify-content: center;
          align-items: center;
        }
        .companyType__list_item_value{
          margin-left: 20px;
        }
        .companyType__list_item--remove{
          margin-left: 20px;  
          cursor: pointer;
        }
        .companyType__list_item_dropdown{
          list-style: none;
          padding: 5px 15px;
          margin: 5px 20px;
          font-size: 16px;
        }
        .companyType__list_item_input{
          width: 30px;
          padding: 5px;
          font-size: 16px;
      }
        .companyType__item_type{
            padding: 10px 20px;
        }
        .companyType__feedback-positive{
            color: green;
            font-size: 18px;
        }
        .companyType__feedback-negative{
            color: red;
            font-size: 18px;
        }
        .companyType__btn{
          padding: 5px 15px;
          margin: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        
      `}
			</style>
		</section>
	);
}
