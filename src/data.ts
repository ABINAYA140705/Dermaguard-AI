export const skinTypeQuestions = [
  {
    id: 1,
    question: "How does your face feel after you wash it?",
    options: [
      { text: "It feels dry and tight", category: "Dry" },
      { text: "It feels oily only on my nose and forehead", category: "Combination" },
      { text: "It feels oily and shiny all over", category: "Oily" },
      { text: "It feels itchy or red", category: "Sensitive" },
      { text: "It has many pimples or bumps", category: "Acne-prone" },
      { text: "It feels normal and balanced", category: "Normal" }
    ]
  },
  {
    id: 2,
    question: "Does your skin get red or itchy easily?",
    options: [
      { text: "No, almost never", category: "Normal" },
      { text: "Yes, mostly in cold weather", category: "Dry" },
      { text: "Yes, when I use new soaps or creams", category: "Sensitive" },
      { text: "Only when I have pimples", category: "Acne-prone" },
      { text: "Only on my nose and forehead", category: "Combination" }
    ]
  },
  {
    id: 3,
    question: "Look at your nose. Do you see big pores (small holes)?",
    options: [
      { text: "No, I cannot see them", category: "Normal" },
      { text: "Yes, they look big and open", category: "Oily" },
      { text: "I only see them on my nose", category: "Combination" },
      { text: "They look blocked or bumpy", category: "Acne-prone" },
      { text: "I see small red lines", category: "Sensitive" }
    ]
  },
  {
    id: 4,
    question: "How does your face look in the middle of the day?",
    options: [
      { text: "It looks clean and fresh", category: "Normal" },
      { text: "It looks very oily and shiny", category: "Oily" },
      { text: "It is oily only on my nose and forehead", category: "Combination" },
      { text: "It looks red or itchy", category: "Sensitive" },
      { text: "It has bumps or pimples", category: "Acne-prone" }
    ]
  },
  {
    id: 5,
    question: "How often do you get pimples?",
    options: [
      { text: "Almost never", category: "Normal" },
      { text: "All the time", category: "Acne-prone" },
      { text: "Only on my nose and forehead", category: "Combination" },
      { text: "Sometimes, with oily skin", category: "Oily" },
      { text: "Rarely, but I get red marks", category: "Sensitive" }
    ]
  }
];

