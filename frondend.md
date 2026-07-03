# SUPPLY CHAIN ORACLE - DESIGN SYSTEM UPGRADE PROMPT
## Mengadaptasi Gaya Onion AI untuk Frontend Modern

---

## OVERVIEW DESIGN PHILOSOPHY

Dari analisis image reference Onion AI, kita akan mengangkat Supply Chain Oracle dari "basic functional" menjadi **"enterprise-grade AI dashboard"** dengan karakteristik:

✅ **Dark theme sophisticated** (black/charcoal base)
✅ **Glassmorphism & subtle gradients** (modern depth)
✅ **Accent colors accent** (emerald green, orange warnings)
✅ **Geometric shapes & abstract backgrounds** (visual interest)
✅ **Premium typography** (large bold headlines, readable body)
✅ **Interactive micro-interactions** (smooth transitions, hover states)
✅ **Grid-based layouts** (consistent spacing)
✅ **Minimal but intentional** (white space as design element)

---

## BAGIAN 1: LANDING PAGE REDESIGN

### 1.1 Landing Page Hero Section (Copy dari Onion AI)

**Current state:** Basic hero with form (jelek)
**Target state:** Stunning hero dengan background dinamik

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  [Logo] Supply Chain Oracle    [Nav] [Whitepaper]          │
│                                                              │
│                                                              │
│                    🌀 [ANIMATED BACKGROUND - see below]     │
│                                                              │
│              Welcome to Supply Chain Oracle               │
│                                                              │
│         AI-Powered Inventory Forecasting & Automation     │
│              Predict. Optimize. Automate. Scale.          │
│                                                              │
│                 [Start Free Trial] ← CTA Button             │
│                                                              │
│                                                              │
│                    [More Sections Below]                    │
└─────────────────────────────────────────────────────────────┘
```

**Design Details:**

**1.1.1 Background & Visual Effect**
- **Primary:** Dark gray/charcoal background (#0A0E27 atau #1a1a2e)
- **Overlay effect:** 
  - Abstract geometric shapes (similar ke Onion AI)
  - Curved lines, flowing organic shapes (SVG-based)
  - Gradient overlays dari dark blue ke purple
  - Animated particles/dots yang subtle (tidak overwhelming)
  - Blur/glow effect pada edges

**Implementation:**
```css
/* Hero background */
.hero {
  background: linear-gradient(135deg, #0A0E27 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,...') no-repeat center;
  opacity: 0.15;
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}
```

**SVG Background (Abstract Shapes):**
```svg
<svg class="hero-bg" viewBox="0 0 1200 800">
  <!-- Curved flowing lines -->
  <path d="M -50 200 Q 300 100, 600 200 T 1250 250" 
        stroke="rgba(100, 200, 255, 0.2)" 
        stroke-width="2" 
        fill="none" />
  
  <!-- Organic blob shapes -->
  <circle cx="150" cy="150" r="200" fill="rgba(139, 92, 246, 0.08)" />
  <circle cx="1050" cy="650" r="300" fill="rgba(59, 130, 246, 0.08)" />
  
  <!-- Geometric grid (subtle) -->
  <g opacity="0.05">
    <line x1="0" y1="100" x2="1200" y2="100" stroke="white" />
    <!-- ... repeat untuk grid pattern -->
  </g>
</svg>
```

**1.1.2 Navigation Bar**
- Sticky top, semi-transparent dengan backdrop blur
- Dark background dengan slight glassmorphism
- Logo di kiri (kecil, subtle)
- Menu items: What We Do | How It Works | Use Cases | Pricing | Demo
- Right: [Get Whitepaper] button (subtle outline) + [Start Free] button (filled)

```html
<nav class="navbar-hero">
  <div class="navbar-container">
    <!-- Logo -->
    <div class="logo">
      <svg><!-- Supply Chain Oracle logo --></svg>
      <span>Supply Chain Oracle</span>
    </div>
    
    <!-- Menu items -->
    <ul class="nav-menu">
      <li><a href="#what">What We Do</a></li>
      <li><a href="#how">How It Works</a></li>
      <li><a href="#use-cases">Use Cases</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#demo">Demo</a></li>
    </ul>
    
    <!-- CTA buttons -->
    <div class="nav-cta">
      <button class="btn-outline">📄 Whitepaper</button>
      <button class="btn-primary">Start Free Trial</button>
    </div>
  </div>
</nav>

<style>
.navbar-hero {
  position: sticky;
  top: 0;
  background: rgba(10, 14, 39, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  padding: 1rem 2rem;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: white;
  font-size: 1.2rem;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-menu a {
  color: #ccc;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #8B5CF6; /* purple accent */
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(139, 92, 246, 0.5);
  color: #ccc;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-outline:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8B5CF6;
  color: white;
}

.btn-primary {
  background: #8B5CF6;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #A78BFA;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}
</style>
```

**1.1.3 Hero Content (Center)**
- **Badge:** "Welcome to Supply Chain Oracle" (small, uppercase, accent color)
- **Headline:** Large, bold, white
  - "AI-Powered Inventory Forecasting & Automation"
  - Font size: 3.5-4.5rem (desktop), responsive
  - Line height: 1.2
  - Letter spacing: -0.5px (tight)

- **Subheadline:** Smaller, gray, descriptive
  - "Predict. Optimize. Automate. Scale."
  - Font: lighter weight, 1.25rem

- **CTA Button:** Prominent, centered
  - "Start Free Trial" atau "Try Demo Now"
  - Large padding, bold text, shadow/glow effect

```html
<div class="hero-content">
  <div class="hero-badge">
    <span class="badge-icon">✨</span>
    Welcome to Supply Chain Oracle
  </div>
  
  <h1 class="hero-headline">
    AI-Powered Inventory<br>
    Forecasting & Automation
  </h1>
  
  <p class="hero-subheadline">
    Predict. Optimize. Automate. Scale.
  </p>
  
  <button class="btn-cta-large">
    Start Free Trial
  </button>
</div>

<style>
.hero-content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
  padding: 4rem 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 2rem;
  animation: fadeInDown 0.6s ease-out;
}

.hero-headline {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #ccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.hero-subheadline {
  font-size: 1.25rem;
  color: #999;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.btn-cta-large {
  background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

.btn-cta-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 50px rgba(139, 92, 246, 0.5);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

---

### 1.2 Feature Sections (Below Hero)

**Section structure:**
- 3-4 feature rows
- Alternating layout: image left / text right, then text left / image right
- Dark background dengan subtle accent colors

**1.2.1 Section 1: Real-Time AI Predictor**
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  [IMAGE/MOCKUP]          Real-Time AI Predictor             │
│  Dashboard preview       ─────────────────────────           │
│  screenshot             Instantly predict lead times with   │
│                         98.84% accuracy. Our XGBoost AI      │
│                         model analyzes product characteristics│
│                         in real-time to provide precise      │
│                         forecasting.                         │
│                                                              │
│                         • 98.84% R² accuracy                 │
│                         • <16 hour margin of error           │
│                         • Non-linear relationship handling   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Design approach:**
- Text (left/right alternating) dalam grid column
- Bold headline, regular body text
- Bullet points dengan accent color (orange/green)
- Mockup/screenshot di sisi lain (dengan shadow/depth effect)

```html
<section class="feature-section feature-predictor">
  <div class="section-container">
    <div class="feature-image">
      <div class="mockup-card">
        <!-- Embedded screenshot or interactive preview -->
        <img src="/mockups/predictor-preview.png" alt="Predictor Demo" />
      </div>
    </div>
    
    <div class="feature-content">
      <h2 class="feature-headline">
        Real-Time AI Predictor
      </h2>
      
      <p class="feature-description">
        Instantly predict lead times with 98.84% accuracy. 
        Our XGBoost AI model analyzes product characteristics 
        in real-time to provide precise forecasting.
      </p>
      
      <ul class="feature-list">
        <li>
          <span class="icon">✓</span>
          <span>98.84% R² accuracy</span>
        </li>
        <li>
          <span class="icon">✓</span>
          <span>&lt;16 hour margin of error</span>
        </li>
        <li>
          <span class="icon">✓</span>
          <span>Non-linear relationship handling</span>
        </li>
      </ul>
      
      <button class="btn-secondary">Learn More →</button>
    </div>
  </div>
</section>

<style>
.feature-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 100%);
  border-top: 1px solid rgba(139, 92, 246, 0.1);
}

.section-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.feature-image {
  position: relative;
}

.mockup-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.mockup-card:hover {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 30px 80px rgba(139, 92, 246, 0.2);
}

.feature-headline {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
}

.feature-description {
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  margin-bottom: 2rem;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #bbb;
}

.feature-list .icon {
  color: #10B981; /* emerald green */
  font-weight: 700;
  font-size: 1.2rem;
}

.btn-secondary {
  background: transparent;
  border: 2px solid rgba(139, 92, 246, 0.5);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: #8B5CF6;
  background: rgba(139, 92, 246, 0.1);
}

@media (max-width: 768px) {
  .section-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
```

---

## BAGIAN 2: DASHBOARD REDESIGN (Main App)

### 2.1 Dashboard Layout Structure (Copy dari Onion AI reference)

**Current:** Basic grid layout (jelek)
**Target:** Sophisticated dashboard dengan dark theme, glassmorphism, accent colors

```
┌─────────────────────────────────────────────────────────────┐
│ [☰] Logo  Inventory | Alerts | Reports  [🔔] [👤] [⚙️]      │ ← Top nav
├──────────┬───────────────────────────────────────────────────┤
│          │                                                    │
│ Sidebar  │  Dashboard Title                  [Refresh]       │
│ (Icons)  │  ──────────────────────────────────────────────   │
│          │                                                    │
│ • Home   │  ┌──────────────┐  ┌──────────────┐              │
│ • Stock  │  │ 12 Urgent    │  │ 45 Warning   │              │ ← Summary cards
│ • Orders │  │ SKUs Today   │  │ SKUs Active  │              │
│ • Reports│  └──────────────┘  └──────────────┘              │
│ • ...    │                                                    │
│          │  ┌───────────────────────────────────────────┐    │
│          │  │  Interactive Scatter Plot Map             │    │
│          │  │  (Real-time inventory visualization)      │    │ ← Main chart
│          │  │                                           │    │
│          │  │  [Color legend] [Filters] [Export]       │    │
│          │  └───────────────────────────────────────────┘    │
│          │                                                    │
│          │  ┌─────────────────┐  ┌──────────────────┐       │
│          │  │ Recent Orders   │  │ Alert History    │       │
│          │  │ (Table)         │  │ (Table)          │       │
│          │  └─────────────────┘  └──────────────────┘       │
│          │                                                    │
└──────────┴───────────────────────────────────────────────────┘
```

### 2.2 Top Navigation Bar

**Style:** Dark, glassmorphic, minimal

```html
<header class="dashboard-header">
  <div class="header-left">
    <button class="sidebar-toggle">☰</button>
    <div class="logo-mini">
      <svg><!-- Logo --></svg>
      <span>Supply Chain Oracle</span>
    </div>
  </div>
  
  <nav class="header-nav">
    <a href="#inventory" class="nav-link">Inventory</a>
    <a href="#alerts" class="nav-link">Alerts</a>
    <a href="#reports" class="nav-link">Reports</a>
  </nav>
  
  <div class="header-right">
    <button class="icon-btn">
      <svg class="icon-notification"><!-- Bell --></svg>
    </button>
    <button class="icon-btn">
      <svg class="icon-profile"><!-- Profile --></svg>
    </button>
    <button class="icon-btn">
      <svg class="icon-settings"><!-- Settings --></svg>
    </button>
  </div>
</header>

<style>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(10, 14, 39, 0.9);
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.logo-mini {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 1rem;
}

.header-nav {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: #999;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: white;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 2px;
  background: #8B5CF6;
}

.header-right {
  display: flex;
  gap: 1rem;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.3rem;
  transition: color 0.3s;
  padding: 0.5rem;
}

.icon-btn:hover {
  color: white;
}
</style>
```

### 2.3 Sidebar Navigation

**Style:** Collapsed by default, icons only. Expandable with text labels.

```html
<aside class="sidebar">
  <nav class="sidebar-nav">
    <button class="sidebar-item active" title="Dashboard">
      <svg class="sidebar-icon"><!-- Home --></svg>
      <span class="sidebar-label">Dashboard</span>
    </button>
    
    <button class="sidebar-item" title="Inventory">
      <svg class="sidebar-icon"><!-- Box --></svg>
      <span class="sidebar-label">Inventory</span>
    </button>
    
    <button class="sidebar-item" title="Orders">
      <svg class="sidebar-icon"><!-- ShoppingCart --></svg>
      <span class="sidebar-label">Orders</span>
    </button>
    
    <button class="sidebar-item" title="Alerts">
      <svg class="sidebar-icon"><!-- Bell --></svg>
      <span class="sidebar-label">Alerts</span>
    </button>
    
    <button class="sidebar-item" title="Reports">
      <svg class="sidebar-icon"><!-- BarChart --></svg>
      <span class="sidebar-label">Reports</span>
    </button>
    
    <!-- Divider -->
    <hr class="sidebar-divider" />
    
    <button class="sidebar-item" title="Settings">
      <svg class="sidebar-icon"><!-- Settings --></svg>
      <span class="sidebar-label">Settings</span>
    </button>
  </nav>
</aside>

<style>
.sidebar {
  width: 80px; /* collapsed */
  background: rgba(15, 23, 42, 0.8);
  border-right: 1px solid rgba(139, 92, 246, 0.1);
  padding: 1.5rem 0.5rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: width 0.3s;
}

.sidebar:hover,
.sidebar.expanded {
  width: 200px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  color: #999;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
  text-align: left;
}

.sidebar-item:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  color: white;
}

.sidebar-item.active {
  background: rgba(139, 92, 246, 0.2);
  border-color: #8B5CF6;
  color: white;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.sidebar-label {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar:hover .sidebar-label,
.sidebar.expanded .sidebar-label {
  opacity: 1;
}

.sidebar-divider {
  border: none;
  border-top: 1px solid rgba(139, 92, 246, 0.1);
  margin: 1rem 0;
}
</style>
```

### 2.4 Summary Stats Cards

**Style:** Glassmorphism, accent colors, number-heavy

```html
<section class="dashboard-summary">
  <div class="summary-grid">
    <!-- Card 1: Urgent -->
    <div class="stat-card stat-critical">
      <div class="stat-header">
        <h3 class="stat-title">🔴 Urgent Reorder</h3>
        <button class="stat-menu">⋯</button>
      </div>
      
      <div class="stat-value">12</div>
      <p class="stat-subtitle">SKU today requiring immediate action</p>
      
      <div class="stat-change negative">
        ↑ 3 from yesterday
      </div>
    </div>
    
    <!-- Card 2: Warning -->
    <div class="stat-card stat-warning">
      <div class="stat-header">
        <h3 class="stat-title">🟡 Planning Reorder</h3>
        <button class="stat-menu">⋯</button>
      </div>
      
      <div class="stat-value">45</div>
      <p class="stat-subtitle">SKU approaching reorder threshold</p>
      
      <div class="stat-change positive">
        ↓ 2 from yesterday
      </div>
    </div>
    
    <!-- Card 3: Safe -->
    <div class="stat-card stat-safe">
      <div class="stat-header">
        <h3 class="stat-title">🟢 Healthy Stock</h3>
        <button class="stat-menu">⋯</button>
      </div>
      
      <div class="stat-value">1,430</div>
      <p class="stat-subtitle">SKU in safe inventory levels</p>
      
      <div class="stat-change">
        94.3% coverage
      </div>
    </div>
    
    <!-- Card 4: Overstock -->
    <div class="stat-card stat-overstock">
      <div class="stat-header">
        <h3 class="stat-title">🟣 Overstock Review</h3>
        <button class="stat-menu">⋯</button>
      </div>
      
      <div class="stat-value">13</div>
      <p class="stat-subtitle">SKU exceeding optimal levels</p>
      
      <div class="stat-change">
        Excess: Rp 50M
      </div>
    </div>
  </div>
</section>

<style>
.dashboard-summary {
  padding: 2rem;
  margin-left: 80px;
  transition: margin-left 0.3s;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  color: white;
}

.stat-card:hover {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.stat-card.stat-critical {
  border-left: 4px solid #EF4444; /* red */
}

.stat-card.stat-warning {
  border-left: 4px solid #F59E0B; /* orange */
}

.stat-card.stat-safe {
  border-left: 4px solid #10B981; /* green */
}

.stat-card.stat-overstock {
  border-left: 4px solid #8B5CF6; /* purple */
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stat-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ccc;
}

.stat-menu {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: white;
}

.stat-subtitle {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.stat-change {
  font-size: 0.85rem;
  color: #10B981;
  font-weight: 600;
}

.stat-change.negative {
  color: #EF4444;
}

.stat-change.positive {
  color: #10B981;
}
</style>
```

### 2.5 Main Chart Area (Scatter Plot - Alert Map)

**Style:** Large, interactive, dark background

```html
<section class="dashboard-chart">
  <div class="chart-container">
    <div class="chart-header">
      <h2 class="chart-title">Inventory Risk Map</h2>
      <div class="chart-controls">
        <input type="text" placeholder="Search SKU..." class="chart-search" />
        
        <select class="chart-filter">
          <option>All Status</option>
          <option>Urgent Only</option>
          <option>Warning</option>
          <option>Safe</option>
        </select>
        
        <button class="chart-export">↓ Export Data</button>
      </div>
    </div>
    
    <!-- Chart will be rendered here using Recharts -->
    <div id="scatter-plot" class="scatter-plot">
      {/* Recharts ScatterChart component */}
    </div>
    
    <div class="chart-legend">
      <div class="legend-item">
        <span class="legend-dot" style="background: #EF4444;"></span>
        <span>Critical (Stock < ROP)</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background: #F59E0B;"></span>
        <span>Warning (Approaching ROP)</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background: #10B981;"></span>
        <span>Safe (Healthy Level)</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background: #8B5CF6;"></span>
        <span>Overstock (Excess)</span>
      </div>
    </div>
  </div>
</section>

<style>
.dashboard-chart {
  padding: 2rem;
  margin-left: 80px;
  transition: margin-left 0.3s;
}

.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.chart-controls {
  display: flex;
  gap: 1rem;
}

.chart-search {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.chart-search::placeholder {
  color: #666;
}

.chart-filter {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.chart-filter option {
  background: #0A0E27;
  color: white;
}

.chart-export {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.5);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.chart-export:hover {
  background: rgba(139, 92, 246, 0.3);
  border-color: #8B5CF6;
}

.scatter-plot {
  height: 400px;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-radius: 8px;
  padding: 1rem;
}

.chart-legend {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(139, 92, 246, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ccc;
  font-size: 0.9rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>
```

### 2.6 Bottom Sections (Tables & Lists)

**Reorder Recommendations & Alert History in tabs**

```html
<section class="dashboard-bottom">
  <!-- Tab Navigation -->
  <div class="tab-navigation">
    <button class="tab-btn active" data-tab="reorders">
      Reorder Recommendations
    </button>
    <button class="tab-btn" data-tab="history">
      Alert History
    </button>
    <button class="tab-btn" data-tab="orders">
      Recent Orders
    </button>
  </div>
  
  <!-- Tab Content -->
  <div class="tab-content">
    <!-- Tab 1: Reorder Recommendations -->
    <div class="tab-pane active" id="reorders-tab">
      <table class="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Current Stock</th>
            <th>ROP</th>
            <th>Lead Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="row-urgent">
            <td>SK-001</td>
            <td>Produk A</td>
            <td>50</td>
            <td>87</td>
            <td>7.2 hari</td>
            <td><span class="badge-urgent">🔴 Urgent</span></td>
            <td>
              <button class="btn-action-primary">Reorder Now</button>
            </td>
          </tr>
          <!-- More rows -->
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
.dashboard-bottom {
  padding: 2rem;
  margin-left: 80px;
  transition: margin-left 0.3s;
}

.tab-navigation {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  margin-bottom: 2rem;
}

.tab-btn {
  background: none;
  border: none;
  color: #999;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  position: relative;
}

.tab-btn:hover,
.tab-btn.active {
  color: white;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #8B5CF6;
}

.tab-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

.data-table thead {
  background: rgba(139, 92, 246, 0.1);
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #ccc;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.data-table tbody tr:hover {
  background: rgba(139, 92, 246, 0.08);
}

.row-urgent {
  border-left: 4px solid #EF4444;
}

.badge-urgent {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #EF4444;
  color: #FECACA;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-action-primary {
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 0.85rem;
}

.btn-action-primary:hover {
  background: #A78BFA;
}
</style>
```

---

## BAGIAN 3: COLOR PALETTE & DESIGN TOKENS

### 3.1 Color System

```css
/* Primary Colors */
--color-primary-dark: #0A0E27;      /* Hero bg */
--color-primary-mid: #1a1a2e;       /* Card bg */
--color-primary-light: #16213e;     /* Hover bg */

/* Accent Colors */
--color-accent-purple: #8B5CF6;     /* Primary CTA, accent */
--color-accent-purple-light: #A78BFA;
--color-accent-green: #10B981;      /* Success, healthy */
--color-accent-orange: #F59E0B;     /* Warning */
--color-accent-red: #EF4444;        /* Critical, urgent */

/* Neutral Colors */
--color-text-primary: #FFFFFF;      /* Main text */
--color-text-secondary: #CCCCCC;    /* Secondary text */
--color-text-tertiary: #999999;     /* Disabled, subtle */

/* Borders & Dividers */
--color-border-subtle: rgba(139, 92, 246, 0.1);
--color-border-medium: rgba(139, 92, 246, 0.2);
--color-border-strong: rgba(139, 92, 246, 0.5);

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: 1px solid rgba(139, 92, 246, 0.2);
--glass-backdrop: backdrop-filter: blur(10px);
```

### 3.2 Typography

```css
/* Headings */
--font-headline-1: 4rem, 900, -0.5px;      /* Hero */
--font-headline-2: 2.5rem, 800, -0.3px;    /* Section titles */
--font-headline-3: 1.5rem, 700, 0px;       /* Card titles */

/* Body */
--font-body: 1rem, 400, 0px;               /* Regular text */
--font-body-small: 0.9rem, 400, 0px;       /* Small text */

/* UI */
--font-label: 0.85rem, 600, 0.5px;         /* Form labels, buttons */
```

### 3.3 Spacing

```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 4rem;
```

### 3.4 Border Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 999px;
```

### 3.5 Shadows & Effects

```css
/* Shadow system */
--shadow-sm: 0 5px 15px rgba(0, 0, 0, 0.1);
--shadow-md: 0 10px 30px rgba(0, 0, 0, 0.2);
--shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 30px 80px rgba(0, 0, 0, 0.4);

/* Glow effects */
--glow-accent: 0 0 20px rgba(139, 92, 246, 0.4);
--glow-success: 0 0 20px rgba(16, 185, 129, 0.3);
--glow-warning: 0 0 20px rgba(245, 158, 11, 0.3);
--glow-danger: 0 0 20px rgba(239, 68, 68, 0.3);
```

---

## BAGIAN 4: INTERACTIVE ELEMENTS & MICRO-INTERACTIONS

### 4.1 Button States

```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
  color: white;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

### 4.2 Form Inputs

```css
.form-input {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  border-color: #8B5CF6;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
}

.form-input:invalid {
  border-color: #EF4444;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
```

### 4.3 Hover & Active States

```css
/* Card hover effect */
.card:hover {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Table row highlight */
.table-row:hover {
  background: rgba(139, 92, 246, 0.08);
}

/* Link underline animation */
.link {
  position: relative;
  text-decoration: none;
  color: white;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #8B5CF6;
  transition: width 0.3s;
}

.link:hover::after {
  width: 100%;
}
```

---

## BAGIAN 5: RESPONSIVENESS BREAKPOINTS

```css
/* Mobile first approach */
@media (max-width: 640px) {
  /* Collapse sidebar */
  .sidebar {
    width: 60px;
  }
  
  /* Stack grid 1 column */
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  /* Smaller fonts */
  .hero-headline {
    font-size: 2rem;
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  /* Tablet adjustments */
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  /* Full desktop layout */
  .summary-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## BAGIAN 6: ANIMATION & TRANSITIONS

### 6.1 Keyframe Animations

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### 6.2 Transition Timing

```css
/* Fast interactions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Normal interactions */
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Slow animations */
--transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## BAGIAN 7: DARK MODE IMPLEMENTATION

**Karena design ini already dark, gunakan sistem CSS variables untuk flexibility:**

```css
:root {
  --bg-primary: #0A0E27;
  --bg-secondary: #1a1a2e;
  --bg-tertiary: #16213e;
  --text-primary: #FFFFFF;
  --text-secondary: #CCCCCC;
  --accent: #8B5CF6;
  /* ... more variables */
}

/* Optional light mode (future) */
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #FFFFFF;
    --bg-secondary: #F5F5F5;
    --text-primary: #000000;
    --text-secondary: #666666;
    /* ... etc */
  }
}
```

---

## BAGIAN 8: COMPONENT LIBRARY STRUCTURE

Rekomendasi untuk organize components:

```
src/components/
├── shared/
│   ├── Button.tsx           # Primary, secondary, tertiary variants
│   ├── Card.tsx             # Glassmorphic card
│   ├── Input.tsx            # Form input
│   ├── Modal.tsx            # Dialog/modal
│   └── Badge.tsx            # Status badges
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── dashboard/
│   ├── StatCard.tsx         # Summary stats
│   ├── ScatterPlot.tsx      # Inventory map
│   ├── AlertBanner.tsx      # Notification
│   └── ReorderTable.tsx     # Data table
└── landing/
    ├── HeroSection.tsx
    ├── FeatureSection.tsx
    └── CTASection.tsx
```

---

## BAGIAN 9: QUICK IMPLEMENTATION CHECKLIST

**Phase 1 - Landing Page:**
- [ ] Hero section dengan animated background
- [ ] Navigation bar (sticky, glassmorphic)
- [ ] Feature sections (image + text)
- [ ] CTA buttons & links
- [ ] Responsive mobile

**Phase 2 - Dashboard Layout:**
- [ ] Header navigation
- [ ] Sidebar (collapsible)
- [ ] Summary cards (4 columns)
- [ ] Main chart container
- [ ] Tab navigation & tables

**Phase 3 - Visual Polish:**
- [ ] Glassmorphism effects
- [ ] Color palette application
- [ ] Hover/active states
- [ ] Animations & transitions
- [ ] Dark mode variables

**Phase 4 - Interactions:**
- [ ] Button click effects
- [ ] Form input states
- [ ] Chart interactivity
- [ ] Modal/drawer animations
- [ ] Notification toasts

---

## BAGIAN 10: TOOLS & LIBRARIES RECOMMENDATION

```json
{
  "styling": {
    "tailwind-css": "latest - utility-first CSS",
    "framer-motion": "animation library"
  },
  "components": {
    "shadcn-ui": "pre-built component library",
    "recharts": "chart & visualization"
  },
  "forms": {
    "react-hook-form": "form state management",
    "zod": "schema validation"
  },
  "state": {
    "zustand": "lightweight state management"
  },
  "notifications": {
    "sonner": "toast notifications",
    "react-hot-toast": "alternative"
  },
  "utilities": {
    "clsx": "conditional classNames",
    "date-fns": "date formatting"
  }
}
```

---

**END OF DESIGN SYSTEM PROMPT**

Ini siap untuk:
1. Pass ke designer/UI team
2. Reference untuk frontend developer
3. Untuk component library setup
4. Design consistency enforcement