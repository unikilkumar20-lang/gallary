// Lumina Gallery Curated Dataset
// High-resolution photography with comprehensive EXIF, color palettes, and metadata

const INITIAL_GALLERY_DATA = [
  {
    id: "photo-1",
    title: "Neon Rain in Shinjuku",
    description: "Reflections of holographic signs and cybernetic city lights on wet Tokyo asphalt after a midnight monsoon downpour.",
    category: "cyberpunk",
    photographer: {
      name: "Kenji Sato",
      handle: "@kenjisato_raw",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "3/4",
    likes: 1420,
    views: "34.2K",
    palette: ["#ff007f", "#00f0ff", "#180e29", "#3b1e54", "#ffe600"],
    primaryColor: "#ff007f",
    tags: ["Tokyo", "Cyberpunk", "Neon", "Rain", "Night", "Street"],
    exif: {
      camera: "Sony Alpha 7R V",
      lens: "FE 24-70mm F2.8 GM II",
      focalLength: "35mm",
      aperture: "f/1.8",
      shutterSpeed: "1/160s",
      iso: "800",
      dimensions: "6000 x 8000",
      location: "Shinjuku, Tokyo, Japan",
      date: "Nov 14, 2025"
    }
  },
  {
    id: "photo-2",
    title: "The Helix of Silence",
    description: "Futuristic spiral architecture inside a brutalist contemporary art museum bathed in zenithal natural light.",
    category: "architecture",
    photographer: {
      name: "Elena Rostova",
      handle: "@elena_arch",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/10",
    likes: 980,
    views: "21.8K",
    palette: ["#d9d4cf", "#8c827a", "#2b2a29", "#ffffff", "#50473e"],
    primaryColor: "#8c827a",
    tags: ["Brutalism", "Architecture", "Minimalist", "Spiral", "Light"],
    exif: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 21mm F4",
      focalLength: "21mm",
      aperture: "f/8.0",
      shutterSpeed: "1/60s",
      iso: "64",
      dimensions: "11656 x 8742",
      location: "Valencia, Spain",
      date: "Oct 28, 2025"
    }
  },
  {
    id: "photo-3",
    title: "Celestial Solitude in Dolomites",
    description: "Sharp limestone pinnacles pierce an alpine sea of low-hanging clouds during an ethereal crimson golden hour.",
    category: "nature",
    photographer: {
      name: "Julian Meyer",
      handle: "@meyer_alps",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    likes: 2150,
    views: "58.1K",
    palette: ["#ff7e5f", "#feb47b", "#2c3e50", "#34495e", "#f39c12"],
    primaryColor: "#ff7e5f",
    tags: ["Mountains", "Dolomites", "Sunset", "Alpine", "Clouds", "Peaks"],
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 70-200mm f/2.8 VR S",
      focalLength: "135mm",
      aperture: "f/5.6",
      shutterSpeed: "1/250s",
      iso: "100",
      dimensions: "8256 x 5504",
      location: "Tre Cime di Lavaredo, Italy",
      date: "Sep 19, 2025"
    }
  },
  {
    id: "photo-4",
    title: "Verve & Velour",
    description: "Expressive studio portrait highlighting cinematic amber side-lighting and deep mahogany tonal textures.",
    category: "portraits",
    photographer: {
      name: "Amara Okonjo",
      handle: "@amara.visuals",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "3/4",
    likes: 3105,
    views: "72.4K",
    palette: ["#1e140f", "#8b4513", "#d2691e", "#f4a460", "#fdfbf7"],
    primaryColor: "#d2691e",
    tags: ["Portrait", "Studio", "Fashion", "Editorial", "Shadow"],
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 85mm F1.2 L USM DS",
      focalLength: "85mm",
      aperture: "f/1.4",
      shutterSpeed: "1/200s",
      iso: "100",
      dimensions: "5464 x 8192",
      location: "London, UK",
      date: "Dec 05, 2025"
    }
  },
  {
    id: "photo-5",
    title: "Geometric Prisms of Glass",
    description: "A mesmerizing abstract perspective of high-tech curtain wall skyscraper glass catching gradient morning reflections.",
    category: "abstract",
    photographer: {
      name: "Lukas Lindqvist",
      handle: "@nordic_lens",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
    orientation: "square",
    aspectRatio: "1/1",
    likes: 840,
    views: "18.3K",
    palette: ["#0052d4", "#4364f7", "#6fb1fc", "#ffffff", "#0b192c"],
    primaryColor: "#4364f7",
    tags: ["Abstract", "Geometry", "Reflections", "Glass", "Cyan"],
    exif: {
      camera: "Fujifilm GFX 100 II",
      lens: "GF 32-64mm F4 R LM WR",
      focalLength: "45mm",
      aperture: "f/11",
      shutterSpeed: "1/125s",
      iso: "160",
      dimensions: "11648 x 8736",
      location: "Stockholm, Sweden",
      date: "Jan 12, 2026"
    }
  },
  {
    id: "photo-6",
    title: "Shadows in Brooklyn Alley",
    description: "Cinematic black and white street capture of a lone commuter walking through steam vents under the iron subway trestle.",
    category: "street",
    photographer: {
      name: "Marcus Vance",
      handle: "@vance_monochrome",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    likes: 1890,
    views: "44.9K",
    palette: ["#0a0a0a", "#262626", "#666666", "#b3b3b3", "#fafafa"],
    primaryColor: "#262626",
    tags: ["Monochrome", "Street", "Brooklyn", "Noir", "Shadows", "NYC"],
    exif: {
      camera: "Leica M11 Monochrom",
      lens: "APO-Summicron-M 50mm f/2 ASPH",
      focalLength: "50mm",
      aperture: "f/2.4",
      shutterSpeed: "1/500s",
      iso: "400",
      dimensions: "9528 x 6328",
      location: "New York City, USA",
      date: "Nov 02, 2025"
    }
  },
  {
    id: "photo-7",
    title: "Emerald Canopy of Yakushima",
    description: "Ancient moss-covered cedar roots and morning mist deep within the sub-tropical rainforest of southern Japan.",
    category: "nature",
    photographer: {
      name: "Sora Tanaka",
      handle: "@sora_nature",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "3/4",
    likes: 2780,
    views: "61.3K",
    palette: ["#133e1b", "#1f6f28", "#5cb85c", "#8ee4af", "#051608"],
    primaryColor: "#1f6f28",
    tags: ["Forest", "Moss", "Green", "Misty", "Wilderness", "Japan"],
    exif: {
      camera: "Sony Alpha 1",
      lens: "FE 16-35mm F2.8 GM II",
      focalLength: "20mm",
      aperture: "f/4.0",
      shutterSpeed: "1/40s",
      iso: "320",
      dimensions: "8640 x 5760",
      location: "Yakushima, Kagoshima, Japan",
      date: "Oct 14, 2025"
    }
  },
  {
    id: "photo-8",
    title: "Singularity at Cyber Bay",
    description: "Ultra-futuristic skyscraper waterfront illuminated by magenta laser beams and ultra-violet bioluminescent lights.",
    category: "cyberpunk",
    photographer: {
      name: "Viktor Chen",
      handle: "@chen_future",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    likes: 4120,
    views: "98.7K",
    palette: ["#7928ca", "#ff0080", "#00dfd8", "#0e021a", "#ffffff"],
    primaryColor: "#7928ca",
    tags: ["Cyberpunk", "Futuristic", "Skyline", "Nightlife", "Neon", "Sci-Fi"],
    exif: {
      camera: "Fujifilm X-H2S",
      lens: "XF 16-55mm F2.8 R LM WR",
      focalLength: "18mm",
      aperture: "f/2.8",
      shutterSpeed: "1.5s",
      iso: "200",
      dimensions: "6240 x 4160",
      location: "Hong Kong",
      date: "Dec 31, 2025"
    }
  },
  {
    id: "photo-9",
    title: "Minimalist Curved Concrete",
    description: "Sculptural architecture celebrating pristine white curves, pure geometry, and crisp cast shadows under mid-day sun.",
    category: "architecture",
    photographer: {
      name: "Hannah De Vries",
      handle: "@hannah_forms",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "4/5",
    likes: 1290,
    views: "29.4K",
    palette: ["#0072ff", "#00c6ff", "#f5f7fa", "#1a2a3a", "#788796"],
    primaryColor: "#0072ff",
    tags: ["Modernism", "Curvature", "Facade", "Glass", "Clean"],
    exif: {
      camera: "Sony Alpha 7CR",
      lens: "FE 20mm F1.8 G",
      focalLength: "20mm",
      aperture: "f/9.0",
      shutterSpeed: "1/400s",
      iso: "100",
      dimensions: "9504 x 6336",
      location: "Rotterdam, Netherlands",
      date: "Sep 03, 2025"
    }
  },
  {
    id: "photo-10",
    title: "The Golden Dune Crest",
    description: "Sinuous wind-rippled sand ridges in the Empty Quarter during the last rays of crimson desert dusk.",
    category: "nature",
    photographer: {
      name: "Tariq Al-Mansoor",
      handle: "@tariq_desert",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
    orientation: "landscape",
    aspectRatio: "16/9",
    likes: 3410,
    views: "82.6K",
    palette: ["#e67e22", "#d35400", "#f39c12", "#2c1c0f", "#fad02c"],
    primaryColor: "#e67e22",
    tags: ["Desert", "Sahara", "Golden Hour", "Dunes", "Warm", "Texture"],
    exif: {
      camera: "Canon EOS R3",
      lens: "RF 100-500mm F4.5-7.1 L IS USM",
      focalLength: "240mm",
      aperture: "f/6.3",
      shutterSpeed: "1/800s",
      iso: "200",
      dimensions: "6000 x 4000",
      location: "Rub' al Khali, UAE",
      date: "Nov 22, 2025"
    }
  },
  {
    id: "photo-11",
    title: "Chromatics in Motion",
    description: "Experimental macro fluid dynamics capturing iridescence and high-contrast oil-water acrylic wave collision.",
    category: "abstract",
    photographer: {
      name: "Maya Lin",
      handle: "@maya_prism",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
    orientation: "square",
    aspectRatio: "1/1",
    likes: 1940,
    views: "43.7K",
    palette: ["#e81e63", "#9c27b0", "#3f51b5", "#00bcd4", "#ffeb3b"],
    primaryColor: "#e81e63",
    tags: ["Fluid", "Macro", "Iridescent", "Vibrant", "Colorwave", "Psychedelic"],
    exif: {
      camera: "Nikon Z8",
      lens: "NIKKOR Z MC 105mm f/2.8 VR S",
      focalLength: "105mm",
      aperture: "f/16",
      shutterSpeed: "1/200s",
      iso: "100",
      dimensions: "8256 x 5504",
      location: "San Francisco, USA",
      date: "Jan 18, 2026"
    }
  },
  {
    id: "photo-12",
    title: "Old Quarter Artisan",
    description: "An evocative environmental portrait of a master watchmaker immersed in fine mechanical craft under warm incandescent light.",
    category: "portraits",
    photographer: {
      name: "Mateo Rossi",
      handle: "@rossi_craft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&auto=format&fit=crop&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    orientation: "portrait",
    aspectRatio: "3/4",
    likes: 2480,
    views: "53.8K",
    palette: ["#3d271d", "#8c5b3e", "#d9a066", "#1c1410", "#e8ded2"],
    primaryColor: "#8c5b3e",
    tags: ["Portrait", "Artisan", "Moody", "Authentic", "Eyes", "Craft"],
    exif: {
      camera: "Leica SL2",
      lens: "Summilux-SL 50mm f/1.4 ASPH",
      focalLength: "50mm",
      aperture: "f/1.4",
      shutterSpeed: "1/125s",
      iso: "640",
      dimensions: "8368 x 5584",
      location: "Florence, Italy",
      date: "Oct 05, 2025"
    }
  }
];

// Aesthetic Filter Presets (CSS Filter specs)
const FILTER_PRESETS = {
  original: {
    name: "Normal (Pure)",
    filters: { brightness: 100, contrast: 100, saturate: 100, sepia: 0, grayscale: 0, blur: 0, hueRotate: 0 }
  },
  cinematic: {
    name: "Cinematic Teal & Amber",
    filters: { brightness: 105, contrast: 125, saturate: 130, sepia: 15, grayscale: 0, blur: 0, hueRotate: -15 }
  },
  noir: {
    name: "Classic Noir B&W",
    filters: { brightness: 95, contrast: 150, saturate: 0, sepia: 0, grayscale: 100, blur: 0, hueRotate: 0 }
  },
  cyberpunk: {
    name: "Cyberpunk Glow",
    filters: { brightness: 110, contrast: 135, saturate: 160, sepia: 0, grayscale: 0, blur: 0, hueRotate: 45 }
  },
  goldenHour: {
    name: "Golden Hour Glow",
    filters: { brightness: 108, contrast: 110, saturate: 125, sepia: 35, grayscale: 0, blur: 0, hueRotate: -10 }
  },
  emerald: {
    name: "Emerald Forest",
    filters: { brightness: 98, contrast: 120, saturate: 115, sepia: 10, grayscale: 0, blur: 0, hueRotate: 80 }
  },
  vintage: {
    name: "Vintage 1970s",
    filters: { brightness: 112, contrast: 90, saturate: 85, sepia: 45, grayscale: 0, blur: 0, hueRotate: 15 }
  }
};
