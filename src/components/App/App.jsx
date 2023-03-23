import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './App.styled.js';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import Loader from '../Loader';
import ErrorCard from '../ErrorCard';

function App() {
  const [valueForSearch, setValueForSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentImageDescription, setCurrentImageDescription] = useState('');
  const [currentImag, setCurrentImag] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://pixabay.com/api/?';
  const API_KEY = 'key=33086348-7f53cf98727ae5d390ed7e65d';
  const filterRequest =
    '&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&lang=ru,en';

  useEffect(() => {
    if (valueForSearch === '') {
      return;
    }

    searchOnQuery();

    function searchOnQuery() {
      setVisible(true);

      axios
        .get(
          `${BASE_URL}${API_KEY}&q=${valueForSearch}${filterRequest}&page=${page}`
        )
        .then(response => response.data)
        .then(data => {
          const { hits, totalHits } = data;

          if (hits.length === 0) {
            toast.warn('No photos to show!');
            return;
          }

          return (
            setImages(prevState => [...prevState, ...hits]),
            setImagesOnPage(hits.length),
            setTotalHits(totalHits)
          );
        })
        .catch(error => {
          if (error.response || error.request) setError({ error });
          else setError({ error });
        })
        .finally(() => setVisible(false));
    }
  }, [page, valueForSearch]);

  const closeModal = e => {
    setShowModal(false);
    setCurrentImageDescription('');
    setCurrentImag('');
  };

  const addSearch = query => {
    if (valueForSearch === query) {
      return;
    }

    setValueForSearch(query);
    setImages([]);
    setPage(1);
  };

  const openModal = e => {
    const imgModal = e.target.dataset.img;
    const imgModalAlt = e.target.alt;

    if (showModal) {
      return;
    } else setShowModal(true);

    setCurrentImageDescription(imgModalAlt);
    setCurrentImag(imgModal);
  };

  const handlBtnNewPage = e => {
    return setPage(s => s + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={addSearch} />
      {error && <ErrorCard error={error} />}
      {imagesOnPage > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {visible && <Loader />}
      {imagesOnPage >= 12 && imagesOnPage < totalHits && (
        <Button handlBtnNewPage={handlBtnNewPage} />
      )}
      {showModal && (
        <Modal
          currentImag={currentImag}
          currentImageDescription={currentImageDescription}
          onClose={closeModal}
        />
      )}
      <ToastContainer autoClose={1500} />
    </Container>
  );
}

export default App;
