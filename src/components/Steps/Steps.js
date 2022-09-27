import React from 'react';
import ArrowStep from '../ArrowStep/ArrowStep';
import * as S from './styles';

export default function Steps(props) {
	const { steps, count, handleCountNext, handleCountPrev } = props;

	return (
		<S.StepsWrapper>
			<S.Steps>
				<S.Title>{steps[count].title}</S.Title>
				<S.Description>{steps[count].description}</S.Description>
				<S.Explanation
					dangerouslySetInnerHTML={{ __html: steps[count].explanation }}
				></S.Explanation>
			</S.Steps>
			<ArrowStep
				handleCountPrev={handleCountPrev}
				handleCountNext={handleCountNext}
			></ArrowStep>
			<style jsx>{''}</style>
		</S.StepsWrapper>
	);
}
