import ContactCTASection from '../components/pricingPageSections/ContactCTASection';
import TermsOfServiceHeader from '../components/termsOfConditions/TermsOfServiceHeader';
import TermOfServiceContent from '../components/termsOfConditions/TermOfServiceContent';
import TOSContactUs from '../components/termsOfConditions/TOSContactUs';

function TermsOfService() {
  return (
    <div className="how-it-works-img" >
      <TermsOfServiceHeader />
      <TermOfServiceContent />
      <TOSContactUs />
      {/* <ContactCTASection /> */}
    </div >
  );
}

export default TermsOfService;