import React from 'react';
import CompanyTypePercentages from '../components/CompanyTypePercentages';
import Template from '../skeleton/Template/Template';

export default function Goals() {
	return (
		<section>
			<Template tabTitle={'strategy'}>
				<CompanyTypePercentages></CompanyTypePercentages>
			</Template>
		</section>
	);
}
