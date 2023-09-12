import { Spinner } from "react-bootstrap";

export const LoadingScreen = () => {
  return (
    <div className='w-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'var(--palette-green-light)', height: '100vh'}}>
      <Spinner className="mb-2" animation='grow' style={{ height: '10rem', width: '10rem', fontSize: '5rem', color: 'var(--palette-yellow-light)' }}/>
      <h1>Cargando...</h1>
    </div>
  );
}
