import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/app'
import { useEffect, useState } from 'react'
import Button from './Button/Button'
import Detonating from '@/assets/blocks/detonating.png'
import Unlock from '@/assets/blocks/unLock.png'
import Mine from '@/assets/blocks/mine.png'
import Defused from '@/assets/blocks/defused.png'
import DefaultBlock from '@/assets/blocks/default.png'
import numbers from '@/assets/blocks/numbers'
import { lose, restart, winner } from '@/store/win'

import Header from './Header'
import { revealMines } from '@/store/mineSweeperLogic'
const PADDING = 14

const OUTLINE = '4px inset #f3f3f3'
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);

  width: 100%;
  height: 100%;
  outline: ${OUTLINE};
`

const WhiteBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100dvw - 20px);
  height: calc(100dvw - 30px);
  background-color: #bdbdbd;

  max-width: calc(550px * 1.08);
  max-height: 550px;
  padding: ${PADDING}px;

  @media (max-width: 350px) {
    height: calc(100vw - 50px);
  }
`
const Union = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 4px outset #d5d4d4;
`
export const TIME = 60
const Field = () => {
  const { FieldValues } = useSelector((state: RootState) => state.updateField)
  const [smile, setSmile] = useState<null | string>(null)
  const Board = FieldValues
  const dispatch = useDispatch()

  function checkWinner(Board: any[]) {
    const WinArray = Board.flat().filter(
      (x: any) => x.isBomb === false && x.isRevealed === true
    )
    if (WinArray.length === 16 * 16 - 40) {
      return true
    }
  }
  const Check = checkWinner(Board)

  useEffect(() => {
    if (Check) {
      setSmile('winner')
      dispatch(winner())
      dispatch(revealMines())
    }
  }, [Check])

  useEffect(() => {
    dispatch(restart())

    const TimeOut = setTimeout(() => {
      setSmile('lose')
      dispatch(lose())
      dispatch(revealMines())
    }, TIME * 1000)

    return () => {
      clearInterval(TimeOut)
    }
  }, [])

  function ChangeSmile(x: string) {
    return setSmile(x)
  }
  return (
    <Union>
      <Header smile={smile} />
      <WhiteBoard>
        <Grid>
          {Board.map((row, i) => {
            return row.map((data, j) => {
              return (
                <Button
                  changeSmile={smile != 'winner' ? ChangeSmile : () => {}}
                  key={`${i}${j}`}
                  data={data}
                  value={numbers[+data.value as keyof typeof numbers]}
                  isRevealedAlready={data.isRevealed}
                  img={
                    data.isBomb && data.isFlagged && data.isRevealed
                      ? Defused
                      : data.isBomb && data.isRevealed && data.detonated
                      ? Detonating
                      : data.isBomb && data.isRevealed
                      ? Mine
                      : data.isRevealed
                      ? Unlock
                      : DefaultBlock
                  }
                />
              )
            })
          })}
        </Grid>
      </WhiteBoard>
    </Union>
  )
}

export default Field
