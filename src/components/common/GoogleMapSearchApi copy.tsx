/* global google */
import React, {
  useCallback,
  useRef,
  useState,
} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  // ComboboxPopover,
  // ComboboxList,
  // ComboboxOption,
} from '@reach/combobox';

import { createLocationActions } from '@/store/actions/create-location';
import { ICoordinates } from '@/store/reducers/create-location';
import { selectCreateLocationValues } from '@/store/selectors/create-location';
import { selectLocationValues } from '@/store/selectors/location';

import InputLabel from '@/components/common/InputLabel';
// import Loader from '@/components/common/Loader';
import Button from './Button';
import SvgIcon from './SvgIcon';

interface Props {
  isCreatingLocation?: boolean;
  isLocationPage?: boolean;
  isRejected?: boolean;
  isSearch?: boolean;
  notValid?: boolean;
}

const GoogleMapSearchApi: React.FC<Props> = ({
  isCreatingLocation = false,
  isLocationPage = false,
  isRejected = false,
  isSearch = false,
  notValid = false,
}) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
  };

  const {
    ready,
    // suggestions: { status, data, loading },
    // setValue,
  } = usePlacesAutocomplete();

  const iconMarker = {
    url: '/assets/marker.png',
    scaledSize: new google.maps.Size(38, 38),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(19, 38),
  };

  const dispatch = useDispatch();

  const { address, coordinates } = isCreatingLocation
    ? useSelector(selectCreateLocationValues)
    : useSelector(selectLocationValues);

  const searchRef = useRef<HTMLInputElement>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [isZoomedMap, setIsZoomedMap] = useState<boolean>(false);
  const [opacityMarker, setOpacityMarker] = useState<boolean>(false);
  const [centerMap, setCenterMap] = useState<ICoordinates>(coordinates);

  const isValidAddress = address.length > 2;

  const isValidCoordinates = coordinates.lat !== 49 && coordinates.lng !== 32;

  const mapLoad = useCallback((map: google.maps.Map) => {
    if (map && isCreatingLocation) {
      setMapRef(map);
    }
    if (map && !isSearch) {
      map.setZoom(17);
      if (isRejected) map.setZoom(7);
    }
  }, []);

  const markerLoad = useCallback((marker: google.maps.Marker) => {
    if (marker) {
      marker.setIcon(iconMarker);
    }
  }, []);

  const handleChange = (e: { target: { value: string; }; }) => {
    // setValue(e.target.value);

    dispatch(createLocationActions.setAddress(e.target.value));
  };

  // const handleSelect = async (val: any) => {
  //   dispatch(createLocationActions.setAddress(val));

  //   const result = await getGeocode({ address: val }).then((results) => results[0]);

  //   dispatch(createLocationActions.setCoordinates(await getLatLng(result)));

  //   searchRef.current!.blur();
  // };

  const handleMapZoomChange = () => {
    if (isCreatingLocation && mapRef) {
      mapRef!.panTo(coordinates);
    }
  };

  const handleMapDrag = () => {
    if (isCreatingLocation) {
      if (!opacityMarker) setOpacityMarker(true);

      setCenterMap({
        lat: mapRef!.getCenter().lat(),
        lng: mapRef!.getCenter().lng(),
      });
    }
  };

  const handleMapDragEnd = async () => {
    if (isCreatingLocation) {
      setOpacityMarker(false);

      dispatch(createLocationActions.setCoordinates(centerMap));

      // const [{ formatted_address: formattedAddress }]
      // = await getGeocode({ location: centerMap });

      // dispatch(createLocationActions.setAddress(formattedAddress));

      // setValue(formattedAddress);
    }
  };

  // const handleClickOnDropDownItem = () => setTimeout(() => searchRef.current!.blur(), 100);

  // const handleMouseOverItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  //   e.currentTarget.setAttribute('aria-selected', 'true');
  //   dispatch(createLocationActions.setAddress(e.currentTarget.textContent!));
  // };

  // const handleMouseOutItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  //   e.currentTarget.setAttribute('aria-selected', 'false');
  // };

  const handleClickZoomMap = () => setIsZoomedMap(!isZoomedMap);

  const handleClickZoomPlus = () => {
    if (mapRef) mapRef!.setZoom(mapRef!.getZoom() + 1);
  };

  const handleClickZoomMinus = () => {
    if (mapRef) mapRef!.setZoom(mapRef!.getZoom() - 1);
  };

  return (
    <>
      {isSearch && (
        <PlaceSearch>
          <InputLabel unwrap required isValid={isValidAddress} left={63}>
            <span>Address</span>
            <Input
              ref={searchRef}
              $isValidity={isValidAddress}
              notValid={notValid}
              value={address}
              onChange={handleChange}
              disabled={!ready}
              placeholder="Khreschatyk St, 1, Kyiv, Ukraine"
            />
          </InputLabel>
          {/* <LoadingLocations isLoading={loading}><Loader size={24} /></LoadingLocations> */}
          {/* <Popover>
            <DropDown $isVisible={!!(data.length || status === 'ZERO_RESULTS')}>
              {status === 'OK' && data.map(({ place_id, description }) => (
                <Item
                  onClick={handleClickOnDropDownItem}
                  key={place_id}
                  value={description}
                  // onMouseOver={handleMouseOverItem}
                  // onMouseOut={handleMouseOutItem}
                />
              ))}
              {status === 'ZERO_RESULTS' && (
                <DefaultItem value="Not found location" />
              )}
            </DropDown>
          </Popover> */}
        </PlaceSearch>
      )}

      <WrapGoogleMap
        isZoomedMap={isZoomedMap}
        isLocationPage={isLocationPage}
        $isValidity={isValidCoordinates}
        notValid={notValid}
      >
        <GoogleMap
          onZoomChanged={handleMapZoomChange}
          onDrag={handleMapDrag}
          onDragEnd={handleMapDragEnd}
          mapContainerStyle={containerStyle}
          zoom={7}
          center={coordinates}
          options={{ disableDefaultUI: true, zoomControl: false, gestureHandling: isZoomedMap ? 'greedy' : 'none' }}
          onLoad={mapLoad}
          clickableIcons={false}
        >
          <Marker
            onLoad={markerLoad}
            position={coordinates}
            visible={!isCreatingLocation}
          />
          <CustomMarker opacityMarker={opacityMarker} visible={isCreatingLocation} />
        </GoogleMap>

        {!isLocationPage && (
          <ButtonsWrap>
            <Button customStyled={ButtonStyled} onclick={handleClickZoomMap}>
              {isZoomedMap
                ? <SvgIcon icon="minimize" />
                : <SvgIcon icon="maximize" />}
            </Button>
            <Button customStyled={ButtonStyled} onclick={handleClickZoomPlus}>
              <SvgIcon icon="plus" />
            </Button>
            <Button customStyled={ButtonStyled} onclick={handleClickZoomMinus}>
              <SvgIcon icon="minus" />
            </Button>
          </ButtonsWrap>
        )}

        {!isLocationPage && (
          <OverlayGoogleMap onClick={handleClickZoomMap}>
            <TextOverlayGoogleMap>Click to select point on the map</TextOverlayGoogleMap>
          </OverlayGoogleMap>
        )}
      </WrapGoogleMap>
    </>
  );
};

