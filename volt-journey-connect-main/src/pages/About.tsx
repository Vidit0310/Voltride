
import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Zap, 
  Users, 
  Clock, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  Bolt
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCar from '@/components/AnimatedCar';

const stats = [
  { value: '100%', label: 'Electric Fleet', icon: <Bolt className="h-5 w-5 text-volt-600" /> },
  { value: '0', label: 'Emissions', icon: <Leaf className="h-5 w-5 text-eco-600" /> },
  { value: '99.8%', label: 'Customer Satisfaction', icon: <Award className="h-5 w-5 text-volt-600" /> },
  { value: '24/7', label: 'Service', icon: <Clock className="h-5 w-5 text-volt-600" /> }
];

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-eco-600" />,
    title: "Eco-Friendly Transport",
    description: "Our all-electric fleet produces zero emissions, helping reduce carbon footprint and air pollution in urban areas."
  },
  {
    icon: <Zap className="h-8 w-8 text-volt-600" />,
    title: "Fast & Efficient",
    description: "Electric vehicles offer instant torque for quick acceleration, providing a smooth and responsive ride experience."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-volt-600" />,
    title: "Safety First",
    description: "All vehicles are equipped with advanced safety features and undergo regular maintenance to ensure reliability."
  },
  {
    icon: <Users className="h-8 w-8 text-volt-600" />,
    title: "Professional Drivers",
    description: "Our drivers are thoroughly vetted and trained specifically for electric vehicle operation and customer service."
  },
];

const faqs = [
  {
    question: "How does the booking process work?",
    answer: "Booking with VoltRide is simple. Enter your pickup location and destination, select your preferred EV model, and confirm. Our driver will arrive at the specified time in a fully charged electric vehicle."
  },
  {
    question: "What types of electric vehicles are in your fleet?",
    answer: "Our premium fleet includes Tesla Model 3 and Model Y, Polestar 2, Lucid Air, and other high-performance EVs. All vehicles offer spacious interiors, advanced tech, and zero emissions."
  },
  {
    question: "Are your prices different from regular ride-sharing?",
    answer: "Our pricing is competitive with premium ride-sharing services. While there might be a slight premium for the electric experience, many customers find the quiet, smooth ride and environmental benefits well worth it."
  },
  {
    question: "What happens if the vehicle runs out of battery during my trip?",
    answer: "This is extremely unlikely as we carefully monitor vehicle range. All our EVs have substantial range capacity, and drivers ensure vehicles are adequately charged before each ride. In the rare event of low battery, we would arrange an alternative vehicle immediately."
  },
  {
    question: "Do you offer corporate accounts?",
    answer: "Yes, we offer corporate accounts with special rates and dedicated service for businesses. Contact our corporate team to set up an account for your organization."
  }
];

const About = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    // Improved intersection observer implementation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    // Find and observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      observer.observe(el);
    });
    
    // Trigger animation for elements that are already visible on load
    setTimeout(() => {
      const visibleElements = document.querySelectorAll('[data-animate]');
      visibleElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('animate-reveal');
        }
      });
    }, 100);
    
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 px-4 bg-volt-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="w-full lg:w-1/2" data-animate>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  The Future of <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-volt-600 to-volt-400">
                    Electric Mobility
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-xl">
                  VoltRide is revolutionizing urban transportation with our premium electric vehicle 
                  ride-sharing service. Experience the future of mobility today.
                </p>
                
                <Button asChild size="lg" className="rounded-full bg-volt-600 hover:bg-volt-700 text-white shadow-md">
                  <Link to="/booking">
                    Book a Ride
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="w-full lg:w-1/2 flex justify-center" data-animate>
                <div className="relative w-full max-w-lg">
                  <div className="w-full aspect-[4/3]">
                    <AnimatedCar className="w-full h-full" />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-volt-400/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-eco-400/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-animate>
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="p-3 rounded-full bg-gray-50 mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-volt-700 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section 
          ref={el => sectionRefs.current[0] = el} 
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16" data-animate>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600">
                VoltRide was founded with a simple mission: to make electric vehicle transportation 
                accessible to everyone while reducing urban emissions and providing an exceptional 
                riding experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-animate>
                <p className="text-gray-600 mb-6">
                  In 2021, we started with just three Tesla Model 3s and a vision to revolutionize 
                  urban transportation. Today, we've grown to a fleet of over 200 premium electric 
                  vehicles serving multiple metropolitan areas.
                </p>
                
                <p className="text-gray-600 mb-6">
                  Our founding team combined expertise from automotive engineering, renewable energy, 
                  and rideshare operations to create a service that addresses the environmental impact 
                  of traditional transportation while providing a superior experience.
                </p>
                
                <p className="text-gray-600">
                  With every ride, we're working toward a cleaner, quieter, and more sustainable future 
                  for urban mobility. Join us on this journey toward zero-emission transportation.
                </p>
              </div>
              
              <div className="relative" data-animate>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1593941707882-a5bba53774a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Electric vehicle charging" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 border-4 border-volt-200 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section 
          ref={el => sectionRefs.current[1] = el}
          className="py-20 px-4 bg-gray-50"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16" data-animate>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose VoltRide</h2>
              <p className="text-gray-600">
                Our electric vehicle service offers unique advantages that make every ride 
                a premium experience while contributing to environmental sustainability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border border-gray-100 transition-all hover:shadow-md overflow-hidden" data-animate>
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className="mr-6 p-4 rounded-full bg-gray-100">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section 
          ref={el => sectionRefs.current[2] = el}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-16" data-animate>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to the most common questions about VoltRide's electric vehicle service.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border border-gray-100 overflow-hidden" data-animate>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section 
          ref={el => sectionRefs.current[3] = el}
          className="py-20 px-4 bg-volt-600 text-white"
          data-animate
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
            <p className="text-volt-50 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've made the switch to clean, 
              quiet electric transportation. Your journey to a sustainable future starts with a single ride.
            </p>
            <Button asChild size="lg" className="rounded-full bg-white text-volt-600 hover:bg-volt-50 shadow-lg">
              <Link to="/booking">
                Book Your First Ride
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="py-10 px-4 bg-gray-900 text-gray-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-volt-400 mr-2" />
                <span className="text-xl font-semibold text-white">VoltRide</span>
              </div>
              <p className="text-sm text-gray-400">
                The future of electric mobility. Premium EV rides with zero emissions.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-volt-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4 text-white">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-volt-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-volt-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-volt-400 transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} VoltRide. All rights reserved.
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-volt-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-volt-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-volt-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
