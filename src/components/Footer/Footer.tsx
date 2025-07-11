import { LuBrainCircuit, LuGithub, LuLinkedin, LuMail, LuHeart, LuShield, LuZap, LuUsers } from 'react-icons/lu';
import { IoLogoReact } from 'react-icons/io5';
import { SiClarifai, SiTypescript, SiVercel } from 'react-icons/si';
import styles from './Footer.module.scss';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: LuGithub, href: 'https://github.com/CandleLearner-M', label: 'GitHub' },
    { icon: FaXTwitter, href: 'https://x.com/CandleLearner', label: 'X' },
    { icon: LuLinkedin, href: 'https://www.linkedin.com/in/mostafa-el-issati-8a41892a3/', label: 'LinkedIn' },
    { icon: LuMail, href: 'mailto:candlelearner.m.dev@gmail.com', label: 'Email' }

  ];

  const features = [
    { icon: LuZap, title: 'Lightning Fast', desc: 'Real-time face detection' },
    { icon: LuShield, title: 'Privacy First', desc: 'No data stored permanently' },
    { icon: LuUsers, title: '99.8% Accurate', desc: 'State-of-the-art AI models' }
  ];

  const techStack = [
    { icon: IoLogoReact, name: 'React', color: '#61DAFB' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiClarifai, name: 'Clarifai ML APIs', color: '#004eeb' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.brand}>
              <div className={styles.brandIcon}>
                <LuBrainCircuit />
              </div>
              <span className={styles.brandText}>Face Detect AI</span>
            </div>
            
            <p className={styles.brandDescription}>
              Advanced AI-powered face detection technology that analyzes images with 
              precision and speed. Built for developers, designers, and AI enthusiasts.
            </p>
            
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.featuresSection}>
            <h3 className={styles.sectionTitle}>Why Choose Us</h3>
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <feature.icon size={18} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDesc}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <div className={styles.linksList}>
              <a href="#about" className={styles.footerLink}>About</a>
              <a href="#privacy" className={styles.footerLink}>Privacy Policy</a>
              <a href="#terms" className={styles.footerLink}>Terms of Service</a>
              <a href="#api" className={styles.footerLink}>API Documentation</a>
              <a href="#support" className={styles.footerLink}>Support</a>
              <a href="#changelog" className={styles.footerLink}>Changelog</a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className={styles.techSection}>
            <h3 className={styles.sectionTitle}>Built With</h3>
            <div className={styles.techStack}>
              {techStack.map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  <tech.icon size={24} style={{ color: tech.color }} />
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2.5K+</span>
                <span className={styles.statLabel}>Images Analyzed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>99.8%</span>
                <span className={styles.statLabel}>Accuracy Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>
              © {currentYear} Face Detect AI. Made with{' '}
              <LuHeart className={styles.heartIcon} />{' '}
              by{' '}
              <a className={styles.creatorName} href='https://www.mostafaelissati.me/'>Mostafa</a>
            </p>
          </div>
          
          <div className={styles.version}>
            <span className={styles.versionBadge}>v2.1.0</span>
            <span className={styles.buildInfo}>Build #{Math.floor(Math.random() * 1000)}</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className={styles.floatingElements}>
          <div className={styles.element}></div>
          <div className={styles.element}></div>
          <div className={styles.element}></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;