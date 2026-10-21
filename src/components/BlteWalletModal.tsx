import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Download,
  Clock,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Smartphone,
  Globe,
  Sparkles,
  ArrowRight,
  Layers,
  Zap,
  Lock,
  Bell
} from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { useLanguage } from '../i18n/LanguageContext';

interface BlteWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitePaper?: () => void;
}

const WAITLIST_STORAGE_KEY = 'blte_wallet_waitlist_emails';
const WAITLIST_PLATFORM_KEY = 'blte_wallet_waitlist_platform';

// Complete dictionary of translations for the BLTE Wallet modal across all supported languages
interface WalletModalTranslation {
  modalTitle: string;
  modalSubtitle: string;
  badgeComingSoon: string;
  heroTitle: string;
  heroDesc: string;
  targetPlatforms: string;
  phaseBeta: string;
  soon: string;
  iosApp: string;
  iosDesc: string;
  androidApp: string;
  androidDesc: string;
  browserExt: string;
  browserDesc: string;
  downloadSoon: string;
  waitlistTitle: string;
  earlyAccess: string;
  registeredSuccess: string;
  waitlistPriority: string;
  betaAccess: string;
  confirmedFor: string;
  bonusDesc: string;
  registerAnother: string;
  waitlistFormDesc: string;
  selectDevice: string;
  ios: string;
  android: string;
  browser: string;
  emailPlaceholder: string;
  registering: string;
  joinWaitlist: string;
  errorValidEmail: string;
  prevRegistered: string;
  speedTitle: string;
  speedDesc: string;
  custodyTitle: string;
  custodyDesc: string;
  stakingTitle: string;
  stakingDesc: string;
  securityTitle: string;
  securityDesc: string;
  readWhitepaper: string;
  close: string;
}

