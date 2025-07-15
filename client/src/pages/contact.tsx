import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BackButton } from '@/components/back-button';

export default function Contact() {
  const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver();
  const { ref: contactRef, hasIntersected: contactIntersected } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  useEffect(() => {
    document.title = 'Contact Us - First Interior | Get Your Free Consultation';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['Doonholm, Nairobi', 'Kenya'],
      description: 'Come see our latest designs and material samples',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+254 723 851 318', '+254 792 404 484'],
      description: 'Speak directly with our design consultants',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@firstinterior.co.ke' ],
      description: 'Send us your project details and requirements',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8AM - 6PM', 'Sat: 9AM - 4PM', 'Sun: By Appointment'],
      description: 'We\'re here when you need us most',
    },
  ];

  const faqs = [
    {
      question: 'How long does a typical interior design project take?',
      answer: 'Project timelines vary based on scope and complexity. A single room renovation typically takes 4-6 weeks, while full home designs can take 3-6 months from concept to completion.',
    },
    {
      question: 'Do you work with specific budgets?',
      answer: 'Yes, we work with various budget ranges. During our initial consultation, we discuss your budget to ensure our design solutions align with your financial expectations.',
    },
    {
      question: 'Can you work with existing furniture and decor?',
      answer: 'Absolutely! We love incorporating your existing pieces that have sentimental value or fit well with the new design. This often helps reduce costs and creates a more personalized space.',
    },
    {
      question: 'Do you provide 3D visualizations?',
      answer: 'Yes, we provide detailed 3D renderings and virtual walkthroughs so you can visualize your space before any work begins. This helps ensure you\'re completely satisfied with the design.',
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Navigation />
      <div className="mt-4 ml-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 mt-12 text-left">
            <BackButton />
          </div>
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className={`text-center reveal ${heroIntersected ? 'active' : ''}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-accent dark:text-accent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get in touch for a free consultation or to discuss your next project
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className={`text-center p-8 rounded-2xl shadow-lg border border-border dark:border-highlight bg-card dark:bg-card reveal ${heroIntersected ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary">{info.title}</h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground dark:text-muted-foreground font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contactRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 reveal ${contactIntersected ? 'active' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent dark:text-accent">Start Your Project</h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className={`reveal ${contactIntersected ? 'active' : ''}`}>
              <form onSubmit={handleSubmit} className="bg-card dark:bg-card rounded-2xl p-8 shadow-lg space-y-6 border border-border dark:border-highlight">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Your first name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Your last name"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+254 700 000 000"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectType" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                      Project Type *
                    </Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential Design</SelectItem>
                        <SelectItem value="commercial">Commercial Space</SelectItem>
                        <SelectItem value="consultation">Design Consultation</SelectItem>
                        <SelectItem value="planning">Space Planning</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                      Budget Range
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                        <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                        <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                        <SelectItem value="over-50k">Over $50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                    Project Timeline
                  </Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="When would you like to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="3-months">Within 3 months</SelectItem>
                      <SelectItem value="6-months">Within 6 months</SelectItem>
                      <SelectItem value="planning">Just planning ahead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                    Project Details *
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your project, style preferences, and any specific requirements..."
                    className="form-input"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className={`reveal ${contactIntersected ? 'active' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="bg-card dark:bg-card rounded-2xl p-8 shadow-lg h-full border border-border dark:border-highlight">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3 text-accent" />
                    What to Expect
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Initial Response</h4>
                        <p className="text-muted-foreground dark:text-muted-foreground text-sm">We'll respond to your inquiry within 24 hours to schedule a consultation.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Free Consultation</h4>
                        <p className="text-muted-foreground dark:text-muted-foreground text-sm">We'll visit your space or meet virtually to discuss your vision and requirements.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Custom Proposal</h4>
                        <p className="text-muted-foreground dark:text-muted-foreground text-sm">You'll receive a detailed proposal with timeline, budget, and design concepts.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-primary mb-2">Find Us Here</h4>
                    <p className="text-muted-foreground">Westlands, Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about our interior design process
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 shadow-lg border border-highlight"
              >
                <h3 className="text-lg font-semibold mb-4 text-primary">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}