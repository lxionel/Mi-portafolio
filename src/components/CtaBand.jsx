import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';

export default function CtaBand({ title, subtitle, primaryText, primaryMsg, secondaryText, secondaryLink }) {
  const isExternal = secondaryLink?.startsWith('tel:') || secondaryLink?.startsWith('http');
  return (
    <section className="cta-band">
      <div className="cta-band__grid" aria-hidden="true" />
      <div className="cta-band__glow cta-band__glow--1" aria-hidden="true" />
      <div className="cta-band__glow cta-band__glow--2" aria-hidden="true" />
      <div className="container cta-band__inner">
        <span className="eyebrow cta-band__eyebrow">¿Empezamos?</span>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{subtitle}</p>
        <div className="cta-band__ctas">
          <a
            className="btn btn-light btn-lg"
            href={wspUrl(primaryMsg)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {primaryText}
          </a>
          {secondaryText && secondaryLink && (
            isExternal
              ? <a className="btn btn-outline-light btn-lg" href={secondaryLink}>{secondaryText}</a>
              : <Link className="btn btn-outline-light btn-lg" to={secondaryLink}>{secondaryText}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
