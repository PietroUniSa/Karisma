"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Linkedin,
  Clock,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Heart,
  Leaf,
  Award,
  Users,
  Accessibility,
  Car,
  MessageCircle
} from "lucide-react"

// Scroll reveal hook
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// WhatsApp booking handler
function handleWhatsAppBooking(name: string, phone: string, date: string) {
  const message = `Ciao, mi chiamo ${name}. Vorrei prenotare un trattamento per il ${date}. Il mio numero è ${phone}.`
  const whatsappUrl = `https://wa.me/+39XXXXXXXXX?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// Navigation Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#chi-siamo", label: "Chi Siamo" },
    { href: "#trattamenti", label: "Trattamenti" },
    { href: "#dove-siamo", label: "Dove Siamo" },
    { href: "#contatti", label: "Contatti" },
  ]

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-card/95 backdrop-blur-[10px] shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 lg:px-10">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-wide">
              Karisma
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-card-foreground hover:text-primary transition-colors duration-300 text-[15px]"
              >
                {link.label}
              </a>
            ))}
            <Button 
              className="rounded-lg px-6 py-2 bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300"
              onClick={() => document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Prenota Ora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu navigazione"}
          >
            <div className="relative w-6 h-6">
              <span 
                className={`absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-3 rotate-45" : "top-1"
                }`}
              />
              <span 
                className={`absolute left-0 top-3 w-6 h-0.5 bg-foreground transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span 
                className={`absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-3 -rotate-45" : "top-5"
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-foreground/50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-card z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button 
            className="absolute top-4 right-4 p-2"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Chiudi menu"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="mt-12 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-card-foreground hover:text-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button 
              className="rounded-lg mt-4 w-full bg-primary text-primary-foreground"
              onClick={() => {
                setIsMenuOpen(false)
                document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Prenota Ora
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Hero Section
function HeroSection() {
  const [showStickyBtn, setShowStickyBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBtn(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/elegant-spa-treatment-room-with-soft-lighting-and-.jpg"
            alt="Ambiente elegante del centro estetico Karisma"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/35" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-5 max-w-[800px] mx-auto">
          <h1 className="font-serif text-[32px] md:text-5xl lg:text-[64px] text-white leading-[1.2] mb-6 animate-fade-in-up">
            Ritorna a Te Stesso
          </h1>
          <p className="text-white/90 text-base md:text-lg lg:text-xl font-light mb-8 max-w-[600px] mx-auto animate-fade-in-up stagger-1">
            Scopri il benessere autentico con trattamenti personalizzati nel cuore della città
          </p>
          <Button 
            size="lg"
            className="rounded-lg px-8 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-lg hover:scale-105 hover:shadow-[0_8px_24px_rgba(212,165,116,0.4)] transition-all duration-300 animate-fade-in-up stagger-2"
            onClick={() => document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Prenota Ora
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
          showStickyBtn ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Button 
          className="w-full h-[50px] rounded-none bg-primary text-white text-base font-medium"
          onClick={() => document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Prenota
        </Button>
      </div>
    </>
  )
}

// Chi Siamo Section
function ChiSiamoSection() {
  const { ref, isVisible } = useScrollReveal()

  const features = [
    { icon: <Award className="w-8 h-8" />, title: "15+ Anni", desc: "Di esperienza e professionalità" },
    { icon: <Leaf className="w-8 h-8" />, title: "98% Naturale", desc: "Prodotti certificati e sicuri" },
    { icon: <Users className="w-8 h-8" />, title: "500+ Clienti", desc: "Soddisfatti ogni anno" },
    { icon: <Heart className="w-8 h-8" />, title: "Personalizzato", desc: "Ogni trattamento su misura" },
  ]

  return (
    <section id="chi-siamo" className="py-10 md:py-[100px] bg-card">
      <div 
        ref={ref}
        className={`max-w-[1200px] mx-auto px-5 md:px-10 transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src="/luxury-facial-treatment-with-glowing-skin-care-pro.jpg"
                alt="Interno elegante del centro estetico"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-[28px] md:text-[40px] text-foreground leading-[1.2] mb-6">
              La Nostra Filosofia
            </h2>
            <p className="text-card-foreground text-base leading-relaxed mb-8">
              Crediamo che il benessere sia un diritto, non un lusso. Da oltre 15 anni, 
              il nostro team di professionisti certificati si dedica a creare esperienze 
              uniche e personalizzate per ogni cliente. Utilizziamo solo prodotti naturali 
              al 98%, selezionati con cura per garantire risultati visibili e duraturi.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="font-semibold text-base text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            <Button 
              variant="outline"
              className="rounded-lg px-6 py-3 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => document.getElementById('trattamenti')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Scopri i Nostri Trattamenti
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Team Section
function TeamSection() {
  const { ref, isVisible } = useScrollReveal()

  const team = [
    {
      name: "Dr.ssa Maria Rossi",
      role: "Direttrice & Estetista Senior",
      certifications: ["CIDESCO", "Dermalogica"],
      image: "/professional-headshot-of-happy-woman-with-glowing-.jpg"
    },
    {
      name: "Elena Bianchi",
      role: "Specialista Viso",
      certifications: ["Guinot Expert"],
      image: "/professional-headshot-of-confident-woman-with-yout.jpg"
    },
    {
      name: "Sofia Greco",
      role: "Massaggiatrice Olistica",
      certifications: ["AIMI Certified"],
      image: "/professional-headshot-of-satisfied-woman-with-smoo.jpg"
    },
  ]

  const testimonials = [
    {
      name: "Lisa M.",
      treatment: "Facial Premium",
      rating: 5,
      text: "Ho scelto il Facial Premium e il risultato è stato straordinario. La mia pelle è più luminosa e idratata. Consiglierò il centro a tutte le mie amiche!",
      image: "/professional-headshot-of-happy-woman-with-glowing-.jpg"
    },
    {
      name: "Anna P.",
      treatment: "Massaggio Relax",
      rating: 5,
      text: "Un'esperienza rigenerante. Il team è professionale e attento ad ogni dettaglio. L'ambiente è raffinato e accogliente.",
      image: "/professional-headshot-of-confident-woman-with-yout.jpg"
    },
    {
      name: "Giulia R.",
      treatment: "Body Sculpting",
      rating: 5,
      text: "Dopo 6 sedute ho notato risultati visibili. Le operatrici sono competenti e mi hanno seguita con grande cura durante tutto il percorso.",
      image: "/professional-headshot-of-satisfied-woman-with-smoo.jpg"
    },
  ]

  return (
    <section className="py-10 md:py-[100px] bg-card">
      <div 
        ref={ref}
        className={`max-w-[1200px] mx-auto px-5 md:px-10 transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-[28px] md:text-[40px] text-foreground leading-[1.2] mb-4">
            Il Nostro Team
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Professionisti certificati con passione per il benessere e la bellezza
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`group text-center transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] mx-auto mb-4 rounded-2xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-0 group-hover:grayscale transition-all duration-400"
                />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.certifications.map((cert, i) => (
                  <span 
                    key={i}
                    className="bg-primary text-white text-xs px-3 py-1 rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-[24px] md:text-[32px] text-foreground leading-[1.2] mb-4">
            Cosa Dicono i Nostri Clienti
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`bg-secondary border-0 rounded-xl hover:bg-[#EFEFEF] hover:shadow-md transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.treatment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trattamenti Section
function TrattamentiSection() {
  const { ref, isVisible } = useScrollReveal()

  const treatments = [
    {
      name: "Massaggio Relax",
      description: "Sentirai il relax totale in 45 minuti con il nostro massaggio decontratturante con oli essenziali naturali.",
      duration: "45 min",
      price: "€55",
      image: "/elegant-spa-treatment-room-with-soft-lighting-and-.jpg",
      bestseller: true
    },
    {
      name: "Facial Premium",
      description: "Trattamento viso completo con pulizia profonda, maschera personalizzata e massaggio linfodrenante.",
      duration: "60 min",
      price: "€75",
      image: "/luxury-facial-treatment-with-glowing-skin-care-pro.jpg",
      bestseller: true
    },
    {
      name: "Body Sculpting",
      description: "Rimodellamento corporeo non invasivo con tecnologia avanzata per risultati visibili dalla prima seduta.",
      duration: "50 min",
      price: "€90",
      image: "/modern-body-contouring-treatment-room-with-advance.jpg",
      bestseller: false
    },
    {
      name: "Manicure Spa",
      description: "Cura completa delle mani con scrub, maschera idratante e applicazione smalto di lunga durata.",
      duration: "40 min",
      price: "€35",
      image: "/modern-anti-aging-treatment-with-professional-equi.jpg",
      bestseller: false
    },
    {
      name: "Trattamento Anti-Age",
      description: "Riduce visibilmente rughe sottili con acido ialuronico e vitamina C per una pelle giovane e tonica.",
      duration: "75 min",
      price: "€120",
      image: "/professional-laser-treatment-equipment-in-clean-me.jpg",
      bestseller: true
    },
    {
      name: "Hair Spa",
      description: "Rigenerazione capillare completa con maschere nutrienti e massaggio del cuoio capelluto.",
      duration: "45 min",
      price: "€45",
      image: "/elegant-spa-treatment-room-with-soft-lighting-and-.jpg",
      bestseller: false
    },
  ]

  return (
    <section id="trattamenti" className="py-10 md:py-[100px] bg-card">
      <div 
        ref={ref}
        className={`max-w-[1200px] mx-auto px-5 md:px-10 transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-[28px] md:text-[48px] text-foreground leading-[1.2] mb-4">
            I Nostri Trattamenti
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-[600px] mx-auto">
            Ogni trattamento è studiato per offrirti un&apos;esperienza unica di benessere e rinnovamento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <Card 
              key={index}
              className={`group border border-border rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 animate-fade-in-up stagger-${(index % 6) + 1}`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Scopri
                  </span>
                </div>
                {treatment.bestseller && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Bestseller
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {treatment.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {treatment.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-secondary text-muted-foreground text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {treatment.duration}
                  </span>
                  <span className="text-primary font-semibold">
                    {treatment.price}
                  </span>
                </div>
                <Button 
                  className="w-full rounded-md bg-primary text-white text-sm py-2.5 hover:opacity-90 hover:shadow-md transition-all duration-300"
                  onClick={() => document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Prenota
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Prenotazione Section
function PrenotazioneSection() {
  const { ref, isVisible } = useScrollReveal()
  const [formData, setFormData] = useState({ name: "", phone: "", date: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Il nome deve avere almeno 2 caratteri"
    }
    
    if (!formData.phone || !/^(\+39|0)\d{8,10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Inserisci un numero di telefono valido"
    }
    
    if (formData.date) {
      const selectedDate = new Date(formData.date)
      if (selectedDate < new Date()) {
        newErrors.date = "Seleziona una data futura"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      setTimeout(() => {
        handleWhatsAppBooking(formData.name, formData.phone, formData.date || "data da concordare")
        setIsSuccess(false)
        setFormData({ name: "", phone: "", date: "" })
      }, 2000)
    }, 1000)
  }

  return (
    <section id="prenotazione" className="py-10 md:py-20 bg-secondary">
      <div 
        ref={ref}
        className={`max-w-[1200px] mx-auto px-5 md:px-10 transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="max-w-[400px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-[28px] md:text-[40px] text-foreground leading-[1.2] mb-2">
              Prenota il Tuo Trattamento
            </h2>
            <p className="text-muted-foreground">
              Rispondiamo entro 24 ore
            </p>
          </div>

          <Card className="bg-card border-0 rounded-2xl shadow-lg">
            <CardContent className="p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-8 animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-foreground">Perfetto!</p>
                  <p className="text-muted-foreground">Verrai reindirizzato a WhatsApp...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-card-foreground">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      placeholder="Il tuo nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`rounded-md border-input px-4 py-3 text-base focus:border-primary focus:ring-primary/10 ${
                        errors.name ? "border-destructive" : ""
                      }`}
                      aria-invalid={!!errors.name}
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive" role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-card-foreground">
                      Telefono
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+39 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`rounded-md border-input px-4 py-3 text-base focus:border-primary focus:ring-primary/10 ${
                        errors.phone ? "border-destructive" : ""
                      }`}
                      aria-invalid={!!errors.phone}
                      required
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm text-card-foreground">
                      Data/Ora preferita
                    </Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`rounded-md border-input px-4 py-3 text-base focus:border-primary focus:ring-primary/10 ${
                        errors.date ? "border-destructive" : ""
                      }`}
                      aria-invalid={!!errors.date}
                    />
                    {errors.date && (
                      <p className="text-xs text-destructive" role="alert">{errors.date}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-primary text-white py-3.5 text-base hover:opacity-90 hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Elaborando...
                      </span>
                    ) : (
                      "Richiedi Prenotazione"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    <a href="#" className="underline hover:text-primary transition-colors">
                      Privacy policy
                    </a>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Dove Siamo Section
function DoveSiamoSection() {
  const { ref, isVisible } = useScrollReveal()

  const info = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Indirizzo",
      content: "Via Roma 123, 00100 Roma",
      href: "https://maps.google.com/?q=Via+Roma+123+Roma"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telefono",
      content: "+39 06 1234567",
      href: "tel:+390612345467"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Orari",
      content: "Lun-Ven 09:00-19:00\nSab 10:00-18:00\nDom Chiuso",
      href: null
    },
    {
      icon: <Accessibility className="w-8 h-8" />,
      title: "Accessibilità",
      content: "Parcheggio gratuito\nAccesso disabili\nAscensore",
      href: null
    },
  ]

  return (
    <section id="dove-siamo" className="py-10 md:py-[100px] bg-card">
      <div 
        ref={ref}
        className={`max-w-[1200px] mx-auto px-5 md:px-10 transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-[28px] md:text-[40px] text-foreground leading-[1.2] mb-4">
            Vieni a Trovarci
          </h2>
        </div>

        <div className="grid lg:grid-cols-[60%_40%] gap-8">
          {/* Map */}
          <div className="h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6584!2d12.4822!3d41.9028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU0JzEwLjEiTiAxMsKwMjgnNTYuMCJF!5e0!3m2!1sit!2sit!4v1620000000000!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Posizione Centro Estetico Karisma"
            />
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-6">
              Informazioni Pratiche
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {info.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-primary">{item.icon}</div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline"
              className="mt-8 rounded-lg px-6 py-3 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              onClick={() => window.open('https://maps.google.com/?q=Via+Roma+123+Roma', '_blank')}
            >
              <MapPin className="w-4 h-4" />
              Visualizza su Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const quickLinks = [
    { href: "#", label: "Home" },
    { href: "#chi-siamo", label: "Chi Siamo" },
    { href: "#trattamenti", label: "Trattamenti" },
    { href: "#dove-siamo", label: "Dove Siamo" },
  ]

  return (
    <footer id="contatti" className="bg-foreground text-background py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Branding */}
          <div>
            <span className="font-serif text-2xl font-semibold text-background mb-4 block">
              Karisma
            </span>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Elevando la bellezza naturale attraverso trattamenti personalizzati e cura eccezionale.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-background hover:text-primary hover:bg-background/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-background hover:text-primary hover:bg-background/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-background hover:text-primary hover:bg-background/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Link Utili</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4">Contattaci</h4>
            <div className="space-y-3 text-sm">
              <a 
                href="tel:+390612345467"
                className="text-background/70 hover:text-primary transition-colors block"
              >
                +39 06 1234567
              </a>
              <a 
                href="mailto:info@karismabeauty.it"
                className="text-background/70 hover:text-primary transition-colors block"
              >
                info@karismabeauty.it
              </a>
              <a 
                href="https://wa.me/+39XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <p className="text-background/50 text-xs mt-2">
                Disponibili 24/7 su WhatsApp
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-background mb-4">Orari di Apertura</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>Lunedì - Venerdì: 09:00 - 19:00</p>
              <p>Sabato: 10:00 - 18:00</p>
              <p>Domenica: Chiuso</p>
            </div>
            <div className="mt-6 space-y-2">
              <a href="#" className="text-background/50 hover:text-primary transition-colors text-xs block">
                Privacy Policy
              </a>
              <a href="#" className="text-background/50 hover:text-primary transition-colors text-xs block">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/50 text-xs">
            &copy; 2026 Centro Estetico Karisma. Tutti i diritti riservati. | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ChiSiamoSection />
        <TeamSection />
        <TrattamentiSection />
        <PrenotazioneSection />
        <DoveSiamoSection />
      </main>
      <Footer />
    </div>
  )
}
