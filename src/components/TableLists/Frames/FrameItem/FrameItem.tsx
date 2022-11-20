import indicatorsValidator from 'validations/indicators'
import React from 'react'
import * as S from './styles'

interface FrameItemProps {
  item: IFundamentusStockItem
  goToFundamentus: (share: any) => void
}

function FrameItem({ item, goToFundamentus }: FrameItemProps) {
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
    </S.FrameItem>
  )
}

export default FrameItem
