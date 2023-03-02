import { RootState } from '@/store/app'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'

import Smile from './Smile'
import Timer from './Timer'
import Number from './Number'

const PADDING = 14

const OUTLINE = '4px inset #f3f3f3'
const Wrapper = styled.div`
  background-color: #bdbdbd;
  width: 100%;
  padding: ${PADDING}px;
`
const Stack = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  outline: ${OUTLINE};
  padding: ${PADDING - 4}px;
`

const Header = ({ smile }) => {
  return (
    <Wrapper>
      <Stack>
        <Number />
        <Smile smile={smile} />
        <Timer />
      </Stack>
    </Wrapper>
  )
}

export default Header
