import iconPlaceholder from '../../assets/placeholder/iconFofo.png';
import imageBanner from '../../assets/placeholder/image 7.png';
import './LandingHome.css';

const LandingHome = () => {
  return (
    <div className="banner-landing-container">
      <img src={imageBanner} alt="Banner" className='banner-image' />
      <div className='banner-text-container'>
        <img src={iconPlaceholder} alt="Placeholder" className='icon-placeholder'/>
        <h1 className='banner-title'>CADÊ A SALA?</h1>
        <h3 className='banner-subtitle'>O sistema de salas do bloco Instituto Universidade Virtual.</h3>
      </div>
    </div>
  );
};

export default LandingHome;