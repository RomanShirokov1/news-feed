import { Spin } from 'antd';
import styles from './index.module.css';

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Spin size="large" />
    </div>
  );
};
