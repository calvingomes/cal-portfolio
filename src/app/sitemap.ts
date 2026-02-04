import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calvingomes.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume/cal-resume-ae.pdf`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/resume/cal-resume-in.pdf`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/resume/cal-resume-gl.pdf`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
