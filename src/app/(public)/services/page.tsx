import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ServicesExplorer } from "@/components/services/services-explorer";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Government Services",
  description:
    "One front door for government services in the Ashanti Region — Ghana Card, passport, tax, driving, business, health, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services hub"
        title="Every government service, one front door"
        description="Find what you need, check the requirements and fees up front, and get it done — from your Ghana Card and passport to taxes, driving, and business registration."
      />
      <section className="container py-12">
        <ServicesExplorer services={services} />
      </section>
    </>
  );
}
