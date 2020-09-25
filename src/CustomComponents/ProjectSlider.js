import React, { useCallback, useEffect, useState } from 'react'

const imageToggle = {
  next: 'next',
  prev: 'prev'
}

function ProjectSlider({ images, onClose }) {
  const [currentIdx, setcurrentIdx] = useState(0);
  const [idxLimit, setIdxLimit] = useState(images.length);

  useEffect(function reactToImagesChanges() {
    if (!images) return;
    setIdxLimit(images.length);
  }, [images]);

  const nextImage = () => setcurrentIdx(prev => prev + 1);
  const prevImage = () => setcurrentIdx(prev => prev - 1);

  const toggleImage = useCallback((action) => {
    if (idxLimit === 0) return;
    switch (action) {
      case imageToggle.next:
        console.log('nexting')
        if ((currentIdx + 1) >= idxLimit) setcurrentIdx(0);
        else nextImage();
        break;

      case imageToggle.prev:
        console.log('preving')
        if ((currentIdx - 1) < 0) {
          console.log('ifing')
          setcurrentIdx(idxLimit - 1);
        }
        else prevImage();
        break;

      default:
        setcurrentIdx(0);
    }
  }, [currentIdx, idxLimit]);

  console.log('idxLimit', idxLimit);
  console.log('currentIdx', currentIdx);

  return ( <div className='projectSlider'>
        <div className='projectSlider__content'>
          <span onClick={() => onClose()} className='projectSlider__close'></span>
          {images.map((image, idx) => (
            <div className={`projectSlider__item ${idx === currentIdx ? 'projectSlider__item--active' : ''}`}>
              <img src={image.url} alt={image.alt} />
            </div>
          ))}
          <div className='projectSlider__thumbContainer'>
            {images.map((image, idx) => (
              <img
                onClick={() => setcurrentIdx(idx)}
                src={image.url}
                alt={image.alt}
                className={`projectSlider__thumb ${idx === currentIdx ? 'projectSlider__thumb--active' : ''}`}
              />
            ))}
          </div>
          <div className='projectSlider__toggle'>
            <span
              onClick={() => toggleImage(imageToggle.prev)}
              className='projectSlider__prev'
            >&#8592;</span>
            <span
              onClick={() => toggleImage(imageToggle.next)}
              className='projectSlider__next'
            >&#8594;</span>
          </div>
        </div>
      </div>
  )
}

export default ProjectSlider;
