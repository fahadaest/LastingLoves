import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MessagesOfLove from '../components/homePageSections/MessagesOfLove';
import CherishYourLove from '../components/homePageSections/CherishYourLove';
import PersonalVideoMessage from '../components/homePageSections/PersonalVideoMessage';
import GetInTouch from '../components/homePageSections/GetInTouch';

function Home() {
  return (
    <div className="h-screen hero-background-img" >

      <MessagesOfLove />
      <CherishYourLove />
      <PersonalVideoMessage />
      <GetInTouch />

    </div >
  );
}

export default Home;