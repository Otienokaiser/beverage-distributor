  /*
   PRIMESIP DISTRIBUTORS — app.js
   Vanilla JS | No frameworks | No jQuery
  */

(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  const WA_NUMBER = '254706601887';
  const INITIAL_VISIBLE = 6;

  /* CATEGORY METADATA */
  const categoryMeta = {
    'Wine': {
      id: 'wine',
      eyebrow: 'Curated Collection',
      title: 'Premium Wine Collection',
      desc: 'Explore our carefully selected range of South African, Italian, and international wines — perfect for restaurants, hotels, and retail.',
    },
    'Whisky': {
      id: 'whisky',
      eyebrow: 'World-Class Spirits',
      title: 'Premium Whisky Selection',
      desc: 'From smooth blended Scotch to aged single malts and iconic American whiskeys — we stock the brands your customers trust.',
    },
    'Vodka': {
      id: 'vodka',
      eyebrow: 'Clean & Crisp',
      title: 'Vodka Collection',
      desc: 'Premium and everyday vodka options for every occasion, from international favourites to popular local brands.',
    },
    'Gin': {
      id: 'gin',
      eyebrow: 'Botanical Excellence',
      title: 'Gin Selection',
      desc: 'Classic and craft gins from the world\'s most celebrated distilleries — ideal for high-end bars and retail outlets.',
    },
    'Brandy & Cognac': {
      id: 'brandy',
      eyebrow: 'Refined & Aged',
      title: 'Brandy & Cognac',
      desc: 'The finest aged cognacs and brandies from Hennessy, Martell, and Remy Martin — sophistication in every bottle.',
    },
    'Tequila': {
      id: 'tequila',
      eyebrow: 'Authentic Mexican',
      title: 'Tequila Collection',
      desc: 'Gold and silver tequilas from trusted brands, bringing the authentic Mexican spirit to your establishment.',
    },
    'Rum': {
      id: 'rum',
      eyebrow: 'Smooth & Versatile',
      title: 'Rum Selection',
      desc: 'Premium rums perfect for cocktails, sipping, and mixing — sourced from the world\'s leading distilleries.',
    },
    'Liqueur': {
      id: 'liqueur',
      eyebrow: 'Rich & Distinctive',
      title: 'Liqueur Collection',
      desc: 'A diverse range of liqueurs from Amarula to Jägermeister and Kahlúa — crafted for discerning palates.',
    },
    'Bitters': {
      id: 'bitters',
      eyebrow: 'Cocktail Essentials',
      title: 'Bitters',
      desc: 'Essential cocktail ingredients including the world-renowned Angostura Bitters — a must-stock for any bar.',
    },
    'Non-Alcoholic': {
      id: 'non-alcoholic',
      eyebrow: 'Refreshing Options',
      title: 'Non-Alcoholic Beverages',
      desc: 'Energy drinks and non-alcoholic options to complete your full-range beverage offering for all customers.',
    },
  };

  /* ---------- HELPERS ---------- */

  function waOrderUrl(category) {
    const text = encodeURIComponent(
      `Hello, I would like to place an order from your ${category} collection.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }

  function waProductUrl(productName) {
    const text = encodeURIComponent(
      `Hello, I would like to order: ${productName}. Please advise on availability and pricing.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }

  /* SVG icons as strings */
  const svgWA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.43a.5.5 0 0 0 .612.612l5.638-1.462A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.503-5.237-1.382l-.374-.217-3.882 1.007 1.032-3.764-.235-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

  /* ---------- BUILD PRODUCT CARD ---------- */
  function buildProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('itemscope', '');
    article.setAttribute('itemtype', 'https://schema.org/Product');

    const priceDisplay = product.price && product.price > 0
      ? `<p class="card-price" itemprop="price">KES ${product.price.toLocaleString()}</p>`
      : `<p class="card-price call-for-price">Call for pricing</p>`;

    article.innerHTML = `
      <div class="card-img-wrap">
        <img
          src="${product.image}"
          alt="${product.name} — ${product.category}"
          width="220"
          height="200"
          loading="lazy"
          itemprop="image"
          onerror="this.src='images/placeholder.png'; this.onerror=null;"
        />
      </div>
      <div class="card-body">
        <p class="card-category">${product.category}</p>
        <h3 itemprop="name">${product.name}</h3>
        ${priceDisplay}
        <hr class="card-divider" />
        <a
          href="${waProductUrl(product.name)}"
          class="card-wa-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order ${product.name} via WhatsApp"
        >
          ${svgWA} Order
        </a>
      </div>
    `;

    return article;
  }

  /* ---------- BUILD CATEGORY SECTION ---------- */
  function buildCategorySection(categoryName, categoryProducts, index) {
    const meta = categoryMeta[categoryName] || {
      id: categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      eyebrow: 'Our Collection',
      title: categoryName,
      desc: `Browse our full selection of ${categoryName}.`,
    };

    const section = document.createElement('section');
    section.className = 'category-section';
    section.id = meta.id;
    section.setAttribute('aria-labelledby', `cat-heading-${meta.id}`);

    /* Hero block */
    const heroDiv = document.createElement('div');
    heroDiv.className = 'category-hero';
    heroDiv.innerHTML = `
      <div class="category-hero-text">
        <p class="category-eyebrow">${meta.eyebrow}</p>
        <h2 id="cat-heading-${meta.id}">${meta.title}</h2>
        <p class="category-desc">${meta.desc}</p>
      </div>
      <div class="category-hero-actions">
        <a
          href="${waOrderUrl(categoryName)}"
          class="btn btn-wa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order from ${categoryName} collection via WhatsApp"
        >
          ${svgWA} Order Now
        </a>
      </div>
    `;

    /* Slider */
    const sliderOuter = document.createElement('div');
    sliderOuter.className = 'slider-outer';

    const track = document.createElement('div');
    track.className = 'product-track';
    track.setAttribute('role', 'list');
    track.setAttribute('aria-label', `${categoryName} products`);

    /* Touch/swipe scroll support */
    enableDragScroll(track);

    categoryProducts.forEach((product, i) => {
      const card = buildProductCard(product);
      card.setAttribute('role', 'listitem');
      if (i >= INITIAL_VISIBLE) {
        card.classList.add('hidden-card');
      }
      track.appendChild(card);
    });

    sliderOuter.appendChild(track);

    /* View All button (only if more than INITIAL_VISIBLE) */
    const sliderFooter = document.createElement('div');
    sliderFooter.className = 'slider-footer';

    if (categoryProducts.length > INITIAL_VISIBLE) {
      const remaining = categoryProducts.length - INITIAL_VISIBLE;
      const viewAllBtn = document.createElement('button');
      viewAllBtn.className = 'btn btn-ghost';
      viewAllBtn.type = 'button';
      viewAllBtn.textContent = `View All (${remaining} more)`;
      viewAllBtn.setAttribute('aria-expanded', 'false');
      viewAllBtn.setAttribute('aria-controls', `track-${meta.id}`);
      track.id = `track-${meta.id}`;

      let expanded = false;
      viewAllBtn.addEventListener('click', () => {
        expanded = !expanded;
        const hiddenCards = track.querySelectorAll('.hidden-card');
        hiddenCards.forEach(card => {
          card.style.display = expanded ? '' : 'none';
          if (expanded) card.classList.remove('hidden-card');
          else card.classList.add('hidden-card');
        });

        if (expanded) {
          /* Show all — remove hidden class from all cards */
          track.querySelectorAll('.product-card').forEach(c => {
            c.style.display = '';
            c.classList.remove('hidden-card');
          });
          viewAllBtn.textContent = 'Show Less';
          viewAllBtn.setAttribute('aria-expanded', 'true');
        } else {
          /* Re-hide cards beyond initial limit */
          const allCards = track.querySelectorAll('.product-card');
          allCards.forEach((c, idx) => {
            if (idx >= INITIAL_VISIBLE) {
              c.classList.add('hidden-card');
              c.style.display = 'none';
            }
          });
          viewAllBtn.textContent = `View All (${remaining} more)`;
          viewAllBtn.setAttribute('aria-expanded', 'false');
          /* Scroll section into view smoothly */
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      sliderFooter.appendChild(viewAllBtn);
    }

    section.appendChild(heroDiv);
    section.appendChild(sliderOuter);
    section.appendChild(sliderFooter);

    return section;
  }

  /* ---------- DRAG / SWIPE SCROLL ---------- */
  function enableDragScroll(el) {
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      el.style.cursor = 'grabbing';
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = ''; });
    el.addEventListener('mouseup', () => { isDown = false; el.style.cursor = ''; });
    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.4;
      el.scrollLeft = scrollLeft - walk;
    });
  }

  /* ---------- RENDER ALL CATEGORIES ---------- */
  function renderCategories() {
    const main = document.getElementById('main-content');
    if (!main) return;

    /* Group products by category, maintaining metadata order */
    const categoryOrder = Object.keys(categoryMeta);
    const grouped = {};

    products.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });

    /* Render in defined order first, then any extra categories */
    const allCategories = [
      ...categoryOrder.filter(c => grouped[c]),
      ...Object.keys(grouped).filter(c => !categoryOrder.includes(c)),
    ];

    allCategories.forEach((cat, index) => {
      if (grouped[cat] && grouped[cat].length > 0) {
        const section = buildCategorySection(cat, grouped[cat], index);
        main.appendChild(section);
      }
    });
  }

  /* ---------- SEARCH ---------- */
  function initSearch() {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    const resultsSection = document.getElementById('search-results-section');
    const resultsGrid = document.getElementById('search-results-grid');
    const noResultsMsg = document.getElementById('no-results-msg');
    const mainContent = document.getElementById('main-content');
    const siteHero = document.querySelector('.site-hero');

    if (!input) return;

    let debounceTimer;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = input.value.trim().toLowerCase();
        handleSearch(query);
      }, 150);
    });

    clearBtn && clearBtn.addEventListener('click', () => {
      input.value = '';
      handleSearch('');
      input.focus();
    });

    function handleSearch(query) {
      if (query.length === 0) {
        /* Reset to normal view */
        resultsSection.hidden = true;
        mainContent.hidden = false;
        siteHero && (siteHero.hidden = false);
        clearBtn && (clearBtn.hidden = true);
        return;
      }

      clearBtn && (clearBtn.hidden = false);

      const matches = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );

      /* Hide main sections, show search results */
      mainContent.hidden = true;
      siteHero && (siteHero.hidden = true);
      resultsSection.hidden = false;

      /* Clear old results */
      resultsGrid.innerHTML = '';
      noResultsMsg.hidden = true;

      if (matches.length === 0) {
        noResultsMsg.hidden = false;
        return;
      }

      /* Update heading */
      const heading = resultsSection.querySelector('.search-results-title');
      if (heading) heading.textContent = `Search Results (${matches.length} found for "${input.value.trim()}")`;

      matches.forEach(product => {
        const card = buildProductCard(product);
        resultsGrid.appendChild(card);
      });
    }
  }

  /* ---------- MOBILE NAV TOGGLE ---------- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });

    /* Close nav when a link is clicked */
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- PLACEHOLDER IMAGE FALLBACK ---------- */
  function createPlaceholder() {
    /* Create a tiny SVG placeholder via a data URI */
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#f0ede8';
    ctx.fillRect(0, 0, 220, 200);
    ctx.fillStyle = '#c8a84b';
    ctx.font = 'bold 14px Helvetica Neue, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No Image', 110, 108);
    /* We can't write to filesystem, so we inject a style instead */
    const dataURL = canvas.toDataURL('image/png');
    const style = document.createElement('style');
    style.textContent = `
      .card-img-wrap img[src="images/placeholder.png"] {
        background: #f0ede8;
      }
    `;
    document.head.appendChild(style);
    /* Override the onerror fallback src with the generated data URL */
    window.__placeholderSrc = dataURL;
  }

  /* Override img onerror once placeholder is ready */
  document.addEventListener('DOMContentLoaded', () => {
    createPlaceholder();

    /* Patch all card onerror handlers to use generated placeholder */
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG' && !e.target.dataset.errored) {
        e.target.dataset.errored = '1';
        if (window.__placeholderSrc) {
          e.target.src = window.__placeholderSrc;
        }
        e.target.onerror = null;
      }
    }, true);
  });

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    initSearch();
    initMobileNav();
    setFooterYear();
  });

})();
