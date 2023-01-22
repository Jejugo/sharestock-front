import SettingsModal from '../SettingsModal/SettingsModal'
import React, { useEffect, useState } from 'react'
import Rows from '../../../components/TableLists/Rows/Rows'
import Frames from '../../../components/TableLists/Frames/Frames'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import CachedIcon from '@material-ui/icons/Cached'
import axios from 'axios'
import config from 'configs'
import * as S from './styles'

import Loading from 'components/Loading/Loading'

const { SHARE_API } = config

interface TableProps {
  shares: IFundamentusStockItem[]
  value: string
  isGoodShares: boolean
  goToFundamentus: (share: any) => void
  setIsGoodShares: React.Dispatch<React.SetStateAction<boolean>>
}

const TableToggle = ({
  shares,
  value,
  isGoodShares,
  goToFundamentus,
  setIsGoodShares
}: TableProps) => {
  const [listMode, setListMode] = useState<string>('table')
  const [loading, setLoading] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState<IFundamentusStockItem[]>([])
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false)
  const [fixTableHeader, setFixTableHeader] = useState<boolean>(false)

  const isTableHeaderFixed = (position: { top: number }) => position.top < 0

  const handleScroll = () => {
    const elem = document.getElementById('share-data')
    const position = elem?.getBoundingClientRect()

    position && setFixTableHeader(isTableHeaderFixed(position))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setFilteredData(shares)
  }, [shares])

  useEffect(() => {
    setFilteredData(
      shares.filter((item) =>
        item['Papel'].toUpperCase().includes(value.toUpperCase())
      )
    )
  }, [value])

  const handleView = (e: any) => {
    e.preventDefault()
    const attributeName = e.currentTarget.getAttribute('name')

    setListMode(attributeName)
    window.scroll({ top: 450, behavior: 'smooth' })
  }

  const handleShowSettings = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setShowModalSettings(true)
  }

  const syncData = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.get(`${SHARE_API}/shares/sync`)
      setLoading(false)
    } catch (err) {
      console.error('error: ', err)
      setLoading(false)
    }
  }

  return (
    <section>
      {loading && <Loading />}
      {showModalSettings && (
        <SettingsModal
          showModalSettings={showModalSettings}
          setShowModalSettings={setShowModalSettings}
        />
      )}
      <S.TableHeaderIcons>
        {
          <S.TableHeaderIcon>
            Foram encontradas {shares.length} ações.
          </S.TableHeaderIcon>
        }
        <S.TableHeaderIconsRight>
          <S.TableHeaderIcon
            clickable
            name="table"
            onClick={(e) => handleShowSettings(e)}
          >
            <SettingsIcon />
          </S.TableHeaderIcon>
          <S.TableHeaderIcon
            clickable
            name="table"
            onClick={(e) => handleView(e)}
          >
            <FormatAlignJustifyIcon />
          </S.TableHeaderIcon>
          <S.TableHeaderIcon
            clickable
            name="frames"
            onClick={(e) => handleView(e)}
          >
            <ViewModuleIcon />
          </S.TableHeaderIcon>
          <S.TableHeaderIcon clickable onClick={syncData}>
            <CachedIcon />
          </S.TableHeaderIcon>
          <S.TableHeaderIcon clickable>
            <S.Highlight
              onClick={() =>
                setIsGoodShares((prevState: boolean) => !prevState)
              }
            >
              {isGoodShares ? 'Todos os ativos' : 'Bons Ativos'}
            </S.Highlight>
          </S.TableHeaderIcon>
        </S.TableHeaderIconsRight>
      </S.TableHeaderIcons>
      <S.IndicatorsHeader> Indicadores </S.IndicatorsHeader>
      {listMode === 'table' && (
        <Rows
          filteredItems={filteredData}
          fixTableHeader={fixTableHeader}
        ></Rows>
      )}
      {listMode === 'frames' && (
        <Frames
          filteredItems={filteredData}
          goToFundamentus={goToFundamentus}
        ></Frames>
      )}
    </section>
  )
}

export default TableToggle
