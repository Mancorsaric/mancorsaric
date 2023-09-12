import { ListGroup } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';

export const BarraFiltros = ({activeFilter, setFiltro, resetIndex}) => {
  const { data, isLoading } = useFetch(process.env.REACT_APP_API_URL + '/departamentos');

  const handleFilter = (deptoId) => {
    if(deptoId !== activeFilter){
      setFiltro(deptoId)
    }
    else{
      setFiltro('')
    }
    resetIndex()
  }
  return (
    <aside className="px-3 mt-4">
      <h3>Unidades</h3>
      <ListGroup variant='dark'>
        {
          !isLoading &&
          data.map(depto => (
            <ListGroup.Item key={depto._id} variant='info' action 
            onClick={() => handleFilter(depto._id)} active={depto._id === activeFilter}>
              {depto.nombre}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </aside>
  )
}
