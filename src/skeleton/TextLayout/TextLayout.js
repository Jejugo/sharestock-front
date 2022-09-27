import React from 'react';
import * as S from './styles';

const TextLayout = ({ children }) => (
	<S.TextLayourWrapper>
		<S.TextLayourContainer>{children}</S.TextLayourContainer>
	</S.TextLayourWrapper>
);

export default TextLayout;
