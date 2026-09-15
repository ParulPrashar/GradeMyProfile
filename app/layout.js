import './globals.css';

export const metadata = {
  title: 'Profile Audit — LinkedIn Reviewer for Student Builders',
  description: 'Upload your LinkedIn PDF export and get a section-by-section score with exact rewrite suggestions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
