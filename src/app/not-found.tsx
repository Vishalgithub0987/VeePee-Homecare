import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--color-warm-ivory)',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-soft-mint)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Home size={36} aria-hidden="true" />
      </div>

      <span
        style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}
      >
        404 — Page Not Found
      </span>

      <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '1rem' }}>
        Looking for Healthcare Support?
      </h1>

      <p
        style={{
          maxWidth: '520px',
          fontSize: '1rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        The page you are looking for does not exist or has been relocated. Return to the Vee Pee Home Care homepage to explore our home nursing services and medical equipment.
      </p>

      <Link href="/" className="btn btn-primary btn-lg">
        <ArrowLeft size={18} aria-hidden="true" />
        <span>Back to Homepage</span>
      </Link>
    </div>
  );
}
