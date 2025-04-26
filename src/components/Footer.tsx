
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">SparkUnion</h3>
            <p className="text-primary-foreground/80 text-sm">
              Unleash your culture, connect globally, and share your unique perspective with the world.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Press</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Community Guidelines</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Download our app:
            </p>
            <div className="flex space-x-2 mt-2">
              <a href="#" className="text-xs bg-primary-foreground/10 text-primary-foreground px-3 py-1 rounded-md hover:bg-primary-foreground/20 transition-colors">
                iOS App
              </a>
              <a href="#" className="text-xs bg-primary-foreground/10 text-primary-foreground px-3 py-1 rounded-md hover:bg-primary-foreground/20 transition-colors">
                Android App
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">© 2025 SparkUnion. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Privacy</Link>
            <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Terms</Link>
            <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
