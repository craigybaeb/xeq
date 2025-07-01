import { Metadata } from 'next';
import ContactPage from './ContactPage';

// Metadata used for SEO and browser tab title
export const metadata: Metadata = {
  title: 'XEQ | Contact Us',
  description: 'Get in touch with the XEQ team at Robert Gordon University.',
};

export default function ContactRoute() {
  return <ContactPage />;
}
