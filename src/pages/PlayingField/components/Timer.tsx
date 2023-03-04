import digits from '@/assets/digits'
import { RootState } from '@/store/app'
import { lose } from '@/store/win'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TIME } from './Field'

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

const Timer = (props: Props) => {
  const { value: winValue }: any = useSelector((state: RootState) => state.win)
  const [time, setTime] = useState(TIME)
  const dispatch = useDispatch()

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
      setTimeout(() => {
        clearInterval(timer)
      }, TIME * 1000)
      return () => clearInterval(timer)
    }
  }, [])

  if (winValue === 'lose' || winValue === 'winner') {
    return (
      <Wrapper>
        <img src={digits[0 as keyof typeof digits]}></img>
        <img src={digits[0 as keyof typeof digits]}></img>
      </Wrapper>
    )
  }

  if (time == 0) {
    dispatch(lose())
    return (
      <Wrapper>
        <img src={digits[0 as keyof typeof digits]}></img>
        <img src={digits[0 as keyof typeof digits]}></img>
      </Wrapper>
    )
  }

  let FirstDigit = Math.floor(time / 10)
  let SecondDigit = time % 10
  return (
    <Wrapper>
      <img src={digits[FirstDigit as keyof typeof digits]}></img>
      <img src={digits[SecondDigit as keyof typeof digits]}></img>
    </Wrapper>
  )
}

export default Timer
