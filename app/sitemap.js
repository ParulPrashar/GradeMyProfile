const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gradmyprofile.example.com';

export default function sitemap() {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/audit`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
