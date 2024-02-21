import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import { sortPlacesByDistance } from './loc.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
const storedIds=JSON.parse(localStorage.getItem('selectedPlaces'))||[]
  const storedPlaces=storedIds.map((id)=>AVAILABLE_PLACES.find((place)=>place.id===id))
function App() {
  

  const selectedPlace = useRef();
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [AvailablePlaces,setAvailablePlaces]=useState([])


  useEffect(()=>{
navigator.geolocation.getCurrentPosition((position)=>{
  const sortedPlaces=sortPlacesByDistance(AVAILABLE_PLACES,position.coords.latitude,position.coords.longitude)
  setAvailablePlaces(sortedPlaces)
})

  },[])
  function handleStartRemovePlace(id) {
  
setIsModalOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
   setIsModalOpen(false)
  }

  function handleSelectPlace(id) {
 

    // navigator.getPosition((position)=>{console.log(position)},(error)=>{console.log(error)},{timeout:10000})
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);

      const storedIDs=JSON.parse(localStorage.getItem('selectedPlaces'))||[]
   if(storedIDs.indexOf(id)===-1){
      localStorage.setItem('selectedPlaces',JSON.stringify([...storedIDs,id]))}
      return [place, ...prevPickedPlaces];
    });
  }
  const handleRemovePlace=useCallback( function handleRemovePlace() {

    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
   setIsModalOpen(false)


    const storedIds=JSON.parse(localStorage.getItem('selectedPlaces'))||[]
    localStorage.setItem('selectedPlaces',JSON.stringify(storedIds.filter((id)=>id!==selectedPlace.current) ))
  },[])

 

  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AvailablePlaces}
          fallbackText="Sorting Places by distance...."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
