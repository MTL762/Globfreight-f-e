"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, MapPin, Navigation, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface CalculatorProps {
  heading: string;
  originLabel: string;
  destLabel: string;
  serviceLabel: string;
  calculateBtn: string;
  resultEstTime: string;
  resultEstTransit: string;
  resultCompliance: string;
  clearanceValue: string;
  complianceValue: string;
}

const origins = [
  { id: "antwerp", label: "Port of Antwerp-Bruges (BE)", defaultTransit: "Same-day dispatch" },
  { id: "rotterdam", label: "Port of Rotterdam (NL)", defaultTransit: "24h Inland Corridor" },
  { id: "hamburg", label: "Port of Hamburg (DE)", defaultTransit: "24-48h Central Europe" },
  { id: "zeebrugge", label: "Zeebrugge Deepsea Hub (BE)", defaultTransit: "Same-day UK/EU link" },
  { id: "lehavre", label: "Port of Le Havre (FR)", defaultTransit: "24-36h West Corridor" }
];

const destinations = [
  { id: "germany", label: "Germany (Ruhr / Frankfurt / South)", transitTime: "12 - 24 Hours" },
  { id: "benelux", label: "Benelux (Belgium, Netherlands, Lux)", transitTime: "Same-day / Express" },
  { id: "france", label: "France (Paris / Lyon / Lille)", transitTime: "18 - 36 Hours" },
  { id: "italy", label: "Northern Italy (Milan / Verona)", transitTime: "36 - 48 Hours" },
  { id: "poland", label: "Poland & Central Europe", transitTime: "36 - 48 Hours" },
  { id: "uk", label: "United Kingdom (Cross-Channel)", transitTime: "24 - 48 Hours" }
];

const services = [
  { id: "customs_import", label: "Import Customs Clearance (AEO Direct EDI)", time: "< 3 Hours" },
  { id: "transit_t1", label: "NCTS T1 / T2 Transit Guarantee", time: "< 2 Hours" },
  { id: "haulage_drayage", label: "Dedicated Port Haulage & Container Drayage", time: "Express Dispatch" },
  { id: "bonded_warehouse", label: "Bonded Storage & Duty Suspension", time: "Immediate Ingress" }
];

export function QuickRouteCalculator({
  heading,
  originLabel,
  destLabel,
  serviceLabel,
  calculateBtn,
  resultEstTime,
  resultEstTransit,
  resultCompliance,
  clearanceValue,
  complianceValue
}: CalculatorProps) {
  const [selectedOrigin, setSelectedOrigin] = useState(origins[0].id);
  const [selectedDest, setSelectedDest] = useState(destinations[0].id);
  const [selectedService, setSelectedService] = useState(services[0].id);
  const currentDest = destinations.find((d) => d.id === selectedDest) || destinations[0];
  const currentService = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="route-calculator">
      <div className="route-calculator__header">
        <div className="route-calculator__badge">
          <Sparkles size={14} />
          <span>INSTANT ROUTE DISPATCH</span>
        </div>
        <h3>{heading}</h3>
      </div>

      <div className="route-calculator__form">
        <div className="route-calculator__field">
          <label htmlFor="calc-origin">
            <MapPin size={15} />
            <span>{originLabel}</span>
          </label>
          <select
            id="calc-origin"
            value={selectedOrigin}
            onChange={(e) => {
              setSelectedOrigin(e.target.value);
              setHasCalculated(true);
            }}
            className="route-calculator__select"
          >
            {origins.map((orig) => (
              <option key={orig.id} value={orig.id}>
                {orig.label}
              </option>
            ))}
          </select>
        </div>

        <div className="route-calculator__field">
          <label htmlFor="calc-dest">
            <Navigation size={15} />
            <span>{destLabel}</span>
          </label>
          <select
            id="calc-dest"
            value={selectedDest}
            onChange={(e) => {
              setSelectedDest(e.target.value);
              setHasCalculated(true);
            }}
            className="route-calculator__select"
          >
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.label}
              </option>
            ))}
          </select>
        </div>

        <div className="route-calculator__field">
          <label htmlFor="calc-service">
            <ShieldCheck size={15} />
            <span>{serviceLabel}</span>
          </label>
          <select
            id="calc-service"
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setHasCalculated(true);
            }}
            className="route-calculator__select"
          >
            {services.map((srv) => (
              <option key={srv.id} value={srv.id}>
                {srv.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="route-calculator__results">
        <div className="route-calculator__metric">
          <span className="route-calculator__metric-label">
            <Clock size={14} /> {resultEstTime}
          </span>
          <strong className="route-calculator__metric-value">
            {currentService.time || clearanceValue}
          </strong>
          <small>Pre-arrival filing ready</small>
        </div>

        <div className="route-calculator__metric">
          <span className="route-calculator__metric-label">
            <Navigation size={14} /> {resultEstTransit}
          </span>
          <strong className="route-calculator__metric-value">
            {currentDest.transitTime}
          </strong>
          <small>Direct chassis dispatch</small>
        </div>

        <div className="route-calculator__metric">
          <span className="route-calculator__metric-label">
            <ShieldCheck size={14} /> {resultCompliance}
          </span>
          <strong className="route-calculator__metric-value text-emerald">
            {complianceValue}
          </strong>
          <small>Zero demurrage guarantee</small>
        </div>
      </div>

      <div className="route-calculator__action">
        <Link
          href={`/contact?origin=${selectedOrigin}&destination=${selectedDest}&service=${selectedService}`}
          className="route-calculator__button"
        >
          <span>{calculateBtn}</span>
          <ArrowRight size={17} />
        </Link>
        <span className="route-calculator__assurance">
          <CheckCircle2 size={14} /> Verified European customs corridor • 2h response SLA
        </span>
      </div>
    </div>
  );
}
