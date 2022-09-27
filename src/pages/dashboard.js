import React from 'react';
import Template from '../skeleton/Template/Template';
import DashboardComponent from '../components/Dashboard';
import Title from '../components/Title/Title';

export default function Dashboard() {
	return (
		<section className="dashboard">
			<Template tabTitle={'dashboard'}>
				<Title text="Olá, Jeff"></Title>
				<DashboardComponent></DashboardComponent>
			</Template>
		</section>
	);
}
