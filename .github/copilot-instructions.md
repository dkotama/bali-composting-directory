# Copilot Instructions - Direktori dan Edukasi Komposting Bali

## Project Overview
You are assisting with the development of a Vue.js-based web platform that connects Bali residents with local composting services and provides educational resources for sustainable waste management. This is a non-profit project focused on environmental sustainability in Bali, Indonesia.

The platform serves as both a directory of composting services and an educational hub for sustainable waste management practices.

## Technology Stack
- **Frontend**: Vue.js 3 with Composition API
- **CSS Framework**: Bootstrap 5
- **Data**: JSON-based (no backend database)
- **Hosting**: Netlify (static site)
- **Analytics**: Google Analytics 4
- **Language**: Bahasa Indonesia (primary)

## Design System & Styling

### Color Palette
- **Primary Green**: #174735 (main brand color)
- **Background**: #FAF9F5 (cream/off-white background)
- **Text Headings**: #3D3D5E (dark blue-gray for headings)
- **Body Text**: Default dark colors for readability

### Typography
- **Body Font**: Merriweather (serif, for readability)
- **Heading Font**: Alegreya Sans (sans-serif, for headings and UI elements)
- Always prioritize mobile-first responsive design

## Data Architecture

### JSON Files Structure
```
/data/
  ├── regions.json     # Bali administrative regions
  ├── companies.json   # Composting service providers
  └── products.json    # Composting-related products
```

### Key Data Patterns
- **Regions**: Hierarchical structure (Kabupaten → Kecamatan)
- **Companies**: Reference region IDs, include contact info (WhatsApp, Instagram)
- **Products**: Link to external vendors, categorized by type

## Component Architecture Guidelines

### Vue.js Best Practices
- Use Composition API with `<script setup>` syntax
- Implement reactive data with `ref()` and `reactive()`
- Create reusable components for common UI patterns
- Use props validation and default values
- Implement proper error handling for JSON data loading

### Component Structure
```
/components/
  ├── common/          # Reusable UI components
  ├── search/          # Search and filtering components
  ├── forms/           # Input forms (company/product submission)
  ├── educational/     # How-to guides and calculator
  └── maps/            # Map integration components
```

## Key Features to Implement

### 1. Location-Based Search
- Searchable dropdown with autocomplete for Bali regions
- Hierarchical selection (Kabupaten → Kecamatan)
- Filter companies by service area coverage
- Airline booking-style interface for results

### 2. Service Filtering
- Pickup frequency options
- Waste types accepted (organic, garden waste, etc.)
- Pricing tiers (low, medium, high)
- Availability status (accepting, waitlist, full)

### 3. Interactive Components
- **Composting Calculator**: Input waste amount → output timeline
- **Method Selection**: Biopore vs Composter Bin options
- **Contact Integration**: WhatsApp click-to-chat, Instagram links

### 4. Form Handling
- Company submission form with validation
- Product submission form
- reCAPTCHA integration for spam protection
- Form data formatted for GitHub-based review process

## Content Guidelines

### Language & Localization
- All user-facing text in Bahasa Indonesia
- Use Indonesian formatting for numbers, dates, currencies
- Consider local context and cultural references
- Phone number formats: Indonesian (+62) standards

### Educational Content
- Step-by-step composting guides with placeholder for Google Photos
- Bali-specific seasonal composting tips
- Simple, clear instructions suitable for all education levels
- Calculator results in practical, actionable format

## Mobile-First Development

### Responsive Design Priorities
1. **Mobile (320px - 768px)**: Primary focus for Indonesian users
2. **Tablet (768px - 1024px)**: Optimized layout transitions
3. **Desktop (1024px+)**: Enhanced features and larger content areas

### Performance Considerations
- Optimize for slower internet connections common in Indonesia
- Lazy load images and heavy content
- Minimize JSON payload sizes
- Use efficient Vue.js rendering patterns

## Analytics & Tracking

### Google Analytics 4 Implementation
- Track page views and user journeys
- Monitor search queries and filter usage
- Track form submissions and contact button clicks
- Measure educational content engagement (calculator usage)

