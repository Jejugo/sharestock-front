import React, { useState, useEffect, useRef } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import StockCheckList from 'components/StockChekList/StockCheckList'
import Firestore from 'firebase/Firestore'
import Snackbar from '@mui/material/Snackbar'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import SuggestedPercentages from 'components/SuggestedPercentages/SuggestedPercentages'
import WishList from 'features/indicators/WishList/WishList'
import { useAuth } from 'context/AuthUserContext'

import * as S from './styles'
import {
  ISelectedAsset,
  IAssetsToInvest,
  IFirestoreGetAllUserAssets,
  IAssetQuantities
} from './interfaces'
import { getAllUserAssets } from 'firebase/utils'
import calculateAssetPoints from 'builders/calculateAssetPoints'
import Title from 'components/Title/Title'
import Button from 'components/Button/Button'

interface IDropdownItem {
  value: string
  label: string
}

interface IArrayToObject<T> {
  [key: string]: T
}

interface IInvestComponent {
  dropdownShares: IDropdownItem[]
  sharesMap: IArrayToObject<IStockItem>
}

export default function InvestComponent({
  sharesMap,
  dropdownShares
}: IInvestComponent) {
  const { authUser } = useAuth() as IAuthUserContext
  const [statements, setStatements] = useState<IStatement[]>([])
  const [selectedAsset, setSelectedAsset] = useState<ISelectedAsset>({
    value: '',
    label: ''
  })

  const [walletResistancePoints, setWalletResistancePoints] =
    useState<IWalletResistancePoints>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [assetsToInvest, setAssetsToInvest] = useState<IAssetsToInvest>({})
  const [userAssets, setUserAssets] = useState<IFirestoreGetAllUserAssets>({})
  const [investAmount, setInvestAmount] = useState<string>('')
  const [quantities, setQuantities] = useState<IAssetQuantities>({})

  // Suggestions State
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const titleRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>

  // Score State
  const [positiveScore, setPositiveScore] = useState<number>(0)
  const [negativeScore, setNegativeScore] = useState<number>(0)

  // Snackbar state
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  // Wishlist
  const [wishListVisible, setWishListVisible] = useState<boolean>(false)

  const chosenAssets = Object.keys(assetsToInvest)

  const removeAssetsToInvest = (
    e: React.MouseEvent<SVGSVGElement | HTMLLIElement, MouseEvent>,
    key: string
  ): void => {
    setAssetsToInvest((previousState) => {
      delete previousState[key]
      return {
        ...previousState
      }
    })
  }

  const handleCalculate = async () => {
    const result = await calculateAssetPoints(assetsToInvest)
    setWalletResistancePoints(result)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setShowSuggestions(true)
      titleRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, 1000)
  }

  const resetAssetsToInvest = () => {
    setSelectedAsset({ value: '', label: '' })
    setInvestAmount('')
    setAssetsToInvest({})
    setShowSuggestions(false)
  }

  const resetState = () => {
    setSelectedAsset({ value: '', label: '' })
    setPositiveScore(0)
    setNegativeScore(0)
  }

  const addNextAsset = async () => {
    try {
      if (statements.length && selectedAsset && selectedAsset.value !== '') {
        setAssetsToInvest((previousState) => {
          return { ...previousState, [selectedAsset.value]: statements }
        })
      }
      setSnackbarMessage(`Added ${selectedAsset.value} to the calculation...`)
      setShowSnackbar(true)
      resetState()
    } catch (err) {
      console.error(err)
    }
  }

  const storeAssetStatements = async () => {
    try {
      if (authUser) {
        for (const asset in assetsToInvest) {
          const quantity =
            userAssets[asset] && userAssets[asset].quantity
              ? parseInt(userAssets[asset].quantity) +
                parseInt(quantities[asset])
              : parseInt(quantities[asset])

          if (!quantity) {
            alert('No quantity found')
            return
          }
          Promise.all([
            await Firestore().setListByKey({
              collection: 'userAssetStatements',
              id: authUser.uid,
              list: assetsToInvest[asset],
              key: asset
            }),
            await Firestore().setDataByKey({
              collection: 'userAssets',
              id: authUser.uid,
              list: [
                {
                  ...(userAssets[asset] ? userAssets[asset] : sharesMap[asset]),
                  quantity
                }
              ],
              key: asset
            })
          ])
        }
      }
      alert('Dados salvos com sucesso.')
      setSelectedAsset({ value: '', label: '' })
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack)
        alert(err.message)
      }
    }
  }

  useEffect(() => {
    // reset quantities
    if (dropdownShares) {
      setQuantities(() =>
        dropdownShares.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.value]: ''
          }),
          {}
        )
      )
    }
  }, [dropdownShares])

  const handleFilterInput = (
    newValue: SingleValue<ISelectedAsset>,
    actionMeta: ActionMeta<ISelectedAsset>
  ): void => {
    if (newValue) {
      setSelectedAsset(newValue)
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    const getFirestoreAllAssets = async () => {
      if (!userAssets.length && authUser) {
        const allUserAssets = await getAllUserAssets(authUser)
        setUserAssets(allUserAssets)
      }
    }

    getFirestoreAllAssets().catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (statements.length) {
      setPositiveScore(0)
      setNegativeScore(0)
      statements.forEach((statement) => {
        statement.checked
          ? setPositiveScore(
              (prevState) => prevState + 1 * parseInt(statement.weight)
            )
          : setNegativeScore(
              (prevState) => prevState - 1 * parseInt(statement.weight)
            )
      })
    }
  }, [statements])

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            top: '40vh'
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <S.InvestComponentLayout>
          <Title text="Faça o balanceamento do seu investimento" />
          <S.StockListAdd>
            <S.InputWrapper>
              <S.DropdownStyle>
                <Select
                  options={dropdownShares}
                  placeholder="Ativo"
                  onChange={handleFilterInput}
                  value={selectedAsset}
                  styles={{ control: (styles) => ({ ...styles, zIndex: 5 }) }}
                ></Select>
              </S.DropdownStyle>
              <S.StockListQuantityInput
                placeholder="Valor do aporte"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInvestAmount(e.target.value)
                }
                value={investAmount}
              ></S.StockListQuantityInput>
            </S.InputWrapper>
            <S.ScoreView>
              <S.Points color="#36c90e">
                <S.PointsText>Pontos positivos:</S.PointsText>
                <S.PointsText>{positiveScore}</S.PointsText>
              </S.Points>
              <S.Points color="#cc3333">
                <S.PointsText>Pontos negativos:</S.PointsText>
                <S.PointsText>{negativeScore}</S.PointsText>
              </S.Points>
              <S.Points color="#0088FE">
                <S.PointsText>Resistência:</S.PointsText>
                <S.PointsText>{positiveScore + negativeScore}</S.PointsText>
              </S.Points>
            </S.ScoreView>
            <StockCheckList
              statements={statements}
              setStatements={setStatements}
              assetValue={selectedAsset.value}
            ></StockCheckList>
            <S.StockCheckBtnWrapper>
              <Button
                onClick={addNextAsset}
                disabled={!selectedAsset}
                size="medium"
                text="Adicionar"
              />
              <Button
                onClick={() => handleCalculate()}
                disabled={!Object.keys(assetsToInvest).length}
                text="Calcular"
                size="medium"
              />
              <Button
                onClick={resetAssetsToInvest}
                disabled={!Object.keys(assetsToInvest).length}
                text="Resetar"
                size="medium"
              />
            </S.StockCheckBtnWrapper>
          </S.StockListAdd>
          {showSuggestions && (
            <section>
              <SuggestedPercentages
                walletResistancePoints={walletResistancePoints}
                removeAssets={removeAssetsToInvest}
                titleRef={titleRef}
                investAmount={investAmount}
                setQuantities={setQuantities}
                quantities={quantities}
                storeAssetStatements={storeAssetStatements}
              ></SuggestedPercentages>
            </section>
          )}
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            message={snackbarMessage}
          />
          <WishList
            wishList={chosenAssets}
            visible={wishListVisible}
            setVisible={setWishListVisible}
            removeItem={removeAssetsToInvest}
          ></WishList>
        </S.InvestComponentLayout>
      )}
    </>
  )
}
