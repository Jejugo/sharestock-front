import SettingsModal from '../SettingsModal/SettingsModal'
import React, { useEffect, useState } from 'react'
import Rows from '@components/TableLists/Rows/Rows'
import Frames from '@components/TableLists/Frames/Frames'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import CachedIcon from '@material-ui/icons/Cached'
import axios from 'axios'
import * as S from './styles'

import Loading from '@components/Loading/Loading'
import { useAuth } from '@context/AuthUserContext'

interface TableProps {
  assets: IStockItem[] | IReitItem[]
  value: string
  isGoodAsset: boolean
  goToFundamentus: (share: any) => void
  setIsGoodAsset: React.Dispatch<React.SetStateAction<boolean>>
  columns: any[]
}

const TableToggle = ({
  assets,
  value,
  columns,
  isGoodAsset,
  goToFundamentus,
  setIsGoodAsset
}: TableProps) => {
  const { authUser } = useAuth()
  const [listMode, setListMode] = useState<string>('table')
  const [loading, setLoading] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState<IStockItem[] | IReitItem[]>(
    []
  )
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
    setFilteredData(assets)
  }, [assets])

  useEffect(() => {
    setFilteredData(
      (assets as any).filter((item: IStockItem | IReitItem) =>
        item.papel.toUpperCase().includes(value.toUpperCase())
      )
    )
  }, [value])

  const handleView = (e: any) => {
    e.preventDefault()
    const attributeName = e.currentTarget.getAttribute('name')

    setListMode(attributeName)
    window.scroll({ top: 450, behavior: 'smooth' })
  }

  const handleShowSettings = () => {
    setShowModalSettings(true)
  }

  const syncData = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_SHARE_API}/shares/sync`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`
        }
      })
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
            {assets.length > 0
              ? `Foram encontrados ${assets.length} ativos`
              : 'Nenhum ativo encontrado'}
          </S.TableHeaderIcon>
        }
        <S.TableHeaderIconsRight>
          <S.TableHeaderIcon
            clickable
            name="table"
            onClick={() => handleShowSettings()}
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
              onClick={() => setIsGoodAsset((prevState: boolean) => !prevState)}
            >
              {isGoodAsset ? 'Todos os ativos' : 'Bons Ativos'}
            </S.Highlight>
          </S.TableHeaderIcon>
        </S.TableHeaderIconsRight>
      </S.TableHeaderIcons>
      <S.IndicatorsHeader> Indicadores </S.IndicatorsHeader>
      {listMode === 'table' && (
        <Rows
          columns={columns}
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
