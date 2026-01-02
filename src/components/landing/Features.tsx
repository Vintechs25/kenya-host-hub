import { motion } from "framer-motion";
import {
  Server,
  Globe,
  Shield,
  Zap,
  Database,
  Mail,
  Upload,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: Server,
    title: "WordPress Optional",
    description:
      "One-click WordPress installation or use our file hosting for any website type.",
  },
  {
    icon: Globe,
    title: "Free SSL & Domain",
    description:
      "Secure your site with free SSL certificates. Free subdomain included.",
  },
  {
    icon: Shield,
    title: "99.9% Uptime",
    description:
      "Enterprise-grade reliability with automated backups and DDoS protection.",
  },
  {
    icon: Zap,
    title: "OpenLiteSpeed",
    description:
      "Lightning-fast hosting powered by CyberPanel and OpenLiteSpeed server.",
  },
  {
    icon: Database,
    title: "MySQL Database",
    description:
      "Full database access with phpMyAdmin for complete data control.",
  },
  {
    icon: Upload,
    title: "FTP & File Manager",
    description:
      "Upload files via FTP or browser-based file manager. Easy access.",
  },
  {
    icon: CreditCard,
    title: "M-Pesa Payments",
    description:
      "Pay with M-Pesa, cards, or mobile money. Instant activation on payment.",
  },
  {
    icon: Mail,
    title: "Email Hosting",
    description:
      "Professional email with your domain. Webmail access included.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed Online</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful hosting features designed for Kenyan businesses and developers.
            Get started in minutes.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
