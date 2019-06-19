import React from 'react';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import RouteMap from './RouteMap';
import styles from '../stylesheets/Route.module.scss';

const Route = ({ route, id, deleteRoute }) => {
  const { image } = route;
  const distance = route.distance[route.distance.length - 1];
  const points = route.lineFeatures
    .map(line => {
      return line.geometry.coordinates;
    })
    .flat();

  return (
    <div className={styles.routeContainer}>
      <div className={styles.mapContainer}>
        <img src={`data:image/png;base64, ${image}`} alt="map" />
      </div>
      <div>{turf.round(distance, 2)} miles</div>
      <button onClick={() => deleteRoute(id)}>Delete</button>
    </div>
  );
};

Route.propTypes = {
  route: PropTypes.object,
  id: PropTypes.string,
  deleteRoute: PropTypes.func,
};

export default Route;