const ButtonStyled = css`
  padding: 4px;
`;

const ButtonsWrap = styled.div`
  width: 40px;
  height: 154px;
  flex-flow: column;
  justify-content: space-between;
  position: absolute;
  z-index: 1;
  right: 22px;
`;

const TextOverlayGoogleMap = styled.p`
  font-size: 15px;
  color: #fff;
  text-align: center;
`;

const OverlayGoogleMap = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 4px;
  top: 5px;
  left: 5px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const WrapGoogleMap = styled.div<{ isLocationPage: boolean, isZoomedMap: boolean, $isValidity: boolean, notValid: boolean }>`
  width: ${({ isZoomedMap }) => (isZoomedMap ? 'calc(100% - 20px)' : '100%')};
  height: ${({ isZoomedMap }) => (isZoomedMap ? 'calc(100% - 20px)' : '200px')};
  padding: 5px;
  border: 1px solid ${({ notValid, $isValidity, theme }) => (notValid ? ($isValidity ? theme.palette.green : theme.palette.red) : '#e3e6ef')};
  border-radius: 4px;
  margin: 0 0 20px 0;
  position: ${({ isZoomedMap }) => (isZoomedMap ? 'fixed' : 'relative')};
  z-index: ${({ isZoomedMap }) => (isZoomedMap ? '15' : '0')};
  top: ${({ isZoomedMap }) => (isZoomedMap ? '10px' : '0')};
  left: ${({ isZoomedMap }) => (isZoomedMap ? '10px' : '0')};
  order: 1;
  overflow: hidden;

  &:hover {
    border: 1px solid ${({ $isValidity, isLocationPage, theme }) => (isLocationPage
      ? '#e3e6ef'
      : ($isValidity ? theme.palette.green : theme.palette.red)
    )};
  }

  ${ButtonsWrap} {
    display: ${({ isZoomedMap }) => (isZoomedMap ? 'flex' : 'flex')};
    bottom: ${({ isZoomedMap }) => (isZoomedMap ? '40px' : '22px')};
  }

  ${OverlayGoogleMap} {
    display: ${({ isZoomedMap }) => (isZoomedMap ? 'none' : 'flex')};
  }
`;

