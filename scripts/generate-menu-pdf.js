const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Import menu data
const foodMenu = require('../src/data/menus/food.json');
const barMenu = require('../src/data/menus/bar.json');
const cafeMenu = require('../src/data/menus/cafe.json');

const BRAND_COLOR = '#8B1538';

// Amante Logo SVG (embedded)
const LOGO_SVG = `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><style>.cls-1{fill:#a50201;stroke-width:0px;}</style></defs><path class="cls-1" d="M239.57,509.49l-14.83-33.4-21.48,49.9-3.33,7.76-.97,2.36c-1.94,6.79,3.33,11.37,5.41,12.2.42.14.42,1.11.42,1.11h-23.28s0-.97.42-1.11c2.22-.83,10.81-7.48,13.58-13.86v.28s36.17-84.13,36.17-84.13h7.62s39.64,89.26,39.64,89.26c2.91,5.82,8.32,7.62,10.4,8.46.42.14.55,1.11.55,1.11h-42.55s0-.97.42-1.11c2.08-.83,7.76-1.52,5.27-8.46l-9.15-20.65-4.3-9.7Z"/><path class="cls-1" d="M237.79,513.6h0c-3.21-3.21-8.42-3.21-11.63,0l-1.81,1.81-1.86-1.86c-3.21-3.21-8.42-3.21-11.63,0h0c-3.21,3.21-3.21,8.42,0,11.63l1.86,1.86-.04.04,11.63,11.63,13.48-13.48c3.21-3.21,3.21-8.42,0-11.63Z"/><path class="cls-1" d="M388.29,540.54l-6.65-63.76-30.63,72.63h-5.13c2.36-42-21.21-51.98-30.63-76.37l-6.65,62.79c-.14,7.48,6.24,11.64,9.84,12.47.55.14.42,1.11.42,1.11h-26.89s0-.97.42-1.11c3.6-.83,11.09-4.99,12.61-12.75l7.62-73.46c.14-6.93-5.13-7.9-7.07-8.73-.42-.14-.55-.97-.55-.97h27.72c5.27,27.17,27.58,34.1,29.66,60.43l25.64-60.43h23.56s0,.83-.42.97c-2.08.69-7.07,1.94-7.21,8.73l8.18,77.76c1.25,7.62,8.18,7.62,10.4,8.46.42.14.42,1.11.42,1.11h-43.8s0-.97.42-1.11c2.08-.83,8.87-.69,8.73-7.76Z"/><path class="cls-1" d="M552.25,474.57v59.88c0,8.04,9.01,13.03,11.23,13.86.42.14.42,1.11.42,1.11h-26.89s0-.97.42-1.11c2.22-.83,11.23-5.82,11.23-13.86v-67.78c0-10.26-7.35-12.47-9.56-13.31-.42-.14-.42-.97-.42-.97h27.58c13.03,31.46,42.83,39.09,54.05,59.6v-44.63c0-8.04-9.01-13.17-11.23-14-.42-.14-.42-.97-.42-.97h26.89s0,.83-.42.97c-2.22.83-11.09,5.96-11.09,14v82.05s-4.99,0-4.99,0c-14.97-33.26-49.34-43.1-66.81-74.84Z"/><path class="cls-1" d="M702.22,455.58h-5.54s0,83.3,0,83.3c0,8.04,7.35,8.59,9.56,9.42.42.14.42,1.11.42,1.11h-43.66s0-.97.42-1.11c2.22-.83,9.56-1.39,9.56-9.42v-83.3s-5.41,0-5.41,0c-12.2,0-26.33,19.54-27.17,23.98-.14.28-1.11.42-1.11.42l4.57-27.58h81.91s4.44,27.58,4.44,27.58c0,0-.83-.14-.97-.42-.83-4.44-14.97-23.98-27.03-23.98Z"/><path class="cls-1" d="M795.91,483.85v34.1s-.97,0-1.11-.55c-.83-4.57-4.71-14.83-12.75-14.83h-13.86s0,36.31,0,36.31c0,5.96,4.02,6.79,6.93,6.79h8.04c16.35,0,32.99-25.64,34.37-28.14.14-.42.97-.42.97-.42l-9.29,32.29h-74.57s0-.97.42-1.11c2.22-.83,9.56-1.39,9.56-9.42v-76.09c0-8.04-7.35-8.59-9.56-9.42-.42-.14-.42-.97-.42-.97h72.49s0,25.36,0,25.36c0,0-.97-.14-1.11-.42-.83-2.36-6.51-21.21-19.96-21.21h-17.88s0,42.83,0,42.83h13.86s.55,0,.55,0c7.62-.42,11.36-10.26,12.2-14.69.14-.42,1.11-.42,1.11-.42Z"/><path class="cls-1" d="M483.09,509.49l-14.83-33.4-21.48,49.9-3.33,7.76-.97,2.36c-1.94,6.79,3.33,11.37,5.41,12.2.42.14.42,1.11.42,1.11h-23.28s0-.97.42-1.11c2.22-.83,10.81-7.48,13.58-13.86v.28s36.17-84.13,36.17-84.13h7.62s39.64,89.26,39.64,89.26c2.91,5.82,8.32,7.62,10.4,8.46.42.14.55,1.11.55,1.11h-42.55s0-.97.42-1.11c2.08-.83,7.76-1.52,5.27-8.46l-9.15-20.65-4.3-9.7Z"/><path class="cls-1" d="M481.31,513.6h0c-3.21-3.21-8.42-3.21-11.63,0l-1.81,1.81-1.86-1.86c-3.21-3.21-8.42-3.21-11.63,0h0c-3.21,3.21-3.21,8.42,0,11.63l1.86,1.86-.04.04,11.63,11.63,13.48-13.48c3.21-3.21,3.21-8.42,0-11.63Z"/><path class="cls-1" d="M856.14,600.2h-493.98v-4h493.98c24.84,0,45.04-20.21,45.04-45.04v-102.32c0-24.84-20.21-45.04-45.04-45.04h-224.38v-4h224.38c27.04,0,49.04,22,49.04,49.04v102.32c0,27.04-22,49.04-49.04,49.04Z"/><path class="cls-1" d="M339.5,600.2h-195.65c-27.04,0-49.04-22-49.04-49.04v-102.32c0-27.04,22-49.04,49.04-49.04h466.95v4H143.86c-24.84,0-45.04,20.21-45.04,45.04v102.32c0,24.84,20.21,45.04,45.04,45.04h195.65v4Z"/><path class="cls-1" d="M129.8,448.28h-4v-25.48c0-29.67,24.14-53.8,53.8-53.8h54.21v4h-54.21c-27.46,0-49.8,22.34-49.8,49.8v25.48Z"/><rect class="cls-1" x="125.8" y="479.28" width="4" height="41.68"/><path class="cls-1" d="M760.06,631H179.6c-29.67,0-53.8-24.14-53.8-53.8v-24.73h4v24.73c0,27.46,22.34,49.8,49.8,49.8h580.46v4Z"/><path class="cls-1" d="M820.4,631h-27.86v-4h27.86c27.46,0,49.8-22.34,49.8-49.8v-24.73h4v24.73c0,29.67-24.14,53.8-53.8,53.8Z"/><rect class="cls-1" x="870.2" y="478.87" width="4" height="41.92"/><path class="cls-1" d="M874.2,447.31h-4v-24.51c0-27.46-22.34-49.8-49.8-49.8H267.76v-4h552.64c29.67,0,53.8,24.14,53.8,53.8v24.51Z"/><path class="cls-1" d="M127.8,485.6c-1.10-2-.9-2-2,0-7.4-10.59-17.99-17.99-17.99-1.10-2-.9-2-2s.9-2,2-2c7.4,0,17.99-10.59,17.99-17.99,0-1.1.9-2,2-2s2,.9,2,2c0,7.4,10.59,17.99,17.99,17.99,1.1,0,2,.9,2,2s-.9,2-2,2c-7.4,0-17.99,10.59-17.99,17.99,0,1.1-.9,2-2,2ZM115.17,463.61c5.13,2.62,10.01,7.49,12.63,12.63,2.62-5.13,7.49-10.01,12.63-12.63-5.13-2.62-10.01-7.49-12.63-12.63-2.62,5.13-7.49,10.01-12.63,12.63Z"/><path class="cls-1" d="M127.8,558.38c-1.1,0-2-.9-2-2,0-7.4-10.59-17.99-17.99-17.99-1.1,0-2-.9-2-2s.9-2,2-2c7.4,0,17.99-10.59,17.99-17.99,0-1.1.9-2,2-2s2,.9,2,2c0,7.4,10.59,17.99,17.99,17.99,1.1,0,2,.9,2,2s-.9,2-2,2c-7.4,0-17.99,10.59-17.99,17.99,0,1.1-.9,2-2,2ZM115.17,536.39c5.13,2.62,10.01,7.49,12.63,12.63,2.62-5.13,7.49-10.01,12.63-12.63-5.13-2.62-10.01-7.49-12.63-12.63-2.62,5.13-7.49,10.01-12.63,12.63Z"/><path class="cls-1" d="M872.2,485.6c-1.1,0-2-.9-2-2,0-7.4-10.59-17.99-17.99-17.99-1.1,0-2-.9-2-2s.9-2,2-2c7.4,0,17.99-10.59,17.99-17.99,0-1.1.9-2,2-2s2,.9,2,2c0,7.4,10.59,17.99,17.99,17.99,1.1,0,2,.9,2,2s-.9,2-2,2c-7.4,0-17.99,10.59-17.99,17.99,0,1.1-.9,2-2,2ZM859.57,463.61c5.13,2.62,10.01,7.49,12.63,12.63,2.62-5.13,7.49-10.01,12.63-12.63-5.13-2.62-10.01-7.49-12.63-12.63-2.62,5.13-7.49,10.01-12.63,12.63Z"/><path class="cls-1" d="M872.2,558.38c-1.1,0-2-.9-2-2,0-7.4-10.59-17.99-17.99-17.99-1.1,0-2-.9-2-2s.9-2,2-2c7.4,0,17.99-10.59,17.99-17.99,0-1.1.9-2,2-2s2,.9,2,2c0,7.4,10.59,17.99,17.99,17.99,1.1,0,2,.9,2,2s-.9,2-2,2c-7.4,0-17.99,10.59-17.99,17.99,0,1.1-.9,2-2,2ZM859.57,536.39c5.13,2.62,10.01,7.49,12.63,12.63,2.62-5.13,7.49-10.01,12.63-12.63-5.13-2.62-10.01-7.49-12.63-12.63-2.62,5.13-7.49,10.01-12.63,12.63Z"/><path class="cls-1" d="M621.11,418.24c-1.1,0-2-.9-2-2,0-5-7.44-12.44-12.44-12.44-1.1,0-2-.9-2-2s.9-2,2-2c5,0,12.44-7.44,12.44-12.44,0-1.1.9-2,2-2s2,.9,2,2c0,5,7.44,12.44,12.44,12.44,1.1,0,2,.9,2,2s-.9,2-2,2c-5,0-12.44,7.44-12.44,12.44,0,1.1-.9,2-2,2ZM613.1,401.8c3.19,1.86,6.15,4.83,8.02,8.02,1.86-3.19,4.83-6.15,8.02-8.02-3.19-1.86-6.15-4.83-8.02-8.02-1.86,3.19-4.83,6.15-8.02,8.02Z"/><path class="cls-1" d="M349.82,614.64c-1.1,0-2-.9-2-2,0-5-7.44-12.44-12.44-12.44-1.1,0-2-.9-2-2s.9-2,2-2c5,0,12.44-7.44,12.44-12.44,0-1.1.9-2,2-2s2,.9,2,2c0,5,7.44,12.44,12.44,12.44,1.1,0,2,.9,2,2s-.9,2-2,2c-5,0-12.44,7.44-12.44,12.44,0,1.1-.9,2-2,2ZM341.81,598.2c3.19,1.86,6.15,4.83,8.02,8.02,1.86-3.19,4.83-6.15,8.02-8.02-3.19-1.86-6.15-4.83-8.02-8.02-1.86,3.19-4.83,6.15-8.02,8.02Z"/><path class="cls-1" d="M250.01,393.16c-1.1,0-2-.9-2-2,0-7.47-10.7-18.17-18.17-18.17-1.1,0-2-.9-2-2s.9-2,2-2c7.47,0,18.17-10.7,18.17-18.17,0-1.1.9-2,2-2s2,.9,2,2c0,7.47,10.7,18.17,18.17,18.17,1.1,0,2,.9,2,2s-.9,2-2,2c-7.47,0-18.17,10.7-18.17,18.17,0,1.1-.9,2-2,2ZM237.23,371c5.2,2.65,10.14,7.58,12.78,12.78,2.65-5.2,7.58-10.13,12.78-12.78-5.2-2.65-10.14-7.58-12.78-12.78-2.65,5.2-7.58,10.13-12.78,12.78Z"/><path class="cls-1" d="M776.17,651.17c-1.1,0-2-.9-2-2,0-7.47-10.7-18.17-18.17-18.17-1.1,0-2-.9-2-2s.9-2,2-2c7.47,0,18.17-10.7,18.17-18.17,0-1.1.9-2,2-2s2,.9,2,2c0,7.47,10.7,18.17,18.17,18.17,1.1,0,2,.9,2,2s-.9,2-2,2c-7.47,0-18.17,10.7-18.17,18.17,0,1.1-.9,2-2,2ZM763.39,629c5.2,2.65,10.14,7.58,12.78,12.78,2.65-5.2,7.58-10.14,12.78-12.78-5.2-2.65-10.14-7.58-12.78-12.78-2.65,5.2-7.58,10.14-12.78,12.78Z"/></svg>`;

