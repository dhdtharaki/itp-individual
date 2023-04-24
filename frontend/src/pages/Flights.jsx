import React from 'react'
import { Container } from './Reservations'
import Header from '../components/Header'
import BasicCard from '../components/BasicCard'
import { Body } from './AddReservation'
import styled from 'styled-components'
import Footer from '../components/Footer'

const CardContainer = styled.div`
    margin: 90px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

`
const Flights = () => {
  return (
    <Container>
    <Header />
    <Body>
        <CardContainer>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        </CardContainer>
    </Body>
    <Footer/>
  </Container>
  )
}

export default Flights;