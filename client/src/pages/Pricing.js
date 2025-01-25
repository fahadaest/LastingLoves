import CherishForever from '../components/pricingPageSections/CherishForever';
import AffordableLove from '../components/pricingPageSections/AffordableLove';
import ContactCTASection from '../components/pricingPageSections/ContactCTASection';

function Pricing() {
  return (
    <div className="pricing-background-img" >
      <CherishForever />
      <AffordableLove />
      <ContactCTASection />
    </div >
  );
}

export default Pricing;