// Helper function to group items by dietary type
function groupItemsByDietary(items) {
  const veg = items.filter(item =>
    item.dietary && item.dietary.includes('veg') && !item.dietary.includes('non-veg')
  );
  const nonVeg = items.filter(item =>
    item.dietary && item.dietary.includes('non-veg')
  );
  const other = items.filter(item =>
    !item.dietary || (!item.dietary.includes('veg') && !item.dietary.includes('non-veg'))
  );

  return [...veg, ...other, ...nonVeg];
}

// Generate spice level indicator
function getSpiceLevel(level) {
  if (!level) return '';
  return '🌶️'.repeat(level);
}

// Generate dietary indicator
function getDietaryIcon(dietary) {
  if (!dietary) return '';

  const isVeg = dietary.includes('veg') && !dietary.includes('non-veg');
  const isNonVeg = dietary.includes('non-veg');

  if (isVeg) {
    return '<span class="dietary-icon veg">●</span>';
  }
  if (isNonVeg) {
    return '<span class="dietary-icon non-veg">●</span>';
  }
  return '';
}

// Generate badges
function getBadges(item) {
  let badges = '';
  if (item.isRecommended) {
    badges += '<span class="badge recommended">⭐ RECOMMENDED</span>';
  }
  if (item.isChefSpecial) {
    badges += '<span class="badge chef-special">👨‍🍳 CHEF\'S SPECIAL</span>';
  }
  return badges;
}

