import React from 'react'
import styled from '@emotion/styled'
import DefaultBlock from '@/assets/blocks/default.png'
import Unlock from '@/assets/blocks/unLock.png'
import markFlag from '@/assets/blocks/markFlag.png'
import markQuest from '@/assets/blocks/markQuest.png'

const Wrapper = styled.button<{
  rightClicked?: boolean
  leftClicked?: boolean
  doubleClicked?: boolean
}>`
  all: unset;
  cursor: pointer;
  background-image: ${(props) => {
    if (props.leftClicked) {
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

const Button = ({ data, img }) => {
  const [leftClicked, setLeftClicked] = React.useState(false)
  const [rightClicked, setRightClicked] = React.useState(false)
  const [doubleRight, setDoubleRight] = React.useState(false)

  const HiddenDiv = styled.div`
    display: ${leftClicked ? 'block' : 'none'};

    background-position: center;
    width: 100%;
    height: 100%;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: 100%;
  `

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.button === 0) {
      setLeftClicked(true)
    } else if (e.button === 2) {
      if (!doubleRight) {
        setRightClicked(true)
      }
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
      rightClicked={rightClicked}
      leftClicked={leftClicked}
      doubleClicked={doubleRight}
      onClick={(e) => {
        e.preventDefault()
        handleClick(e)
        // dispatch and update state of field

        // todo: if mine is revealed, and not flagged = you lose
        // todo: dispatch flagged, if flagged thus you destroy min
        // todo: open fields without mines?
        console.log(data.x, data.y)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        handleClick(e)
      }}
    >
      <HiddenDiv></HiddenDiv>
    </Wrapper>
  )
}

export default Button
