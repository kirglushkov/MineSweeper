import React from 'react'
import Field from './components/Field'
import styled from '@emotion/styled'

const Container = styled.main`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 60px;
  z-index: 2;
  padding: 0 10px;
`

function index() {
  return (
    <Container>
      <Field />
    </Container>
  )
}

export default index
