import { ShipWithUsPage } from "@/components/pages/home/ship-with-us-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Freight Quote | Globfreight",
  description:
    "Request an instant sea freight quotation from Globfreight. Fast port customs clearance, container transport, and bonded warehousing across Antwerp, Rotterdam, Hamburg, and European gateways."
};

export default function QuoteRoute() {
  return <ShipWithUsPage />;
}