// Generate menu item HTML
function generateMenuItem(item) {
  const sortedItem = groupItemsByDietary([item])[0];
  return `
    <div class="menu-item">
      <div class="item-header">
        ${getDietaryIcon(item.dietary)}
        <span class="item-name">${item.name}</span>
        <span class="item-dots"></span>
        <span class="item-price">₹${item.price}</span>
      </div>
      ${item.bottlePrice ? `<div class="bottle-price">₹${item.bottlePrice.toLocaleString('en-IN')} (Bottle)</div>` : ''}
      <div class="item-description">${item.description}</div>
      ${item.spiceLevel ? `<div class="spice-level">${getSpiceLevel(item.spiceLevel)}</div>` : ''}
      ${getBadges(item)}
    </div>
  `;
}

// Generate category HTML
function generateCategory(category, menuType) {
  const sortedItems = groupItemsByDietary(category.items);

  return `
    <div class="menu-category">
      <h2 class="category-name">${category.name}</h2>
      <p class="category-description">${category.description}</p>
      <div class="category-divider"></div>
      ${sortedItems.map(item => generateMenuItem(item)).join('')}
    </div>
  `;
}

// Generate cover page
function generateCoverPage() {
  return `
    <div class="cover-page">
      <div class="cover-content">
        <div class="logo-container">
          ${LOGO_SVG}
        </div>
        <p class="tagline">A celebration of passion on a plate</p>
        <h1 class="menu-title">♦ MENU ♦</h1>
        <div class="menu-sections">
          <p>• Food Menu</p>
          <p>• Bar Menu</p>
          <p>• Café Menu</p>
        </div>
        <div class="contact-info">
          <p>1, Mahendra Business Square,</p>
          <p>Bawadia Kalan, Bhopal</p>
          <p>contact.cafeamante@gmail.com</p>
          <p>www.cafeamante.com</p>
        </div>
        <div class="tax-info-cover">
          <p><strong>All prices exclusive of taxes</strong></p>
          <p>Food & Café: GST 5%</p>
          <p>Bar: VAT 18%</p>
        </div>
      </div>
    </div>
  `;
}

