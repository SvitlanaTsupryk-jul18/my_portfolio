import { createRoot } from 'react-dom/client'
import './styles.scss'
import { App } from './App'
import { MdEmail } from 'react-icons/md';

function Root() {
  return (
    <>
      <App />
      <div style={{ position: 'absolute', pointerEvents: 'none', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <a href="mailto:stsupryk@gmail.com" target="_blank" style={{ position: 'absolute', bottom: 70, left: 40, fontSize: '18px', color: '#0f4857', fontWeight: 'bold' }}>
        <MdEmail style={{ display: 'inline-block', marginBottom: -3, marginRight: 10, width: 20, height: 20, fill: '#0f4857' }} />
          Svitlana Tsupryk
        </a>
        <div style={{ position: 'absolute', top: 50, right: 40, fontSize: '20px', color: '#0f4857', fontWeight: 'bold' }}>Scroll &#x21e1;&#x21e3;</div>
        <div style={{ position: 'absolute', top: 50, left: 40, fontSize: '20px', color: '#0f4857', fontWeight: 'bold' }} href="#">Click on ball &#x2198;</div>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
