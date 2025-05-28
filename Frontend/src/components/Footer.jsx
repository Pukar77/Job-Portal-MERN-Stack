import React from "react";
import fb_logo from "../assets/fb.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";
function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Apply <span className="text-blue-600">Rush</span></h2>
          <p className="text-sm text-gray-600">
            Your trusted job portal. Find your next opportunity here.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#">
              <img src={fb_logo} alt="Facebook" className="h-5 w-5" />
            </a>
            <a href="#">
              <img src={x} alt="Twitter" className="h-5 w-5" />
            </a>
            <a href="#">
              <img src={linkedin} alt="LinkedIn" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ApplyRush. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
