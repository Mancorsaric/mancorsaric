import { Image } from 'react-bootstrap'

export const EscudoMunicipal = ({image, name, url}) => {
  return (
    <a href={url} rel="noreferrer" target='_blank' style={{textDecoration: 'none', color: 'black'}}>
      <div className='d-flex flex-column align-items-center m-3'>
        <Image src={image} rounded width={200} height={200}/>
        <h5>{name}</h5>
      </div>
    </a>
  )
}
