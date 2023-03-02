import React from 'react'
import styled from '@emotion/styled'
import DefaultBlock from '@/assets/blocks/default.png'
import Unlock from '@/assets/blocks/unLock.png'
import markFlag from '@/assets/blocks/markFlag.png'
import markQuest from '@/assets/blocks/markQuest.png'
import { useDispatch, useSelector } from 'react-redux'
import { updateField, updateValue } from '@/store/mineSweeperLogic'
import { DecreaseBombCount } from '@/store/bomb'
import { RootState } from '@/store/app'

const Wrapper = styled.button<{
  rightClicked?: boolean
  leftClicked?: boolean
  doubleClicked?: boolean
  isRevealedAlready: boolean
}>`
  all: unset;
  cursor: pointer;
  background-image: ${(props) => {
    if (props.leftClicked || props.isRevealedAlready) {
      return `url(${Unlock})`
    } else if (props.doubleClicked) {
      return `url(${markQuest})`
    } else if (props.rightClicked) {
      return `url(${markFlag})`
    } else {
      return `url(${DefaultBlock})`
    }
  }};
  background-position: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100%;
`
// type Props = {
//   data: {
//     x: number
//     y: number
//     bomb: boolean
//   }

const Button = ({ data, img, isRevealedAlready, value }: Props) => {
  const [leftClicked, setLeftClicked] = React.useState(false)
  const [rightClicked, setRightClicked] = React.useState(false)
  const [doubleRight, setDoubleRight] = React.useState(false)
  const dispatch = useDispatch()

  const { FieldValues } = useSelector((state: RootState) => state.updateField)
  const Board = FieldValues

  function CheckBombIsRevealed(
    bomb: boolean,
    revealed: boolean,
    flagged: boolean
  ) {
    if (bomb && !revealed) {
      dispatch(DecreaseBombCount())
      if (!flagged) {
        alert('you lose')
        console.log('you lose')
      }
    }
  }
  const HiddenDiv = styled.div`
    display: ${leftClicked ? 'block' : 'none'};
    position: relative;
    background-position: center;
    width: 100%;
    height: 100%;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: 100%;

    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    > div {
      position: absolute;
      background-position: center;
      width: 100%;
      height: 100%;
      background-image: url(${value});
      background-repeat: no-repeat;
      background-size: 100%;
    }
  `
  function nearbyTiles(board, { x, y }) {
    const tiles = []

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const tile = board[x + i]?.[y + j]
        if (tile) tiles.push(tile)
      }
    }
    return tiles
  }

  function revealTile(board, tile) {
    if (tile.isBomb) return
    if (tile.isRevealed) return
    const NearbyTiles = nearbyTiles(board, { x: tile.x, y: tile.y })
    const mines = NearbyTiles.filter((t) => t.isBomb)
    if (mines.length === 0) {
      NearbyTiles.forEach((t) => {
        const NearbyTilesTwo = nearbyTiles(board, { x: t.x, y: t.y })
        const mmines = NearbyTilesTwo.filter((t) => t.isBomb)
        if (mmines.length === 0) {
          NearbyTilesTwo.forEach((t) => {
            dispatch(
              updateField({
                x: t.x,
                y: t.y,
                isRevealed: true,
                isFlagged: false,
              })
            )
          })
        } else {
          dispatch(updateValue({ x: t.x, y: t.y, value: mines.length }))
        }
        dispatch(
          updateField({ x: t.x, y: t.y, isRevealed: true, isFlagged: false })
        )
      })
    } else {
      dispatch(updateValue({ x: tile.x, y: tile.y, value: mines.length }))
      return
    }
    // todo: if isRevealed show value of bombs nearby

    if (!tile.isRevealed) return
    if (tile.isBomb) return
  }

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>,
    data: {
      x: number
      y: number
      isBomb: boolean
      isRevealed: boolean
      isFlagged: boolean
      value: number
    }
  ) {
    if (data.isRevealed) return
    // if left click
    // reveal = true
    // flagges = false
    if (e.button === 0) {
      setLeftClicked(true)
      dispatch(
        updateField({
          x: data.x,
          y: data.y,
          isRevealed: true,
          isFlagged: data.isFlagged,
          value: data.value,
        })
      )
      revealTile(Board, data)
      CheckBombIsRevealed(data.isBomb, data.isRevealed, data.isFlagged)
      // if right click
      // reveal = false
      // flagged = true
    } else if (e.button === 2) {
      if (!doubleRight) {
        setRightClicked(true)
        dispatch(
          updateField({
            x: data.x,
            y: data.y,
            isRevealed: data.isRevealed,
            isFlagged: true,
            value: data.value,
          })
        )
      }
      // if right click again Unset everything
      // do nothing
      if (rightClicked) {
        setDoubleRight(true)
      }

      if (doubleRight) {
        setDoubleRight(false)
        setRightClicked(false)
      }
    }
  }

  return (
    <Wrapper
      isRevealedAlready={isRevealedAlready}
      rightClicked={rightClicked}
      leftClicked={leftClicked}
      doubleClicked={doubleRight}
      onClick={(e) => {
        e.preventDefault()
        handleClick(e, data)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        handleClick(e, data)
      }}
    >
      <HiddenDiv>
        <div></div>
      </HiddenDiv>
    </Wrapper>
  )
}

export default Button
