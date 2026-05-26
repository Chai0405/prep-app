import "../styles/pantry.css";
import { Link } from "react-router-dom";


const Pantry = () => {
  return (
    <div className="marketplace-page">

      <div className="pantry-hero">
        <div className="pantry-overlay"></div>

        <div className="pantry-hero-content">
          <h1>
            Stock your kitchen with intention
          </h1>

          <p>
            Thoughtfully selected pantry staples, fresh produce,
            and everyday essentials curated to support healthier
            meals and more mindful cooking routines.
          </p>
        </div>
      </div>

      <div className="pantry-products">

  <Link
  to="/pantry/fresh-produce"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
  src="/pantry/pantry-fresh-produce.webp"
  alt="Fresh Produce"
/>

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Fresh Produce</h3>
      <p>Farm-picked vegetables & fruits</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/bakery"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-bakery.webp"
      alt="Bakery"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Bakery</h3>
      <p>Fresh breads & baked essentials</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/protien-meat"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-protien-meat.webp"
      alt="Healthy Bowls"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Protein & Meat</h3>
      <p>Fresh cuts & protein essentials</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/seafood"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-seafood.webp"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Seafood</h3>
      <p>Fresh ocean selections curated daily</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/spices"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-spices.webp"
      alt="Pantry"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Spices & Seasonings</h3>
      <p>Bold flavors crafted for intentional cooking</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/dairy-eggs"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-dairy-eggs.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Dairy & Eggs</h3>
      <p>Everyday essentials from trusted sources</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/oils"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-oils.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Oils</h3>
      <p>Cold-pressed essentials for everyday cooking</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/pulses-grains"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-pulses-grains.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Pulses & Grains</h3>
      <p>Wholesome staples curated for balanced meals</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/dry-fruits"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-dry-fruits.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Dry Fruits</h3>
      <p>Nutrient-rich selections for mindful snacking</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/beverages"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-beverages.jpeg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Beverages</h3>
      <p>Refreshing blends crafted for every routine</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/jams-sauces"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-jams-sauces.jpeg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Jams & Sauces</h3>
      <p>Flavorful spreads and handcrafted kitchen favorites</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/herbs"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-herbs.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Herbs</h3>
      <p>Nutrient-rich selections for mindful snacking</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/tea-coffee"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-tea-coffee.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Tea & Coffee</h3>
      <p>Comforting brews for everyday rituals</p>
    </div>
  </div>
  </Link>

  <Link
  to="/pantry/organic"
  className="pantry-link"
  >
  <div className="pantry-card">
    <img
      src="/pantry/pantry-organic.jpg"
      alt="Protein"
    />

    <div className="pantry-card-overlay"></div>

    <div className="pantry-card-content">
      <h3>Organic Picks</h3>
      <p>Naturally sourced essentials for mindful living</p>
    </div>
  </div>
  </Link>

</div>

    </div>

    
  );
};

export default Pantry;