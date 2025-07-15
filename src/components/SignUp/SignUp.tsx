import { useState, useEffect, type FormEvent } from 'react';
import { LuBrainCircuit } from 'react-icons/lu';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => void;
}

function SignUp({ onSignUp }: SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Simple password strength check
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          onSignUp(name, email, password);
          resolve();
        }, 1000);
      });
    } catch (error) {
      setErrors({
        general: 'Failed to create account. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthLabel = (): string => {
    if (password.length === 0) return '';
    switch (passwordStrength) {
      case 0: return 'Weak';
      case 1: return 'Fair';
      case 2: return 'Good';
      case 3: return 'Strong';
      case 4: return 'Very strong';
      default: return '';
    }
  };

  const getPasswordStrengthClass = (): string => {
    switch (passwordStrength) {
      case 0: return styles.weak;
      case 1: return styles.fair;
      case 2: return styles.good;
      case 3: return styles.strong;
      case 4: return styles.veryStrong;
      default: return '';
    }
  };

  return (
    <main className={styles.signupPage}>
      <div className={styles.patternGrid}></div>
      <div className={styles.particles}></div>
      
      <div className={styles.signupContainer}>
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <LuBrainCircuit />
          </div>
          <h1 className={styles.appTitle}>Face Detect A<span>I</span></h1>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Create your account</h2>
          <p className={styles.formSubtitle}>Join Face Detect AI and start analyzing images today</p>

          {errors.general && (
            <div className={styles.errorMessage}>
              <FiAlertCircle />
              {errors.general}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <div className={styles.inputWrapper}>
                <FiUser className={styles.inputIcon} />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(curr => !curr)}
                  aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div className={`${styles.strengthFill} ${getPasswordStrengthClass()}`} style={{ width: `${(passwordStrength / 4) * 100}%` }}></div>
                  </div>
                  <span className={getPasswordStrengthClass()}>{getPasswordStrengthLabel()}</span>
                </div>
              )}
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(curr => !curr)}
                  aria-label={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className={`${styles.signupButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </form>

          <div className={styles.loginPrompt}>
            Already have an account?{' '}
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          </div>

          <div className={styles.termsNote}>
            By signing up, you agree to our{' '}
            <Link to="/terms" className={styles.termsLink}>Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className={styles.termsLink}>Privacy Policy</Link>
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
  );
}

export default SignUp;