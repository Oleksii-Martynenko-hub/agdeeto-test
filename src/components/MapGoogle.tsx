import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { selectFormPlaceValuesLatLng } from '@/store/selectors/formPlace';
// import { formPlaceActions } from '@/store/actions/formPlace';

interface Props {}

// const libraries: 'places'[] = ['places'];

const MapGoogle: React.FC<Props> = () => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyBu1Ry3DAfWvHNdLwaRC-ZB0OHWKTES2J8',
  //   libraries,
  // });

  const LatLng = useSelector(selectFormPlaceValuesLatLng);
  // const dispatch = useDispatch();

  // const locateHandler = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const geolocationLatLng = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       dispatch(formPlaceActions.setLatLng(geolocationLatLng));
  //       console.log(geolocationLatLng);
  //     },
  //   );
  // };

  return (
    <>
      {/* {loadError && <p>Error loading map...</p>}
      {!isLoaded && <p>Loading map...</p>} */}
      <GoogleMapStyled
        mapContainerStyle={{
          width: '100%',
          height: '50%',
          minHeight: '200px',
          maxHeight: '700px',
          border: '1px solid #a8a8a8',
          marginBottom: '20px',
        }}
        zoom={14}
        center={LatLng}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
        <Marker position={LatLng} />
      </GoogleMapStyled>
      {/* <LocateBtnStyled
        onClick={locateHandler}
      >
        Locate
      </LocateBtnStyled> */}
    </>
  );
};

// const LocateBtnStyled = styled.button``;
const GoogleMapStyled = styled(GoogleMap)`  
`;

// const Overlay = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   /* background: transparent;
//   border: 22px solid rgba(233, 233, 233, 0.92);
//   border-top: 222px solid rgba(233, 233, 233, 0.92);
//   border-bottom: 322px solid rgba(233, 233, 233, 0.92); */

//   &>.top {
//     width: 100%;
//     height: 250px;
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     background: rgba(233, 233, 233, 0.92);
//   }
//   &>.left {
//     width: 100px;
//     height: 100px;
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     background: rgba(233, 233, 233, 0.92);
//   }
//   &>.right {
//     width: 100px;
//     height: 100px;
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     background: rgba(233, 233, 233, 0.92);
//   }
//   &>.bottom {
//     width: 100%;
//     height: 350px;
//     position: absolute;
//     bottom: 0px;
//     left: 0px;
//     background: rgba(233, 233, 233, 0.92);
//     filter: grayscale(100%);
//   }
// `;

export default MapGoogle;
