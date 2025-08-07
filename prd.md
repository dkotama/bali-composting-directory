# Bali Composting Services Platform - Product Requirements Document

## 1. Project Overview

### 1.1 Project Vision
A comprehensive web platform connecting Bali residents with local composting services while providing educational resources for sustainable waste management. The platform serves as a directory for composting companies and educates users on home composting methods.

### 1.2 Project Goals
- Connect Bali residents with local composting service providers
- Educate users about home composting methods
- Support local environmental sustainability initiatives
- Provide a centralized, searchable database of composting services across Bali

### 1.3 Target Audience
- **Primary**: Bali residents seeking composting services
- **Secondary**: Households interested in learning home composting
- **Tertiary**: Local composting companies wanting visibility

## 2. Technical Specifications

### 2.1 Technology Stack
- **Frontend**: Vue.js 3 with Bootstrap 5
- **Data**: JSON-based data structure
- **Hosting**: Netlify
- **Analytics**: Google Analytics 4
- **Maps**: Leaflet.js for location visualization
- **Language**: Bahasa Indonesia (primary)

### 2.2 Design System
- **Primary Color**: Green #174735
- **Background Color**: #FAF9F5
- **Heading Text**: Black #3D3D5E
- **Primary Font**: Merriweather
- **Heading Font**: Alegreya Sans
- **Design Approach**: Mobile-first responsive design

### 2.3 Data Architecture
- **regions.json**: Bali administrative regions (Kabupaten/Kecamatan)
- **companies.json**: Composting service providers
- **products.json**: Composting-related products and tools
- **Admin**: GitHub-based content management

## 3. Page Structure & Features

### 3.1 Index Page (Homepage)

#### 3.1.1 Top Section
- **Hero Section**: Brief explanation of website purpose
- **Value Proposition**: Why composting matters for Bali
- **Navigation Cards**: Quick access to educational content (1.1 How To)

#### 3.1.2 Middle Section - Core Search Functionality
- **Location Search**: 
  - Searchable dropdown for Kabupaten and Kecamatan
  - Autocomplete functionality
  - Hierarchical selection (Kabupaten → Kecamatan)
- **Service Filters**:
  - Pickup frequency options
  - Waste types accepted
  - Pricing tiers
  - Availability indicators (accepting customers, waitlist, full)
- **Results Display**:
  - Airline booking-style interface
  - Company cards with key information
  - Simple map view showing service areas
  - Contact integration (WhatsApp, Instagram)

#### 3.1.3 Bottom Section
- **Call-to-Action**: Company submission form
- **Link to**: Input form for new company listings (1.2)

### 3.2 How To Page (1.1)

#### 3.2.1 Educational Content
- **Step-by-step guides**: Home composting methods
- **Visual guides**: Photo placeholders for Google Photos integration
- **Composting Calculator**:
  - Input: Weekly waste amount (kg)
  - Method selection: Biopore vs Composter Bin
  - Output: Timeline and basic steps
- **Seasonal Tips**: Bali climate-specific advice

#### 3.2.2 Product Marketplace
- **Product listings**: Composting tools and supplies
- **E-commerce links**: External vendor connections
- **CTA**: Add product form (1.3)

### 3.3 Company Input Form (1.2)

#### 3.3.1 Form Fields
- Company basic information
- Service area selection (multiple Kecamatan)
- Service details (pickup frequency, waste types, pricing)
- Contact information (WhatsApp, Instagram)
- Availability status

#### 3.3.2 Submission Process
- reCAPTCHA verification
- Data validation
- Submission to review queue (GitHub issue/PR system)

### 3.4 Product Input Form (1.3)

#### 3.4.1 Form Fields
- Product information
- Category selection
- Vendor/seller details
- Contact links

## 4. JSON Data Structure

### 4.1 regions.json
```json
{
  "kabupaten": [
    {
      "id": "badung",
      "name": "Badung",
      "kecamatan": [
        {
          "id": "badung-kuta",
          "name": "Kuta",
          "kabupatenId": "badung"
        }
      ]
    }
  ]
}
```

