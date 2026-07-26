import {
  CreditCard,
  Shield,
  Award,
  Globe,
  Smartphone,
  Lock,
} from "lucide-react";
import PageContainer from "./PageContainer";

type Partner = {
  name: string;
  icon: React.ElementType;
};

const PARTNERS: Partner[] = [
  { name: "Visa", icon: CreditCard },
  { name: "MasterCard", icon: CreditCard },
  { name: "Stripe", icon: Lock },
  { name: "PayPal", icon: Shield },
  { name: "TripAdvisor", icon: Award },
  { name: "Google", icon: Globe },
  { name: "Apple Pay", icon: Smartphone },
];

const TrustPartners = () => {
  return (
    <section className="border-t border-gray-100 bg-gray-50/50">
      <PageContainer className="py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Trusted Payment &amp; Travel Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {PARTNERS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="group flex items-center gap-1.5 text-gray-300 transition-colors duration-300 hover:text-gray-500"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default TrustPartners;
