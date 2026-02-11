import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { usePageParams } from 'hooks/use-page-params';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ejeMapImg from '../../../assets/eje-map.png';

type Mission = {
  missionAddressLatLng: string;
  status: number;
  missionStatusNameAr: string;
};

type HeatMapProps = {
  data: Mission[];
};

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 25.2048,
  lng: 55.2708,
};

export const HeatMap: React.FC<HeatMapProps> = ({ data }) => {
  const { getPageParams } = usePageParams();
  const { type } = getPageParams();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['visualization'],
  });

  const heatmapLayerRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const heatmapData = useMemo<google.maps.visualization.WeightedLocation[]>(() => {
    const source = type ? data : data.filter((item) => item.status === 2 || item.status === 3);

    return source.map((item) => {
      const [lat, lng] = item.missionAddressLatLng.split(',').map(Number);
      return {
        location: new google.maps.LatLng(lat, lng),
        weight: 5,
      };
    });
  }, [data, type]);

  useEffect(() => {
    if (!mapInstance) return;

    // Clear previous heatmap
    if (heatmapLayerRef.current) {
      heatmapLayerRef.current.setMap(null);
      heatmapLayerRef.current = null;
    }

    // Clear previous markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new heatmap
    heatmapLayerRef.current = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: 40,
    });
    heatmapLayerRef.current.setMap(mapInstance);

    // Add markers if type exists
    if (type) {
      heatmapData.forEach((point, index) => {
        const marker = new google.maps.Marker({
          position: point.location,
          map: mapInstance,
          icon: {
            url: ejeMapImg,
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `<div>
                    <strong>نوع المهمة</strong><br/>
                 ${data[index].missionStatusNameAr}
                  </div>`,
        });

        // Add click listener
        marker.addListener('click', () => {
          infoWindow.open({
            anchor: !!type ? marker : null,
            map: mapInstance,
            shouldFocus: false,
          });
        });

        markersRef.current.push(marker);
      });
    }
  }, [heatmapData, mapInstance, type, data]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11} onLoad={(map) => setMapInstance(map)} />
  );
};
