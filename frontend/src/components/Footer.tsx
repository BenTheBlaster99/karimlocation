import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import {
  MailOutline,
  Instagram,
  WhatsApp,
} from '@mui/icons-material'
import { strings } from '@/lang/footer'
import env from '@/config/env.config'

import '@/assets/css/footer.css'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className="footer">
      <div className="header">{env.WEBSITE_NAME}</div>
      <section className="main">
        <div className="main-section">
          <div className="title">{strings.RENT}</div>
          <ul className="links">
            {!env.HIDE_SUPPLIERS && <li onClick={() => navigate('/suppliers')}>{strings.SUPPLIERS}</li>}
            <li onClick={() => navigate('/locations')}>{strings.LOCATIONS}</li>
          </ul>
        </div>
        <div className="main-section">
          <div className="title">{strings.SUPPORT}</div>
          <ul className="links">
            <li onClick={() => navigate('/faq')}>{strings.FAQ}</li>
          </ul>
          <div className="footer-contact">
            <MailOutline className="icon" />
            <a href={`mailto:${env.CONTACT_EMAIL}`}>{env.CONTACT_EMAIL}</a>
          </div>
          <div className="footer-contact">
            <IconButton href="https://wa.me/213770730344" target="_blank" aria-label="WhatsApp" className="social-icon"><WhatsApp /></IconButton>
            <IconButton href="https://www.instagram.com/carkarimauto" target="_blank" aria-label="Instagram" className="social-icon"><Instagram /></IconButton>
            <IconButton href="https://www.tiktok.com/@karim_autocar" target="_blank" aria-label="TikTok" className="social-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path fill="currentColor" d="M14.5 3c.4 2.4 1.8 4.1 4.2 4.4v2.5c-1.4 0-2.7-.4-3.9-1.2v6.6c0 3.4-2.6 6.2-6.1 6.2S2.6 18.7 2.6 15.3c0-3.3 2.5-6 5.8-6.2v2.6c-1.5.2-2.6 1.5-2.6 3.1 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V3h2.5z" />
              </svg>
            </IconButton>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Footer
