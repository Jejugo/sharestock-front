import React from 'react'
import { Box, Modal, Typography } from '@material-ui/core'
import SettingsIndicatorItem from '@features/indicators/SettingsIndicatorItem/SettingsIndicatorItem'
import { useForm } from 'react-hook-form'
import { useAuth } from '@context/AuthUserContext'

import * as S from './styles'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  overflowY: 'scroll',
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

interface ISettingsModal {
  showModalSettings: boolean
  setShowModalSettings: React.Dispatch<React.SetStateAction<boolean>>
}

interface IIndicatorConfiguration {
  lowerLimit?: string
  upperLimit?: string
}

export function SettingsModal({
  showModalSettings,
  setShowModalSettings
}: ISettingsModal) {
  const formData = useForm()
  const { authUser } = useAuth()
  const onSubmit = async (data: any) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/user/stocks/fundaments/${authUser.uid}`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
  }

  return (
    <Modal open={showModalSettings} onClose={() => setShowModalSettings(false)}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Defina os seus critérios de avaliação
        </Typography>
        <S.ModalContent>
          <form onSubmit={formData.handleSubmit(onSubmit)}>
            <SettingsIndicatorItem title="P/L" name="p_l" formData={formData} />
            <SettingsIndicatorItem
              title="P/VPA"
              name="p_vp"
              formData={formData}
            />
            <SettingsIndicatorItem
              title="Cresc. 5 Anos"
              name="crescimento5Anos"
              formData={formData}
            />
            <SettingsIndicatorItem
              title="Dividend Yield"
              name="dividendYield"
              formData={formData}
            />
            <SettingsIndicatorItem
              title="Divida Bruta/PL"
              name="dividaBruta_pl"
              formData={formData}
            />
            <SettingsIndicatorItem
              title="Liquidez Corrente"
              name="liquidezCorrente"
              formData={formData}
            />
            <SettingsIndicatorItem
              title="Margem Líquida"
              name="margemLiquida"
              formData={formData}
            />
            <SettingsIndicatorItem title="ROE" name="roe" formData={formData} />
            <S.ModalBtn>Salvar</S.ModalBtn>
          </form>
        </S.ModalContent>
      </Box>
    </Modal>
  )
}

export default SettingsModal