// Generate section divider
function generateSectionDivider(title, description) {
  return `
    <div class="section-divider-page">
      <div class="section-content">
        <div class="small-logo-container">
          ${LOGO_SVG}
        </div>
        <h1 class="section-title">${title}</h1>
        <p class="section-subtitle">${description}</p>
      </div>
    </div>
  `;
}

// Generate final page
function generateFinalPage() {
  return `
    <div class="final-page">
      <div class="final-content">
        <div class="small-logo-container">
          ${LOGO_SVG}
        </div>

        <h2 class="final-heading">TAX INFORMATION</h2>
        <div class="tax-details">
          <div class="tax-section">
            <h3>FOOD MENU</h3>
            <p>GST @ 5% applicable</p>
          </div>

          <div class="tax-section">
            <h3>CAFÉ MENU</h3>
            <p>GST @ 5% applicable</p>
          </div>

          <div class="tax-section">
            <h3>BAR MENU</h3>
            <p>GST @ 18% applicable</p>
            <p>VAT @ 18% applicable</p>
          </div>
        </div>

        <p class="tax-note">
          All prices mentioned are exclusive of applicable taxes.<br>
          Taxes will be added to your final bill amount.
        </p>

        <div class="divider-line"></div>

        <h2 class="brand-name">♦ AMANTE ♦</h2>

        <div class="contact-details">
          <p>1, Mahendra Business Square</p>
          <p>Bawadia Kalan, Bhopal</p>
          <p></p>
          <p>contact.cafeamante@gmail.com</p>
          <p>www.cafeamante.com</p>
        </div>

        <div class="powered-by">
          <p>Powered by <strong>Restronaut</strong></p>
          <p>www.restronaut.in</p>
        </div>
      </div>
    </div>
  `;
}

