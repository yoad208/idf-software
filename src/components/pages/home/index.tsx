import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationMarker from '../../../../assets/location.png';
import { IGov } from '../../../interfaces/IGov.interface';
import { useGovs } from '../../../hooks/useGovs';

const marker = L.icon({
  iconUrl: locationMarker,
  iconSize: [35, 35],
});
// eslint-disable-next-line import/prefer-default-export
export const Map = () => {
  const pos: LatLngExpression = [33.270868, 35.67544];
  const z = 12;
  const { govs } = useGovs();

  return (
    <MapContainer
      center={pos}
      zoom={z}
      scrollWheelZoom={false}
      attributionControl={false}
      style={{
        height: '97vh',
        margin: 10,
        borderRadius: 18,
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {govs.map((gov: IGov) => {
        return (
          <Marker
            key={gov?.id}
            icon={marker}
            position={[gov.location.lat, gov.location.lang] as LatLngExpression}
          >
            <Popup>{gov.place_description}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