const WALLET_TRANSLATIONS: Record<string, WalletModalTranslation> = {
  en: {
    modalTitle: "BLTE WALLET",
    modalSubtitle: "Official Non-Custodial Client · Coming Soon",
    badgeComingSoon: "COMING SOON · OFFICIAL WALLET",
    heroTitle: "BLTE Wallet",
    heroDesc: "The dedicated, non-custodial decentralized client engineered exclusively for the Bitcoin Lite Edition ecosystem on Solana. Zero third-party custody, sub-second confirmations, and built-in staking telemetry.",
    targetPlatforms: "Target Platforms (Coming Soon)",
    phaseBeta: "Phase 03 Beta",
    soon: "Soon",
    iosApp: "iOS App",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play & Direct APK",
    browserExt: "Browser Extension",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "Download · Coming Soon",
    waitlistTitle: "Waitlist Email Registration",
    earlyAccess: "Early Access",
    registeredSuccess: "You're registered on the BLTE Wallet Waitlist!",
    waitlistPriority: "Waitlist Priority",
    betaAccess: "Beta Access",
    confirmedFor: "Confirmation reserved for",
    bonusDesc: "You will receive an exclusive download link and zero-gas welcome bonus when the beta releases.",
    registerAnother: "Register another email or platform",
    waitlistFormDesc: "Join the waitlist to receive instant notification and direct download links as soon as the BLTE Wallet is deployed.",
    selectDevice: "Select Your Primary Device:",
    ios: "iOS",
    android: "Android",
    browser: "Browser",
    emailPlaceholder: "Enter your email address",
    registering: "Registering...",
    joinWaitlist: "Join Waitlist",
    errorValidEmail: "Please enter a valid email address.",
    prevRegistered: "Previously registered on this device:",
    speedTitle: "Sub-Second Speed",
    speedDesc: "Powered by Solana's 400ms block times and fraction-of-a-cent fees.",
    custodyTitle: "Non-Custodial",
    custodyDesc: "Your keys, your crypto. Hardware biometric protection locally on-device.",
    stakingTitle: "1-Tap Staking",
    stakingDesc: "Built-in 11.61% protocol staking yield directly inside your wallet.",
    securityTitle: "Security Advisory:",
    securityDesc: "BLTE Wallet will only be released through verified App Store, Google Play, and official GitHub checksum releases. Never enter your seed phrase into unverified third-party websites.",
    readWhitepaper: "Read White Paper Architecture",
    close: "Close"
  },
  es: {
    modalTitle: "BILLETERA BLTE",
    modalSubtitle: "Cliente oficial no custodial · Próximamente",
    badgeComingSoon: "PRÓXIMAMENTE · BILLETERA OFICIAL",
    heroTitle: "Billetera BLTE",
    heroDesc: "El cliente descentralizado y no custodial diseñado exclusivamente para el ecosistema Bitcoin Lite Edition en Solana. Cero custodia de terceros, confirmaciones en menos de un segundo y telemetría de staking integrada.",
    targetPlatforms: "Plataformas de destino (Próximamente)",
    phaseBeta: "Fase 03 Beta",
    soon: "Pronto",
    iosApp: "App iOS",
    iosDesc: "Apple App Store y TestFlight",
    androidApp: "APK Android",
    androidDesc: "Google Play y APK directa",
    browserExt: "Extensión del navegador",
    browserDesc: "Chrome, Brave y Edge",
    downloadSoon: "Descargar · Próximamente",
    waitlistTitle: "Registro en lista de espera por correo",
    earlyAccess: "Acceso temprano",
    registeredSuccess: "¡Estás registrado en la lista de espera de BLTE Wallet!",
    waitlistPriority: "Prioridad en lista",
    betaAccess: "Acceso Beta",
    confirmedFor: "Confirmación reservada para",
    bonusDesc: "Recibirás un enlace de descarga exclusivo y una bonificación de bienvenida con cero comisiones cuando se lance la versión beta.",
    registerAnother: "Registrar otro correo o dispositivo",
    waitlistFormDesc: "Únete a la lista de espera para recibir notificaciones instantáneas y enlaces de descarga directa en cuanto se lance la billetera BLTE.",
    selectDevice: "Selecciona tu dispositivo principal:",
    ios: "iOS",
    android: "Android",
    browser: "Navegador",
    emailPlaceholder: "Introduce tu correo electrónico",
    registering: "Registrando...",
    joinWaitlist: "Unirse a la lista de espera",
    errorValidEmail: "Por favor, introduce un correo electrónico válido.",
    prevRegistered: "Registrado previamente en este dispositivo:",
    speedTitle: "Velocidad sub-segundo",
    speedDesc: "Impulsado por los tiempos de bloque de 400 ms de Solana y tarifas de una fracción de centavo.",
    custodyTitle: "No custodial",
    custodyDesc: "Tus claves, tus criptos. Protección biométrica de hardware local en el dispositivo.",
    stakingTitle: "Staking en 1 toque",
    stakingDesc: "Rendimiento de staking del protocolo del 11.61% integrado directamente en tu billetera.",
    securityTitle: "Aviso de seguridad:",
    securityDesc: "La Billetera BLTE solo se distribuirá a través de App Store, Google Play y versiones verificadas de GitHub. Nunca introduzcas tu frase semilla en sitios web no verificados.",
    readWhitepaper: "Leer arquitectura en el White Paper",
    close: "Cerrar"
  },
  fr: {
    modalTitle: "PORTEFEUILLE BLTE",
    modalSubtitle: "Client officiel non-dépositaire · Bientôt disponible",
    badgeComingSoon: "BIENTÔT DISPONIBLE · PORTEFEUILLE OFFICIEL",
    heroTitle: "Portefeuille BLTE",
    heroDesc: "Le client décentralisé et non-dépositaire conçu exclusivement pour l'écosystème Bitcoin Lite Edition sur Solana. Zéro tiers de confiance, confirmations inférieures à la seconde et télémétrie de staking intégrée.",
    targetPlatforms: "Plateformes cibles (Bientôt disponible)",
    phaseBeta: "Phase 03 Bêta",
    soon: "Bientôt",
    iosApp: "Application iOS",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "APK Android",
    androidDesc: "Google Play & APK direct",
    browserExt: "Extension de navigateur",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "Télécharger · Bientôt disponible",
    waitlistTitle: "Inscription sur liste d'attente par e-mail",
    earlyAccess: "Accès anticipé",
    registeredSuccess: "Vous êtes inscrit sur la liste d'attente du Portefeuille BLTE !",
    waitlistPriority: "Priorité liste d'attente",
    betaAccess: "Accès Bêta",
    confirmedFor: "Confirmation réservée pour",
    bonusDesc: "Vous recevrez un lien de téléchargement exclusif et un bonus de bienvenue sans frais dès la sortie de la version bêta.",
    registerAnother: "Inscrire une autre adresse e-mail ou appareil",
    waitlistFormDesc: "Rejoignez la liste d'attente pour recevoir des notifications immédiates et des liens de téléchargement dès la publication du portefeuille BLTE.",
    selectDevice: "Sélectionnez votre appareil principal :",
    ios: "iOS",
    android: "Android",
    browser: "Navigateur",
    emailPlaceholder: "Entrez votre adresse e-mail",
    registering: "Inscription en cours...",
    joinWaitlist: "Rejoindre la liste d'attente",
    errorValidEmail: "Veuillez saisir une adresse e-mail valide.",
    prevRegistered: "Précédemment enregistré sur cet appareil :",
    speedTitle: "Vitesse sub-seconde",
    speedDesc: "Propulsé par les blocs de 400 ms de Solana et des frais inférieurs à un centime.",
    custodyTitle: "Non-dépositaire",
    custodyDesc: "Vos clés, vos cryptos. Protection biométrique matérielle sécurisée localement.",
    stakingTitle: "Staking en 1 clic",
    stakingDesc: "Rendement de staking de 11.61% directement intégré à votre portefeuille.",
    securityTitle: "Avis de sécurité :",
    securityDesc: "Le portefeuille BLTE ne sera distribué que via l'App Store, Google Play et les versions officielles de GitHub. Ne saisissez jamais votre phrase de récupération sur des sites tiers.",
    readWhitepaper: "Lire l'architecture du Livre Blanc",
    close: "Fermer"
  },
  de: {
    modalTitle: "BLTE WALLET",
    modalSubtitle: "Offizieller Non-Custodial Client · Demnächst verfügbar",
    badgeComingSoon: "DEMNÄCHST · OFFIZIELLES WALLET",
    heroTitle: "BLTE Wallet",
    heroDesc: "Der dedizierte, dezentrale Non-Custodial-Client für das Bitcoin Lite Edition Ökosystem auf Solana. Keine Drittverwahrung, Bestätigungen unter einer Sekunde und integriertes Staking.",
    targetPlatforms: "Zielplattformen (Demnächst verfügbar)",
    phaseBeta: "Phase 03 Beta",
    soon: "Bald",
    iosApp: "iOS App",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play & Direkter APK-Download",
    browserExt: "Browser-Erweiterung",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "Herunterladen · Demnächst",
    waitlistTitle: "Wartelisten-E-Mail-Registrierung",
    earlyAccess: "Frühzeitiger Zugang",
    registeredSuccess: "Sie sind auf der BLTE Wallet-Warteliste eingetragen!",
    waitlistPriority: "Wartelisten-Priorität",
    betaAccess: "Beta-Zugang",
    confirmedFor: "Bestätigung reserviert für",
    bonusDesc: "Sie erhalten einen exklusiven Download-Link und einen gebührenfreien Willkommensbonus, sobald die Beta veröffentlicht wird.",
    registerAnother: "Weitere E-Mail oder Plattform registrieren",
    waitlistFormDesc: "Treten Sie der Warteliste bei, um sofort benachrichtigt zu werden und Download-Links zu erhalten, sobald das BLTE Wallet bereitsteht.",
    selectDevice: "Wählen Sie Ihr primäres Gerät:",
    ios: "iOS",
    android: "Android",
    browser: "Browser",
    emailPlaceholder: "E-Mail-Adresse eingeben",
    registering: "Wird registriert...",
    joinWaitlist: "Auf Warteliste setzen",
    errorValidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    prevRegistered: "Zuvor auf diesem Gerät registriert:",
    speedTitle: "Sekundenschnelle Transaktionen",
    speedDesc: "Angetrieben von Solanas 400ms Blockzeiten und Bruchteilen eines Cents an Gebühren.",
    custodyTitle: "Vollständig Non-Custodial",
    custodyDesc: "Ihre Schlüssel, Ihre Krypto. Lokale biometrische Hardware-Sicherheit auf Ihrem Gerät.",
    stakingTitle: "1-Klick Staking",
    stakingDesc: "Integrierte 11.61% Protokoll-Staking-Rendite direkt in Ihrem Wallet.",
    securityTitle: "Sicherheitshinweis:",
    securityDesc: "Das BLTE Wallet wird nur über geprüfte App Store-, Google Play- und offizielle GitHub-Releases veröffentlicht. Geben Sie niemals Ihre Seed-Phrase auf Drittanbieter-Websites ein.",
    readWhitepaper: "Whitepaper-Architektur lesen",
    close: "Schließen"
  },
  ja: {
    modalTitle: "BLTE ウォレット",
    modalSubtitle: "公式非カストディアルクライアント · 近日公開",
    badgeComingSoon: "近日公開 · 公式ウォレット",
    heroTitle: "BLTE ウォレット",
    heroDesc: "Solana上のBitcoin Lite Editionエコシステム専用に設計された非カストディアル分散型クライアント。第三者預託ゼロ、1秒未満の高速承認、ウォレット内ステーキング機能。",
    targetPlatforms: "対応プラットフォーム（近日公開）",
    phaseBeta: "フェーズ03 ベータ",
    soon: "近日",
    iosApp: "iOS アプリ",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play & 直接ダウンロード",
    browserExt: "ブラウザ拡張機能",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "ダウンロード · 近日公開",
    waitlistTitle: "ウェイティングリスト登録（メール）",
    earlyAccess: "先行アクセス",
    registeredSuccess: "BLTEウォレットのウェイティングリストに登録されました！",
    waitlistPriority: "ウェイティングリスト優先度",
    betaAccess: "ベータアクセス",
    confirmedFor: "登録完了:",
    bonusDesc: "ベータ版が公開され次第、専用のダウンロードリンクとウェルカムボーナスをお届けします。",
    registerAnother: "別のメールアドレスまたはデバイスを登録",
    waitlistFormDesc: "ウェイティングリストに参加して、BLTEウォレットの公開と同時にダウンロードリンクを受け取りましょう。",
    selectDevice: "利用予定のデバイスを選択:",
    ios: "iOS",
    android: "Android",
    browser: "ブラウザ",
    emailPlaceholder: "メールアドレスを入力",
    registering: "登録中...",
    joinWaitlist: "ウェイティングリストに参加",
    errorValidEmail: "有効なメールアドレスを入力してください。",
    prevRegistered: "このデバイスで登録済みのメール:",
    speedTitle: "1秒未満の高速処理",
    speedDesc: "Solanaの400msブロック時間と極小の手数料によって駆動。",
    custodyTitle: "非カストディアル",
    custodyDesc: "秘密鍵はご自身で管理。端末内の生体認証とセキュアエンクレーブで保護。",
    stakingTitle: "ワンタップ・ステーキング",
    stakingDesc: "年利11.61%のプロトコルステーキング利回りをウォレット内で直接獲得。",
    securityTitle: "セキュリティに関する注意:",
    securityDesc: "BLTEウォレットは公式のApp Store、Google Play、公式GitHubでのみ配布されます。未検証のウェブサイトにシードフレーズを入力しないでください。",
    readWhitepaper: "ホワイトペーパーで仕様を確認",
    close: "閉じる"
  },
  'zh-CN': {
    modalTitle: "BLTE 钱包",
    modalSubtitle: "官方非托管客户端 · 即将推出",
    badgeComingSoon: "即将推出 · 官方钱包",
    heroTitle: "BLTE 钱包",
    heroDesc: "专为 Solana 上的 Bitcoin Lite Edition 生态系统打造的非托管去中心化客户端。无第三方托管、亚秒级极速确认、内置质押收益。",
    targetPlatforms: "适配平台（即将发布）",
    phaseBeta: "Phase 03 测试版",
    soon: "即将推出",
    iosApp: "iOS 应用",
    iosDesc: "Apple App Store 与 TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play 与直接安装包",
    browserExt: "浏览器扩展插件",
    browserDesc: "Chrome、Brave 与 Edge",
    downloadSoon: "下载 · 即将推出",
    waitlistTitle: "候补名单邮箱登记",
    earlyAccess: "早期优先资格",
    registeredSuccess: "您已成功加入 BLTE 钱包候补名单！",
    waitlistPriority: "排队优先级",
    betaAccess: "测试版资格",
    confirmedFor: "确认登记邮箱：",
    bonusDesc: "公开测试版发布后，您将第一时间收到独家下载链接和零燃料费新手福利。",
    registerAnother: "登记其他邮箱或设备",
    waitlistFormDesc: "加入候补名单，在 BLTE 钱包发布的第一时间获取下载通道与安装通知。",
    selectDevice: "选择您的主要设备：",
    ios: "iOS",
    android: "Android",
    browser: "浏览器插件",
    emailPlaceholder: "输入您的电子邮箱",
    registering: "正在登记...",
    joinWaitlist: "加入候补名单",
    errorValidEmail: "请输入有效的电子邮箱地址。",
    prevRegistered: "此设备已登记邮箱：",
    speedTitle: "亚秒级极速",
    speedDesc: "依托 Solana 400 毫秒区块确认时间与低至微美分的网络费用。",
    custodyTitle: "自主非托管",
    custodyDesc: "私钥即资产。设备本地硬件级生物识别安全隔离区严密防护。",
    stakingTitle: "一键质押",
    stakingDesc: "钱包内部署 11.61% 原生质押年化收益，一键便捷参与。",
    securityTitle: "安全警示：",
    securityDesc: "BLTE 钱包仅通过官方 App Store、Google Play 和官方 GitHub 校验发布。切勿在未经认证的网站输入助记词。",
    readWhitepaper: "阅读白皮书架构",
    close: "关闭"
  },
  'zh-TW': {
    modalTitle: "BLTE 錢包",
    modalSubtitle: "官方非託管客戶端 · 即將推出",
    badgeComingSoon: "即將推出 · 官方錢包",
    heroTitle: "BLTE 錢包",
    heroDesc: "專為 Solana 上的 Bitcoin Lite Edition 生態系統打造的非託管去中心化客戶端。無第三方託管、亞秒級極速確認、內建質押收益。",
    targetPlatforms: "適配平台（即將發布）",
    phaseBeta: "Phase 03 測試版",
    soon: "即將推出",
    iosApp: "iOS 應用",
    iosDesc: "Apple App Store 與 TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play 與直接安裝檔",
    browserExt: "瀏覽器擴充功能",
    browserDesc: "Chrome、Brave 與 Edge",
    downloadSoon: "下載 · 即將推出",
    waitlistTitle: "候補名單電子信箱登記",
    earlyAccess: "早期優先資格",
    registeredSuccess: "您已成功加入 BLTE 錢包候補名單！",
    waitlistPriority: "排隊優先級",
    betaAccess: "測試版資格",
    confirmedFor: "確認登記信箱：",
    bonusDesc: "公開測試版發布後，您將第一時間收到獨家下載連結和零手續費新手禮遇。",
    registerAnother: "登記其他電子信箱或設備",
    waitlistFormDesc: "加入候補名單，在 BLTE 錢包發布的第一時間獲取下載通道與安裝通知。",
    selectDevice: "選擇您的主要設備：",
    ios: "iOS",
    android: "Android",
    browser: "瀏覽器外掛",
    emailPlaceholder: "輸入您的電子信箱",
    registering: "正在登記...",
    joinWaitlist: "加入候補名單",
    errorValidEmail: "請輸入有效的電子信箱地址。",
    prevRegistered: "此設備已登記信箱：",
    speedTitle: "亞秒級極速",
    speedDesc: "依託 Solana 400 毫秒區塊確認時間與低至微美分的網路費用。",
    custodyTitle: "自主非託管",
    custodyDesc: "私鑰即資產。設備本地硬體級生物識別安全隔離區嚴密防護。",
    stakingTitle: "一鍵質押",
    stakingDesc: "錢包內部署 11.61% 原生質押年化收益，一鍵便捷參與。",
    securityTitle: "安全警示：",
    securityDesc: "BLTE 錢包僅通過官方 App Store、Google Play 和官方 GitHub 校驗發布。切勿在未經認證的網站輸入助記詞。",
    readWhitepaper: "閱讀白皮書架構",
    close: "關閉"
  },
  'pt-PT': {
    modalTitle: "CARTEIRA BLTE",
    modalSubtitle: "Cliente oficial não custodial · Em breve",
    badgeComingSoon: "EM BREVE · CARTEIRA OFICIAL",
    heroTitle: "Carteira BLTE",
    heroDesc: "O cliente descentralizado e não custodial desenvolvido exclusivamente para o ecossistema Bitcoin Lite Edition em Solana. Zero custódia de terceiros, confirmações em menos de um segundo e telemetria de staking integrada.",
    targetPlatforms: "Plataformas Alvo (Em breve)",
    phaseBeta: "Fase 03 Beta",
    soon: "Em breve",
    iosApp: "App iOS",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "APK Android",
    androidDesc: "Google Play & Download direto",
    browserExt: "Extensão de Navegador",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "Transferir · Em breve",
    waitlistTitle: "Registo na Lista de Espera por Email",
    earlyAccess: "Acesso Antecipado",
    registeredSuccess: "Está registado na lista de espera da Carteira BLTE!",
    waitlistPriority: "Prioridade na Lista",
    betaAccess: "Acesso Beta",
    confirmedFor: "Confirmação reservada para",
    bonusDesc: "Receberá um link de transferência exclusivo e bónus de boas-vindas quando a versão beta for lançada.",
    registerAnother: "Registar outro email ou dispositivo",
    waitlistFormDesc: "Junte-se à lista de espera para receber notificações instantâneas e links de transferência assim que a carteira BLTE for disponibilizada.",
    selectDevice: "Selecione o seu dispositivo principal:",
    ios: "iOS",
    android: "Android",
    browser: "Navegador",
    emailPlaceholder: "Introduza o seu email",
    registering: "A registar...",
    joinWaitlist: "Entrar na Lista de Espera",
    errorValidEmail: "Por favor, introduza um endereço de email válido.",
    prevRegistered: "Anteriormente registado neste dispositivo:",
    speedTitle: "Velocidade Sub-Segundo",
    speedDesc: "Impulsionado pelos tempos de bloco de 400ms de Solana e taxas de fração de cêntimo.",
    custodyTitle: "Não Custodial",
    custodyDesc: "As suas chaves, as suas criptomoedas. Proteção biométrica de hardware no próprio dispositivo.",
    stakingTitle: "Staking com 1 Toque",
    stakingDesc: "Rendimento de staking do protocolo de 11.61% integrado na sua carteira.",
    securityTitle: "Aviso de Segurança:",
    securityDesc: "A Carteira BLTE só será lançada através da App Store, Google Play e releases oficiais do GitHub. Nunca introduza a sua seed phrase em websites de terceiros.",
    readWhitepaper: "Ler Arquitetura no White Paper",
    close: "Fechar"
  },
  no: {
    modalTitle: "BLTE LOMMEBOK",
    modalSubtitle: "Offisiell ikke-forvarende klient · Kommer snart",
    badgeComingSoon: "KOMMER SNART · OFFISIELL LOMMEBOK",
    heroTitle: "BLTE Lommebok",
    heroDesc: "Den dedikerte, ikke-forvarende desentraliserte klienten utviklet eksklusivt for Bitcoin Lite Edition-økosystemet på Solana. Null tredjeparts forvaring, bekreftelser under sekundet og innebygd staking.",
    targetPlatforms: "Målplattformer (Kommer snart)",
    phaseBeta: "Fase 03 Beta",
    soon: "Snart",
    iosApp: "iOS App",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play & Direkte APK",
    browserExt: "Nettleserutvidelse",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "Last ned · Kommer snart",
    waitlistTitle: "E-postregistrering for venteliste",
    earlyAccess: "Tidlig tilgang",
    registeredSuccess: "Du er registrert på ventelisten for BLTE-lommeboken!",
    waitlistPriority: "Venteliste-prioritet",
    betaAccess: "Beta-tilgang",
    confirmedFor: "Bekreftelse reservert for",
    bonusDesc: "Du vil motta en eksklusiv nedlastingslenke og gebyrfri velkomstbonus så snart betaversjonen er lansert.",
    registerAnother: "Registrer en annen e-post eller enhet",
    waitlistFormDesc: "Bli med på ventelisten for å motta umiddelbar varsling og direkte nedlastingslenker så snart BLTE-lommeboken er klar.",
    selectDevice: "Velg din primære enhet:",
    ios: "iOS",
    android: "Android",
    browser: "Nettleser",
    emailPlaceholder: "Skriv inn din e-postadresse",
    registering: "Registrerer...",
    joinWaitlist: "Bli med på ventelisten",
    errorValidEmail: "Vennligst oppgi en gyldig e-postadresse.",
    prevRegistered: "Tidligere registrert på denne enheten:",
    speedTitle: "Lynrask hastighet",
    speedDesc: "Drevet av Solanas 400ms blokktider og minimale gebyrer.",
    custodyTitle: "Ikke-forvarende",
    custodyDesc: "Dine nøkler, dine midler. Maskinvarebasert biometrisk beskyttelse lokalt på enheten.",
    stakingTitle: "1-trykks staking",
    stakingDesc: "Innebygd 11.61% protokollrente direkte i lommeboken.",
    securityTitle: "Sikkerhetsadvarsel:",
    securityDesc: "BLTE-lommeboken vil kun distribueres via verifiserte App Store, Google Play og offisielle GitHub-utgivelser. Oppgi aldri din gjenopprettingsfrase på ukjente nettsider.",
    readWhitepaper: "Les hvitboken om arkitektur",
    close: "Lukk"
  },
  th: {
    modalTitle: "กระเป๋าเงิน BLTE",
    modalSubtitle: "ไคลเอนต์แบบ Non-Custodial อย่างเป็นทางการ · เร็วๆ นี้",
    badgeComingSoon: "เร็วๆ นี้ · กระเป๋าเงินอย่างเป็นทางการ",
    heroTitle: "กระเป๋าเงิน BLTE",
    heroDesc: "ไคลเอนต์แบบกระจายศูนย์ที่ปลอดภัยสำหรับระบบนิเวศ Bitcoin Lite Edition บน Solana ไม่มีการควบคุมโดยบุคคลที่สาม ยืนยันธุรกรรมในเสี้ยววินาที และมีระบบสเตกในตัว",
    targetPlatforms: "แพลตฟอร์มที่รองรับ (เร็วๆ นี้)",
    phaseBeta: "เฟส 03 เบต้า",
    soon: "เร็วๆ นี้",
    iosApp: "แอป iOS",
    iosDesc: "Apple App Store & TestFlight",
    androidApp: "Android APK",
    androidDesc: "Google Play และดาวน์โหลด APK โดยตรง",
    browserExt: "ส่วนขยายเบราว์เซอร์",
    browserDesc: "Chrome, Brave & Edge",
    downloadSoon: "ดาวน์โหลด · เร็วๆ นี้",
    waitlistTitle: "ลงทะเบียนอีเมลเพื่อรอคิว",
    earlyAccess: "สิทธิ์เข้าถึงก่อนใคร",
    registeredSuccess: "คุณได้ลงทะเบียนในรายชื่อรอรับกระเป๋าเงิน BLTE แล้ว!",
    waitlistPriority: "ลำดับคิว",
    betaAccess: "สิทธิ์เข้าถึงเบต้า",
    confirmedFor: "ยืนยันสิทธิ์สำหรับ",
    bonusDesc: "คุณจะได้รับลิงก์ดาวน์โหลดพิเศษและโบนัสต้อนรับฟรีค่าธรรมเนียมทันทีที่เบต้าเปิดตัว",
    registerAnother: "ลงทะเบียนอีเมลหรืออุปกรณ์อื่น",
    waitlistFormDesc: "เข้าร่วมรายชื่อรอเพื่อรับการแจ้งเตือนทันทีและลิงก์ดาวน์โหลดโดยตรงเมื่อเปิดตัวกระเป๋าเงิน BLTE",
    selectDevice: "เลือกอุปกรณ์หลักของคุณ:",
    ios: "iOS",
    android: "Android",
    browser: "เบราว์เซอร์",
    emailPlaceholder: "กรอกที่อยู่อีเมลของคุณ",
    registering: "กำลังลงทะเบียน...",
    joinWaitlist: "เข้าร่วมรายชื่อรอ",
    errorValidEmail: "กรุณากรอกที่อยู่อีเมลที่ถูกต้อง",
    prevRegistered: "ลงทะเบียนบนอุปกรณ์นี้แล้ว:",
    speedTitle: "ความเร็วในเสี้ยววินาที",
    speedDesc: "ขับเคลื่อนด้วยเวลาบล็อก 400ms ของ Solana พร้อมค่าธรรมเนียมที่ต่ำมาก",
    custodyTitle: "ดูแลกุญแจด้วยตนเอง (Non-Custodial)",
    custodyDesc: "กุญแจของคุณ ทรัพย์สินของคุณ ปกป้องด้วยระบบไบโอเมตริกระดับฮาร์ดแวร์บนอุปกรณ์",
    stakingTitle: "สเตกได้ใน 1 คลิก",
    stakingDesc: "รับผลตอบแทนการสเตก 11.61% ต่อปีได้โดยตรงภายในกระเป๋าเงิน",
    securityTitle: "คำเตือนด้านความปลอดภัย:",
    securityDesc: "กระเป๋าเงิน BLTE จะเผยแพร่ผ่าน App Store, Google Play และ GitHub อย่างเป็นทางการเท่านั้น อย่ากรอก seed phrase บนเว็บไซต์ที่ไม่ได้รับการตรวจสอบ",
    readWhitepaper: "อ่านสถาปัตยกรรมใน White Paper",
    close: "ปิด"
  }
};

