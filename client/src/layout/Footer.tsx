import styled from 'styled-components'

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: teal;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`
const Footer = () => {
  return (
    <Container>
      <p>copyright.</p>
    </Container>
  )
}
export default Footer
