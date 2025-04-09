import { FaDiscord } from "react-icons/fa"; 
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#404EED] to-[#181c48] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50  text-white flex justify-between items-center px-6 lg:px-16 py-4 backdrop-blur-md shadow-md">
  <div className="flex items-center space-x-2">
    <FaDiscord className='text-white w-8 h-8 mt-1' />
    <span className="text-xl font-bold">Discord</span>
  </div>
  <div className="space-x-4">
  <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:shadow-lg"><Link to="/login">Login</Link></button>
  <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:shadow-lg"><Link to="/signup">Signup</Link></button>
  </div>
</nav>


      {/* Hero Content */}
      <section className="flex flex-col-reverse lg:flex-row font-discord items-center px-6 lg:px-16 py-10 lg:py-20">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
            GROUP CHAT<br />
            THAT'S ALL<br />
            FUN & GAMES
          </h1>
          <p className="text-lg mb-6 max-w-md mx-auto lg:mx-0">
            Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <button className="bg-white text-black px-6 font-discord py-3 rounded-full font-bold hover:shadow-xl">
              Download for Windows
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src="/discordHero.webp"
            alt="Discord UI"
            className="w-full h-auto"
          />
        </div>
      </section>
      <section className="px-10 sm:px-6 lg:px-20 py-16 text-white relative overflow-hidden">
  {/* Floating Character */}
  <div className="absolute -mt-12 sm:-mt-12 right-6 sm:right-16 z-10">
    <img
      src="/discord-bot.gif"
      alt="Floating Bot"
      className="w-30 h-20"
    />
  </div>

  {/* Main Card */}
  <div className="flex flex-col lg:flex-row items-stretch justify-between bg-gradient-to-br from-[#1e1f2f] to-[#9d1d86] rounded-[2rem] px-6 sm:px-10 lg:px-16 py-10 gap-10 shadow-xl relative z-0 min-h-[500px]">
    
    {/* Left: Video */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <video
        src="/discord-vid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="rounded-2xl w-full max-w-[480px] shadow-lg"
      />
    </div>

    {/* Right: Text Content */}
    <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
        MAKE YOUR<br className="hidden sm:inline" />
        GROUP CHATS<br className="hidden sm:inline" />
        MORE FUN
      </h2>
      <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
        Use custom emoji, stickers, soundboard effects and more to add your personality
        to your voice, video, or text chat. Set your avatar and a custom status, and write
        your own profile to show up in chat your way.
      </p>
    </div>
  </div>
</section>


<section className="px-10 sm:px-6 lg:px-20 py-16 text-white relative overflow-hidden">
  {/* Main Card */}
  <div className="flex flex-col lg:flex-row items-stretch justify-between bg-[#2c2f6d] rounded-[2rem] px-6 sm:px-10 lg:px-16 py-10 gap-10 shadow-xl min-h-[500px]">
    
    {/* Left: Text Content */}
    <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
        WHEREVER YOU<br className="hidden sm:inline" />
        GAME, HANG OUT<br className="hidden sm:inline" />
        HERE
      </h2>
      <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
        On your PC, phone, or console, you can still hang out on Discord.
        Easily switch between devices and use tools to manage multiple
        group chats with friends.
      </p>
    </div>

    {/* Right: Video */}
    <div className="w-full lg:w-1/2 flex items-center justify-center relative">
      <div className="relative rounded-[2rem]  w-full max-w-[500px] flex justify-center items-center shadow-lg">
        <video
          src="/dis-vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-2xl w-full max-w-[480px] shadow-lg"
        />
      </div>
    </div>
  </div>
</section>
<section className="relative  w-full px-6 sm:px-80 lg:px-80 mt-14 overflow-visible">
  {/* Group Image */}
  <div className="w-full max-w-7xl mx-auto relative z-10">
  {/* Group Image (only on small & medium screens) */}
  <img
    src="/bottom.webp"
    alt="Characters"
    className="w-full h-auto object-contain hidden lg:block"
  />

  {/* Sitting Bot (visible on all screens) */}
  <img
  src="/bot.webp"
  alt="Bot"
  className="  absolute bottom-[-70px] sm:bottom-[-120px] left-1/2 transform -translate-x-1/2 
             w-[160px] sm:w-[180px] md:w-[200px] z-20"
/>

</div>

</section>

    <footer className=" text-white px-6 sm:px-10 lg:px-20  pb-20 relative z-0">
     <img src='discord-ig.svg' /> 
    </footer>


    </div>
  );
};

export default HeroSection;
