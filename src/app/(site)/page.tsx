import Hero2 from "@/components/sections/Hero2";
import ServicesOrbital from "@/components/sections/ServicesOrbital";
import Clients from "@/components/sections/Clients";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import HowWeWork from "@/components/sections/HowWeWork";
import Testimonials2 from "@/components/sections/Testimonials2";
import Offices from "@/components/sections/Offices";
import Faqs from "@/components/sections/Faqs";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  servicesQuery,
  projectsListQuery,
  clientsQuery,
  testimonialsQuery,
  officesQuery,
  faqsQuery,
  heroSectionQuery,
  howWeWorkStepsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityService,
  SanityProjectListItem,
  SanityClient as SanityClientType,
  SanityTestimonial,
  SanityOffice,
  SanityFaqItem,
  SanityHeroSection,
  SanityHowWeWorkStep,
} from "@/sanity/lib/types";

export default async function Home() {
  const [services, projects, clients, testimonials, offices, faqs, hero, steps] =
    await Promise.all([
      sanityFetch<SanityService[]>({ query: servicesQuery, tags: ["service"] }),
      sanityFetch<SanityProjectListItem[]>({ query: projectsListQuery, tags: ["project"] }),
      sanityFetch<SanityClientType[]>({ query: clientsQuery, tags: ["client"] }),
      sanityFetch<SanityTestimonial[]>({ query: testimonialsQuery, tags: ["testimonial"] }),
      sanityFetch<SanityOffice[]>({ query: officesQuery, tags: ["office"] }),
      sanityFetch<SanityFaqItem[]>({ query: faqsQuery, params: { context: "homepage" }, tags: ["faq"] }),
      sanityFetch<SanityHeroSection>({ query: heroSectionQuery, tags: ["hero"] }),
      sanityFetch<SanityHowWeWorkStep[]>({ query: howWeWorkStepsQuery, tags: ["howWeWork"] }),
    ]);

  return (
    <main className="page-canvas">
      <Hero2 data={hero} />
      <ServicesOrbital services={services} />
      <div className="section-divider" aria-hidden="true" />
      <HowWeWork steps={steps} />
      <div className="section-divider" aria-hidden="true" />
      <ProjectsGallery projects={projects} />
      <div className="section-divider" aria-hidden="true" />
      <Clients clients={clients} />
      <div className="section-divider" aria-hidden="true" />
      <Testimonials2 testimonials={testimonials} />
      <div className="section-divider" aria-hidden="true" />
      <Offices offices={offices} />
      <div className="section-divider" aria-hidden="true" />
      <Faqs faqs={faqs} />
    </main>
  );
}
