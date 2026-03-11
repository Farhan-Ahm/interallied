'use client';

import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const CATEGORIES = [
  'All',
  'Power Transformers',  
  'LV Switchgear',  
  'MV Switchgear', 
  'HV Switchgear', 
  'Switchboards',
  
];

const PRODUCTS = [
  { id: 1,  name: 'PT-25',     category: 'Power Transformers', image: '/products/pt-25.png',   specs: ['Category: Power Transformers','Capacity: 25 kVA', 'Types: Pole / Pad / UnderGround'] },
  { id: 2,  name: 'PT-50',     category: 'Power Transformers', image: '/products/pt-25.png',   specs: ['Category: Power Transformers','Capacity: 50 kVA',   'Types: Pole / Pad / UnderGround'] },
  { id: 3,  name: 'PT-100',    category: 'Power Transformers', image: '/products/pt-25.png',  specs: ['Category: Power Transformers','Capacity: 100 kVA',  'Types: Pole / Pad / UnderGround'] },
  { id: 4,  name: 'PT-500',    category: 'Power Transformers', image: '/products/pt-25.png',  specs: ['Category: Power Transformers','Capacity: 500 kVA',  'Types: Pole / Pad / UnderGround'] },
  { id: 5,  name: 'PT-2500',   category: 'Power Transformers', image: '/products/pt-25.png', specs: ['Category: Power Transformers','Capacity: 2500 kVA', 'Types: Pole / Pad / UnderGround'] },
  { id: 6,  name: 'LV-SWG-A',  category: 'LV Switchgear',      image: '/products/lv-swg.jpg',  specs: ['Category: Low Voltage (LV) Switchgear','Voltage: ≤1000V', 'Type: MDB / MCC / ATS / Panelboards', 'Typical breakers: MCB / MCCB / ACB'] },
  { id: 7,  name: 'MV-SWG-B',  category: 'MV Switchgear',      image: '/products/mv-swg.jpg',  specs: ['Category: Medium Voltage (LV) Switchgear','Voltage: 1kV – 36kV', 'Type: Metal-Clad / GIS / AIS / RMU', 'Common voltage classes (kV): 11 / 15 / 13.8 / 22 / 33'] },
  { id: 8,  name: 'HV-SWG-C',  category: 'HV Switchgear',      image: '/products/hv-swg.jpg',  specs: ['Category: High Voltage (LV) Switchgear','Voltage: >36kV', 'Type: SF6 Circuit Breaker / Dead Tank / Live Tank', 'Used in: Transmission substations / Power plants'] },
  { id: 9,  name: 'MSB-SWB-A', category: 'Switchboards',       image: '/products/msb-swb.jpg', specs: ['Primary Power Distribution Panel', 'Typical components: ACB / Busbar / Metering'] },
  { id: 10, name: 'DIS-SWB-A', category: 'Switchboards',       image: '/products/dis-swb.jpg', specs: ['Distribution Switchboards', 'Types: MDB / SDB / FDB'] },
  { id: 11, name: 'MCT-SWB-A', category: 'Switchboards',       image: '/products/mct-swb.png', specs: ['Motor Control Switchboards', 'Types: MCC / VFD / Soft Starter'] },
];

