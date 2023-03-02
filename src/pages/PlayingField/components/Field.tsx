import styled from '@emotion/styled'
// import Button from './Button/Logic'
import { useSelector } from 'react-redux'
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);

  width: 100%;
  height: 100%;
`

const WhiteBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 20px);
  height: calc(100vw - 30px);
  background-color: white;

  border: 2px solid #000000;
  box-shadow: 0px 4px 0px #000000;
  border-radius: 10px;
  max-width: calc(550px * 1.08);
  max-height: 550px;

  @media (max-width: 350px) {
    height: calc(100vw - 50px);
  }
`
const Union = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Field = () => {
  const { FieldValues } = useSelector((state: RootState) => state.updateField)
  const { value } = useSelector((state: RootState) => state.DecreaseBombCount)
  const Board = FieldValues
  console.log(Board)

  return (
    <Union>
      <Div>
        <h1>{value}</h1>
      </Div>
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
                      : data.isBomb && data.isRevealed
                      ? Detonating
                      : data.isBomb
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
