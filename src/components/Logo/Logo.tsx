import styles from './Logo.module.scss';
import Tilt from 'react-parallax-tilt';
import Logo from '/Logo.png'

function Logo() {
  return (
  <div className={styles.logo}>
    <Tilt className={styles.tilt}>
      <img src='/Logo.jpg'  />
   </Tilt>
  </div>
  )
}
export default Logo