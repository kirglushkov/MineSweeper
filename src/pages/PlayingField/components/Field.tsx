import styled from '@emotion/styled'
// import Button from './Button/Logic'
import { useDispatch, useSelector } from 'react-redux'
// import { checkWinner } from '@/utils/checkWinner'
import { RootState } from '@/store/app'
import { useEffect, useState } from 'react'
import Button from './Button/Button'
import Detonating from '@/assets/blocks/detonating.png'
import Unlock from '@/assets/blocks/unLock.png'
import Mine from '@/assets/blocks/mine.png'
import Defused from '@/assets/blocks/defused.png'
import DefaultBlock from '@/assets/blocks/default.png'
import { Div } from '@vkontakte/vkui'
import numbers from '@/assets/blocks/numbers'
import Smile from './Smile'
import Timer from './Timer'
import { restart } from '@/store/win'
import Number from './Number'
import Header from './Header'
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
  const Board = FieldValues
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(restart())
  }, [])
  return (
    <Union>
      <Header />
      <WhiteBoard>
        <Grid>
          {Board.map((row, i) => {
            return row.map((data, j) => {
              return (
                <Button
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
