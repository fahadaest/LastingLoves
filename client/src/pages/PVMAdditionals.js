import { useEffect } from "react";
import UpgradePlan from "../components/personalizedVMSections/UpgradePlan";
import LetsTalk from "../components/personalizedVMSections/LetsTalk";

function PersonalizedVideoMessages({ page }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <UpgradePlan page={page} />
      <LetsTalk />
    </div >
  );
}

export default PersonalizedVideoMessages;