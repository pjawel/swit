import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MapPin, Facebook, Clock, Utensils, Heart, Gift, Users, Menu, X } from "lucide-react";

const IMAGES = [
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/615435702_864464289706006_8858293835727325583_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=JJuq6ewd4FEQ7kNvwG9uCGN&_nc_oc=AdopIBKl0pbBUjfJ7l-6zIjR8PXu0A8Wym7aObClkhtjS-vebWdCQhJfmVf3vm2aSMg&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=kCax_xPDAGJbcZXQdzMf3g&_nc_ss=7b2a8&oh=00_Af5mgP8YKWKjSw5WgRwtgpvIYw9ZjHMLbeEYgW12FulkVQ&oe=69FB7E9E",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/614592404_864464283039340_725089425742570393_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=4Ctm5lCuSCwQ7kNvwFOfwGc&_nc_oc=Adqhwt_pbDXcSlmFIi8vUOZtikoEGFMlWSQ96WeoX7_xMmOEFlaSX4xNsI3yXcAsDKU&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=DWeCPhG4mWf5d_OcidIlQg&_nc_ss=7b2a8&oh=00_Af67Kpt3Qxh6si2kRs6fmV1yYE47gPrdAukOV-YnPJQtOA&oe=69FB7F61",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/614566724_864464263039342_1873653049103584957_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=FAIUrrJ3KG4Q7kNvwGF12yM&_nc_oc=AdplFiNzg05vfsssmj_R5_IeBRdr1DQxo0rwyxTak5uPu2XyI-SCHNfDHYN4MIBJ-Dg&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=FSLdhFBzgJMxP0zMUn27aw&_nc_ss=7b2a8&oh=00_Af5scR47cj1XRp3OmOR1TW-Dg0G2XAY7bKJsQMjrzdRl_w&oe=69FB9AFB",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/615145300_864464253039343_2110301740535323522_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=60Ql3TWZNMkQ7kNvwFakveU&_nc_oc=AdrqRV84uzOJG0Bdwcai_yInB7hDKV700Pt3upDasSerILz9PsXMfPwklx102dRrHmM&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=PZFHcu84XE_Pxiy2Ax0Lxw&_nc_ss=7b2a8&oh=00_Af5w_xEUiIDiW--yOtaxZiWOQAEZpaIuBqmMFqrMc4YWYA&oe=69FB9275",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/614853823_864464229706012_5316170887283477078_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=fYpuQ_RcES4Q7kNvwHZIRh9&_nc_oc=Adoauy45mqPgS5U05qzzhrzXC0luTko1uwAd4UEjEMWXYtamBysp5WDZMdpq1quUvSg&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=3fWwa4HXIBBksC4MQF6xPg&_nc_ss=7b2a8&oh=00_Af535KDYL9lAr7Dab4jZ4yWjJeZwiM4mkvnPt-LjbkaVtw&oe=69FB9CED",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/614563164_864464223039346_3451962467383566248_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dtijJb_12OYQ7kNvwGXtslp&_nc_oc=Adop0zqKFVKsDLXccb4eprRQVoCF_FAKjiWOhLh9CUnTQsqYQmOH1YmQze1h9L9JZPk&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=2Af5X7wdGccdz5fMRVBt_g&_nc_ss=7b2a8&oh=00_Af5O6z9x9aTeOrrP-LmDTJWZOaCIqRS-HGUb9mwBgzb1Bg&oe=69FB89AF",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/615154033_864461986372903_693369102513229174_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=oEIWMUmygmMQ7kNvwE3qhN8&_nc_oc=AdpDkHLTUWM0v_FDJ9PAqoj9LldegtqPCFhrfKbDpd5NzhQDDbdPmhXDtI61DsUgmOE&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=9_VWYGCIltj60hXCIpF7qQ&_nc_ss=7b2a8&oh=00_Af4zaHyTRSlWebhKQrl3MoCsLbXPbwTsimPFyu2h3skVDg&oe=69FB7244",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/615211068_864461953039573_7389665099229651632_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=eqlD2FRd88gQ7kNvwHCWpgy&_nc_oc=Adqvar0XdVHxWemaQQtArwZyVohsHqPuzLRptpJqYgIRZUCrhN0DnJvQj-M_IM69ElU&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=i494vc_BPqC8JvO3o7gjUg&_nc_ss=7b2a8&oh=00_Af7-klUVAtb3mGgsjhp37v0YjVFfTatqENNnsxUWmNKUcQ&oe=69FB9BA0",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/615019718_864461913039577_1795078360576377126_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=6TYHuarFTEoQ7kNvwHXyp-r&_nc_oc=AdraVQ8xDE-pagF9RsuhzKySbAzlA2hMQFCAx_uU7O-rEEW58w9Zs9BfFBgiQO_TKa4&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=a4ganRUFMyfBo_zczE4HKQ&_nc_ss=7b2a8&oh=00_Af4xvi4gAR5A2nAktBgR2STwWAFnyfqpnnYw8DpKMZrnzg&oe=69FB9E84",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/588487879_829236649895437_4637856164681200122_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=sIparA7Ias0Q7kNvwExpnUm&_nc_oc=AdqFvkPMGFyKKAEuW3B_iSc4YNH2bylbP5CX8_WfN3WeKklbl0a4eql5xFdAvig9PaM&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=lV0ZrYnTs7aaqLwfuqu2RQ&_nc_ss=7b2a8&oh=00_Af6mi-pgBrDsLZ-jkkMdnwbB6f33Lm0NQ5PwzcJdgm9VcQ&oe=69FB85EA"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#o-nas", label: "O nas" },
    { href: "#oferta", label: "Oferta" },
    { href: "#galeria", label: "Galeria" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-beige px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-3xl font-serif font-light tracking-[0.2em] uppercase text-sage">
              ŚWIT
            </div>
            <span className="text-[10px] tracking-[0.4em] font-sans text-sand -mt-1 font-bold uppercase">
              Sala Bankietowa
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-olive">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-sage transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100084273290658"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#1877F2] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide hover:shadow-lg transition-all active:scale-95"
            >
              <Facebook size={16} />
              <span className="hidden sm:inline uppercase">Odwiedź nas</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-sage hover:bg-paper rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-beige overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-6 gap-6 text-sm font-bold uppercase tracking-[0.2em] text-olive">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-sage transition-colors pb-4 border-b border-paper last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES[0]}
            alt="Sala Bankietowa Świt"
            className="w-full h-full object-cover brightness-[0.45] grayscale-[0.2]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-sage/10 mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 leading-[1.1] font-light">
              Tworzymy Twoje <br />
              <span className="italic text-beige">Niezapomniane</span> Chwile
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto tracking-wide">
              Eleganckie wnętrza, wyśmienita kuchnia i profesjonalna obsługa w samym sercu Boćków.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="#kontakt"
                className="bg-sage text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-sage/90 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Rezerwacja sali
              </a>
              <a
                href="tel:573493590"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
              >
                <Phone size={18} />
                573 493 590
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="o-nas" className="py-32 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.4em] text-sand font-bold text-xs mb-6 block">Witamy w ŚWICIE</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-sage">
              Smak tradycji i <span className="italic text-olive">elegancja</span> w każdym detalu
            </h2>
            <p className="text-lg text-earth leading-relaxed mb-6 font-sans">
              Sala Bankietowa ŚWIT to miejsce stworzone z pasji do gościnności. Zlokalizowani w Boćkach, przy ulicy Bielskiej 10, oferujemy idealne tło dla najważniejszych wydarzeń Twojego życia.
            </p>
            <p className="text-lg text-earth leading-relaxed mb-10 font-sans">
              Od kameralnych rodzinnych chrzcin i urodzin, po huczne wesela – dbamy o każdy detal, aby nasi goście czuli się wyjątkowo. Codziennie zapraszamy również na pyszne, domowe obiady.
            </p>
            <div className="flex gap-16 border-t border-beige pt-10">
              <div className="flex flex-col gap-1">
                <div className="text-4xl font-serif text-sage">Boćki</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-sand">Lokalizacja</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-4xl font-serif text-sage">Wiele lat</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-sand">Tradycji</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={IMAGES[2]}
              alt="Wnętrze sali"
              className="rounded-[40px] shadow-2xl z-10 relative aspect-[4/5] object-cover border-[12px] border-white"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-[#E8E4DD] -z-1 rounded-[40px] transform translate-x-4 translate-y-4"></div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="oferta" className="py-32 bg-[#E8E4DD]/50 px-6 border-y border-beige scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="uppercase tracking-[0.4em] text-sand font-bold text-xs mb-4 block">Usługi</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-sage italic">Nasza Oferta</h2>
            <div className="w-20 h-[1px] bg-sage mx-auto opacity-30"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Utensils className="text-sage" size={28} />, title: "Obiady Codzienne", desc: "Domowe posiłki przygotowywane z lokalnych produktów, dostępne każdego dnia." },
              { icon: <Heart className="text-sage" size={28} />, title: "Wesela", desc: "Magiczna oprawa i wykwintne menu na ten najważniejszy dzień w życiu." },
              { icon: <Users className="text-sage" size={28} />, title: "Chrzciny i Komunie", desc: "Eleganckie przyjęcia rodzinne w spokojnej i miłej atmosferze." },
              { icon: <Gift className="text-sage" size={28} />, title: "Bankiety i Gale", desc: "Profesjonalna przestrzeń na eventy firmowe oraz bankiety okolicznościowe." },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-beige/40 group hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-paper flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="font-serif text-2xl mb-4 text-sage">{service.title}</h3>
                <p className="text-sm text-earth leading-loose font-sans">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-32 px-6 bg-paper scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10 border-b border-beige pb-10">
            <div className="text-left">
              <span className="uppercase tracking-[0.4em] text-sand font-bold text-xs mb-4 block">Widok na salę</span>
              <h2 className="font-serif text-4xl md:text-5xl text-sage">Nasza <span className="italic">Galeria</span></h2>
            </div>
            <p className="text-earth max-w-sm text-sm font-sans tracking-wide">
              Subtelne dekoracje, przestronne wnętrza i dbałość o estetykę tworzą idealną atmosferę.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative overflow-hidden rounded-[30px] group border-4 border-white shadow-md ${idx === 0 || idx === 7 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`Galeria ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-sage/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white">
                    <span className="text-2xl font-light">✧</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="kontakt" className="py-32 bg-[#E8E4DD]/30 px-6 border-y border-beige scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-12 text-sage">Jak do nas <span className="italic">trafić</span>?</h2>
            <div className="space-y-10">
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-beige shrink-0 text-sage italic font-serif text-xl">◈</div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-sand font-bold mb-2">Adres</h4>
                  <p className="text-2xl font-serif text-sage">Bielska 10, Boćki 17-111</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-beige shrink-0 text-sage italic font-serif text-xl">◈</div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-sand font-bold mb-2">Kontakt bezpośredni</h4>
                  <p className="text-2xl font-serif text-sage">573 493 590</p>
                </div>
              </div>
              <div className="pt-10">
                <a
                  href="https://www.google.com/maps/dir//Bielska+10,+17-111+Bo%C4%87ki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-sage border border-beige shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Otwórz w Mapach Google
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl h-[500px] border-[12px] border-white relative z-10 transition-transform hover:-rotate-1 duration-700 font-sans">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2420.450237612696!2d23.04335451288787!3d52.65184477197956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47202f2c77d50e49%3A0xb8f12bf00b35e2e!2sBielska%2010%2C%2017-111%20Bo%C4%87ki!5e0!3m2!1spl!2spl!4v1776769426991!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa dojazdu"
                className="grayscale-[0.4] contrast-[1.1]"
              ></iframe>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sage opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-olive opacity-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-paper text-sage py-32 px-6">
        <div className="max-w-7xl mx-auto border-t border-beige pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-md">
              <div className="text-4xl font-serif font-light tracking-[0.2em] uppercase mb-6">ŚWIT</div>
              <p className="text-earth text-sm flex items-center gap-4 mb-4">
                <MapPin size={18} /> Bielska 10, 17-111 Boćki
              </p>
              <p className="text-earth text-sm flex items-center gap-4">
                <Phone size={18} /> +48 573 493 590
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
              <h4 className="text-2xl font-serif italic mb-2">Zapraszamy do kontaktu</h4>
              <a
                href="https://www.facebook.com/profile.php?id=100084273290658"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#1877F2] text-white px-8 py-4 rounded-2xl font-bold text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all"
              >
                <Facebook size={20} />
                ODWIEDŹ NAS NA FACEBOOKU
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-sand border-t border-beige pt-10">
            <p>© {new Date().getFullYear()} Sala Bankietowa ŚWIT</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-sage transition-colors">Prywatność</a>
              <a href="#" className="hover:text-sage transition-colors">Dojazd</a>
              <a href="#" className="hover:text-sage transition-colors">Oferta</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
