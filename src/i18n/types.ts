export interface TranslationSchema {
  common: {
    close: string;
    center: string;
    drag_hint: string;
    copy: string;
    copied: string;
    copy_all: string;
    print: string;
    download_pdf?: string;
    got_it: string;
    acknowledge: string;
    verified: string;
    explore: string;
    view_explorer: string;
    buy_trade: string;
    retry: string;
    connecting: string;
    loading: string;
  };
  nav: {
    about: string;
    bitcoin_education: string;
    token: string;
    tokenomics: string;
    how_to_buy: string;
    whitepaper: string;
    roadmap: string;
    transparency: string;
    faq: string;
    buy_trade: string;
    brand_title: string;
    language_selector: string;
  };
  hero: {
    independent_asset: string;
    fixed_scarcity: string;
    title: string;
    subtitle: string;
    description: string;
    btn_explore: string;
    btn_whitepaper: string;
    btn_buy_trade: string;
    stat_supply: string;
    stat_network: string;
    stat_scarcity: string;
  };
  intro: {
    badge: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    learn_more: string;
    explore_genesis: string;
    tag_independent: string;
    tag_cap: string;
    tag_non_affiliated: string;
  };
  about: {
    kicker: string;
    title: string;
    description: string;
    pillars: Array<{
      kicker: string;
      title: string;
      summary: string;
      description: string;
      highlight: string;
      verified: string;
      network: string;
    }>;
    distinction_title: string;
    distinction_desc: string;
  };
  education: {
    badge: string;
    title: string;
    description: string;
    tabs: {
      overview: string;
      how_it_works: string;
      supply: string;
      genesis: string;
    };
    tab1: {
      def_kicker: string;
      def_title: string;
      p1: string;
      p2: string;
      asset_class_label: string;
      asset_class_val: string;
      settlement_label: string;
      settlement_val: string;
      shift_kicker: string;
      shift_title: string;
      shift_intro: string;
      points: Array<{ title: string; desc: string }>;
      boundary_title: string;
      boundary_desc: string;
    };
    tab2: {
      intro: string;
      mechanisms: Array<{ num: string; title: string; desc: string }>;
    };
    tab3: {
      supply_kicker: string;
      supply_title: string;
      supply_p1: string;
      supply_p2: string;
      btc_supply_label: string;
      ble_supply_label: string;
      ratio_label: string;
      ratio_val: string;
      supply_footer: string;
      decent_kicker: string;
      decent_title: string;
      decent_desc: string;
      btc_decent_title: string;
      btc_decent_desc: string;
      sol_decent_title: string;
      sol_decent_desc: string;
    };
    tab4: {
      archive_kicker: string;
      title: string;
      p1: string;
      quote: string;
      p2: string;
      question_label: string;
      question_body: string;
      conclusion: string;
      invariants: Array<{ tag: string; title: string; desc: string }>;
      immutable_state: string;
      token_standard: string;
      on_chain_verifiable: string;
      btn_whitepaper: string;
      btn_deep_dive: string;
    };
  };
  scarcity: {
    kicker: string;
    title: string;
    description: string;
    step1_kicker: string;
    step1_title: string;
    step1_desc: string;
    step1_stat_label: string;
    step2_kicker: string;
    step2_title: string;
    step2_desc: string;
    step2_stat_label: string;
    step3_kicker: string;
    step3_title: string;
    step3_layer: string;
    step3_desc: string;
    step3_stat1: string;
    step3_stat2: string;
    matrix_kicker: string;
    matrix_title: string;
    col_parameter: string;
    col_btc: string;
    col_ble: string;
    rows: Array<{ metric: string; bitcoin: string; ble: string }>;
    distinction_title: string;
    distinction_desc: string;
  };
  token_overview: {
    kicker: string;
    title: string;
    subtitle: string;
    specs: {
      token_name: string;
      token_symbol: string;
      blockchain_network: string;
      total_supply: string;
      token_standard: string;
      decimals: string;
      tokens_suffix: string;
    };
    contract_label: string;
    authentic_id: string;
    deployment_pending_title: string;
    deployment_pending_desc: string;
    copy_address: string;
    copied_address: string;
    view_explorer: string;
  };
  tokenomics: {
    kicker: string;
    title: string;
    subtitle: string;
    fixed_cap: string;
    total_supply: string;
    verified_alloc: string;
    allocations: Array<{ id: string; category: string; description: string }>;
    data_source: string;
  };
  how_to_buy: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      summary: string;
      description: string;
      action_label?: string;
    }>;
    advisory_kicker: string;
    advisory_title: string;
    advisory_desc: string;
    security_items: Array<string>;
    btn_trade_portal: string;
    venue_action: string;
    pending_action: string;
    portal_action: string;
  };
  market: {
    kicker: string;
    title: string;
    subtitle: string;
    retry_connecting: string;
    retry: string;
    current_price: string;
    change_24h: string;
    market_cap: string;
    liquidity: string;
    volume_24h: string;
    holders: string;
    holders_val: string;
    dex_venue: string;
    status_connecting: string;
    status_unavailable: string;
    activates_title: string;
    activates_desc: string;
    btn_price_chart: string;
    btn_buy_trade: string;
    btn_view_explorer: string;
    chart_terminal: string;
    awaiting_pool: string;
    candlestick_title: string;
    candlestick_desc: string;
  };
  transparency: {
    kicker: string;
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      subtitle: string;
      primaryValue: string;
      detail: string;
      linkLabel: string;
    }>;
  };
  why_solana: {
    kicker: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      title: string;
      lead: string;
      detail: string;
      badge: string;
    }>;
  };
  roadmap: {
    kicker: string;
    title: string;
    subtitle: string;
    status: {
      completed: string;
      in_progress: string;
      upcoming: string;
    };
    stage: string;
    verified_milestones: string;
    items_suffix: string;
    phases: Array<{
      title: string;
      description: string;
      items: string[];
    }>;
  };
  community: {
    kicker: string;
    title: string;
    subtitle: string;
    twitter_desc: string;
    github_desc: string;
    instagram_desc: string;
    youtube_desc?: string;
    discord_desc?: string;
    whatsapp_desc?: string;
    email_desc?: string;
    generic_desc: string;
    verified_badge: string;
    official_channel: string;
    policy_title: string;
    policy_desc: string;
    policy_footer: string;
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    notice_text: string;
    items: Array<{
      question: string;
      answer: string;
      isDisclaimer?: boolean;
    }>;
  };
  footer: {
    brand_sub: string;
    mission: string;
    btn_whitepaper: string;
    nav_heading: string;
    whitepaper_v1: string;
    terms: string;
    privacy: string;
    contract_heading: string;
    mint_label: string;
    prelaunch_heading: string;
    prelaunch_desc: string;
    copy_address: string;
    copied: string;
    btn_buy_trade: string;
    disclaimer_heading: string;
    disclaimer_text: string;
    disclaimer_risk: string;
    rights: string;
    mainnet_pending: string;
  };
  modals: {
    buy_trade: {
      title: string;
      subtitle: string;
      alert_title: string;
      alert_desc: string;
      venues_heading: string;
      pending_status: string;
      footer_note: string;
    };
    legal: {
      terms_title: string;
      terms_sub: string;
      privacy_title: string;
      privacy_sub: string;
      terms_sections: Array<{ title: string; body: string }>;
      privacy_sections: Array<{ title: string; body: string }>;
    };
    whitepaper: {
      title: string;
      subtitle: string;
      doc_title: string;
      doc_sub: string;
      toc_title: string;
      copied_toast: string;
      download_pdf?: string;
      download_btn?: string;
      chapters: Array<{ id: string; num: string; title: string; content: string[] }>;
    };
    education_modal: {
      title: string;
      subtitle: string;
      search_placeholder: string;
      tabs: {
        intro: string;
        mechanisms: string;
        scarcity: string;
        genesis: string;
        distinction: string;
      };
      copy_guide: string;
      chapters: {
        intro: { title: string; p1: string; p2: string; p3: string };
        mechanisms: { title: string; items: Array<{ title: string; desc: string }> };
        scarcity: { title: string; p1: string; p2: string; stat_btc: string; stat_ble: string; ratio: string };
        genesis: { title: string; p1: string; quote: string; p2: string; invariants: Array<{ title: string; desc: string }> };
        distinction: { title: string; p1: string; p2: string; p3: string };
      };
    };
    coming_soon?: {
      title: string;
      subtitle: string;
      badge: string;
      app_title: string;
      desc: string;
      security_title: string;
      security_desc: string;
      read_whitepaper: string;
    };
    wallet?: {
      title_connect: string;
      title_connected: string;
      subtitle: string;
      footer: string;
      status: string;
      connected: string;
      public_address: string;
      sol_balance: string;
      disconnect: string;
      intro: string;
      phantom: string;
      solflare: string;
      detected: string;
      install_phantom: string;
      install_solflare: string;
      ready: string;
    };
  };
}
