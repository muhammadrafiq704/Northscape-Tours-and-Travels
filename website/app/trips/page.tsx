import type { Metadata } from "next"
import TripsHero from "@/components/trips/trips-hero"
import TripCategories from "@/components/trips/trip-categories"
import TripsListing from "@/components/trips/trips-listing"
import TripFilters from "@/components/trips/trip-filters"

export const metadata: Metadata = {
  title: "Northscape Tours & Travels | Adventure Trips, Tours & Holiday Packages",
  description:
    "Explore unforgettable adventures with Northscape Tours & Travels. From trekking and safaris to cultural tours and luxury holidays, find the perfect trip for your next journey.",
  keywords:
    "Northscape tours, adventure trips, trekking tours, safari packages, cultural tours, luxury travel, group tours, honeymoon trips, holiday packages, custom tours",
};


export default async function TripsPage() {
  return (
    <div className="pt-16">
      <TripsHero />
      <TripFilters />
      <TripCategories />
      <TripsListing />
    </div>
  )
}
