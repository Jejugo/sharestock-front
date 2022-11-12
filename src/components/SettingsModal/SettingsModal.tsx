import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography } from '@material-ui/core'
import SettingsIndicatorItem from '@components/SettingsIndicatorItem/SettingsIndicatorItem'
import { useForm } from "react-hook-form";

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
  const formData = useForm();

  const onSubmit = (data: any) => {
    console.log(data)
  };

  return (
    <Modal open={showModalSettings} onClose={() => setShowModalSettings(false)}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Defina os seus critérios de avaliação
        </Typography>
        <S.ModalContent>
          <form onSubmit={formData.handleSubmit(onSubmit)}>
          <SettingsIndicatorItem title={'P/L'} formData={formData}/>
          <SettingsIndicatorItem title={'P/VP'} formData={formData}/>
          <SettingsIndicatorItem title={'Cresc. 5 Anos'} formData={formData} />
          <SettingsIndicatorItem title={'Dividend Yield'} formData={formData} />
          <SettingsIndicatorItem title={'Dívida Bruta/Patrimônio'} formData={formData} />
          <SettingsIndicatorItem title={'Liquidez Corrente'} formData={formData} />
          <SettingsIndicatorItem title={'Margem Líquida'} formData={formData} />
          <SettingsIndicatorItem title={'ROE'} formData={formData}/>
          <S.ModalBtn>
            Salvar
          </S.ModalBtn>
        </form>
        </S.ModalContent>
      </Box>
    </Modal>
  )
}

export default SettingsModal
  