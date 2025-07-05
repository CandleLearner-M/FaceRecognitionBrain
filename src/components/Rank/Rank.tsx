import styles from './Rank.module.scss';

function Rank() {
  return (
    <div className={styles.rank}>
      <div className={styles.rankSentence}>
        {'Mostafa, your current rank is...'}
      </div>
      <div className={styles.rankItself}>
        {'#5'}
      </div>
    </div>
  )
}
export default Rank