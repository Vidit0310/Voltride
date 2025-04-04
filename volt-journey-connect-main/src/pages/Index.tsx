
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';
import { Battery, Zap, Clock, Leaf, Users, ShieldCheck, MapPin, CarFront, CreditCard, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedCar from '@/components/AnimatedCar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const features = [
  {
    icon: <Battery className="h-6 w-6 text-volt-600" />,
    title: "100% Electric Fleet",
    description: "Our entire fleet consists of premium electric vehicles with zero emissions."
  },
  {
    icon: <Zap className="h-6 w-6 text-volt-600" />,
    title: "Fast Charging",
    description: "Our vehicles are always charged and ready to go when you need them."
  },
  {
    icon: <Clock className="h-6 w-6 text-volt-600" />,
    title: "24/7 Availability",
    description: "Book your ride anytime, day or night, with our always-available service."
  },
  {
    icon: <Leaf className="h-6 w-6 text-eco-600" />,
    title: "Eco-Friendly",
    description: "Reduce your carbon footprint with every ride you take with VoltRide."
  },
  {
    icon: <Users className="h-6 w-6 text-eco-600" />,
    title: "Professional Drivers",
    description: "Our drivers are trained professionals who prioritize your safety and comfort."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-eco-600" />,
    title: "Safe & Secure",
    description: "Advanced safety features and real-time tracking for peace of mind."
  }
];

const testimonials = [
  {
    quote: "VoltRide changed how I commute. The electric vehicles are quiet, clean, and the service is impeccable.",
    author: "Sarah J.",
    position: "Tech Executive",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop"
  },
  {
    quote: "As someone who cares about the environment, I'm thrilled to have found a ride service that aligns with my values.",
    author: "Michael T.",
    position: "Environmental Scientist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&auto=format&fit=crop"
  },
  {
    quote: "The app is intuitive, the drivers are professional, and the vehicles are top-notch. Best ride service I've used!",
    author: "Elena R.",
    position: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&auto=format&fit=crop"
  }
];

const howItWorks = [
  {
    icon: <MapPin className="h-8 w-8 text-volt-600" />,
    title: "Set Your Pickup",
    description: "Enter your pickup location and destination in our user-friendly app."
  },
  {
    icon: <CarFront className="h-8 w-8 text-volt-600" />,
    title: "Choose Your Ride",
    description: "Select from our fleet of premium electric vehicles based on your needs."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-volt-600" />,
    title: "Pay Seamlessly",
    description: "Secure payment options including credit card, mobile wallet, or account credit."
  },
  {
    icon: <Zap className="h-8 w-8 text-volt-600" />,
    title: "Enjoy The Ride",
    description: "Experience the quiet, comfortable journey in our zero-emission vehicles."
  }
];

const faqs = [
  {
    question: "How do I book a ride?",
    answer: "You can book a ride through our mobile app or website. Simply enter your pickup location, destination, and preferred time. You'll then be able to select from available vehicles and confirm your booking."
  },
  {
    question: "What types of electric vehicles do you offer?",
    answer: "Our fleet includes a variety of premium electric vehicles from manufacturers like Tesla, Polestar, Lucid, and Rivian. We offer sedans, SUVs, and luxury options to meet different needs and preferences."
  },
  {
    question: "How much does a typical ride cost?",
    answer: "Ride costs vary based on distance, time of day, and vehicle type. We offer competitive pricing with the added benefit of zero emissions. You can get a fare estimate before confirming your booking."
  },
  {
    question: "Are your drivers professionally trained?",
    answer: "Yes, all our drivers undergo rigorous training in customer service, safety protocols, and electric vehicle operation. They're professionals committed to providing you with a safe and pleasant journey."
  },
  {
    question: "What if I need to cancel my ride?",
    answer: "You can cancel your ride through the app or website. Cancellations made more than 5 minutes before the scheduled pickup time are free of charge. Late cancellations may incur a small fee."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose VoltRide?</h2>
              <p className="text-gray-600">
                Experience the future of transportation with our premium electric vehicle service.
                Eco-friendly, quiet, and comfortable rides at competitive prices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border border-gray-100 transition-all hover:shadow-md overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 rounded-bl-full opacity-50"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 rounded-full bg-gray-50">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 px-4 bg-volt-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600">
                Booking your electric ride is simple and straightforward. 
                Follow these easy steps to get started.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200" style={{ width: 'calc(100% - 4rem)' }}></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="rounded-full bg-volt-600 hover:bg-volt-700 text-white shadow-md">
                <Link to="/booking">Book Your Ride Now</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Riders Say</h2>
              <p className="text-gray-600">
                Join thousands of satisfied customers who have made the switch to eco-friendly rides.
              </p>
            </div>
            
            <div className="mt-12">
              <Tabs defaultValue="testimonial0" className="w-full">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
                  {testimonials.map((_, index) => (
                    <TabsTrigger key={index} value={`testimonial${index}`} className="data-[state=active]:bg-volt-100 data-[state=active]:text-volt-700">
                      {`Review ${index + 1}`}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {testimonials.map((testimonial, index) => (
                  <TabsContent key={index} value={`testimonial${index}`} className="mt-0">
                    <Card className="border-0 shadow-md bg-white rounded-lg overflow-hidden">
                      <CardContent className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-volt-100">
                            <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                          <div>
                            <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                            <p className="text-gray-600">{testimonial.position}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Get answers to common questions about our electric ride service.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-12">
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                    <AccordionTrigger className="text-left py-5 px-6 hover:no-underline">
                      <span className="font-medium text-lg">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pt-0 pb-5">
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Still have questions?</p>
                <Button asChild variant="outline" size="lg" className="rounded-full border-volt-200 text-volt-700 hover:bg-volt-50">
                  <Link to="#" className="inline-flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-volt-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2 max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Future of Transportation?</h2>
                <p className="text-gray-600 mb-6">
                  Book your first ride today and join the electric revolution. 
                  Fast, quiet, and eco-friendly – the way transportation should be.
                </p>
                <Button asChild size="lg" className="rounded-full bg-volt-600 hover:bg-volt-700 text-white shadow-md">
                  <Link to="/booking">Book Your First Ride</Link>
                </Button>
              </div>
              
              <div className="w-full md:w-1/2 max-w-lg relative">
                <div className="w-full aspect-[4/3]">
                  <AnimatedCar className="w-full h-full" />
                </div>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-volt-300/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-eco-300/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Electric Revolution</h2>
              <p className="text-gray-600 mb-8">
                Experience the superior comfort, quietness, and performance of electric vehicles
                while contributing to a cleaner environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full bg-volt-600 hover:bg-volt-700 text-white shadow-md">
                  <Link to="/booking">Book a Ride</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-volt-200 text-volt-700 hover:bg-volt-50">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-10 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Zap className="h-6 w-6 text-volt-600 mr-2" />
              <span className="text-xl font-semibold">VoltRide</span>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="#" className="text-gray-600 hover:text-volt-600 transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-600 hover:text-volt-600 transition-colors">
                How It Works
              </a>
              <a href="#" className="text-gray-600 hover:text-volt-600 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-gray-600 hover:text-volt-600 transition-colors">
                Support
              </a>
            </div>
            
            <div className="mt-4 md:mt-0 text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} VoltRide. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
