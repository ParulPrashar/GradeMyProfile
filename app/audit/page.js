import AuditClient from './AuditClient';

export const metadata = {
  title: 'Grade your LinkedIn profile — free instant score',
  description:
    'Upload your LinkedIn PDF export and get a score for every section, plus exact rewrite suggestions. Free, no account needed.',
};

export default function AuditPage() {
  return <AuditClient />;
}
