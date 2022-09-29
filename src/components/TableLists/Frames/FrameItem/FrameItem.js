import React from 'react';
import * as S from './styles';

function FrameItem({ item, goToFundamentus, indicatorsValidator }) {
  return (
    <S.FrameItem onClick={() => goToFundamentus(item['Papel'])}>
      <S.FrameTitle className="share__title">{item['Papel']}</S.FrameTitle>
      <S.FramePrice className="share__price">{item['Cotação']}</S.FramePrice>
      <S.FrameIndicator status={indicatorsValidator(item, 'Cresc.5anos')}>
        Cresc5anos: {item['Cresc.5anos']}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'Dividend Yield')}>
        Dividend Y.: {item['Dividend Yield']}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'Dividend Yield')}>
        Liq Corrente: {item['Dividend Yield']}
      </S.FrameIndicator>
      <S.FrameIndicator
        status={indicatorsValidator(item, 'Dívida Bruta/Patrim.')}
      >
        Dívida/PL: {item['Dívida Bruta/Patrim.']}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'Margem Líquida')}>
        Margem Líq: {item['Margem Líquida']}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'ROE')}>
        ROE: {item['ROE']}
      </S.FrameIndicator>
      <style jsx>{`
        .good {
          color: rgb(94, 194, 94);
        }

        .alert {
          color: rgba(255, 255, 92, 0.742);
        }

        .bad {
          color: rgb(167, 60, 60);
        }
      `}</style>
    </S.FrameItem>
  );
}

export default FrameItem;
