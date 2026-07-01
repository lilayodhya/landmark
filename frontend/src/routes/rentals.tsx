import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Listings } from "./buy";
import { getProperties } from "@/api/propertyApi";
import type { Property } from "@/lib/properties";
import { useEffect, useState } from "react";

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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getProperties();

        setProperties(
          data.filter(
            (property: Property) => property.listing === "rent"
          )
        );
      } catch (err) {
        console.error("Failed to load rental properties:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <SiteLayout>
        <PageHeader
          eyebrow="For Rent"
          title="Move-in ready homes."
          description="Loading..."
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="For Rent"
        title="Move-in ready homes."
        description="From short-term executive lets to long-stay family homes — furnished, serviced and personally inspected."
      />

      <Listings listings={properties} />
    </SiteLayout>
  );
}