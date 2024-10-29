import { useEffect, useState } from 'react';

function MyComponent() {
  const [domain, setDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');

  useEffect(() => {
    // Check if window is available to avoid errors during SSR
    if (typeof window !== 'undefined') {
      const { hostname } = window.location;
      const parts = hostname.split('.');

      // Get the TLD (last part of the hostname)
      const tld = parts.slice(-1)[0];

      // Get the subdomain (all parts except the last two, which are the domain and TLD)
      const subdomain = parts.length > 2 ? parts.slice(0, -2).join('.') : '';

      setDomain(tld);
      setSubdomain(subdomain);
    }
  }, []);

  return (
    <div>
      <p>Top-level domain: {domain}</p>
      <p>Subdomain: {subdomain || 'No subdomain'}</p>
    </div>
  );
}

export default MyComponent;