export const ingredientDatabase = [
  {
    Ingredient: "Alcohol Denat",
    CommonUse: "Solvent, astringent",
    PossibleSymptoms: "Dryness, irritation, barrier damage",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Dry", "Sensitive"],
    SaferAlternative: "Glycerin, Hyaluronic Acid"
  },
  {
    Ingredient: "Fragrance (Parfum)",
    CommonUse: "Scent",
    PossibleSymptoms: "Contact dermatitis, redness, itching",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Acne-prone"],
    SaferAlternative: "Fragrance-free products"
  },
  {
    Ingredient: "Sodium Lauryl Sulfate (SLS)",
    CommonUse: "Surfactant, cleansing agent",
    PossibleSymptoms: "Severe dryness, irritation",
    RiskLevel: "High",
    AvoidForSkinType: ["Dry", "Sensitive"],
    SaferAlternative: "Sodium Cocoyl Isethionate"
  },
  {
    Ingredient: "Mineral Oil",
    CommonUse: "Emollient",
    PossibleSymptoms: "Clogged pores, breakouts",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Oily", "Acne-prone"],
    SaferAlternative: "Squalane, Jojoba Oil"
  },
  {
    Ingredient: "Coconut Oil",
    CommonUse: "Moisturizer",
    PossibleSymptoms: "Comedogenic (clogs pores)",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Oily", "Acne-prone"],
    SaferAlternative: "Argan Oil"
  },
  {
    Ingredient: "Parabens",
    CommonUse: "Preservative",
    PossibleSymptoms: "Hormonal disruption (debated), irritation",
    RiskLevel: "Low",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Phenoxyethanol"
  },
  {
    Ingredient: "Salicylic Acid",
    CommonUse: "Exfoliant (BHA)",
    PossibleSymptoms: "Excessive peeling, dryness",
    RiskLevel: "Low",
    AvoidForSkinType: ["Dry"],
    SaferAlternative: "Lactic Acid"
  },
  {
    Ingredient: "Benzoyl Peroxide",
    CommonUse: "Acne treatment",
    PossibleSymptoms: "Redness, peeling, dryness",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Dry", "Sensitive"],
    SaferAlternative: "Tea Tree Oil"
  },
  {
    Ingredient: "Isopropyl Myristate",
    CommonUse: "Emollient, texture enhancer",
    PossibleSymptoms: "Highly comedogenic, severe breakouts",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Squalane"
  },
  {
    Ingredient: "Sodium Laureth Sulfate (SLES)",
    CommonUse: "Surfactant, cleansing agent",
    PossibleSymptoms: "Dryness, irritation (milder than SLS but still an issue)",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Dry", "Sensitive"],
    SaferAlternative: "Decyl Glucoside"
  },
  {
    Ingredient: "Lanolin",
    CommonUse: "Emollient, moisturizer",
    PossibleSymptoms: "Allergic contact dermatitis, breakouts",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone", "Sensitive"],
    SaferAlternative: "Shea Butter, Plant-derived Ceramides"
  },
  {
    Ingredient: "Talc",
    CommonUse: "Absorbent, anti-caking agent",
    PossibleSymptoms: "Clogged pores, respiratory irritation if inhaled",
    RiskLevel: "Low",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Cornstarch, Arrowroot Powder"
  },
  {
    Ingredient: "Propylene Glycol",
    CommonUse: "Humectant, solvent",
    PossibleSymptoms: "Irritation, allergic reactions",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Propanediol, Glycerin"
  },
  {
    Ingredient: "Essential Oils",
    CommonUse: "Fragrance, natural remedies",
    PossibleSymptoms: "Contact dermatitis, photosensitivity",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Acne-prone"],
    SaferAlternative: "Fragrance-free formulations"
  },
  {
    Ingredient: "Retinol",
    CommonUse: "Anti-aging, cell turnover",
    PossibleSymptoms: "Redness, peeling, extreme dryness, sun sensitivity",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry"],
    SaferAlternative: "Bakuchiol, Peptides"
  },
  {
    Ingredient: "Glycolic Acid",
    CommonUse: "Exfoliant (AHA)",
    PossibleSymptoms: "Stinging, redness, sun sensitivity",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Lactic Acid, Mandelic Acid"
  },
  {
    Ingredient: "Oxybenzone",
    CommonUse: "Chemical sunscreen filter",
    PossibleSymptoms: "Hormonal disruption, allergic reactions",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Zinc Oxide, Titanium Dioxide"
  },
  {
    Ingredient: "Avobenzone",
    CommonUse: "Chemical sunscreen filter",
    PossibleSymptoms: "Skin irritation, stinging",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Zinc Oxide, Titanium Dioxide"
  },
  {
    Ingredient: "Methylisothiazolinone (MIT)",
    CommonUse: "Preservative",
    PossibleSymptoms: "Severe allergic contact dermatitis",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Oily", "Combination", "Acne-prone"],
    SaferAlternative: "Phenoxyethanol, Sodium Benzoate"
  },
  {
    Ingredient: "Phthalates",
    CommonUse: "Fragrance solvent, plasticizer",
    PossibleSymptoms: "Endocrine disruption",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Oily", "Combination", "Acne-prone"],
    SaferAlternative: "Phthalate-free products"
  },
  {
    Ingredient: "Formaldehyde",
    CommonUse: "Preservative",
    PossibleSymptoms: "Carcinogenic, severe irritation",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Oily", "Combination", "Acne-prone"],
    SaferAlternative: "Safer preservatives"
  },
  {
    Ingredient: "Triclosan",
    CommonUse: "Antibacterial agent",
    PossibleSymptoms: "Endocrine disruption, bacterial resistance",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Oily", "Combination", "Acne-prone"],
    SaferAlternative: "Tea Tree Oil, Benzalkonium Chloride"
  },
  {
    Ingredient: "BHA (Butylated Hydroxyanisole)",
    CommonUse: "Antioxidant, preservative",
    PossibleSymptoms: "Endocrine disruption, possible carcinogen",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Oily", "Combination", "Acne-prone"],
    SaferAlternative: "Vitamin E (Tocopherol)"
  },
  {
    Ingredient: "BHT (Butylated Hydroxytoluene)",
    CommonUse: "Antioxidant, preservative",
    PossibleSymptoms: "Irritation, possible endocrine disruption",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Vitamin E (Tocopherol)"
  },
  {
    Ingredient: "Petrolatum",
    CommonUse: "Occlusive, moisturizer",
    PossibleSymptoms: "Can trap heat and sweat, potentially clogging pores if not purified",
    RiskLevel: "Low",
    AvoidForSkinType: ["Oily", "Acne-prone"],
    SaferAlternative: "Shea Butter, Squalane"
  },
  {
    Ingredient: "Silicone (Dimethicone)",
    CommonUse: "Texture enhancer, occlusive",
    PossibleSymptoms: "Can trap debris and sebum, leading to breakouts",
    RiskLevel: "Low",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Plant-derived alkanes"
  },
  {
    Ingredient: "Cocoa Butter",
    CommonUse: "Rich moisturizer",
    PossibleSymptoms: "Highly comedogenic",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Oily", "Acne-prone"],
    SaferAlternative: "Mango Butter, Shea Butter"
  },
  {
    Ingredient: "Algae Extract",
    CommonUse: "Antioxidant, humectant",
    PossibleSymptoms: "Highly comedogenic, triggers acne",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Green Tea Extract"
  },
  {
    Ingredient: "Wheat Germ Oil",
    CommonUse: "Moisturizer, Vitamin E source",
    PossibleSymptoms: "Extremely comedogenic",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Rosehip Oil, Jojoba Oil"
  },
  {
    Ingredient: "Sodium Chloride",
    CommonUse: "Thickener",
    PossibleSymptoms: "Comedogenic, can cause breakouts around mouth/hairline",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Xanthan Gum"
  },
  {
    Ingredient: "Stearic Acid",
    CommonUse: "Emulsifier, thickener",
    PossibleSymptoms: "Mildly comedogenic",
    RiskLevel: "Low",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Cetearyl Alcohol"
  },
  {
    Ingredient: "Myristyl Myristate",
    CommonUse: "Emollient, thickener",
    PossibleSymptoms: "Highly comedogenic",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Caprylic/Capric Triglyceride"
  },
  {
    Ingredient: "Oleth-3",
    CommonUse: "Emulsifier",
    PossibleSymptoms: "Highly comedogenic",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Polysorbate 20"
  },
  {
    Ingredient: "Laureth-4",
    CommonUse: "Emulsifier, surfactant",
    PossibleSymptoms: "Highly comedogenic",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Decyl Glucoside"
  },
  {
    Ingredient: "Mica",
    CommonUse: "Colorant, shimmer",
    PossibleSymptoms: "Micro-tears if particles are large, mild irritation",
    RiskLevel: "Low",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Synthetic Fluorphlogopite"
  },
  {
    Ingredient: "Carmine",
    CommonUse: "Red colorant",
    PossibleSymptoms: "Allergic reactions",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Iron Oxides"
  },
  {
    Ingredient: "Bismuth Oxychloride",
    CommonUse: "Colorant, shimmer",
    PossibleSymptoms: "Cystic acne, severe irritation",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone", "Sensitive"],
    SaferAlternative: "Titanium Dioxide, Zinc Oxide"
  },
  {
    Ingredient: "PEG-100 Stearate",
    CommonUse: "Emulsifier",
    PossibleSymptoms: "Potential contamination with 1,4-dioxane (carcinogen)",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Cetearyl Olivate, Sorbitan Olivate"
  },
  {
    Ingredient: "Polysorbate 80",
    CommonUse: "Emulsifier",
    PossibleSymptoms: "Can feed fungal acne (Malassezia)",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Polyglyceryl-based emulsifiers"
  },
  {
    Ingredient: "Galactomyces Ferment Filtrate",
    CommonUse: "Brightening, anti-aging",
    PossibleSymptoms: "Can trigger fungal acne",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Niacinamide, Vitamin C"
  },
  {
    Ingredient: "Saccharomyces Ferment",
    CommonUse: "Skin conditioning",
    PossibleSymptoms: "Can trigger fungal acne",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone"],
    SaferAlternative: "Hyaluronic Acid"
  },
  {
    Ingredient: "Olive Oil",
    CommonUse: "Moisturizer",
    PossibleSymptoms: "Comedogenic, can feed fungal acne",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Squalane"
  },
  {
    Ingredient: "Sweet Almond Oil",
    CommonUse: "Emollient",
    PossibleSymptoms: "Mildly comedogenic, nut allergy risk",
    RiskLevel: "Low",
    AvoidForSkinType: ["Acne-prone", "Sensitive"],
    SaferAlternative: "Sunflower Seed Oil"
  },
  {
    Ingredient: "Avocado Oil",
    CommonUse: "Rich moisturizer",
    PossibleSymptoms: "Comedogenic for some",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Grapeseed Oil"
  },
  {
    Ingredient: "Soybean Oil",
    CommonUse: "Emollient",
    PossibleSymptoms: "Highly comedogenic",
    RiskLevel: "High",
    AvoidForSkinType: ["Acne-prone", "Oily"],
    SaferAlternative: "Hemp Seed Oil"
  },
  {
    Ingredient: "Shea Butter",
    CommonUse: "Rich moisturizer",
    PossibleSymptoms: "Can clog pores in very oily skin",
    RiskLevel: "Low",
    AvoidForSkinType: ["Oily"],
    SaferAlternative: "Ceramides"
  },
  {
    Ingredient: "Witch Hazel",
    CommonUse: "Astringent",
    PossibleSymptoms: "Dryness, irritation (often contains alcohol)",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Dry", "Sensitive"],
    SaferAlternative: "Rose Water, Centella Asiatica"
  },
  {
    Ingredient: "Peppermint Oil",
    CommonUse: "Cooling agent, fragrance",
    PossibleSymptoms: "Severe irritation, redness",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Acne-prone"],
    SaferAlternative: "Aloe Vera"
  },
  {
    Ingredient: "Eucalyptus Oil",
    CommonUse: "Fragrance, antibacterial",
    PossibleSymptoms: "Contact dermatitis, irritation",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry"],
    SaferAlternative: "Green Tea Extract"
  },
  {
    Ingredient: "Citrus Oils (Lemon, Orange, Grapefruit)",
    CommonUse: "Fragrance, brightening",
    PossibleSymptoms: "Phototoxicity (severe burns in sun), irritation",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive", "Dry", "Oily", "Combination", "Acne-prone"],
    SaferAlternative: "Vitamin C (Ascorbic Acid)"
  },
  {
    Ingredient: "Lavender Oil",
    CommonUse: "Fragrance, calming",
    PossibleSymptoms: "Contact dermatitis, cell damage in vitro",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Chamomile Extract"
  },
  {
    Ingredient: "Rosemary Oil",
    CommonUse: "Fragrance, antioxidant",
    PossibleSymptoms: "Irritation, allergic reaction",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Rosemary Leaf Extract (without fragrant components)"
  },
  {
    Ingredient: "Ylang Ylang Oil",
    CommonUse: "Fragrance",
    PossibleSymptoms: "Known allergen, contact dermatitis",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  },
  {
    Ingredient: "Linalool",
    CommonUse: "Fragrance component",
    PossibleSymptoms: "Oxidizes on air exposure to become a potent allergen",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  },
  {
    Ingredient: "Limonene",
    CommonUse: "Fragrance component",
    PossibleSymptoms: "Oxidizes to become a potent allergen and irritant",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  },
  {
    Ingredient: "Geraniol",
    CommonUse: "Fragrance component",
    PossibleSymptoms: "Common contact allergen",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  },
  {
    Ingredient: "Citronellol",
    CommonUse: "Fragrance component",
    PossibleSymptoms: "Allergic reactions",
    RiskLevel: "Medium",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  },
  {
    Ingredient: "Eugenol",
    CommonUse: "Fragrance component",
    PossibleSymptoms: "Strong sensitizer, irritation",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  },
  {
    Ingredient: "Cinnamal",
    CommonUse: "Fragrance component",
    PossibleSymptoms: "High risk of contact allergy",
    RiskLevel: "High",
    AvoidForSkinType: ["Sensitive"],
    SaferAlternative: "Fragrance-free"
  }
];