// ─────────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`ia-back-to-top ${visible ? 'visible' : 'hidden'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`ia-navbar navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="ia-brand" href="#home" onClick={(e) => navClick(e, 'home')}>
          <span style={{ color: '#ffffff' }}>INTER</span><span style={{ color: '#ff7c2a' }}>ALLIED</span>
          <small className="ia-brand-sub">Transformers · Switchgear · Switchboards</small>
        </a>

        <button
          className="navbar-toggler border-0 ms-auto me-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`navbar-collapse ${menuOpen ? 'd-block' : 'd-none d-lg-block'}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {[['home','Home'],['about','About'],['catalogue','Catalogue'],['contact','Contact']].map(([id, label]) => (
              <li className="nav-item" key={id}>
                <a className="nav-link" href={`#${id}`} onClick={(e) => navClick(e, id)}>{label}</a>
              </li>
            ))}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button className="ia-cart-btn nav-link" onClick={onCartOpen}>
                <i className="bi bi-cart3" /> Cart
                {cartCount > 0 && (
                  <span className="ia-cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero({ onCatalogueClick }) {
  return (
    <section id="home" className="ia-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="ia-hero-eyebrow">Trusted Electrical Solutions</div>
            <h1>
              Power Your
              <em>Infrastructure</em>
            </h1>
            <p className="ia-hero-desc">
              Interallied delivers premium transformers, switchgear and switchboard solutions engineered for reliability, safety and performance across industrial and commercial applications.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn-ia-primary" onClick={onCatalogueClick}>
                <i className="bi bi-grid3x3-gap me-2" />View Catalogue
              </button>
              <a
                className="btn-ia-outline"
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Get a Quote
              </a>
            </div>
          </div>
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          {/*<div style={{ fontSize: '10rem', opacity: 0.15, userSelect: 'none', lineHeight: 1 }}>⚡</div>*/}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS STRIP
// ─────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { num: '25+',  label: 'Years Experience' },
    { num: '500+', label: 'Projects Delivered' },
    { num: '6',    label: 'Product Categories' },
    { num: '40+',  label: 'Countries Served' },
  ];
  return (
    <div className="ia-stats-strip">
      <div className="container">
        <div className="row text-center g-4">
          {stats.map((s) => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className="ia-stat-num">{s.num}</div>
              <div className="ia-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
function About() {
  const cards = [
  {
    icon: <i className="bi bi-building-gear" style={{fontSize:'1.6rem',color:'var(--ia-orange)'}} />,
    title: 'Manufacturing Excellence',
    body: 'State-of-the-art manufacturing facilities ensuring every unit meets international quality standards including IEC, BS and ANSI.'
  },
  {
    icon: <i className="bi bi-cpu" style={{fontSize:'1.6rem',color:'var(--ia-orange)'}} />,
    title: 'Engineering Expertise',
    body: 'Our team of certified electrical engineers provides tailored solutions for the most demanding power distribution challenges.'
  },
  {
    icon: <i className="bi bi-globe2" style={{fontSize:'1.6rem',color:'var(--ia-orange)'}} />,
    title: 'Global Reach',
    body: 'Supplying reliable electrical infrastructure to clients across 40+ countries spanning Asia, Middle East, Africa and Europe.'
  },
  {
    icon: <i className="bi bi-patch-check" style={{fontSize:'1.6rem',color:'var(--ia-orange)'}} />,
    title: 'Certified Quality',
    body: 'ISO 9001:2015 certified with products tested to IEC 60076, IEC 62271 and other applicable international standards.'
  },
  {
    icon: <i className="bi bi-headset" style={{fontSize:'1.6rem',color:'var(--ia-orange)'}} />,
    title: 'After-Sales Support',
    body: '24/7 technical support, preventive maintenance programs and fast spare parts availability to minimize downtime.'
  },
  {
    icon: <i className="bi bi-recycle" style={{fontSize:'1.6rem',color:'var(--ia-orange)'}} />,
    title: 'Sustainable Solutions',
    body: 'Energy-efficient designs, eco-friendly insulation materials and low-loss transformer cores for a greener future.'
  },
];

  return (
    <section id="about" className="ia-section ia-section-alt">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="ia-section-tag">About Interallied</div>
            <h2 className="ia-section-title">Built on <span>Precision</span> & Trust</h2>
            <div className="ia-divider" />
            <p style={{ color: 'var(--ia-muted)', lineHeight: 1.8 }}>
              Interallied is a leading supplier of high-quality electrical power equipment, specialising in transformers, switchgear and switchboard solutions. With over two decades of experience, we partner with utilities, industrial facilities and contractors to deliver reliable, standards-compliant products.
            </p>
          </div>
          <div className="col-lg-5 offset-lg-1 d-flex align-items-center mt-4 mt-lg-0">
            <div style={{ background: '#ffffff', border: '1px solid rgba(255,124,42,0.2)', borderRadius: '8px', padding: '24px', width: '100%' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ia-orange)', marginBottom: '12px' }}>Our Mission</div>
              <p style={{ color: '#2c3e50', fontSize: '1.05rem', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
                "To power the world's infrastructure with precision-engineered electrical solutions, delivered with unwavering commitment to quality, safety and customer satisfaction."
              </p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {cards.map((c) => (
            <div className="col-md-6 col-lg-4" key={c.title}>
              <div className="ia-about-card">
                <div className="ia-about-icon">{c.icon}</div>
                <h5 style={{ color: '#1a2a3a', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '0.5px', marginBottom: '10px' }}>{c.title}</h5>
                <p style={{ color: 'var(--ia-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.75 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CATALOGUE
// ─────────────────────────────────────────────
function Catalogue({ cart, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab);

  const inCart = (id) => cart.find((i) => i.id === id);

  return (
    <section id="catalogue" className="ia-section ia-catalogue">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <div className="ia-section-tag">Product Catalogue</div>
            <h2 className="ia-section-title">Our <span>Products</span></h2>
            <div className="ia-divider" />
          </div>
        </div>

        <ul className="nav ia-tabs flex-wrap mb-4" role="tablist">
          {CATEGORIES.map((cat) => (
            <li className="nav-item" key={cat}>
              <button
                className={`nav-link ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        <div className="row g-4">
          {filtered.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <div className="ia-product-card">
                <div className="ia-product-thumb">
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: '5px' }}
              />
              <span className="ia-product-cat-badge">{product.category.split(' ')[0]}</span>
            </div>
                  <div className="ia-product-body">
                  <div className="ia-product-name">{product.name}</div>
                  <div className="ia-product-specs">
                    {product.specs.map((s) => <span key={s}>{s}</span>)}
                  </div>
                  <button
                    className={`btn-add-cart ${inCart(product.id) ? 'added' : ''}`}
                    onClick={() => onAddToCart(product)}
                  >
                    {inCart(product.id)
                      ? <><i className="bi bi-check2" /> Added</>
                      : <><i className="bi bi-cart-plus" /> Add to Inquiry</>
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CART DRAWER
// ─────────────────────────────────────────────
function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemove }) {
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', error: false });

  useEffect(() => {
    if (!isOpen) { setStep('cart'); setErrors({}); }
  }, [isOpen]);

  const showToast = (msg, error = false) => {
    setToast({ show: true, msg, error });
    setTimeout(() => setToast({ show: false, msg: '', error: false }), 4000);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          cartItems: cart.map((i) => ({
            name: i.name,
            category: i.category,
            specs: i.specs.join(', '),
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('✅ Inquiry sent! Check your email.');
        setForm({ name: '', email: '', phone: '' });
        setStep('cart');
        onClose(true);
      } else {
        showToast(data.error || 'Something went wrong.', true);
      }
    } catch {
      showToast('Network error. Please try again.', true);
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className={`ia-cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => onClose(false)} />

      <div className={`ia-cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="ia-drawer-header">
          <h5>
            {step === 'cart'
              ? <><i className="bi bi-cart3 me-2" style={{ color: 'var(--ia-orange)' }} />Inquiry Cart</>
              : <><i className="bi bi-person-lines-fill me-2" style={{ color: 'var(--ia-orange)' }} />Your Details</>
            }
          </h5>
          <button className="ia-drawer-close" onClick={() => onClose(false)}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="ia-drawer-body">
          {step === 'cart' ? (
            cart.length === 0 ? (
              <div className="ia-cart-empty">
                <i className="bi bi-cart3" />
                <p>Your inquiry cart is empty.</p>
                <small>Browse the catalogue and add products.</small>
              </div>
            ) : (
              cart.map((item) => (
                <div className="ia-cart-item" key={item.id}>
                  <div className="ia-cart-item-icon">{item.icon}</div>
                  <div className="flex-grow-1">
                    <div className="ia-cart-item-name">{item.name}</div>
                    <div className="ia-cart-item-cat">{item.category}</div>
                    <div className="ia-qty-controls">
                      <button className="ia-qty-btn" onClick={() => onUpdateQty(item.id, -1)}>−</button>
                      <span className="ia-qty-num">{item.quantity}</span>
                      <button className="ia-qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="ia-cart-remove" onClick={() => onRemove(item.id)}>
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              ))
            )
          ) : (
            <div className="ia-checkout-form">
              <p style={{ color: '#8aa8cc', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.6 }}>
                Fill in your details and we'll send you a confirmation with your inquiry summary.
              </p>
              {[
                { key: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'John Smith',        icon: 'bi-person' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com',  icon: 'bi-envelope' },
                { key: 'phone', label: 'Phone Number',  type: 'tel',   placeholder: '+1 234 567 8900',   icon: 'bi-telephone' },
              ].map(({ key, label, type, placeholder, icon }) => (
                <div className="mb-3" key={key}>
                  <label className="form-label d-flex align-items-center gap-2">
                    <i className={`bi ${icon}`} style={{ color: 'var(--ia-orange)' }} />{label}
                  </label>
                  <input
                    type={type}
                    className={`form-control ${errors[key] ? 'border-danger' : ''}`}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                  {errors[key] && <small className="text-danger mt-1 d-block">{errors[key]}</small>}
                </div>
              ))}

              <div style={{ background: '#0d1b2e', borderRadius: '6px', padding: '14px', marginTop: '8px', border: '1px solid rgba(42,82,152,0.3)' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ia-orange)', marginBottom: '8px' }}>
                  Items ({cart.length})
                </div>
                {cart.map((i) => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#8aa8cc', padding: '3px 0' }}>
                    <span>{i.name}</span>
                    <span style={{ color: '#ffffff' }}>×{i.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ia-drawer-footer">
          {step === 'cart' ? (
            <button
              className="btn-ia-primary w-100"
              disabled={cart.length === 0}
              style={{ opacity: cart.length === 0 ? 0.5 : 1 }}
              onClick={() => setStep('checkout')}
            >
              <i className="bi bi-arrow-right me-2" />Proceed to Checkout ({cart.length} item{cart.length !== 1 ? 's' : ''})
            </button>
          ) : (
            <div className="d-flex flex-column gap-2">
              <button className="btn-ia-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting
                  ? <><span className="spinner-border spinner-border-sm me-2" />Sending…</>
                  : <><i className="bi bi-send me-2" />Submit Inquiry</>
                }
              </button>
              <button className="btn-ia-outline" onClick={() => setStep('cart')}>
                <i className="bi bi-arrow-left me-2" />Back to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`ia-toast ${toast.show ? 'show' : ''} ${toast.error ? 'error' : ''}`}>
        {toast.msg}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          cartItems: [{ name: 'General Enquiry', category: 'Contact Form', specs: form.message, quantity: 1 }],
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    }
    setSending(false);
  };

  const info = [
    { icon: 'bi-geo-alt',   label: 'Address', value: '5305 50 Avenue, Red Deer, AB T4N 4B6' },
    { icon: 'bi-telephone', label: 'Phone',   value: '+1 (403) 700-1711' },
    { icon: 'bi-envelope',  label: 'Email',   value: 'info@interallied.com' },
    { icon: 'bi-clock',     label: 'Hours',   value: 'Mon–Fri: 8am–6pm' },
  ];

  return (
    <section id="contact" className="ia-section ia-section-alt">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <div className="ia-section-tag">Get In Touch</div>
            <h2 className="ia-section-title">Contact <span>Us</span></h2>
            <div className="ia-divider" />
          </div>
        </div>
        <div className="row g-4 align-items-start">
          <div className="col-lg-4">
            <h5 style={{ color: '#1a2a3a', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '28px', fontSize: '1.1rem' }}>
              Let's Talk Power
            </h5>
            {info.map((item) => (
              <div className="ia-contact-info-item" key={item.label}>
                <div className="ia-contact-info-icon"><i className={`bi ${item.icon}`} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ia-orange)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: '#2c3e50', fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-8">
            <div className="ia-contact-card">
              {sent ? (
                <div className="text-center py-4">
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                  <h4 style={{ color: '#1a2a3a', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '1px' }}>Message Sent!</h4>
                  <p style={{ color: 'var(--ia-muted)' }}>Thank you for reaching out. We'll get back to you shortly.</p>
                  <button
                    className="btn-ia-primary mt-3"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="ia-contact-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-control" placeholder="John Smith" required
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-control" placeholder="john@example.com" required
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-control" placeholder="+1 234 567 8900"
                        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subject</label>
                      <input type="text" className="form-control" placeholder="Product inquiry, quote request…" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message *</label>
                      <textarea className="form-control" rows="5" placeholder="Tell us about your requirements…" required
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-ia-primary" disabled={sending}>
                        {sending
                          ? <><span className="spinner-border spinner-border-sm me-2" />Sending…</>
                          : <><i className="bi bi-send me-2" />Send Message</>
                        }
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  const navClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <footer className="ia-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="ia-footer-brand">INTER<span>ALLIED</span></div>
            <p style={{ color: '#cfd1d3', fontSize: '0.88rem', marginTop: '14px', lineHeight: 1.75 }}>
              Premium electrical power equipment — transformers, switchgear and switchboard solutions for industrial and commercial applications.
            </p>
          </div>
          <div className="col-6 col-lg-2 offset-lg-2">
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ia-orange)', marginBottom: '14px' }}>Navigation</div>
            {[['home','Home'],['about','About'],['catalogue','Catalogue'],['contact','Contact']].map(([id, label]) => (
              <div key={id} style={{ marginBottom: '8px' }}>
                <a className="ia-footer-link" href={`#${id}`} onClick={(e) => navClick(e, id)}>{label}</a>
              </div>
            ))}
          </div>
          <div className="col-6 col-lg-2">
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ia-orange)', marginBottom: '14px' }}>Products</div>
            {CATEGORIES.slice(1).map((cat) => (
              <div key={cat} style={{ marginBottom: '8px' }}>
                <span style={{ color: '#e8f0f8', fontSize: '0.85rem' }}>{cat}</span>
              </div>
            ))}
          </div>
          <div className="col-lg-2">
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ia-orange)', marginBottom: '14px' }}>Contact</div>
            <p style={{ color: '#e8f0f8', fontSize: '0.85rem', lineHeight: 1.75 }}>
              info@interallied.com<br />
              +1 (403) 700-1711<br />
              Alberta, Canada
            </p>
          </div>
        </div>
        <hr className="ia-footer-divider" />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span style={{ color: '#cfd1d3', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Interallied. All rights reserved.
          </span>
          <span style={{ color: '#cfd1d3', fontSize: '0.8rem' }}>
            Powered by <span style={{ color: 'var(--ia-orange)' }}>interallied.com</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// HOME (MAIN PAGE)
// ─────────────────────────────────────────────
export default function Home() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const closeDrawer = useCallback((clearCart) => {
    setDrawerOpen(false);
    if (clearCart) setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const scrollToCatalogue = () => {
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setDrawerOpen(true)} />
      <Hero onCatalogueClick={scrollToCatalogue} />
      <StatsStrip />
      <About />
      <Catalogue cart={cart} onAddToCart={addToCart} />
      <Contact />
      <Footer />
      <CartDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
      <BackToTop />
    </>
  );
}
