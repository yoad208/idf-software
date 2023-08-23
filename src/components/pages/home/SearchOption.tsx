import { GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// eslint-disable-next-line import/prefer-default-export
export const SearchControl = ({ ...props }: any) => {
  const map = useMap();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    const searchControl = GeoSearchControl({
      provider: props.provider,
      style: 'bar',
      className: 'geosearch',
      ...props,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, props]);

  return null;
};
