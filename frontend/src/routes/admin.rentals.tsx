import { createFileRoute } from "@tanstack/react-router";
import { mockRentals } from "@/lib/admin/mock-data";
import { PropertyManager } from "./admin.properties";

export const Route = createFileRoute("/admin/rentals")({
  component: () => <PropertyManager initial={mockRentals} title="Rentals" kind="Rent" />,
});
