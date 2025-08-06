import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <div style={styles.textWrapper}>
        <h1 style={styles.outlineText}>PRIMUS – Dienstplanung</h1>
        <div style={styles.glare}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  textWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  outlineText: {
  fontSize: '50px',
  fontWeight: 'bold',
  color: '#3399ff', // Button-Blau
  WebkitTextStroke: '1.5px black', // Schwarzer Rand
  textAlign: 'center',
  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  zIndex: 1,
  position: 'relative',
},

  glare: {
    position: 'absolute',
    top: 0,
    left: '-75%',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
    transform: 'skewX(-20deg)',
    animation: 'glareMove 2.5s ease-in-out infinite',
    zIndex: 2,
    pointerEvents: 'none',
  },
};
