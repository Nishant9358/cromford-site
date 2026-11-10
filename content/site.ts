/**
 * All site copy lives here. Edit text in this file without touching layout.
 * Voice: plain, specific, calm. No exclamation marks, no emoji, no hype words.
 */

export type NavItem = { label: string; href: string };

export type Service = {
  number: string;
  title: string;
  description: string;
  items: string[];
};

export type Step = { number: string; title: string; text: string };

export type Principle = { label: string; text: string };

export type SocialLink = { label: "LinkedIn" | "Instagram" | "X"; href: string };

export const topicOptions = [
  "AI & automation",
  "Digital growth",
  "Custom software",
  "Not sure yet",
] as const;

export type Topic = (typeof topicOptions)[number];

export const site = {
  name: "Cromford",
  domain: "cromford.in",
  url: "https://cromford.in",
  title: "Cromford — AI automation and intelligent systems",
  description:
    "Cromford builds AI agents, automated workflows, digital growth systems and custom software that help businesses run better and grow with less friction.",
  tagline: "Where work first ran itself.",
  disciplines: "AI Automation · Digital Growth · Custom Software",
  // TODO: confirm the hello@cromford.in inbox exists and is monitored before launch.
  email: "hello@cromford.in",

  nav: [
    { label: "Solutions", href: "/#solutions" },
    { label: "Approach", href: "/#approach" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavItem[],

  headerCta: { label: "Start a conversation", href: "/#contact" },

  hero: {
    eyebrow: "AI automation · Digital systems · Software",
    headline: "Where work first ran itself.",
    subheadline:
      "We build the systems that let a business run while its people think: AI agents, automated workflows and the digital foundations underneath them.",
    primaryCta: { label: "Explore our solutions", href: "#solutions" },
    secondaryCta: { label: "Start a conversation", href: "#contact" },
    meta: "cromford.in — est. 2026",
  },

  intro: {
    eyebrow: "Why we exist",
    heading: "Technology should do more than impress. It should make things work.",
    paragraphs: [
      "Cromford brings together artificial intelligence, automation and software to solve real business problems.",
      "We remove the repetitive work, connect the systems that don't talk to each other, and build digital foundations that hold up as you grow.",
    ],
  },

  solutions: {
    eyebrow: "What we do",
    heading: "Intelligence. Systems. Growth.",
    services: [
      {
        number: "01",
        title: "AI & business automation",
        description:
          "We take repetitive work off your team's hands with practical AI agents and automated workflows.",
        items: [
          "Workflow automation",
          "AI agents for business processes",
          "Lead capture and follow-up",
          "Customer messaging (WhatsApp, email)",
          "System integrations",
        ],
      },
      {
        number: "02",
        title: "Digital growth systems",
        description:
          "We build the digital presence and lead engines that bring the right customers in.",
        items: [
          "Digital marketing strategy",
          "Social media",
          "Performance marketing",
          "Lead generation systems",
          "Brand and website development",
        ],
      },
      {
        number: "03",
        title: "Custom software",
        description:
          "We build the tools a business needs when off-the-shelf software doesn't fit.",
        items: [
          "Internal tools and dashboards",
          "Custom web applications",
          "API and system integrations",
          "AI-powered tools",
          "Process consulting",
        ],
      },
    ] satisfies Service[],
    note: "Not sure where you fit? Most projects start with a 30-minute conversation.",
    noteLink: { label: "Start a conversation", href: "#contact" },
  },

  approach: {
    eyebrow: "How we work",
    heading: "Built around problems. Designed for progress.",
    steps: [
      {
        number: "01",
        title: "Understand",
        text: "We learn how your business actually runs and where time is lost.",
      },
      {
        number: "02",
        title: "Architect",
        text: "We design the right system before writing a line of code.",
      },
      {
        number: "03",
        title: "Engineer",
        text: "We build it, test it with your team and put it to work.",
      },
      {
        number: "04",
        title: "Evolve",
        text: "We measure, improve and extend it as you grow.",
      },
    ] satisfies Step[],
  },

  philosophy: {
    heading: "Good technology is invisible when it works.",
    body: "The best systems simplify. They remove friction, connect what was disconnected and give people room for the work that matters.",
    principles: [
      { label: "Clarity", text: "Clarity over complexity." },
      { label: "Execution", text: "Execution over noise." },
      { label: "Usefulness", text: "Useful innovation over technology for its own sake." },
    ] satisfies Principle[],
    nameStory: {
      title: "Why Cromford",
      year: "1771",
      text: "Cromford Mill, built in 1771 in Derbyshire, England, is widely called the birthplace of the factory system. It was the first place where machines did the work at scale while people designed the system around them. We do the same thing with software.",
    },
  },

  future: {
    eyebrow: "What's next",
    heading: "We're building beyond today.",
    body: "Cromford starts by solving real problems for real businesses. Our longer-term ambition is to build our own products and platforms that make intelligent technology accessible and useful.",
    closing: "A company built to evolve.",
  },

  contact: {
    eyebrow: "Contact",
    heading: "Have a problem worth solving?",
    text: "Tell us what's slowing your business down. We'll reply within two working days.",
    emailLabel: "Prefer email? Write to",
    privacyNote: "We only use your details to reply to you.",
    privacyLink: { label: "Privacy policy", href: "/privacy" },
    form: {
      name: { label: "Name" },
      email: { label: "Business email", helper: "We'll reply to this address." },
      company: { label: "Company" },
      topic: {
        label: "What do you need help with?",
        placeholder: "Choose one",
        options: topicOptions,
      },
      message: {
        label: "Message",
        helper: "A few sentences is enough. At least 20 characters.",
      },
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Message sent.",
      successText: "Thank you. We'll reply within two working days.",
      genericError: "Something went wrong and your message was not sent. Please try again, or email us.",
      rateLimited: "Too many messages from this connection. Please wait a few minutes and try again.",
      fixErrors: "Please check the highlighted fields.",
    },
  },

  footer: {
    nav: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Approach", href: "/#approach" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ] satisfies NavItem[],
    // TODO: replace the placeholder "#" links with the real social profile URLs.
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X", href: "#" },
    ] satisfies SocialLink[],
    copyright: "© 2026 Cromford. cromford.in",
  },

  // TODO: have this privacy policy reviewed before launch.
  privacy: {
    title: "Privacy policy",
    updated: "Last updated November 2026",
    intro:
      "This page explains what happens to the details you send us through the contact form on cromford.in. We keep it short because we collect very little.",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you use the contact form we receive your name, your business email address, your company name if you give it, the type of help you chose and your message.",
          "To limit spam, our server briefly holds your IP address in memory to count how many messages come from one connection. It is not written to a database and is cleared within minutes.",
          "This site does not use advertising or analytics cookies.",
        ],
      },
      {
        heading: "Why we collect it",
        paragraphs: [
          "We use your details only to read your enquiry and reply to you. We do not add you to a mailing list and we do not sell or share your details for marketing.",
        ],
      },
      {
        heading: "Where it goes",
        paragraphs: [
          "Form submissions are sent as an email to our team inbox through Resend, an email delivery service. Resend processes the message so it can be delivered. The site itself is hosted by Vercel, which may keep short-lived technical logs.",
          "We keep enquiry emails for as long as we need them to deal with your request and any work that follows from it.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask us to show you, correct or delete the details you sent us at any time. Email hello@cromford.in from the address you used and we will act on it within 30 days.",
        ],
      },
    ],
  },
};
