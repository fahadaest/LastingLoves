import ContactCTASection from '../components/pricingPageSections/ContactCTASection';
import TermsOfServiceHeader from '../components/termsOfConditions/TermsOfServiceHeader';

import PrivacyPolicyHeader from '../components/privacyPolicy/PrivacyPolicyHeader';
import PrivacyPolicyContent from '../components/privacyPolicy/PrivacyPolicyContent';
import TermOfServiceContent from '../components/termsOfConditions/TermOfServiceContent';
import TOSContactUs from '../components/termsOfConditions/TOSContactUs';

function TermsOfService() {
  return (
    <div className="how-it-works-img" >
      <PrivacyPolicyHeader />
      <PrivacyPolicyContent />
      <TOSContactUs />
      {/* <ContactCTASection /> */}
    </div >
  );
}

export default TermsOfService;