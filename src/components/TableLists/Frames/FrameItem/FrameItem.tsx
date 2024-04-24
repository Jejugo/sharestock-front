import React from 'react'
import * as S from './styles'
import { stocksIndicatorsValidator } from '@validations/stocks/indicators'
import { reitsIndicatorsValidator } from '@validations/reits/indicators'

interface FrameItemProps {
  item: IStockItem | IReitItem
  goToFundamentus: (share: any) => void
}

function FrameItem({ item, goToFundamentus }: FrameItemProps) {
  const isStockItem = (item: any): item is IStockItem => {
    return 'numeroAcoes' in item
  }

  return (
    <S.FrameItem onClick={() => goToFundamentus(item.papel)}>
      <S.FrameTitle className="share__title">{item.papel}</S.FrameTitle>
      <S.FramePrice className="share__price">{item.cotacao}</S.FramePrice>
      {isStockItem(item) ? (
        <>
          <S.FrameIndicator
            status={stocksIndicatorsValidator(item, 'crescimento5Anos')}
          >
            Cresc5anos: {item.crescimento5Anos}
          </S.FrameIndicator>
          <S.FrameIndicator
            status={stocksIndicatorsValidator(item, 'dividendYield')}
          >
            Dividend Y.: {item.dividendYield}
          </S.FrameIndicator>
          <S.FrameIndicator
            status={stocksIndicatorsValidator(item, 'liquidezCorrente')}
          >
            Liq Corrente: {item.liquidezCorrente}
          </S.FrameIndicator>
          <S.FrameIndicator
            status={stocksIndicatorsValidator(item, 'dividaBruta/pl')}
          >
            Dívida/PL: {item['dividaBruta_pl']}
          </S.FrameIndicator>
          <S.FrameIndicator
            status={stocksIndicatorsValidator(item, 'margemLiquida')}
          >
            Margem Líq: {item.margemLiquida}
          </S.FrameIndicator>
          <S.FrameIndicator status={stocksIndicatorsValidator(item, 'roe')}>
            ROE: {item.roe}
          </S.FrameIndicator>
        </>
      ) : (
        <>
          <S.FrameIndicator
            status={reitsIndicatorsValidator(item, 'quantidadeDeImoveis')}
          >
            Qtd. de Imóveis: {item.quantidadeDeImoveis}
          </S.FrameIndicator>
          <S.FrameIndicator
            status={reitsIndicatorsValidator(item, 'vacanciaMedia')}
          >
            Vacância Média: {item.vacanciaMedia}
          </S.FrameIndicator>
        </>
      )}
    </S.FrameItem>
  )
}

export default FrameItem
