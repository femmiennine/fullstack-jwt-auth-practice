import styled from 'styled-components'
import Typewriter from '../images/Typewriter.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding: 0 40px;
  gap: 3rem;
`
const Header = styled.h1`
  margin-bottom: 1rem;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20rem;
  justify-content: space-between;
  align-items: center;
`
const Articles = styled.div`
  height: auto;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Images = styled.div`
  height: 20%;
  width: 50vh;
  align-items: center;
`

const Image = styled.img`
  height: auto;
  width: 80%;
`

const Home = () => {
  return (
    <Container>
      <Header>PERSONAL BLOG</Header>
      <MainContent>
        <Articles>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, nemo minima omnis officia
            ratione alias ipsum. Enim delectus nobis, nam laborum dolores quo voluptatem modi
            asperiores voluptate reiciendis nesciunt et quos quas omnis. Consequatur sequi obcaecati
            autem incidunt quasi deleniti magnam dolorem blanditiis voluptatibus numquam maiores
            odio repudiandae, magni inventore qui aperiam officia tenetur fuga, suscipit debitis
            fugit facere iusto optio. Commodi totam dolorem veritatis facere voluptatum eos magni
            omnis mollitia tempora officiis facilis culpa amet sint soluta, ex et? Facere assumenda
            fuga quo ratione ab, perspiciatis sequi placeat quasi ipsum cumque, perferendis rerum
            iusto consectetur pariatur aspernatur dolore incidunt molestiae veritatis facilis magni
            iure nam commodi vero! Quibusdam voluptatibus recusandae ullam dolore itaque odit, magni
            corporis cum! Itaque facere fugiat animi sequi aliquid dicta nesciunt temporibus amet
            optio quia tempora eum consequuntur odit, ea quidem quas dolores, iure provident, fuga
            quo distinctio unde. Atque laborum doloribus tempora officiis necessitatibus?
            Necessitatibus iure iusto eligendi velit, doloribus repudiandae! Culpa, molestias atque
            iusto et magni neque ex mollitia adipisci quia dolorum cum, libero iure! Excepturi
            deserunt modi incidunt iusto pariatur eos fuga iure, neque harum exercitationem
            reiciendis quas possimus officia enim placeat doloribus quibusdam nostrum sed
            repellendus numquam odio. Ut, facere nam!
          </p>
        </Articles>

        <Images>
          <Image src={Typewriter} alt='Typewriter' />
        </Images>
      </MainContent>
    </Container>
  )
}
export default Home
