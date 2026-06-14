import { ServicesExplorer } from "@/components/services/services-explorer";
import { services } from "@/lib/data";

export default function PortalServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Government Services</h1>
        <p className="text-sm text-muted-foreground">
          Apply for and manage government services — requirements, fees, and steps, all in one place.
        </p>
      </div>
      <ServicesExplorer services={services} basePath="/portal/services" />
    </div>
  );
}
