# AMANTE RESTAURANT - COMPONENT SPECIFICATIONS

**Version:** 1.0
**Date:** October 25, 2025
**Designer:** UI/UX Design Agent
**Status:** APPROVED FOR IMPLEMENTATION

---

## TABLE OF CONTENTS

1. [Navigation Components](#navigation-components)
2. [Hero Components](#hero-components)
3. [Card Components](#card-components)
4. [Form Components](#form-components)
5. [UI Feedback Components](#ui-feedback-components)
6. [Layout Components](#layout-components)
7. [Media Components](#media-components)
8. [Interactive Components](#interactive-components)

---

## NAVIGATION COMPONENTS

### 1. Header (Desktop)

**Component:** `<Header />`

**Specifications:**
```
Height: 80px
Background: White with shadow on scroll
Position: Sticky (top: 0, z-index: 100)
Max-width: 100%
Padding: 0 40px
```

**Structure:**
```jsx
<header className="header">
  <div className="header-container">
    <Logo />
    <MainNavigation />
    <div className="header-actions">
      <PhoneButton />
      <ReserveButton />
    </div>
  </div>
</header>
```

**Styling:**
```css
.header {
  height: 80px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0); /* No shadow initially */
  transition: box-shadow 300ms ease;
}

.header.scrolled {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
```

**Logo Component:**
```css
.logo {
  height: 48px;
  width: auto;
  cursor: pointer;
  transition: opacity 200ms ease;
}

.logo:hover {
  opacity: 0.8;
}
```

**Phone Button:**
```css
.phone-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #B91C1C;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  transition: background 200ms ease;
}

.phone-button:hover {
  background: #FCE7F3;
}

.phone-icon {
  width: 18px;
  height: 18px;
}
```

**Reserve Button:**
```css
.reserve-button {
  padding: 12px 24px;
  background: #B91C1C;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
  box-shadow: 0 2px 4px rgba(185, 28, 28, 0.2);
}

.reserve-button:hover {
  background: #991B1B;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(185, 28, 28, 0.3);
}

.reserve-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(185, 28, 28, 0.2);
}
```

### 2. Main Navigation

**Component:** `<MainNavigation />`

**Structure:**
```jsx
<nav className="main-nav">
  <ul className="nav-list">
    <li><NavLink href="/">Home</NavLink></li>
    <li>
      <NavDropdown label="Our Spaces">
        <DropdownLink href="/cafe">Café & Bakery</DropdownLink>
        <DropdownLink href="/restaurant">Rooftop Restaurant</DropdownLink>
        <DropdownLink href="/lounge">Intimate Lounge</DropdownLink>
        <DropdownLink href="/club">Premier Club</DropdownLink>
        <DropdownLink href="/private-dining">Private Dining</DropdownLink>
        <DropdownLink href="/banquets">Grand Banquets</DropdownLink>
      </NavDropdown>
    </li>
    <li><NavLink href="/menunew">Menu</NavLink></li>
    <li><NavLink href="/events">Events</NavLink></li>
    <li><NavLink href="/about">About</NavLink></li>
    <li><NavLink href="/contact">Contact</NavLink></li>
  </ul>
</nav>
```

**Styling:**
```css
.main-nav {
  display: flex;
}

.nav-list {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: #2C2C2C;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: color 200ms ease;
}

.nav-link:hover {
  color: #B91C1C;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #B91C1C;
  transition: width 300ms ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: #B91C1C;
  font-weight: 600;
}
```

**Dropdown Styling:**
```css
.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
  padding: 12px 0;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 200ms ease;
  z-index: 200;
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: block;
  padding: 12px 20px;
  color: #2C2C2C;
  text-decoration: none;
  font-size: 15px;
  transition: all 150ms ease;
}

.dropdown-link:hover {
  background: #FCE7F3;
  color: #B91C1C;
}
```

### 3. Mobile Menu

**Component:** `<MobileMenu />`

**Hamburger Button:**
```css
.hamburger-button {
  display: none; /* Hidden on desktop */
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 12px;
  position: relative;
}

.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #2C2C2C;
  margin: 5px 0;
  transition: all 300ms ease;
}

.hamburger-button.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-button.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-button.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 768px) {
  .hamburger-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .main-nav {
    display: none; /* Hide desktop nav on mobile */
  }
}
```

**Mobile Menu Panel:**
```css
.mobile-menu {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: white;
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
  transform: translateX(100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 99;
  overflow-y: auto;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu-list {
  list-style: none;
  padding: 24px;
  margin: 0;
}

.mobile-menu-item {
  border-bottom: 1px solid #E5E5E5;
}

.mobile-menu-link {
  display: block;
  padding: 16px 0;
  color: #2C2C2C;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
}

.mobile-menu-link:active {
  background: #FCE7F3;
}

.mobile-submenu {
  padding-left: 16px;
  padding-bottom: 8px;
}

.mobile-submenu-link {
  display: block;
  padding: 12px 0;
  color: #757575;
  font-size: 15px;
}
```

**Mobile Menu Overlay:**
```css
.mobile-menu-overlay {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 300ms ease;
  z-index: 98;
}

.mobile-menu-overlay.visible {
  opacity: 1;
  visibility: visible;
}
```

### 4. Footer

**Component:** `<Footer />`

**Structure:**
```jsx
<footer className="footer">
  <div className="footer-container">
    <div className="footer-brand">
      <Logo />
      <p className="footer-tagline">
        Where Every Moment Finds Its Perfect Space
      </p>
      <SocialLinks />
    </div>

    <div className="footer-links">
      <FooterColumn title="Explore">
        {/* Links */}
      </FooterColumn>
      <FooterColumn title="Plan Events">
        {/* Links */}
      </FooterColumn>
      <FooterColumn title="Get in Touch">
        {/* Links */}
      </FooterColumn>
    </div>

    <div className="footer-newsletter">
      <NewsletterSignup />
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2025 Amante Restaurant. All rights reserved.</p>
    <div className="footer-legal">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/cancellation">Cancellation Policy</a>
    </div>
  </div>
</footer>
```

**Styling:**
```css
.footer {
  background: #1F1F1F;
  color: #FCE7F3;
  padding: 64px 0 24px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-tagline {
  font-size: 14px;
  color: #F8BBD9;
  line-height: 1.6;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.footer-column h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: white;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 12px;
}

.footer-column a {
  color: #FCE7F3;
  text-decoration: none;
  font-size: 14px;
  transition: color 200ms ease;
}

.footer-column a:hover {
  color: white;
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 40px 0;
  border-top: 1px solid #4A4A4A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #757575;
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.footer-legal a {
  color: #757575;
  text-decoration: none;
  transition: color 200ms ease;
}

.footer-legal a:hover {
  color: #F8BBD9;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
```

---

## HERO COMPONENTS

### 1. Full-Screen Hero (Homepage)

**Component:** `<HeroSection />`

**Specifications:**
```
Height: 100vh (minimum: 600px)
Background: Image with overlay
Text: Centered, white
CTAs: Centered below text
```

**Structure:**
```jsx
<section className="hero-fullscreen">
  <div className="hero-background">
    <Image src="/hero-image.jpg" alt="" fill priority />
    <div className="hero-overlay" />
  </div>

  <div className="hero-content">
    <h1 className="hero-title">
      Six Unique Spaces. One Unforgettable Destination.
    </h1>
    <p className="hero-subtitle">
      Experience Bhopal's most versatile dining destination where
      every moment deserves the perfect setting.
    </p>
    <div className="hero-ctas">
      <Button variant="primary" size="lg">
        Reserve Your Table
      </Button>
      <Button variant="secondary" size="lg">
        Explore Our Spaces
      </Button>
    </div>
  </div>

  <div className="hero-scroll-indicator">
    <span>Scroll to explore</span>
    <ChevronDown />
  </div>
</section>
```

**Styling:**
```css
.hero-fullscreen {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.5)
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 24px;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.95;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 14px;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-ctas {
    flex-direction: column;
    width: 100%;
  }
}
```

### 2. Space Hero (Space Pages)

**Component:** `<SpaceHero />`

**Specifications:**
```
Height: 70vh (minimum: 500px)
Background: Space-specific image
Title: Large, overlay text
CTA: Single prominent button
```

**Styling:**
```css
.space-hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  padding: 64px 40px;
}

.space-hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  color: white;
}

.space-hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 16px;
}

.space-hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .space-hero {
    height: 50vh;
    padding: 32px 24px;
  }

  .space-hero-title {
    font-size: 28px;
  }

  .space-hero-description {
    font-size: 16px;
  }
}
```

---

## CARD COMPONENTS

### 1. Space Preview Card

**Component:** `<SpaceCard />`

**Specifications:**
```
Width: Flexible (grid item)
Aspect Ratio: 4:3 for image
Card: White background with shadow
Hover: Lift effect
```

**Structure:**
```jsx
<article className="space-card">
  <div className="space-card-image">
    <Image src={imageSrc} alt={title} fill />
  </div>
  <div className="space-card-content">
    <h3 className="space-card-title">{title}</h3>
    <p className="space-card-description">{description}</p>
    <Link href={href} className="space-card-link">
      Explore {title} →
    </Link>
  </div>
</article>
```

**Styling:**
```css
.space-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.space-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.space-card-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.space-card-image img {
  transition: transform 400ms ease;
}

.space-card:hover .space-card-image img {
  transform: scale(1.05);
}

.space-card-content {
  padding: 24px;
}

.space-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 700;
  color: #2C2C2C;
  margin-bottom: 12px;
}

.space-card-description {
  font-size: 15px;
  line-height: 1.6;
  color: #757575;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.space-card-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #B91C1C;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: gap 200ms ease;
}

.space-card-link:hover {
  gap: 8px;
}
```

### 2. Menu Item Card

**Component:** `<MenuItemCard />`

**Structure:**
```jsx
<div className="menu-item-card">
  <div className="menu-item-image">
    <Image src={imageSrc} alt={name} fill />
    <div className="menu-item-badge">
      <VegIcon /> {/* or NonVeg, Vegan */}
    </div>
  </div>
  <div className="menu-item-content">
    <div className="menu-item-header">
      <h4 className="menu-item-name">{name}</h4>
      <span className="menu-item-price">₹{price}</span>
    </div>
    <p className="menu-item-description">{description}</p>
    <div className="menu-item-actions">
      <button className="save-button">
        <Heart /> Save
      </button>
    </div>
  </div>
</div>
```

**Styling:**
```css
.menu-item-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 200ms ease;
}

.menu-item-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.menu-item-image {
  position: relative;
  aspect-ratio: 1;
  background: #F5F5F5;
}

.menu-item-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.menu-item-content {
  padding: 16px;
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.menu-item-name {
  font-size: 16px;
  font-weight: 600;
  color: #2C2C2C;
  line-height: 1.3;
}

.menu-item-price {
  font-size: 16px;
  font-weight: 700;
  color: #B91C1C;
  white-space: nowrap;
}

.menu-item-description {
  font-size: 14px;
  line-height: 1.5;
  color: #757575;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.menu-item-actions {
  display: flex;
  gap: 8px;
}

.save-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  color: #757575;
  font-size: 14px;
  cursor: pointer;
  transition: all 200ms ease;
}

.save-button:hover {
  background: #FCE7F3;
  border-color: #F8BBD9;
  color: #B91C1C;
}

.save-button.saved {
  background: #FCE7F3;
  border-color: #B91C1C;
  color: #B91C1C;
}
```

### 3. Event Card

**Component:** `<EventCard />`

**Styling:**
```css
.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 200ms ease;
}

.event-card-date {
  background: #B91C1C;
  color: white;
  padding: 12px;
  text-align: center;
}

.event-card-day {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.event-card-month {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.event-card-image {
  position: relative;
  aspect-ratio: 16/9;
}

.event-card-content {
  padding: 24px;
}

.event-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #2C2C2C;
  margin-bottom: 12px;
}

.event-card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #757575;
}

.event-card-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.event-card-description {
  font-size: 15px;
  line-height: 1.6;
  color: #757575;
  margin-bottom: 20px;
}

.event-card-actions {
  display: flex;
  gap: 12px;
}
```

---

## FORM COMPONENTS

### 1. Input Field

**Component:** `<InputField />`

**Props:**
- label (string)
- name (string)
- type (string)
- placeholder (string)
- required (boolean)
- helperText (string)
- error (string)
- value (string)
- onChange (function)

**Structure:**
```jsx
<div className={`form-field ${error ? 'has-error' : ''}`}>
  <label htmlFor={name} className="form-label">
    {label}
    {required && <span className="required">*</span>}
  </label>
  <input
    id={name}
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="form-input"
    aria-invalid={error ? 'true' : 'false'}
    aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
  />
  {helperText && !error && (
    <p id={`${name}-helper`} className="form-helper">
      {helperText}
    </p>
  )}
  {error && (
    <p id={`${name}-error`} className="form-error">
      <AlertCircle size={16} />
      {error}
    </p>
  )}
</div>
```

**Styling:**
```css
.form-field {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2C2C2C;
  margin-bottom: 8px;
}

.form-label .required {
  color: #EF4444;
  margin-left: 4px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: #2C2C2C;
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  transition: all 200ms ease;
}

.form-input::placeholder {
  color: #757575;
}

.form-input:focus {
  outline: none;
  border-color: #B91C1C;
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
}

.form-field.has-error .form-input {
  border-color: #EF4444;
}

.form-field.has-error .form-input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input:disabled {
  background: #F5F5F5;
  color: #757575;
  cursor: not-allowed;
}

.form-helper {
  margin-top: 6px;
  font-size: 13px;
  color: #757575;
  line-height: 1.4;
}

.form-error {
  margin-top: 6px;
  font-size: 13px;
  color: #EF4444;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.4;
}
```

### 2. Select Dropdown

**Component:** `<SelectField />`

**Styling:**
```css
.form-select {
  width: 100%;
  padding: 12px 40px 12px 16px;
  font-size: 16px;
  color: #2C2C2C;
  background: white url("data:image/svg+xml...") no-repeat right 12px center;
  background-size: 16px;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.form-select:focus {
  outline: none;
  border-color: #B91C1C;
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
}
```

### 3. Textarea

**Component:** `<TextareaField />`

**Styling:**
```css
.form-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  font-size: 16px;
  font-family: inherit;
  color: #2C2C2C;
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  resize: vertical;
  transition: all 200ms ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #B91C1C;
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
}

.textarea-counter {
  margin-top: 6px;
  text-align: right;
  font-size: 13px;
  color: #757575;
}

.textarea-counter.limit-reached {
  color: #EF4444;
}
```

### 4. Submit Button

**Component:** `<SubmitButton />`

**Styling:**
```css
.submit-button {
  width: 100%;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: #B91C1C;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
  position: relative;
  overflow: hidden;
}

.submit-button:hover:not(:disabled) {
  background: #991B1B;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(185, 28, 28, 0.3);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button.loading {
  color: transparent;
}

.submit-button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## UI FEEDBACK COMPONENTS

### 1. Toast Notification

**Component:** `<Toast />`

**Styling:**
```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  min-width: 320px;
  max-width: 480px;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  z-index: 500;
  animation: slideIn 300ms ease;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast.success {
  border-left: 4px solid #10B981;
}

.toast.error {
  border-left: 4px solid #EF4444;
}

.toast.warning {
  border-left: 4px solid #F59E0B;
}

.toast.info {
  border-left: 4px solid #3B82F6;
}

.toast-icon {
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: 15px;
  font-weight: 600;
  color: #2C2C2C;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 14px;
  color: #757575;
  line-height: 1.5;
}

.toast-close {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #757575;
  transition: all 150ms ease;
}

.toast-close:hover {
  background: #F5F5F5;
  color: #2C2C2C;
}
```

### 2. Loading Spinner

**Component:** `<LoadingSpinner />`

**Styling:**
```css
.loading-spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(185, 28, 28, 0.1);
  border-top-color: #B91C1C;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.loading-spinner.large {
  width: 60px;
  height: 60px;
  border-width: 5px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 3. Success Message

**Component:** `<SuccessMessage />`

**Styling:**
```css
.success-message {
  background: #D1FAE5;
  border: 1px solid #10B981;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  animation: scaleIn 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: #10B981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.success-title {
  font-size: 20px;
  font-weight: 700;
  color: #047857;
  margin-bottom: 8px;
}

.success-description {
  font-size: 15px;
  color: #065F46;
  line-height: 1.6;
}
```

### 4. Error Message

**Component:** `<ErrorMessage />`

**Styling:**
```css
.error-message {
  background: #FEE2E2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.error-icon {
  flex-shrink: 0;
  color: #EF4444;
}

.error-content {
  flex: 1;
}

.error-title {
  font-size: 15px;
  font-weight: 600;
  color: #991B1B;
  margin-bottom: 4px;
}

.error-description {
  font-size: 14px;
  color: #7F1D1D;
  line-height: 1.5;
}
```

---

## BUTTON VARIANTS

### Primary Button
```css
.btn-primary {
  padding: 12px 24px;
  background: #B91C1C;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: #991B1B;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(185, 28, 28, 0.3);
}
```

### Secondary Button
```css
.btn-secondary {
  padding: 12px 24px;
  background: #FCE7F3;
  color: #B91C1C;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #F8BBD9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: #F8BBD9;
  border-color: #F3A8CC;
}
```

### Outline Button
```css
.btn-outline {
  padding: 12px 24px;
  background: transparent;
  color: #B91C1C;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #B91C1C;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-outline:hover {
  background: #B91C1C;
  color: white;
}
```

### Button Sizes
```css
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-md {
  padding: 12px 24px;
  font-size: 16px;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
}
```

---

**COMPONENT SPECS STATUS:** ✅ COMPLETE

**Next Steps:** Implement these components using React + Tailwind CSS

**Designer:** UI/UX Design Agent
**Date:** October 25, 2025
**Version:** 1.0
