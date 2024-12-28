import axios from 'axios';


export const obtenerDatosConPlaceID = async (place_id: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.API_KEY}`;
  //           https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAwrmZ-X6dYijYKztMbEx8dxZmOPihtyNE
  //           https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJsUDXn2od0oURpAnsjV2k44A&key=AIzaSyAwrmZ-X6dYijYKztMbEx8dxZmOPihtyNE
  try {
    const response = await axios.get(url);
    console.log(response);
    const data = response.data.result;
    
    if (data) {
      return {
        address: data.formatted_address,
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error('Error fetching location data from Google Maps');
  }
};