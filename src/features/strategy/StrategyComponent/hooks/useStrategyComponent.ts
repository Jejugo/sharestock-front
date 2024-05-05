import { useFormContext } from 'react-hook-form'
import { TabName } from '@features/strategy/StrategyForm/initialFormValues'
import { enqueueSnackbar } from 'notistack'

const TRIM_ZEROES_STRING = /^0+(\d)|(\d)0+$/gm

export default function useStrategyComponent({
  name
}: {
  name: Omit<TabName, 'overview'>
}) {
  const { setValue, getValues } = useFormContext()

  const value = getValues()[name.toString()] || {}
  const { statement, weight, statements } = value

  const calculateTotalPoints = () => {
    return statements.reduce(
      (acc: number, statement: IStatement) => acc + parseInt(statement.weight),
      0
    )
  }

  const addStatement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!weight) {
      enqueueSnackbar('Coloque um peso para sua estratégia', {
        variant: 'warning',
        preventDuplicate: true
      })
      return
    }

    setValue(name.toString(), {
      ...getValues()[name.toString()],
      weight: '',
      statement: '',
      statements: [
        ...value.statements,
        {
          statement,
          weight,
          checked: false
        }
      ]
    })
  }

  const handleWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedStatement: string
  ) => {
    setValue(name.toString(), {
      ...value,
      statements: statements.map((statement: IStatement) => {
        if (
          statement.statement.toLowerCase() === selectedStatement.toLowerCase()
        ) {
          return {
            ...statement,
            weight:
              parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 3
                ? e.target.value.replace(TRIM_ZEROES_STRING, '$1$2')
                : '0'
          }
        }
        return statement
      })
    })
  }

  return {
    calculateTotalPoints,
    handleWeightChange,
    addStatement
  }
}
