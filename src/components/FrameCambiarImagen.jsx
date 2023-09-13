import React, { useState } from "react";
import { Button, Image } from "react-bootstrap"

export const FrameCambiarImagen = ({show=false, children}) => {

  const handleFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null)
  };

  const inputRef = React.createRef();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {
        selectedImage 
        ?
        <Image src={selectedImage} fluid thumbnail/>
        :
        children
      }
      {
        show &&
        <>
          {
            !selectedImage 
            ?
            <Button variant="warning" style={{position:'absolute',top: '15px', left: '15px'}} onClick={handleFile}>
              <i className="bi bi-images"></i>
            </Button>
            :
            <>
              <Button variant="warning" style={{position:'absolute',top: '15px', left: '15px'}} onClick={handleFile}>
                <i className="bi bi-images"></i>
              </Button>
              <Button variant="success" style={{position:'absolute',top: '15px', left: '60px'}} onClick={handleFile}>
                <i className="bi bi-check2"></i>
              </Button>
              <Button variant="danger" style={{position:'absolute',top: '15px', left: '105px'}} onClick={handleCancel}>
                <i className="bi bi-x-lg"></i>
              </Button>
            </>
          }
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </>
      }
    </div>
  )
}
