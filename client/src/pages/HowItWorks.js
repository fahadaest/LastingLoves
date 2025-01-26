import YourLoveTimeLessly from '../components/howItWorksSections/YourLoveTimeLessly';
import CreateLastingMemories from '../components/howItWorksSections/CreateLastingMemories';
import PersonalTouch from '../components/howItWorksSections/PersonalTouch';
import ContactCTASection from '../components/pricingPageSections/ContactCTASection';

function HowItWorks() {
  return (
    <div className="how-it-works-img" >
      <YourLoveTimeLessly />
      <CreateLastingMemories />
      <PersonalTouch />
      <ContactCTASection />
    </div >
  );
}

export default HowItWorks;