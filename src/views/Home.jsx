import { Layout } from "./Layout.jsx";
import { Button, Card, Col, Container, Image, Row, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { Configuracion } from "./Configuracion.jsx";
import { LoadingScreen } from "./LoadingScreen.jsx";
import { FrameCambiarImagen } from "../components/FrameCambiarImagen.jsx";
import { ConfiguracionValores } from "./ConfiguracionValores.jsx";
import { BotonCambiarBanner } from "../components/BotonCambiarBanner.jsx";
import useFetch from "../hooks/useFetch.js";
import fondo from "../assets/images/fondo-main.jpg"
import organigrama from "../assets/images/organigrama.png"
import cobertura from "../assets/images/cobertura.jpg"
import nosotros from "../assets/images/img-nosotros.jpg" 
import logoCR from "../assets/images/logo-cr.jpg" 
import logoC from "../assets/images/logo-c.jpg" 
import logoSR from "../assets/images/logo-sr.png" 
import logoSJ from "../assets/images/logo-sj.jpg" 
import '../assets/styles/home.css';
import { EscudoMunicipal } from "../components/multimedia/EscudoMunicipal.jsx";

export const Home = () => {
  const {valid, userData} = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal Valores
  const [showValores, setShowValores] = useState(false);
  const handleCloseValores = () => setShowValores(false);
  const handleShowValores = () => setShowValores(true);

  const [values, setValues] = useState({});
  const { data: mongoData, isLoading } = useFetch(process.env.REACT_APP_API_URL +  `/config`);

  useEffect(() => {
    if(mongoData){
      setValues(mongoData)
    }
  }, [mongoData, isLoading])

  if(isLoading){
    return <LoadingScreen />
  }

  return(
    <>
    <Layout pagina={'Inicio'}>
      <BotonCambiarBanner show={(valid && userData.rol !== 'Publish')} />
      <Container>
        <section>
          {
              (valid && userData.rol !== 'Publish') ? 
              <>
              <Button variant="warning" className="config-button" onClick={handleShow}><i className="bi bi-tools"></i>{' '}Editar Informacion General</Button>
              </>
              : ''
          }
          <Image src={fondo} className="animate__animated animate__fadeIn" id="main-image" fluid/>
          <h1 id="main-title" className="animate__animated animate__fadeInUp">{values.titulo}</h1>
          <p id="text-departamento" className="animate__animated animate__fadeInUp">{values.subtitulo}</p>
        </section>

        <section className="sobre-nosotros" id="sobre-nosotros">
          <h2 className="sub-title">¿Quiénes Somos?</h2>
          <Card style={{borderRadius: '30px'}}>
            <Card.Body className="nosotros-container" style={{borderRadius: '30px'}}>
              <Row>
              <Col md={9}>
                <p className="text-nosotros">
                  {values.nosotros}
                </p>
              </Col>
              <Col md={3}>
                <FrameCambiarImagen show={valid}>
                  <Image id="img-about" src={nosotros} fluid thumbnail/>
                </FrameCambiarImagen>
              </Col>
            </Row>

            {/*<Row>
              <Col md={9}>
                <blockquote className="text-fundador">
                  {values.mensaje}
                </blockquote>
                <p className="autor">
                  {values.autor}
                </p>
              </Col>
              <Col md={3}>
                <FrameCambiarImagen show={valid}>
                  <Image id="img-about" src={lider} fluid roundedCircle/>
                </FrameCambiarImagen>
              </Col>
            </Row>*/}
            </Card.Body>
          </Card>
        </section>

        <section className="municipios" id="municipios">
          <h2 className="sub-title">Municipios</h2>
          <div className="media-container d-flex flex-wrap">
            <FrameCambiarImagen show={valid}>
              <EscudoMunicipal 
                image={logoCR} 
                name={'Copán Ruinas'} 
                url={'https://www.facebook.com/municipalidadcopanruinas'}
              />
            </FrameCambiarImagen>

            <FrameCambiarImagen show={valid}>
              <EscudoMunicipal 
                image={logoSR} 
                name={'Santa Rita'} 
                url={'https://www.facebook.com/profile.php?id=100085319175388'}
              />
            </FrameCambiarImagen>

            <FrameCambiarImagen show={valid}>
              <EscudoMunicipal 
                image={logoC} 
                name={'Cabañas'} 
                url={'https://www.facebook.com/profile.php?id=100083162807277'}
              />
            </FrameCambiarImagen>
            
            <FrameCambiarImagen show={valid}>
              <EscudoMunicipal 
                image={logoSJ} 
                name={'San Jerónimo'} 
                url={'https://www.facebook.com/mumisjc'}
              />
            </FrameCambiarImagen>
          </div>
        </section>

        <section className="mision-vision" id="mision-vision">
          <h2 className="sub-title">Misión y Visión</h2>
          <Row>
            <Col md={6}>
              <Card className="h-100" style={{borderRadius: '30px'}}>
                <Card.Body className="item" style={{borderRadius: '30px'}}>
                  <div className="icon">
                    <i className="bi bi-book text-icon"></i>Misión
                  </div>
                  <div className="content">
                    {values.mision}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100" style={{borderRadius: '30px'}}>
                <Card.Body className="item" style={{borderRadius: '30px'}}>
                  <div className="icon">
                    <i className="bi bi-search text-icon"></i>Visión
                  </div>
                  <div className="content">
                    {values.vision}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <section className="organigrama" id="organigrama">
          <h2 className="sub-title">Organigrama</h2>
          <div className="media-container">
            <FrameCambiarImagen show={valid}>
              <Image src={organigrama} fluid thumbnail/>
            </FrameCambiarImagen>
          </div>
        </section>

        <section className="valores" id="valores">
          <h2 className="sub-title">Nuestros Valores</h2>
          <Card>
            <Card.Body className="nosotros-container">
            <ul>
              {
                values.valores && values.valores.map((valor, i) => (<li key={i}>
                  <b>{valor.nombre}</b>{': ' + valor.descripcion}
                </li>))
              }
              </ul>
            </Card.Body>
            {
              (valid && userData.rol !== 'Publish') ? 
                <Card.Footer>
                  <Button variant="warning" onClick={handleShowValores}><i className="bi bi-tools"></i>{' '}Editar Valores</Button>
                </Card.Footer>
                : ''
            }
          </Card>
        </section>

        <section className="cobertura" id="cobertura">
          <h2 className="sub-title">Cobertura</h2>
          <div className="media-container">
            <FrameCambiarImagen show={valid}>
              <Image src={cobertura} fluid thumbnail/>
            </FrameCambiarImagen>
          </div>
        </section>
      </Container>
    </Layout>
    <Modal show={show} onHide={handleClose} size="lg">
      <Configuracion data={values}/>
    </Modal>
    <Modal show={showValores} onHide={handleCloseValores} size="lg">
      <ConfiguracionValores data={values ? values.valores : null} handleClose={handleCloseValores}/>
    </Modal>
    </>
  );
}
