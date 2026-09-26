import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gradmyprofile.example.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GradeMyProfile — Free LinkedIn Profile Grader for Students',
    template: '%s · GradeMyProfile',
  },
  description:
    'Upload your LinkedIn profile as a PDF and get a section-by-section score — headline, About, experience, projects — with exact rewrite suggestions. Free, built for Indian college students and early-career tech talent.',
  keywords: [
    'LinkedIn profile checker',
    'LinkedIn profile score',
    'LinkedIn profile review for students',
    'improve LinkedIn profile college student',
    'free LinkedIn profile grader',
    'LinkedIn headline examples for students',
  ],
  openGraph: {
    title: 'GradeMyProfile — Free LinkedIn Profile Grader for Students',
    description:
      'Get a section-by-section score for your LinkedIn profile, with exact rewrite suggestions. Free.',
    url: siteUrl,
    siteName: 'GradeMyProfile',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GradeMyProfile — Free LinkedIn Profile Grader for Students',
    description: 'Get a section-by-section score for your LinkedIn profile, with exact rewrite suggestions.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
