import useForm from "../hooks/useForm.js";
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { updateGeneralConfig } from "../services/config-service.js";

export const Configuracion = ({data, handleClose=null}) => {
  const { values, handleChange } = useForm(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGeneralConfig(values)
    if(handleClose !== null){
      handleClose()
    }
    else{
      window.location.reload();
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3>Editar Infomación de la Página</h3>
      </Card.Header>
      <Card.Body style={{backgroundColor: 'var(--mp-azul-4)'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <FloatingLabel label="Título">
            <Form.Control aria-label="Titulo"  id="titulo" name="titulo" onChange={handleChange} value={values.titulo} required/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-4">
          <FloatingLabel label="Sub-titulo">
            <Form.Control aria-label="Sub-titulo"  id="subtitulo" name="subtitulo" onChange={handleChange} value={values.subtitulo} required/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Departamento">
            <Form.Select aria-label="Select Departamento"  id="departamento" name="departamento" onChange={handleChange} value={values.departamento}>
              <option>Seleccione un Departamento</option>
              <option value={0}>Copán</option>
              <option value={1}>Ocotepeque</option>
              <option value={2}>Lempira</option>
              <option value={3}>Santa Bárbara</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="nosotros">Sobre Nosotros</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Sobre nosotros"
            style={{ height: '200px' }}
            name='nosotros'
            id='nosotros'
            value={values.nosotros}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="mensaje">Mensaje de representante</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Mensaje"
            style={{ height: '100px' }}
            name='mensaje'
            id='mensaje'
            value={values.mensaje}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="mision">Misión</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Misión"
            style={{ height: '100px' }}
            name='mision'
            id='mision'
            value={values.mision}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="vision">Visión</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Visión"
            style={{ height: '100px' }}
            name='vision'
            id='vision'
            value={values.vision}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <FloatingLabel label="Enlace Mapa">
            <Form.Control aria-label="Enlace Mapa"  id="urlMapa" name="urlMapa" onChange={handleChange} value={values.urlMapa} required/>
          </FloatingLabel>
        </Form.Group>
        <Button as="input" variant="info" type="submit" value="Guardar Cambios" />
      </Form>
      </Card.Body>
    </Card>
  );
}
