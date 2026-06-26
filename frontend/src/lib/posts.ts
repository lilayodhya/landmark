export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  image: string;
  body: string[];
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "south-mumbai-boutique-towers",
    title: "The Quiet Rise of South Mumbai's Boutique Towers",
    excerpt:
      "Why a new generation of buyers is trading skyline ambition for restraint, craft and address — and what it means for resale values over the next decade.",
    category: "Market Reports",
    date: "April 12, 2026",
    read: "8 min read",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    body: [
      "For two decades, South Mumbai's residential story has been written in superlatives — taller, glassier, more conspicuous. But a subtle shift is reshaping how the city's most discerning buyers think about home.",
      "A new wave of boutique towers — typically eight to fourteen storeys, two apartments per floor, restrained material palettes — is quietly outperforming the supertall segment on per-square-foot resale.",
      "We attribute this to three forces: scarcity of well-proportioned floor plates, fatigue with amenity-heavy living, and a return to the idea that an address should whisper, not shout.",
      "For investors, the implication is clear. The next decade of capital appreciation in SoBo will likely concentrate in projects with restrained density, repeat-buyer pedigree, and architects who design for the climate rather than the brochure.",
    ],
  },
  {
    slug: "bengaluru-next-premium-pocket",
    title: "Bengaluru's Next Premium Pocket",
    excerpt: "An on-the-ground read of the neighbourhoods quietly attracting India's most considered buyers.",
    category: "City Guides",
    date: "Mar 28, 2026",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Sadashivanagar and Dollars Colony have long held the crown, but a pocket east of Cubbon — anchored by mature canopy and walkable streets — is rapidly attracting the kind of buyer who values silence over square footage.",
      "Inventory is tight: fewer than forty independent homes change hands in this micro-market in any given year. Prices have moved 18% in eighteen months.",
      "What we watch next: the first wave of low-rise boutique developments slated for 2027 handover, and whether civic infrastructure keeps pace.",
    ],
  },
  {
    slug: "designing-for-indian-climate",
    title: "Designing for the Indian Climate",
    excerpt: "Architects share how they're rethinking thermal mass, shade and ventilation for the modern Indian home.",
    category: "Design",
    date: "Mar 14, 2026",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Glass-skinned towers have a thermal problem. As cooling loads climb and electricity tariffs follow, designers are returning to first principles — deep verandas, cross-ventilation, and the quiet intelligence of jali screens.",
      "The most interesting work happening today blends vernacular wisdom with contemporary detailing: stone floors that store overnight cool, courtyards that breathe, and roofs designed to deflect rather than absorb.",
      "Expect this to filter into mainstream specs within five years. Buyers are already asking the right questions.",
    ],
  },
  {
    slug: "yield-vs-growth-framework",
    title: "Yield vs Growth: A Practical Framework",
    excerpt: "How to weigh rental yield against capital appreciation when building a residential portfolio.",
    category: "Investment",
    date: "Feb 22, 2026",
    read: "7 min",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Most residential investors anchor on the wrong number. Headline yield tells you almost nothing without context on tenant quality, vacancy risk, and the trajectory of the surrounding micro-market.",
      "Our framework weights three factors: stabilised net yield (post-maintenance and tax), five-year capital-growth probability, and liquidity at exit.",
      "Applied across a sample of forty Mumbai transactions, the framework correctly ranked the top quartile by total return in 32 of 40 cases.",
    ],
  },
  {
    slug: "in-conversation-rohan-mehta",
    title: "In Conversation with Architect Rohan Mehta",
    excerpt: "On restraint, the discipline of subtraction, and why the best homes are the ones you notice last.",
    category: "Interviews",
    date: "Feb 02, 2026",
    read: "10 min",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Rohan Mehta's practice has shaped some of the most quietly admired homes of the past decade. We sat down in his Bandra studio to talk about the discipline of subtraction.",
      "‘The brief is always too much,' he says. ‘My job is to find the one idea that survives every revision.'",
      "We spoke about material honesty, the courage to leave walls blank, and why the best clients are the ones who say no often.",
    ],
  },
  {
    slug: "reading-h1-mumbai-index",
    title: "Reading the H1 Mumbai Index",
    excerpt: "The numbers behind a quietly strong first half — and where we expect the second half to go.",
    category: "Market Reports",
    date: "Jan 18, 2026",
    read: "4 min",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Volumes are up 12% year-on-year, but the headline masks a sharper story: the premium segment (₹8 Cr+) is up 27%, while the mid-market is flat.",
      "Inventory absorption in the premium tier has compressed to under nine months in three of the city's top micro-markets.",
      "We expect H2 to test these levels, with new launches in Worli and Lower Parel likely to recalibrate price discovery.",
    ],
  },
  {
    slug: "hill-stations-back-on-map",
    title: "Hill Stations Are Back on the Map",
    excerpt: "Why second-home demand is returning to the hills — and which towns are leading the curve.",
    category: "City Guides",
    date: "Jan 03, 2026",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
    body: [
      "The pandemic-era rush to the hills cooled in 2023. It is returning — slower, more considered, and concentrated in towns with year-round access and reliable connectivity.",
      "Kasauli, Coonoor and parts of the Nilgiris are leading. Inventory remains tight; new construction is constrained by terrain and regulation.",
      "For buyers, the question is no longer whether but where. Title clarity and access roads are the two diligence items that matter most.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const featuredPost = () => posts.find((p) => p.featured) ?? posts[0];
export const otherPosts = () => posts.filter((p) => !p.featured);
