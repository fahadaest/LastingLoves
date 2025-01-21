import Box from '@mui/material/Box';

function Home() {
  return (
    <div className="h-screen">
      <section className=" bg-bg-green min-h-[90vh]">

        <div className="bg-slate-200 min-w-[100vw] min-h-[90vh] relative overflow-hidden">
          <img
            className="w-full h-[90vh] object-cover fixed z-0"
            src="https://cdn.b12.io/client_media/cQFRBNdt/07f1ceb4-c694-11ef-9c5e-0242ac110002-jpg-hero_image.jpeg"
          />
          <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        </div>



      </section>
      <section className=" bg-pink-300 min-h-[80vh]  z-20 relative">
      </section>
    </div>
  );
}

export default Home;