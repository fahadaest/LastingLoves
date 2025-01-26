import { useEffect } from "react";
import PVMAdditionals from "../components/personalizedVMSections/PVMAdditionals";
import LetsTalk from "../components/personalizedVMSections/LetsTalk";

function PersonalizedVideoMessages({ page }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <PVMAdditionals page={page} />
      <LetsTalk />
    </div >
  );
}

export default PersonalizedVideoMessages;