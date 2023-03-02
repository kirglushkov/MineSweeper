import React from 'react'
import smiles from '@/assets/smiles'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { start } from '@/store/win'
import { RootState } from '@/store/app'

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 10%;
  max-width: 50px;
  max-height: 50px;
`

/**
 * Компонент смайлика
 * @param what какой?
 * "afraid" | "lose" | "default" | "winner" | "restart"
 */

const Smile = () => {
  const { value: winValue }: any = useSelector((state: RootState) => state.win)
  const { value } = useSelector((state: RootState) => state.DecreaseBombCount)
  const dispatch = useDispatch()

  if (value == 0) {
    return (
      <StyledButton
        onClick={() => {
          window.location.reload()
        }}
        onMouseDown={() => {
          dispatch(start())
        }}
      >
        <Image src={smiles['winner']} alt="smile" />
      </StyledButton>
    )
  }
  return (
    <StyledButton
      onClick={() => {
        window.location.reload()
      }}
      onMouseDown={() => {
        dispatch(start())
      }}
    >
      <Image src={smiles[winValue as keyof typeof smiles]} alt="smile" />
    </StyledButton>
  )
}

export default Smile