// Generate complete HTML
function generateHTML() {
  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;600;700&family=Open+Sans:wght@300;400;600&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Open Sans', sans-serif;
        color: #000;
        line-height: 1.6;
      }

      .page {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        page-break-after: always;
        position: relative;
      }

      .page-footer {
        position: absolute;
        bottom: 15mm;
        left: 20mm;
        right: 20mm;
        text-align: center;
        font-size: 9pt;
        color: #666;
        border-top: 1px solid rgba(139, 21, 56, 0.3);
        padding-top: 5mm;
      }

      /* Cover Page */
      .cover-page {
        width: 210mm;
        height: 297mm;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #fff 0%, #FFF5F0 100%);
        page-break-after: always;
      }

      .cover-content {
        text-align: center;
        max-width: 150mm;
      }

      .logo-container {
        margin-bottom: 20mm;
      }

      .logo-container svg {
        width: 120mm;
        height: auto;
      }

      .tagline {
        font-family: 'Playfair Display', serif;
        font-size: 14pt;
        font-style: italic;
        color: ${BRAND_COLOR};
        margin-bottom: 10mm;
      }

      .menu-title {
        font-family: 'Playfair Display', serif;
        font-size: 32pt;
        color: ${BRAND_COLOR};
        margin-bottom: 15mm;
        letter-spacing: 2px;
      }

      .menu-sections {
        font-size: 14pt;
        margin-bottom: 15mm;
        line-height: 2;
      }

      .contact-info {
        font-size: 11pt;
        color: #666;
        margin-bottom: 15mm;
        line-height: 1.8;
      }

      .tax-info-cover {
        background: rgba(139, 21, 56, 0.05);
        padding: 10mm;
        border-radius: 5mm;
        font-size: 10pt;
        line-height: 1.8;
      }

      .tax-info-cover strong {
        font-size: 11pt;
        color: ${BRAND_COLOR};
      }

      /* Section Divider */
      .section-divider-page {
        width: 210mm;
        height: 297mm;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #fff 0%, #FFF5F0 100%);
        page-break-after: always;
      }

      .section-content {
        text-align: center;
      }

      .small-logo-container {
        margin-bottom: 10mm;
      }

      .small-logo-container svg {
        width: 80mm;
        height: auto;
      }

      .section-title {
        font-family: 'Playfair Display', serif;
        font-size: 36pt;
        color: ${BRAND_COLOR};
        margin-bottom: 5mm;
      }

      .section-subtitle {
        font-family: 'Playfair Display', serif;
        font-size: 14pt;
        font-style: italic;
        color: #666;
      }

      /* Menu Header */
      .page-header {
        text-align: center;
        margin-bottom: 10mm;
        padding-bottom: 5mm;
        border-bottom: 2px solid ${BRAND_COLOR};
      }

      .header-logo-container {
        margin-bottom: 3mm;
      }

      .header-logo-container svg {
        width: 60mm;
        height: auto;
      }

      .final-content .small-logo-container svg {
        width: 60mm;
        height: auto;
        margin-bottom: 10mm;
      }

      .menu-type-title {
        font-family: 'Playfair Display', serif;
        font-size: 20pt;
        color: ${BRAND_COLOR};
        margin-bottom: 2mm;
      }

      .menu-type-subtitle {
        font-style: italic;
        font-size: 10pt;
        color: #666;
      }

      /* Category */
      .menu-category {
        margin-bottom: 8mm;
      }

      .category-name {
        font-family: 'Playfair Display', serif;
        font-size: 16pt;
        color: ${BRAND_COLOR};
        margin-bottom: 2mm;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .category-description {
        font-size: 9pt;
        font-style: italic;
        color: #888;
        margin-bottom: 3mm;
      }

      .category-divider {
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, ${BRAND_COLOR} 0%, rgba(139, 21, 56, 0.3) 50%, ${BRAND_COLOR} 100%);
        margin-bottom: 5mm;
      }

      /* Menu Item */
      .menu-item {
        margin-bottom: 5mm;
        padding-left: 2mm;
      }

      .item-header {
        display: flex;
        align-items: center;
        margin-bottom: 1mm;
        position: relative;
      }

      .dietary-icon {
        font-size: 14pt;
        margin-right: 2mm;
        line-height: 1;
      }

      .dietary-icon.veg {
        color: #4CAF50;
      }

      .dietary-icon.non-veg {
        color: #F44336;
      }

      .item-name {
        font-family: 'Lora', serif;
        font-size: 11pt;
        font-weight: 700;
        color: #000;
        flex-shrink: 0;
      }

      .item-dots {
        flex: 1;
        border-bottom: 1px dotted #ccc;
        margin: 0 3mm;
        min-width: 10mm;
      }

      .item-price {
        font-family: 'Lora', serif;
        font-size: 11pt;
        font-weight: 700;
        color: ${BRAND_COLOR};
        flex-shrink: 0;
      }

      .bottle-price {
        font-size: 9pt;
        color: ${BRAND_COLOR};
        margin-left: 7mm;
        margin-bottom: 1mm;
        font-weight: 600;
      }

      .item-description {
        font-size: 9pt;
        color: #555;
        margin-left: 7mm;
        line-height: 1.5;
      }

      .spice-level {
        margin-left: 7mm;
        margin-top: 1mm;
        font-size: 10pt;
      }

      .badge {
        display: inline-block;
        font-size: 7pt;
        padding: 1mm 2mm;
        border-radius: 2mm;
        margin-left: 2mm;
        margin-top: 1mm;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .badge.recommended {
        background: #FFF3CD;
        color: #856404;
      }

      .badge.chef-special {
        background: ${BRAND_COLOR};
        color: white;
      }

      /* Final Page */
      .final-page {
        width: 210mm;
        height: 297mm;
        display: flex;
        align-items: center;
        justify-content: center;
        page-break-after: always;
      }

      .final-content {
        text-align: center;
        max-width: 150mm;
      }

      .final-logo {
        width: 60mm;
        height: auto;
        margin-bottom: 10mm;
      }

      .final-heading {
        font-family: 'Playfair Display', serif;
        font-size: 18pt;
        color: ${BRAND_COLOR};
        margin-bottom: 8mm;
        letter-spacing: 1px;
      }

      .tax-details {
        margin-bottom: 10mm;
      }

      .tax-section {
        margin-bottom: 5mm;
      }

      .tax-section h3 {
        font-family: 'Lora', serif;
        font-size: 12pt;
        color: #000;
        margin-bottom: 1mm;
      }

      .tax-section p {
        font-size: 10pt;
        color: #666;
        margin: 0.5mm 0;
      }

      .tax-note {
        font-size: 9pt;
        color: #666;
        line-height: 1.8;
        margin-bottom: 10mm;
        font-style: italic;
      }

      .divider-line {
        width: 60mm;
        height: 1px;
        background: ${BRAND_COLOR};
        margin: 10mm auto;
      }

      .brand-name {
        font-family: 'Playfair Display', serif;
        font-size: 20pt;
        color: ${BRAND_COLOR};
        margin-bottom: 8mm;
        letter-spacing: 2px;
      }

      .contact-details {
        font-size: 10pt;
        color: #666;
        line-height: 1.8;
        margin-bottom: 10mm;
      }

      .powered-by {
        font-size: 9pt;
        color: #999;
        line-height: 1.6;
      }

      .powered-by strong {
        color: #666;
      }

      @media print {
        .page {
          page-break-after: always;
        }
      }
    </style>
  `;

  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Amante Menu</title>
      ${styles}
    </head>
    <body>
  `;

  // Cover Page
  html += generateCoverPage();

  // Food Menu
  html += generateSectionDivider('FOOD MENU', 'Chowing down on the good stuff from the world');

  foodMenu.categories.forEach((category, index) => {
    html += `
      <div class="page">
        <div class="page-header">
          <div class="header-logo-container">
            ${LOGO_SVG}
          </div>
          <h1 class="menu-type-title">FOOD MENU</h1>
          <p class="menu-type-subtitle">${foodMenu.description}</p>
        </div>
        ${generateCategory(category, 'food')}
        <div class="page-footer">
          All prices exclusive of taxes | Food & Café: GST 5%
        </div>
      </div>
    `;
  });

  // Bar Menu
  html += generateSectionDivider('BAR MENU', 'Craft cocktails & premium spirits');

  barMenu.categories.forEach((category, index) => {
    html += `
      <div class="page">
        <div class="page-header">
          <div class="header-logo-container">
            ${LOGO_SVG}
          </div>
          <h1 class="menu-type-title">BAR MENU</h1>
          <p class="menu-type-subtitle">${barMenu.description}</p>
        </div>
        ${generateCategory(category, 'bar')}
        <div class="page-footer">
          All prices exclusive of taxes | Bar: VAT 18%
        </div>
      </div>
    `;
  });

  // Café Menu
  html += generateSectionDivider('CAFÉ MENU', 'Artisan coffee & fresh delights');

  cafeMenu.categories.forEach((category, index) => {
    html += `
      <div class="page">
        <div class="page-header">
          <div class="header-logo-container">
            ${LOGO_SVG}
          </div>
          <h1 class="menu-type-title">CAFÉ MENU</h1>
          <p class="menu-type-subtitle">${cafeMenu.description}</p>
        </div>
        ${generateCategory(category, 'cafe')}
        <div class="page-footer">
          All prices exclusive of taxes | Café: GST 5%
        </div>
      </div>
    `;
  });

  // Final Page
  html += generateFinalPage();

  html += `
    </body>
    </html>
  `;

  return html;
}

// Generate PDF
async function generatePDF() {
  console.log('Starting PDF generation...');

  const html = generateHTML();

  // Save HTML for debugging
  const htmlPath = path.join(__dirname, '../Amante_Complete_Menu.html');
  fs.writeFileSync(htmlPath, html);
  console.log(`HTML saved to: ${htmlPath}`);

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set content
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdfPath = path.join(__dirname, '../Amante_Complete_Menu.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

  await browser.close();

  console.log(`\n✅ PDF generated successfully!`);
  console.log(`📄 Location: ${pdfPath}`);
  console.log(`📊 File size: ${(fs.statSync(pdfPath).size / 1024 / 1024).toFixed(2)} MB`);

  return pdfPath;
}

// Run
generatePDF().catch(console.error);