export const BlteWalletModal: React.FC<BlteWalletModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitePaper
}) => {
  const { currentLanguage, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'ios' | 'android' | 'extension'>('ios');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [waitlistNumber, setWaitlistNumber] = useState<number>(418);

  // Active translation dictionary with English fallback
  const w = WALLET_TRANSLATIONS[currentLanguage] || WALLET_TRANSLATIONS.en;

  // Load existing waitlist email if previously saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WAITLIST_STORAGE_KEY);
      if (saved) {
        const list = JSON.parse(saved);
        if (Array.isArray(list) && list.length > 0) {
          setRegisteredEmail(list[list.length - 1]);
          setWaitlistNumber(418 + list.length);
        }
      }
      const savedPlatform = localStorage.getItem(WAITLIST_PLATFORM_KEY);
      if (savedPlatform === 'ios' || savedPlatform === 'android' || savedPlatform === 'extension') {
        setPlatform(savedPlatform);
      }
    } catch {
      // ignore json errors
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setErrorMessage(w.errorValidEmail);
      return;
    }

    setIsSubmitting(true);

    try {
      let existing: string[] = [];
      const saved = localStorage.getItem(WAITLIST_STORAGE_KEY);
      if (saved) {
        existing = JSON.parse(saved);
      }
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
        localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(existing));
      }
      localStorage.setItem(WAITLIST_PLATFORM_KEY, platform);
      setRegisteredEmail(trimmed);
      setWaitlistNumber(418 + existing.length);
      setIsSuccess(true);
      setEmail('');
    } catch {
      setRegisteredEmail(trimmed);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={w.modalTitle}
      subtitle={w.modalSubtitle}
      maxWidthClass="max-w-xl w-full"
      ariaLabelledBy="blte-wallet-modal-title"
      footer={
        <div className="px-5 py-3.5 bg-[#FCFCFC] dark:bg-[#121215] border-t border-[#E5E5E5] dark:border-[#222228] flex flex-wrap items-center justify-between gap-3">
          {onOpenWhitePaper && (
            <button
              onClick={() => {
                onClose();
                onOpenWhitePaper();
              }}
              className="text-xs font-bold text-[#B8661B] hover:text-[#964E10] dark:text-[#EAB308] flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{w.readWhitepaper}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer ml-auto"
          >
            {w.close || t.common?.close || 'Close'}
          </button>
        </div>
      }
    >
      <div className="p-5 sm:p-7 space-y-6">
        {/* Top Header & Official Coming Soon Announcement */}
        <div className="text-center space-y-3">
          {/* Prominent Coming Soon Pulse Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 text-[#B8661B] dark:text-[#EAB308] border border-[#B8661B]/30 dark:border-[#EAB308]/30 text-xs font-mono font-black uppercase tracking-widest shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B8661B] dark:bg-[#EAB308]"></span>
            </span>
            <span>{w.badgeComingSoon}</span>
          </div>

          <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-br from-[#FAF5EF] to-[#F3E7D3] dark:from-[#201810] dark:to-[#120E08] border border-[#E9C9A5] dark:border-[#B8661B]/40 flex items-center justify-center mx-auto text-[#B8661B] dark:text-[#EAB308] shadow-md">
            <Wallet className="w-8 h-8 stroke-[2]" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#B8661B] text-white flex items-center justify-center shadow-xs">
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
            {w.heroTitle}
          </h3>

          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
            {w.heroDesc}
          </p>
        </div>

        {/* Download Release Channels & Coming Soon Cards */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#B8661B] dark:text-[#EAB308]" />
              <span>{w.targetPlatforms}</span>
            </span>
            <span className="text-[11px] text-[#B8661B] dark:text-[#EAB308]">{w.phaseBeta}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* iOS */}
            <div className="p-3.5 rounded-[18px] bg-[#FAF8F5] dark:bg-[#15151C] border border-[#EAE6DF] dark:border-[#22222E] flex flex-col justify-between text-left group hover:border-[#B8661B]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Smartphone className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308]" />
                <span className="text-[10px] font-mono font-bold uppercase text-[#B8661B] dark:text-[#EAB308] bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{w.soon}</span>
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#080808] dark:text-white">{w.iosApp}</div>
                <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{w.iosDesc}</div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0ECE1] dark:border-[#202028] flex items-center gap-1 text-[11px] font-mono font-semibold text-[#B8661B] dark:text-[#EAB308]">
                <Download className="w-3 h-3" />
                <span>{w.downloadSoon}</span>
              </div>
            </div>

            {/* Android */}
            <div className="p-3.5 rounded-[18px] bg-[#FAF8F5] dark:bg-[#15151C] border border-[#EAE6DF] dark:border-[#22222E] flex flex-col justify-between text-left group hover:border-[#B8661B]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Smartphone className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308]" />
                <span className="text-[10px] font-mono font-bold uppercase text-[#B8661B] dark:text-[#EAB308] bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{w.soon}</span>
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#080808] dark:text-white">{w.androidApp}</div>
                <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{w.androidDesc}</div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0ECE1] dark:border-[#202028] flex items-center gap-1 text-[11px] font-mono font-semibold text-[#B8661B] dark:text-[#EAB308]">
                <Download className="w-3 h-3" />
                <span>{w.downloadSoon}</span>
              </div>
            </div>

            {/* Browser Extension */}
            <div className="p-3.5 rounded-[18px] bg-[#FAF8F5] dark:bg-[#15151C] border border-[#EAE6DF] dark:border-[#22222E] flex flex-col justify-between text-left group hover:border-[#B8661B]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308]" />
                <span className="text-[10px] font-mono font-bold uppercase text-[#B8661B] dark:text-[#EAB308] bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{w.soon}</span>
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#080808] dark:text-white">{w.browserExt}</div>
                <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{w.browserDesc}</div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0ECE1] dark:border-[#202028] flex items-center gap-1 text-[11px] font-mono font-semibold text-[#B8661B] dark:text-[#EAB308]">
                <Download className="w-3 h-3" />
                <span>{w.downloadSoon}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Registration for Waitlist ("wait listening") */}
        <div className="p-5 sm:p-6 rounded-[22px] bg-gradient-to-br from-[#FAF5EF]/95 via-[#FFFDF9] to-[#F5EADB]/40 dark:from-[#18130E] dark:via-[#141419] dark:to-[#1C1712] border border-[#E9C9A5]/80 dark:border-[#B8661B]/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-wider">
              <Bell className="w-4 h-4" />
              <span>{w.waitlistTitle}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase">
              {w.earlyAccess}
            </span>
          </div>

          {isSuccess ? (
            <div className="p-4 sm:p-5 rounded-[18px] bg-[#ECFDF5] dark:bg-[#064E3B]/25 border border-[#10B981]/30 text-left space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#047857] dark:text-[#34D399]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{w.registeredSuccess}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#047857] dark:text-[#34D399] font-mono text-xs font-bold">
                <span>{w.waitlistPriority}: #{waitlistNumber}</span>
                <span>·</span>
                <span className="capitalize">{platform} {w.betaAccess}</span>
              </div>
              <p className="text-xs text-[#065F46] dark:text-[#A7F3D0] leading-relaxed">
                {w.confirmedFor} <strong className="font-mono text-[#047857] dark:text-[#34D399]">{registeredEmail}</strong>. {w.bonusDesc}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-semibold text-[#047857] dark:text-[#34D399] underline underline-offset-2 hover:opacity-80 cursor-pointer"
                >
                  {w.registerAnother}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  {w.waitlistFormDesc}
                </p>
              </div>

              {/* Platform Selector Buttons */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                  {w.selectDevice}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlatform('ios')}
                    className={`py-2 px-3 rounded-[12px] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      platform === 'ios'
                        ? 'bg-[#B8661B] text-white dark:bg-[#EAB308] dark:text-[#080808] shadow-xs'
                        : 'bg-white dark:bg-[#121216] border border-[#E5E5E5] dark:border-[#262630] text-[#475569] dark:text-[#CBD5E1] hover:border-[#B8661B]/40'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{w.ios}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatform('android')}
                    className={`py-2 px-3 rounded-[12px] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      platform === 'android'
                        ? 'bg-[#B8661B] text-white dark:bg-[#EAB308] dark:text-[#080808] shadow-xs'
                        : 'bg-white dark:bg-[#121216] border border-[#E5E5E5] dark:border-[#262630] text-[#475569] dark:text-[#CBD5E1] hover:border-[#B8661B]/40'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{w.android}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatform('extension')}
                    className={`py-2 px-3 rounded-[12px] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      platform === 'extension'
                        ? 'bg-[#B8661B] text-white dark:bg-[#EAB308] dark:text-[#080808] shadow-xs'
                        : 'bg-white dark:bg-[#121216] border border-[#E5E5E5] dark:border-[#262630] text-[#475569] dark:text-[#CBD5E1] hover:border-[#B8661B]/40'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{w.browser}</span>
                  </button>
                </div>
              </div>

              {/* Email Input Field & Submit Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={w.emailPlaceholder}
                    className="w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm rounded-[14px] bg-white dark:bg-[#101015] border border-[#D8D1C4] dark:border-[#2C2C36] focus:border-[#B8661B] dark:focus:border-[#EAB308] focus:outline-none text-[#080808] dark:text-white placeholder-[#94A3B8] transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-[14px] bg-[#111111] dark:bg-[#B8661B] hover:bg-[#B8661B] dark:hover:bg-[#964E10] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? w.registering : w.joinWaitlist}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-[#DC2626] dark:text-[#F87171]">{errorMessage}</p>
              )}
            </form>
          )}

          {registeredEmail && !isSuccess && (
            <div className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] flex items-center justify-between pt-1 border-t border-[#F0ECE1] dark:border-[#202028]">
              <span>{w.prevRegistered}</span>
              <span className="text-[#B8661B] dark:text-[#EAB308] font-bold">{registeredEmail}</span>
            </div>
          )}
        </div>

        {/* Core Architecture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
          <div className="p-3 rounded-[16px] bg-[#FAF8F5] dark:bg-[#14141A] border border-[#EAE6DF] dark:border-[#22222E]">
            <Zap className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308] mb-1.5" />
            <div className="text-xs font-bold text-[#080808] dark:text-white">{w.speedTitle}</div>
            <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-tight mt-0.5">
              {w.speedDesc}
            </div>
          </div>

          <div className="p-3 rounded-[16px] bg-[#FAF8F5] dark:bg-[#14141A] border border-[#EAE6DF] dark:border-[#22222E]">
            <Lock className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80] mb-1.5" />
            <div className="text-xs font-bold text-[#080808] dark:text-white">{w.custodyTitle}</div>
            <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-tight mt-0.5">
              {w.custodyDesc}
            </div>
          </div>

          <div className="p-3 rounded-[16px] bg-[#FAF8F5] dark:bg-[#14141A] border border-[#EAE6DF] dark:border-[#22222E]">
            <Layers className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308] mb-1.5" />
            <div className="text-xs font-bold text-[#080808] dark:text-white">{w.stakingTitle}</div>
            <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-tight mt-0.5">
              {w.stakingDesc}
            </div>
          </div>
        </div>

        {/* Security & Official Advisory */}
        <div className="p-3.5 rounded-[16px] bg-[#FAF8F5] dark:bg-[#14141A] border border-[#EAE6DF] dark:border-[#22222E] flex items-start gap-3 text-left">
          <ShieldCheck className="w-4 h-4 text-[#16A34A] dark:text-[#4ADE80] shrink-0 mt-0.5" />
          <div className="text-[11px] text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            <strong className="text-[#080808] dark:text-white font-medium">{w.securityTitle} </strong>
            {w.securityDesc}
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};
