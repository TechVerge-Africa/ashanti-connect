import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { getServiceBySlug, services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function PortalServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} backHref="/portal/services" />;
}
