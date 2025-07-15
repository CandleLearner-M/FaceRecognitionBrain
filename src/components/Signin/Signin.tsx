import { LuBrainCircuit } from 'react-icons/lu';
import styles from './Signin.module.scss'
import { useState, type FormEvent } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

interface SigninProps {
  onLogin: (email: string, password: string) => void;
}

function Signin({onLogin}: SigninProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if(email.trim() && password.trim()) {
        await new Promise<void>((resolve) =>  setTimeout(() => {
          onLogin(email, password);
          resolve();
        }, 500));
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.signinPage}>
      {/* <div className={styles.patternGrid}></div> */}
      {/* <div className={styles.particles}></div> */}
    
      <div className={styles.loginContainer}>
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <LuBrainCircuit />
          </div>
          <h1 className={styles.appTitle}>Face Detect A<span>I</span></h1>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Log in to your account</h2>
          <p className={styles.formSubtitle}>Welcome back! Please enter your details</p>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required                
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.passwordLabel}>
                <label htmlFor="password">Password</label>
                <a href="/forgot-password" className={styles.forgotPassword}>Forgot password?</a>
              </div>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text": "password"}
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required                
                />
                <button type='button'
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(curr => !curr)}
                  aria-label={showPassword ? 'Hide Password': 'Show Password'} >
                    {showPassword ? <FiEyeOff />: <FiEye />}
                  </button>
              </div>
            </div>
            <button type='submit' className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`} disabled={isLoading}>
              {
                isLoading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
            </button>
          </form>

          <div className={styles.registerPrompt}>
            Don't have an account? {' '}
            <a href="/signup" className={styles.registerLink}>Sign up</a>
          </div>

          <div className={styles.securityNote}>
            <div className={styles.securityIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p>Your data is encrypted and never stored permanently</p>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Signin;