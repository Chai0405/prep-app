import { useParams, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/blogDetail.css";

export default function BlogDetail() {
  const { slug } = useParams();

  const blogContent = {
    "weekly-meal-rhythm": {
      title: "How to Build a Weekly Meal Rhythm",
      image: "/blogs/meal-rhythm.webp",
      author: {
      name: "Hajar Larbah",
      image: "/authors/hajar-larbah.jpg"
    },

      content: `
        <p>
        In a world where every day feels busy, deciding what to cook can become an unexpected source of stress. 
        That’s where a weekly meal rhythm comes in. Unlike rigid meal plans that demand precision, a meal rhythm 
        offers structure with flexibility. It creates a predictable flow to your week without locking you into 
        strict recipes.
      </p>

      <p>
        A weekly meal rhythm works by assigning simple themes to each day. For example, you might choose 
        <strong>Meatless Monday</strong>, <strong>One-Pot Tuesday</strong>, 
        <strong>Pasta Wednesday</strong>, <strong>Slow Cooker Thursday</strong>, 
        <strong>Comfort Food Friday</strong>, <strong>Leftover Remix Saturday</strong>, 
        and <strong>Sunday Family Feast</strong>. These themes remove the daily “What should I cook?” question 
        and replace it with a clear direction.
      </p>

      <p>
        The key to making this system work is understanding your schedule. Look at your week realistically. 
        Which days are packed with work, school runs, or errands? Those days deserve quick, low-effort meals. 
        Save elaborate recipes for slower evenings when you actually have the time and energy to enjoy cooking.
      </p>

      <p>
        Another important part of building a meal rhythm is creating a rotation of reliable favorites. 
        Keep a running list of meals your household enjoys and group them under your chosen themes. 
        Planning at least one meal that can stretch into leftovers for the next day also reduces waste and saves time.
      </p>

      <p>
        Over time, this rhythm becomes second nature. Grocery lists become simpler, food waste decreases, 
        and weeknights feel less chaotic. A weekly meal rhythm isn’t about perfection — it’s about creating 
        ease, balance, and a more enjoyable relationship with everyday cooking.
      </p>
      `
    },
    "balanced-eating": {
      title: "Balanced Eating Without Counting Calories",
      image: "/blogs/balanced-eating.webp",
      author: {
      name: "Mateo Rodríguez",
      image: "/authors/blog-2.avif"
    },
      content: `
        <p>
    Balanced eating without counting calories is about nourishing your body with intention rather than obsessing over numbers. Instead of tracking every bite, this approach focuses on the quality of your food and how it makes you feel. It shifts the attention from restriction to nourishment, creating a healthier and more sustainable relationship with meals.
  </p>

  <p>
    Rather than measuring portions precisely, aim to build balanced plates. Fill half your plate with colorful vegetables, include a source of protein such as lentils, eggs, tofu, fish, or chicken, and add fiber-rich carbohydrates like brown rice, whole wheat roti, or quinoa. Including healthy fats from nuts, seeds, or olive oil naturally supports satiety and keeps energy levels steady throughout the day.
  </p>

  <p>
    Mindful eating plays a powerful role in this approach. Eating slowly, paying attention to hunger and fullness cues, and enjoying your food without distractions helps prevent overeating. When you listen to your body instead of external calorie targets, you develop better awareness of what truly satisfies you.
  </p>

  <p>
    Balanced eating also allows room for flexibility. Occasional treats can fit into a healthy lifestyle without guilt. The goal is consistency over perfection — choosing whole, minimally processed foods most of the time while allowing enjoyment and balance. Over time, this method becomes less about rules and more about building sustainable habits that support long-term health and well-being.
  </p>

      `
    },
    "meal-prep-fails": {
      title: "Why Meal Prep Fails (And How to Fix It)",
      image: "/blogs/meal-prep.jpg",
      author: {
      name: "Priya Sharma",
      image: "/authors/blog-3.jpg"
    },
      content: `
        <p>
    Meal prep often starts with the best intentions — neatly packed containers, ambitious recipes, and a strong motivation to eat healthier. Yet by midweek, those carefully prepared meals can feel repetitive, uninspiring, or simply mismatched with changing cravings. When meal prep becomes too rigid or overwhelming, it’s easy to abandon the plan altogether.
  </p>

  <p>
    One common reason meal prep fails is overcomplicating it. Preparing five completely different, elaborate meals for the week can quickly lead to burnout. Instead, focus on prepping core components such as cooked grains, roasted vegetables, proteins, and simple sauces. These building blocks can be mixed and matched into different combinations, keeping meals flexible and interesting.
  </p>

  <p>
    Another challenge is ignoring variety and texture. Eating the exact same dish every day can lead to boredom, even if it’s healthy. To fix this, prepare ingredients that can transform — for example, grilled chicken can become a salad topping one day and a wrap filling the next. Changing sauces, spices, or presentation can make familiar ingredients feel new again.
  </p>

  <p>
    Finally, successful meal prep requires realism. Plan around your actual schedule and energy levels. Start small — maybe prep lunches for three days instead of seven. When meal prep supports your lifestyle rather than controlling it, it becomes sustainable. The key is flexibility, simplicity, and creating a system that works for you — not against you.
  </p>
      `
    },
    "grocery-lists": {
      title: "Smart Grocery Lists That Save Time",
      image: "/blogs/grocery-smart.jpg",
      author: {
      name: "Yumna Jawad",
      image: "/authors/yumna-jawad.jpg"
    },
      content: `
        <p>
    A smart grocery list is more than just a collection of random items — it’s a strategy that saves time, reduces stress, and prevents unnecessary spending. Instead of writing items as you remember them, building a structured and intentional list helps you shop faster and avoid impulse purchases. When your list aligns with your weekly meal rhythm, grocery shopping becomes smoother and far more efficient.
  </p>

  <p>
    Start by planning your meals for the week before writing your list. Check what ingredients you already have at home to avoid buying duplicates. Organize your list by categories such as produce, dairy, pantry, proteins, and frozen foods. This simple grouping mirrors the layout of most grocery stores and minimizes backtracking through aisles.
  </p>

  <p>
    Another time-saving strategy is focusing on versatile ingredients. Choose items that can be used across multiple meals — for example, spinach for salads and omelets, yogurt for breakfast and sauces, or cooked beans for bowls and wraps. This not only saves time but also reduces food waste and keeps your meals flexible.
  </p>

  <p>
    Finally, keep a running grocery list throughout the week. As soon as something runs out, add it immediately to avoid last-minute forgetting. Whether you prefer a handwritten list or a digital notes app, consistency is key. A thoughtful grocery list transforms shopping from a rushed chore into a quick, organized routine that supports healthier and more intentional eating.
  </p>
      `
    },
    "consistency-over-motivation": {
      title: "Consistency Over Motivation",
      image: "/blogs/consistency.jpg",
      author: {
      name: "Carleigh Bodrug",
      image: "/authors/carleigh-bodrug.jpg"
    },
      content: `
        <p>
    Motivation feels powerful in the beginning — it pushes you to start eating healthier, cooking more at home, or planning your meals better. But motivation is temporary. It rises and falls depending on your mood, energy, and circumstances. That’s why relying solely on motivation often leads to inconsistency. What truly creates lasting change is consistency.
  </p>

  <p>
    Consistency is about showing up even on days when you don’t feel inspired. It means choosing balanced meals most of the time, sticking to simple routines, and making small, repeatable decisions that support your goals. Unlike motivation, consistency doesn’t require excitement — it requires commitment. And over time, those small repeated actions compound into meaningful progress.
  </p>

  <p>
    Building consistency starts with realistic habits. Instead of making dramatic changes overnight, focus on manageable steps — planning meals for three days instead of seven, cooking at home twice a week instead of every day, or preparing one healthy snack in advance. When habits feel achievable, you’re more likely to sustain them.
  </p>

  <p>
    Ultimately, consistency builds trust with yourself. Each time you follow through, even in a small way, you strengthen your confidence and discipline. Motivation may spark the journey, but consistency carries you forward. When you prioritize steady effort over temporary enthusiasm, healthy routines become a natural and lasting part of your lifestyle.
  </p>
      `
    },
    "repeat-meals": {
      title: "Meals You’ll Actually Repeat",
      image: "/blogs/repeat-meals.jpg",
      author: {
      name: "Danielle Brown",
      image: "/authors/danielle-brown.jpg"
    },
      content: `
        <p>
    The best meals aren’t always the most complicated or trendy — they’re the ones you genuinely look forward to making again. Meals you’ll actually repeat are simple, satisfying, and realistic for your everyday life. Instead of chasing new recipes every week, building a collection of reliable favorites creates ease and confidence in the kitchen.
  </p>

  <p>
    Repeat-worthy meals usually share a few qualities: they use accessible ingredients, require minimal prep, and deliver consistent flavor. Think comforting bowls, easy stir-fries, hearty salads, or one-pan dinners. When a meal feels manageable on a busy weekday and still tastes great, it naturally becomes part of your regular rotation.
  </p>

  <p>
    Another key factor is flexibility. The most sustainable meals allow small variations — swapping vegetables based on the season, changing the protein, or adjusting spices to match your mood. This adaptability keeps familiar dishes from feeling boring while maintaining the structure that makes them dependable.
  </p>

  <p>
    Instead of constantly searching for something new, focus on refining what already works. Keep a running list of meals that received positive feedback from you or your family. Over time, this personal collection becomes your foundation — a set of go-to dishes you trust. These are the meals that reduce decision fatigue, save time, and make healthy eating feel effortless rather than overwhelming.
  </p>
      `
    },
    "food-system": {
      title: "Stop Relying on Willpower — Build a Food System Instead",
      image: "/blogs/food-system.webp",
      author: {
      name: "Priya Sharma",
      image: "/authors/blog-3.jpg"
    },
      content: `
        <p>
    Willpower feels powerful at the beginning of any health journey. It fuels grocery resets, ambitious meal plans, and promises to “eat better starting Monday.” But willpower is temporary. It fluctuates with stress, sleep, workload, and mood. When healthy eating depends solely on motivation, it eventually collapses under real life.
  </p>

  <p>
    The problem isn’t discipline — it’s design. Every decision you make throughout the day drains mental energy. By evening, choosing a balanced meal can feel exhausting. This is where most people mistake inconsistency for weakness. In reality, they simply lack structure.
  </p>

  <p>
    A food system removes reliance on daily self-control. It includes repeatable meals, organized grocery lists, simple prep routines, and a weekly rhythm. When healthy options are already planned and accessible, the “right choice” becomes the easy choice.
  </p>

  <p>
    Systems create automatic behavior. Instead of negotiating with yourself every night, you follow a structure that supports your goals. Over time, this reduces stress, improves consistency, and builds confidence. Stop trying harder — start building smarter.
  </p>
      `
    },
    "kitchen-workflow": {
      title: "Your Kitchen Needs a Workflow, Not More Recipes",
      image: "/blogs/kitchen-workflow.avif",
      author: {
      name: "Maya Leinenbach",
      image: "/authors/maya-lienenbach.jpg"
    },
      content: `
        <p>
    Most kitchens are filled with saved recipes, bookmarked reels, and screenshots of “healthy meals to try.” Yet dinner still feels chaotic. The issue isn’t lack of ideas — it’s lack of workflow.
  </p>

  <p>
    A kitchen workflow defines how food moves through your week: planning, shopping, prepping, cooking, storing, and repeating. When these steps happen randomly, cooking becomes stressful. When they follow a system, the kitchen becomes efficient.
  </p>

  <p>
    Instead of preparing five complicated dishes, focus on components — cooked grains, roasted vegetables, proteins, and sauces. These can be assembled differently throughout the week, reducing effort while maintaining variety.
  </p>

  <p>
    Organization isn’t about perfection. It’s about predictability. A structured workflow transforms cooking from a daily scramble into a controlled, calm process.
  </p>
      `
    },
    "hidden-price": {
      title: "The Hidden Cost of Unplanned Eating",
      image: "/blogs/hidden-price.avif",
      author: {
      name: "Samantha Schnur",
      image: "/authors/samantha-webp"
    },
      content: `
        <p>
    Unplanned eating seems harmless in the moment. You grab what’s available, order something quick, or skip meals altogether. But over time, this reactive pattern carries hidden costs.
  </p>

  <p>
    Financially, impulse food purchases add up quickly. Nutritionally, last-minute meals often lack balance. Mentally, constantly deciding what to eat drains focus and increases stress.
  </p>

  <p>
    Decision fatigue is real. Every unplanned meal forces you to solve the same problem repeatedly. This repetitive strain affects more than your diet — it impacts productivity and mood.
  </p>

  <p>
    A small investment in weekly planning eliminates these hidden costs. Clarity reduces chaos. Structure protects your energy. Planning isn’t restrictive — it’s protective.
  </p>
      `
    },

    "diet-fails": {
      title: "Why “Eating Healthy” Fails Without Structure",
      image: "/blogs/blogs/diet-fails.jpg",
      author: {
      name: "Ella Mills",
      image: "/authors/ella-mills.jpg"
    },
      content: `
        <p>
    Many people believe healthy eating fails because of lack of discipline. In reality, it often fails because of lack of structure. Good intentions cannot compete with unpredictable schedules and daily stress.
  </p>

  <p>
    Without planning, meals default to convenience. Without groceries aligned to your goals, choices become reactive. Without routine, consistency disappears.
  </p>

  <p>
    Structure provides clarity: what to cook, when to shop, how to balance your plate, and how to repeat what works. It removes uncertainty and builds reliability.
  </p>

  <p>
    Sustainable nutrition is less about restriction and more about organization. When healthy eating is supported by systems, it stops feeling like effort and starts feeling normal.
  </p>
      `
    },
    "core-plan": {
      title: "Build Once, Repeat Weekly: The Core Meals Method",
      image: "/blogs/core-plan.jpg",
      author: {
      name: "Joshua Weissman",
      image: "/authors/joshua.jpg"
    },
      content: `
        <p>
    Reinventing your meal plan every week is exhausting. Instead, create a core meals list — a curated selection of balanced, reliable dishes that suit your lifestyle.
  </p>

  <p>
    These meals should be simple, adaptable, and satisfying. When you rotate 8–12 core meals consistently, planning becomes faster and grocery shopping becomes predictable.
  </p>

  <p>
    Repetition doesn’t mean boredom. Small variations in spices, vegetables, or sauces keep meals fresh while maintaining structure.
  </p>

  <p>
    The Core Meals Method reduces decision fatigue and increases efficiency. Build once. Refine over time. Repeat weekly.
  </p>
      `
    },
    "food-clarity": {
      title: "From Decision Fatigue to Food Clarity",
      image: "/blogs/food-clarity.jpg",
      author: {
      name: "Priya Sharma",
      image: "/authors/blog-3.jpg"
    },
      content: `
        <p>
    Modern life demands constant decision-making. Adding multiple daily food decisions creates unnecessary cognitive load.
  </p>

  <p>
    When choices are unlimited, overwhelm increases. Simplifying your meal options through structure restores clarity.
  </p>

  <p>
    Having pre-decided breakfast options, rotating lunches, and themed dinners removes friction. You conserve mental energy for higher priorities.
  </p>

  <p>
    Food clarity isn’t about limiting enjoyment — it’s about protecting focus. When meals are structured, your mind is free.
  </p>
      `
    },
    "discipline": {
      title: "Discipline Over Motivation: The Real Secret to Consistency",
      image: "/blogs/discipline.jpg",
      author: {
      name: "Andy Vincent",
      image: "/authors/andy-vincent.webp"
    },
      content: `
        <p>
    Motivation is emotional. Discipline is structural. One fluctuates; the other stabilizes.
  </p>

  <p>
    Sustainable habits rely on repeatable behaviors — weekly grocery routines, meal prep systems, and balanced plate guidelines. These systems reduce dependence on mood.
  </p>

  <p>
    Discipline isn’t harsh or restrictive. It’s a commitment to small actions performed consistently.
  </p>

  <p>
    When healthy eating becomes routine rather than reactive, consistency becomes inevitable.
  </p>
      `
    },
    "week-plan": {
      title: "Design Your Week Before It Designs Your Diet",
      image: "/blogs/week-plan.jpg",
      author: {
      name: "Kevin Curry",
      image: "/authors/kevin-curry.jpg"
    },
      content: `
        <p>
    Your calendar shapes your food choices. Busy evenings, long workdays, and unexpected commitments influence what you eat.
  </p>

  <p>
    If you don’t design your week intentionally, your schedule will dictate reactive decisions. Convenience replaces balance.
  </p>

  <p>
    Mapping meals to your weekly rhythm — quick options for busy days, slower meals for relaxed evenings — creates alignment between time and nutrition.
  </p>

  <p>
    Planning your week in advance shifts control back to you. Structure gives direction. Preparation builds confidence.
  </p>
      `
    }
  };

  const blog = blogContent[slug];

  if (!blog) {
    return <div style={{ padding: "100px" }}>Blog not found.</div>;
  }

  return (
    <div className="blog-detail-page">

  <div className="blog-layout">

    {/* MAIN ARTICLE */}
    <div className="blog-main">
        <Link to="/blogs" className="back-to-blogs">
  ← Back to Blogs
</Link>
      <img src={blog.image} alt={blog.title} className="blog-main-image" />

      <h1>{blog.title}</h1>

      <div className="blog-meta-row">

  <div className="blog-meta-left">
    <span>Planning</span>
    <span>•</span>
    <span>5 min read</span>
  </div>

  <div className="blog-author">
  <img src={blog.author.image} alt={blog.author.name} />
  <p>{blog.author.name}</p>
</div>

</div>

      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>

    {/* SIDEBAR */}
    <aside className="blog-sidebar">
  <div className="sidebar-card">
    <h3>Latest Posts</h3>

    <Link to="/blogs/balanced-eating" className="sidebar-post">
  <img src="/blogs/balanced-eating.webp" alt="" />
  <div>
    <span className="sidebar-tag">Nutrition</span>
    <p>Balanced Eating Without Counting Calories</p>
  </div>
</Link>

<Link to="/blogs/grocery-lists" className="sidebar-post">
  <img src="/blogs/grocery-smart.jpg" alt="" />
  <div>
    <span className="sidebar-tag">Grocery</span>
    <p>Smart Grocery Lists</p>
  </div>
</Link>

<Link to="/blogs/consistency-over-motivation" className="sidebar-post">
  <img src="/blogs/consistency.jpg" alt="" />
  <div>
    <span className="sidebar-tag">Mindset</span>
    <p>Consistency Over Motivation</p>
  </div>
</Link>

  </div>
</aside>

  </div>
  

</div>
  );
}