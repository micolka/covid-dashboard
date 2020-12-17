import React from 'react';

import styles from '@/assets/stylesheets/switch.scss';

const ToggleSwitch = ({checked, onChange}) => (
  <div className={styles['toggle-switch']}>
    <input
      type="checkbox"
      className={styles['toggle-switch-checkbox']}
      name="toggleSwitch"
      id="toggleSwitch"
      onChange={e => onChange(e.target.checked)}
    />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className={styles['toggle-switch-label']} htmlFor="toggleSwitch">
      <span className={styles['toggle-switch-inner']} />
      <span className={styles['toggle-switch-switch']} />
    </label>
  </div>
);

export default ToggleSwitch;
