import { TrendingUp, Mail, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <span className="text-slate-900">FinIQ</span>
            </div>
            <p className="text-slate-600 text-sm">
              AI-powered investment intelligence platform helping you make informed decisions.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2025 FinIQ. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
