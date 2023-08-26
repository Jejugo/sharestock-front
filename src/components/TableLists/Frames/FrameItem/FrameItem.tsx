import React from 'react'
import * as S from './styles'

interface FrameItemProps {
  item: IStockItem | IReitItem
  goToFundamentus: (share: any) => void
}

function FrameItem({ item, goToFundamentus }: FrameItemProps) {
  return (
    <S.FrameItem onClick={() => goToFundamentus(item.papel)}>
      {/* <S.FrameTitle className="share__title">{item.papel}</S.FrameTitle>
      <S.FramePrice className="share__price">{item.cotacao}</S.FramePrice>
      <S.FrameIndicator status={indicatorsValidator(item, 'crescimento5Anos')}>
        Cresc5anos: {item.crescimento5Anos}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'dividendYield')}>
        Dividend Y.: {item.dividendYield}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'liquidezCorrente')}>
        Liq Corrente: {item.liquidezCorrente}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'dividaBruta/pl')}>
        Dívida/PL: {item['dividaBruta_pl']}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'margemLiquida')}>
        Margem Líq: {item.margemLiquida}
      </S.FrameIndicator>
      <S.FrameIndicator status={indicatorsValidator(item, 'roe')}>
        ROE: {item.roe}
      </S.FrameIndicator> */}
    </S.FrameItem>
  )
}

export default FrameItem
