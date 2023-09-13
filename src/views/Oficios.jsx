import { Button, Container, Image, Modal, Spinner } from "react-bootstrap";
import { Layout } from "./Layout.jsx";
import banner from "../assets/images/bannerOficios.jpg"
import '../assets/styles/contacto.css'
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetchTable.js";

export const Oficios = () => {
  const {valid} = useContext(UserContext);

  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('convenios');

  const handleRefetch = () => {
    setRefetch(true)
  }

  //Update manual
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true)
    setRefetch(true)
  }

  /*Modal crear
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);*/

  //Valor para Modal Modificar
  const [currentConvenio, setCurrentConvenio] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'aliado', headerName: 'Aliado del Convenio', width: 200 },
    { field: 'descripcion', headerName: 'Descripcion del Convenio', width: 200 },
    { field: 'area', headerName: 'Area de Intervencion', width: 200 },
    { field: 'beneficiarios', headerName: 'Número de beneficiarios (personas/familias)', width: 200 },
    { field: 'monto', headerName: 'Monto del Convenio', width: 200 },
    { field: 'periodo', headerName: 'Periodo de Vigencia', width: 200 },
    { field: 'enlace', headerName: 'Enlace al Documento del Convenio', width: 200 },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          valid ?
          <Button style={buttonStyle} onClick={() => {
            setCurrentConvenio({
              id: params.row.uuid,
              nombre: params.row.name
            })
            //handleShowEdit()
          }}>
            Editar
          </Button>
          :
          null
        );
      },
    }
  ];
  
  //Enviar datos a las filas
  useEffect(() => {
    if(data){
      setRows(
        data.map((convenio, index) => (
          { 
            id: index + 1, 
            name: convenio.nombre
          }
        ))
      );
    }
    setUpdate(false);
  }, [data, isLoading])
  
  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px'
  };

  return (
    <Layout pagina={"Oficios"}>
      <Image src={banner}
      className="animate__animated animate__fadeIn w-100" style={{maxHeight: '300px', objectFit: 'cover'}} fluid/>
      <h1 className="titulo-contacto">CONVENIOS</h1>
      {/*Boton Agregar*/}
      {/*<Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Convenio
        </Button>
        {/*Boton Actualizar*/}
        {/*
          !update ? 
          <Button className='my-2 mx-2' variant="light" onClick={handleUpdate}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          : <Button className='my-2 mx-2' variant="light">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Cargando...</span>
          </Button>
        }
        */}
        <Container>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                uuid: false,
                ultimaEdicion: false,
                editor: false
              },
            },
          }}
          rowSelection={false}
          pageSizeOptions={[5, 10]}
          style={{ minHeight: "160px"}}
        />
        </Container>
      {/*<Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <EditRoles handleClose={handleCloseEdit} setRefetch={handleRefetch} rol={currentRol}/>
      </Modal>
      <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
        <CrearRoles handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
      </Modal>*/}
    </Layout>
  );
};

