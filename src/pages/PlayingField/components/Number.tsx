import digits from '@/assets/digits'
import { RootState } from '@/store/app'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const Wrapper = styled.div`
  display: block;
  max-width: 50px;
  max-height: 50px;
  width: 10%;

  > img {
    width: 50%;
    height: 50%;
  }
`

const Number = (props: Props) => {
  const { value } = useSelector((state: RootState) => state.DecreaseBombCount)

  let FirstDigit = Math.floor(value / 10)
  let SecondDigit = value % 10

  return (
    <Wrapper>
      <img src={digits[FirstDigit as keyof typeof digits]}></img>
      <img src={digits[SecondDigit as keyof typeof digits]}></img>
    </Wrapper>
  )
}

export default Number
