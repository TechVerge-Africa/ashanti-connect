import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { OpportunitiesExplorer } from "@/components/opportunities/opportunities-explorer";
import { opportunities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Jobs, scholarships, grants, internships, training, and entrepreneurship support.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Opportunity hub"
        title="Opportunities for every citizen"
        description="Jobs, scholarships, grants, internships, training, and entrepreneurship support — all in one place, updated continuously."
      />
      <section className="container py-12">
        <OpportunitiesExplorer opportunities={opportunities} />
      </section>
    </>
  );
}
