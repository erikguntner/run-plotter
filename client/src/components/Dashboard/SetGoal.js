import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import styles from '../../stylesheets/SetGoal.module.scss';

const SetGoal = ({
  setGoal,
  updateSetGoal,
  onGoalChange,
  newGoal,
  updateGoal,
}) => {
  return (
    <div className={styles.setGoalContainer}>
      <div className={styles.setGoalInner}>
        {setGoal ? (
          <>
            <input
              className={styles.setGoalInput}
              style={{
                width: `${23 + newGoal.toString().length * 23}px`,
              }}
              onChange={onGoalChange}
              min="0"
              type="number"
              placeholder="5"
            />
            <button onClick={updateGoal}>save goal</button>
          </>
        ) : (
          <div className={styles.setGoal} onClick={updateSetGoal}>
            <div>Set Goal</div>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </div>
        )}
      </div>
    </div>
  );
};

SetGoal.propTypes = {
  setGoal: PropTypes.bool,
  updateSetGoal: PropTypes.func,
  inGoalChange: PropTypes.func,
  newGoal: PropTypes.number,
  updateGoal: PropTypes.func,
};

export default SetGoal;
