import styled from "@emotion/styled";

import { colors } from "../styles";
import Header from "../components/Header";
import SignupForm from "../components/SignupForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  gap: 8px;
`

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 92vh;
  align-items: flex-start;
  justify-content: center;
  padding: 17px 0;
  background-color: ${colors.gray.bg_dark}
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 360px;
  padding: 5px 0;
  gap: 18px;
`

const Title = styled.h1`
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Paragraph = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
  letter-spacing: 0.15px;
`


export default function SignUpPage() {
  
  return (
    <>
      <Container>
        <Header/>
        <Main>
          <Section>
            <Title>Good Choice!</Title>
            <Paragraph>Create a new account as...</Paragraph>
            <SignupForm /> 
          </Section>
        </Main>
      </Container>
    </>
  )
}

