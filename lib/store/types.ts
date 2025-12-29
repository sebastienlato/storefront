export type StoreIndex = {
  defaultStoreId: string;
  storeIds: string[];
};

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon?: string;
};

export type Brand = {
  name: string;
  tagline?: string;
  description?: string;
  logoPath: string;
  logoAlt?: string;
};

export type ThemeTokens = {
  colors: {
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    accentMuted: string;
    border: string;
    surface: string;
  };
  typography: {
    display: string;
    body: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  spacing: {
    sectionY: string;
    containerX: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
};

export type Navigation = {
  header: NavItem[];
  footer: NavItem[];
  social?: SocialLink[];
  headerCta?: {
    label: string;
    href: string;
    variant?: "solid" | "ghost";
  };
};

export type TrustItem = {
  title: string;
  description: string;
  icon?: string;
};

export type StoreConfig = {
  id: string;
  brand: Brand;
  theme: ThemeTokens;
  navigation: Navigation;
  trust: TrustItem[];
  commerce: {
    ctas: {
      addToCart: {
        label: string;
        successLabel: string;
      };
      checkout: CallToAction;
      continueShopping?: CallToAction;
    };
    cart: {
      title: string;
      emptyTitle: string;
      emptyDescription?: string;
      subtotalLabel: string;
      promoLabel: string;
      promoPlaceholder: string;
      promoApplyLabel: string;
      quantityLabel: string;
      removeLabel: string;
      decreaseLabel: string;
      increaseLabel: string;
    };
    checkout: {
      title: string;
      steps: {
        contact: string;
        shipping: string;
        payment: string;
      };
      contact: {
        title: string;
        emailLabel: string;
        phoneLabel: string;
      };
      shipping: {
        title: string;
        firstNameLabel: string;
        lastNameLabel: string;
        addressLabel: string;
        cityLabel: string;
        postalLabel: string;
        countryLabel: string;
      };
      payment: {
        title: string;
        description?: string;
      };
      summary: {
        title: string;
        subtotalLabel: string;
        shippingLabel: string;
        taxLabel: string;
        totalLabel: string;
      };
      actions: {
        nextLabel: string;
        backLabel: string;
      };
      placeOrderLabel: string;
      confirmation: {
        title: string;
        description?: string;
        cta?: CallToAction;
      };
    };
  };
};

export type CallToAction = {
  label: string;
  href: string;
};

export type HeroBlock = {
  id: string;
  type: "hero";
  title: string;
  subtitle?: string;
  cta?: CallToAction;
  image?: string;
  imageAlt?: string;
};

export type FeatureGridBlock = {
  id: string;
  type: "feature-grid";
  title?: string;
  items: {
    title: string;
    description: string;
  }[];
};

export type FeaturedCollectionsBlock = {
  id: string;
  type: "featured-collections";
  title?: string;
  subtitle?: string;
  cta?: CallToAction;
  collectionHandles: string[];
};

export type TrustBarBlock = {
  id: string;
  type: "trust-bar";
  title?: string;
  source: "store" | "content";
  items?: TrustItem[];
};

export type PromoBannerBlock = {
  id: string;
  type: "promo-banner";
  text: string;
  cta?: CallToAction;
};

export type CTASectionBlock = {
  id: string;
  type: "cta-section";
  title: string;
  description?: string;
  cta: CallToAction;
  image?: string;
  imageAlt?: string;
};

export type ImageStripBlock = {
  id: string;
  type: "image-strip";
  title?: string;
  images: {
    src: string;
    alt?: string;
  }[];
};

export type TestimonialBlock = {
  id: string;
  type: "testimonials";
  title?: string;
  items: {
    quote: string;
    name: string;
    role?: string;
  }[];
};

export type RichTextBlock = {
  id: string;
  type: "rich-text";
  title?: string;
  paragraphs: string[];
};

export type ContactBlock = {
  id: string;
  type: "contact";
  title?: string;
  methods: {
    label: string;
    value: string;
  }[];
};

export type ContentBlock =
  | HeroBlock
  | FeaturedCollectionsBlock
  | FeatureGridBlock
  | ImageStripBlock
  | TestimonialBlock
  | TrustBarBlock
  | PromoBannerBlock
  | CTASectionBlock
  | RichTextBlock
  | ContactBlock;

export type ContentPage = {
  seo: {
    title: string;
    description?: string;
  };
  blocks: ContentBlock[];
};

export type StoreContent = {
  home: ContentPage;
  about: ContentPage;
  contact: ContentPage;
};

export type Price = {
  current: number;
  compareAt?: number;
  currency: string;
};

export type Variant = {
  id: string;
  title: string;
  options: {
    name: string;
    value: string;
  }[];
  sku?: string;
  inStock?: boolean;
  inventoryQty?: number;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: string[];
  price: Price;
  variants: Variant[];
  tags?: string[];
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
  };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: string;
  productHandles: string[];
};

export type LegalContent = {
  privacy: {
    title: string;
    updated: string;
    sections: {
      title: string;
      body: string[];
    }[];
  };
  terms: {
    title: string;
    updated: string;
    sections: {
      title: string;
      body: string[];
    }[];
  };
};

export type StoreDataset = {
  config: StoreConfig;
  content: StoreContent;
  products: Product[];
  collections: Collection[];
  legal: LegalContent;
};
