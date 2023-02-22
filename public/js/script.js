// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("test2 JS imported successfully!");
});
  
  function initMap() {
    console.log("initMap")
  const ubicacionRestaurante = { lat: 41.39759455687975, lng: 2.190207416099923 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    center: ubicacionRestaurante
    
  });
  const marker = new google.maps.Marker({
    position: ubicacionRestaurante,
    map: map,
  });
  initAutocomplete()
}

let autocomplete;
function initAutocomplete(){
  console.log("initotro")

  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('pac-input'),
    {
      types: ['establishment'],
      componentRestrictions: {'country': ['ES']},
      fields: ['place_id', 'geometry', 'name']
    }
    );
    console.log(autocomplete)
  autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged(){
  let place = autocomplete.getPlace();
  if(!place.geometry){
    document.getElementById('autocomplete').placeholder = 'Enter a place';
  } else {
    document.getElementById('details').innerHTML = place.name;
    //crear un marker
    //fer que el resultat vagi a un post
  }
  
}
// findPlaceFromQuery()

window.initMap = initMap;

