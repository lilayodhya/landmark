import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Listings } from "./buy";
import { rentProperties } from "@/lib/properties";

export const Route = createFileRoute("/rentals")({
  head: () => ({
    meta: [
      { title: "Rent Property — Landmark Estate Agents" },
      { name: "description", content: "Fully-furnished and family-ready homes for rent across India's premier neighbourhoods." },
      { property: "og:title", content: "Rent Property — Landmark Estate Agents" },
      { property: "og:url", content: "/rentals" },
    ],
    links: [{ rel: "canonical", href: "/rentals" }],
  }),
  component: RentalsPage,
});

function RentalsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="For Rent"
        title="Move-in ready homes."
        description="From short-term executive lets to long-stay family homes — furnished, serviced and personally inspected."
      />
      <Listings listings={rentProperties()} />
    </SiteLayout>
  );
}