### Key Events to Track
- Region selection events
- Company contact clicks (WhatsApp/Instagram)
- Calculator interactions
- Form submissions
- Popular service areas and companies

## GitHub Integration

### Content Management
- All content updates through GitHub repository
- JSON files managed through pull requests
- Admin workflow for reviewing company/product submissions
- Automated deployment to Netlify

### Development Workflow
- Feature branches for new functionality
- Clear commit messages in English
- Documentation updates with code changes
- Testing on multiple devices before deployment

## Code Style Guidelines

### Vue.js Conventions
```vue
<template>
  <!-- Use semantic HTML with Bootstrap classes -->
  <div class="container-fluid bg-light">
    <SearchFilter 
      :regions="regions" 
      @filter-change="handleFilterChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { loadRegionsData } from '@/utils/dataLoader'

// Props with validation
const props = defineProps({
  initialRegion: {
    type: String,
    default: ''
  }
})

// Reactive data
const regions = ref([])
const selectedFilters = reactive({
  region: '',
  serviceType: [],
  availability: 'all'
})
</script>
```

### CSS/SCSS Guidelines
- Use Bootstrap utility classes first
- Custom CSS only for brand-specific styling
- Mobile-first media queries
- Consistent spacing using Bootstrap spacing scale

## API Integration Patterns

### JSON Data Loading
```javascript
// Utils for loading static JSON data
export async function loadCompaniesData() {
  try {
    const response = await fetch('/data/companies.json')
    if (!response.ok) throw new Error('Failed to load companies')
    return await response.json()
  } catch (error) {
    console.error('Error loading companies:', error)
    return { companies: [] }
  }
}
```

### WhatsApp Integration
```javascript
// Generate WhatsApp click-to-chat URLs
export function generateWhatsAppUrl(phoneNumber, message = '') {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}
```

## Error Handling & UX

### User Experience Priorities
- Graceful degradation when data fails to load
- Clear loading states during data fetching
- Helpful error messages in Bahasa Indonesia
- Offline-friendly experience where possible

### Common Error Scenarios
- JSON data loading failures
- Map rendering issues
- Form validation errors
- Network connectivity problems

## Testing Considerations

### Browser Support
- Modern mobile browsers (Chrome, Safari, Firefox mobile)
- Focus on Android and iOS performance
- Progressive enhancement for older browsers

### Device Testing
- Various Android devices (common in Indonesia)
- iPhone devices for completeness
- Different screen sizes and orientations
- Touch interaction patterns

## Security & Privacy

### Data Handling
- No personal data storage (static site)
- External links open in new tabs
- Validate all form inputs client-side
- reCAPTCHA for form spam protection

### Contact Privacy
- WhatsApp and Instagram links as provided by companies
- No direct data collection from users
- Analytics data anonymized through Google Analytics

## Development Priorities

### Phase 1 (MVP) Focus
1. Basic page structure and navigation
2. Region search and filtering
3. Company listings display
4. Basic contact integration
5. Simple composting calculator

### Performance Optimization
- Bundle size optimization
- Image optimization (WebP format)
- Efficient Vue.js rendering
- CDN usage for external assets

## Task Management & Documentation

### Task Tracking Requirements
- **ALWAYS update `task.md`** after completing any task or subtask
- Mark completed items with `[x]` in the task checklist
- Add completion timestamps and brief notes about implementation
- Update progress status and any blockers encountered
- Document decisions made during development

### Task Update Format
```markdown
- [x] Setup Vue.js project structure (Completed: 2025-01-15)
  - Notes: Used Vite for build tool, integrated Bootstrap 5
  - Files created: src/components/, src/utils/, src/data/
```

### Progress Reporting
- Update overall project progress percentage
- Note any scope changes or technical decisions
- Document any issues that need review or discussion
- Keep stakeholders informed of milestone completion

## Documentation Requirements
- Component documentation with examples
- JSON schema documentation
- Deployment and maintenance guides
- Contributing guidelines for open source collaboration
- **Regular task.md updates** for project tracking

Remember: This is a non-profit environmental project serving the Bali community. Prioritize accessibility, performance on mobile devices, and clear user experience over complex features. **Always keep task.md current** to maintain project visibility and progress tracking.