// const LoadingLocations = styled.span<{isLoading: boolean}>`
//   display: block;
//   opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
//   position: absolute;
//   top: 33px;
//   right: 6px;
//   width: 30px;
//   height: 30px;
//   background: #fff;
//   pointer-events: none;
// `;

const CustomMarker = styled.div<{ visible: boolean, opacityMarker: boolean }>`
  width: 38px;
  height: 38px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  opacity: ${({ opacityMarker }) => (opacityMarker ? '0.8' : '1')};
  position: absolute;
  top: calc(50% - 19px);
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('/assets/marker.png') center no-repeat;
  background-size: contain;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: calc(50% + 19px);
    left: 50%;
    transform: translate(-50%, -50%) rotate(34deg);
    width: 15px;
    height: 2px;
    border-radius: 1px;
    background: rgba(0, 0, 0, 0.6);
    opacity: ${({ opacityMarker }) => (opacityMarker ? '0.8' : '0')};
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-34deg);
  }
`;

const PlaceSearch = styled(Combobox)`
  width: 100%;
  margin-bottom: 7px;
  position: relative;
  z-index: 5;
`;

// const Popover = styled(ComboboxPopover)`
//   z-index: 4;
// `;

const Input = styled(ComboboxInput)<{ $isValidity: boolean, notValid: boolean }>`
  width: 100%;
  height: 40px;
  padding: 10px;
  display: block;
  text-overflow: ellipsis;
  border: 1px solid ${({
    $isValidity,
    value,
    notValid,
    theme,
  }) => (value || notValid
    ? ($isValidity ? theme.palette.green : theme.palette.red)
    : '#e3e6ef'
  )};
  border-radius: 4px;  
  z-index: 1;

  &:hover {
    border: 1px solid ${({ theme }) => (theme.palette.blue)};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(95, 99, 242, 0.2);
    border: 1px solid ${({ $isValidity, value, theme }) => (value
    ? ($isValidity ? theme.palette.green : theme.palette.red)
    : theme.palette.blue
  )};
  }
`;

// const Item = styled(ComboboxOption)`
//   z-index: 1;
//   width: 100%;
//   height: 26px;
//   line-height: 26px;
//   margin: auto 0;
//   padding: 0 17px 0 12px;
//   font-family: 'Inter', sans-serif;
//   font-size: 13px;
//   overflow: auto hidden;
//   white-space: nowrap;
//   -webkit-overflow-scrolling: touch;
//   cursor: pointer;
//   position: relative;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   &[aria-selected="true"] {
//     color: ${({ theme }) => (theme.palette.blue)};
//     background: ${({ theme }) => (`${theme.palette.blue}0f`)};

//     &::before {
//       background: #1f2a3d;
//     }
//   }

//   &:hover {
//     color: ${({ theme }) => (theme.palette.blue)} !important;
//     background: ${({ theme }) => (`${theme.palette.blue}0f`)} !important;

//     &::before {
//       background: #1f2a3d !important;
//     }
//   }
// `;

// const DropDown = styled(ComboboxList)<{ $isVisible: boolean }>`
//   width: 92%;
//   min-height: 50px;
//   display: flex;
//   flex-flow: wrap;
//   position: relative;
//   opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
//   top: 0;
//   border: 1px solid #e3e6ef;
//   border-radius: 4px;
//   background: #fff;
//   margin: 10px 0 0 0;
//   padding: 0;
//   z-index: 1;

//   &::before, &::after {
//     content: '';
//     height: 100%;
//     width: 20px;
//     box-shadow: inset -16px 0 14px #fff;
//     border-radius: 4px;
//     position: absolute;
//     top: 0;
//     right: 0;
//     display: block;
//     z-index: 2;
//   }

//   &::before {
//     height: 0;
//     width: 0;
//     border-radius: 0;
//     border: 8px solid transparent;
//     border-bottom: 10px solid #e3e6ef;
//     border-top: none;
//     position: absolute;
//     top: -10px;
//     left: 10px;
//   }

//   &:hover {
//     border: 1px solid ${({ theme }) => (theme.palette.blue)};

//     &::before {
//       border-bottom: 10px solid ${({ theme }) => (theme.palette.blue)};
//     }
//   }

//   &:hover > li {
//     &[aria-selected="true"],
//     &:hover[aria-selected="true"] {
//       color: #000;
//       background: #fff;

//       &::before {
//         background: transparent;
//       }
//     }
//   }
// `;

// const DefaultItem = styled(Item)`
//   pointer-events: none;
//   opacity: 0.7;

//   &::before,
//   &::after {
//     display: none;
//   }
// `;

export default GoogleMapSearchApi;
