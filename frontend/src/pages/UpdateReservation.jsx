import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { Container } from './Reservations'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export const Body = styled.div`
  display: flex;
  justify-content: center;
`
export const Form = styled.div`
  background-color: #A9C4B9;
  width: 900px;
  margin: 90px 0;
  padding: 40px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`
export const FormHeading = styled.h2`
  grid-column: 1 / 3;
  text-align: center;
`
export const ButtonContainer = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px;
`
export const Button = styled.button`
  width: 100px;
  border: none;
  padding: 15px;
  background-color: #2A96B8;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  :hover{
    background-color: #0c5a6e;
  }
`
export const Input = styled.input`
  padding: 17px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
`

const UpdateReservation = () => {
  const id = useParams();
  const [values, setValues] = useState({
        id : id,
        firstName : "",
        lastName : "",
        email : "",
        phone : ""

  });
  
  useEffect(() => {
    
    axios
      .get('http://localhost:5000/api/reservation/'+id)
      .then((response) => {
        setValues({...values, firstName : response.data.firstName,lastName : response.data.lastName,email : response.data.email,phone : response.data.phone});
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
const navigate = useNavigate();
  const handleSubmit =(e) =>{
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/reservations/update/${id}`,values)
    .then((response) => {
      navigate(`/reservations`)
    })
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <Container>
    <Header />
    <Body>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Update your personal details</FormHeading>
        <Input name='firstName' type='text' placeholder='First Name'  value={values.firstName} required onChange={e=> setValues({...values,firstName: e.target.value})} />
        <Input name='lastName'  type='text' placeholder='Last Name' value={values.lastName} required onChange={e=> setValues({...values,lastName: e.target.value})}/>
        <Input name='email'  type='email'  placeholder='Email' value={values.email} required onChange={e=> setValues({...values,email: e.target.value})}/>
        <Input name='phone'  type='tel'  placeholder='Phone Number' value={values.phone} required maxLength={10} onChange={e=> setValues({...values,phone: e.target.value})}/>
        <ButtonContainer>
          <Button>Save</Button>
        </ButtonContainer>
      </Form>
    </Body>
    <Footer/>
  </Container>
  )
  }

export default UpdateReservation