export const skinTypeRecommendations = [
  {
    SkinType: "Dry",
    RecommendedIngredients: ["Hyaluronic Acid", "Ceramides", "Glycerin", "Shea Butter"],
    AvoidIngredients: ["Alcohol Denat", "SLS", "Salicylic Acid"]
  },
  {
    SkinType: "Oily",
    RecommendedIngredients: ["Niacinamide", "Salicylic Acid", "Hyaluronic Acid (Lightweight)"],
    AvoidIngredients: ["Mineral Oil", "Coconut Oil", "Petrolatum"]
  },
  {
    SkinType: "Sensitive",
    RecommendedIngredients: ["Centella Asiatica", "Aloe Vera", "Allantoin", "Colloidal Oatmeal"],
    AvoidIngredients: ["Fragrance", "Alcohol Denat", "SLS", "Essential Oils"]
  },
  {
    SkinType: "Combination",
    RecommendedIngredients: ["Hyaluronic Acid", "Niacinamide", "Lactic Acid"],
    AvoidIngredients: ["Heavy Oils (on T-zone)", "Harsh Sulfates"]
  },
  {
    SkinType: "Acne-prone",
    RecommendedIngredients: ["Salicylic Acid", "Benzoyl Peroxide", "Niacinamide", "Tea Tree Oil"],
    AvoidIngredients: ["Coconut Oil", "Isopropyl Myristate", "Fragrance"]
  },
  {
    SkinType: "Normal",
    RecommendedIngredients: ["Hyaluronic Acid", "Vitamin C", "Peptides", "Antioxidants"],
    AvoidIngredients: ["Harsh Sulfates", "Excessive Alcohol"]
  }
];