### 4.2 companies.json
```json
{
  "companies": [
    {
      "id": "company-001",
      "name": "Bali Composting Co",
      "serviceAreas": ["badung-kuta", "badung-seminyak"],
      "services": {
        "pickupFrequency": ["weekly", "bi-weekly"],
        "wasteTypes": ["organic", "garden"],
        "pricingTier": "medium"
      },
      "availability": "accepting",
      "contact": {
        "whatsapp": "+62xxx",
        "instagram": "@balicompost"
      }
    }
  ]
}
```

### 4.3 products.json
```json
{
  "products": [
    {
      "id": "product-001",
      "name": "Komposter Bin 100L",
      "category": "equipment",
      "description": "Komposter rumahan untuk limbah organik",
      "vendor": "Local Vendor",
      "contact": {
        "whatsapp": "+62xxx",
        "ecommerce": "https://tokopedia.com/..."
      }
    }
  ]
}
```

## 5. Core Features

### 5.1 Search & Discovery
- **Smart Search**: Region-based filtering with autocomplete
- **Advanced Filters**: Service type, pricing, availability
- **Map Integration**: Visual service area representation
- **Mobile-Optimized**: Touch-friendly interface for mobile users

### 5.2 Educational Resources
- **Interactive Calculator**: Personalized composting timeline
- **Visual Guides**: Step-by-step photo instructions
- **Local Context**: Bali-specific tips and seasonal advice

### 5.3 Contact Integration
- **WhatsApp Integration**: Click-to-chat with pre-filled messages
- **Instagram Links**: Direct access to company social media
- **Form Submissions**: Structured data collection for new listings

### 5.4 Analytics & Tracking
- **Google Analytics 4**: Complete user journey tracking
- **Page Performance**: Track popular regions and companies
- **Conversion Tracking**: Form submissions and contact clicks

## 6. Content Management

### 6.1 Admin Workflow
- **GitHub-based**: All content managed through Git repositories
- **Review Process**: Manual review of company/product submissions
- **Regular Updates**: Scheduled publication of approved content
- **Quality Control**: Admin verification before public listing

### 6.2 Data Maintenance
- **Region Data**: Static reference maintained separately
- **Company Data**: Regular updates based on submissions and changes
- **Content Updates**: Seasonal tips and educational content refresh

## 7. Success Metrics

### 7.1 Key Performance Indicators
- **User Engagement**: Page views, time on site, return visitors
- **Search Usage**: Popular regions, filter usage patterns
- **Contact Generation**: WhatsApp clicks, form submissions
- **Educational Impact**: Calculator usage, how-to page engagement

### 7.2 Business Goals
- **Directory Growth**: Number of listed companies
- **Regional Coverage**: Service availability across Bali regions
- **User Satisfaction**: Successful connections between users and services
- **Environmental Impact**: Increased adoption of composting services

## 8. Development Phases

### 8.1 Phase 1 (MVP)
- Basic homepage with search functionality
- Region selection (Kabupaten/Kecamatan level)
- Company listings display
- Basic contact integration
- How-to page with calculator

### 8.2 Phase 2 (Enhancement)
- Advanced filtering options
- Map integration
- Enhanced mobile experience
- Analytics implementation
- Product marketplace

### 8.3 Phase 3 (Growth)
- User reviews and ratings
- Enhanced educational content
- Advanced search features
- Performance optimizations

## 9. Technical Considerations

### 9.1 Performance
- **JSON Optimization**: Efficient data loading and caching
- **Mobile Performance**: Optimized for Indonesian internet speeds
- **SEO**: Proper meta tags and structured data

### 9.2 Accessibility
- **Responsive Design**: Works across all device sizes
- **Local Language**: Full Bahasa Indonesia support
- **User-Friendly**: Intuitive navigation for non-technical users

### 9.3 Maintenance
- **Static Hosting**: Low-cost, reliable Netlify hosting with automatic deployments
- **Simple Updates**: JSON-based content management
- **Community Driven**: Open for community contributions via GitHub