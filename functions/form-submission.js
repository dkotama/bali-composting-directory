// Netlify Function for handling form submissions
// This function will process company and product submission forms
// and potentially send notifications or store data

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { type, formData } = data;

    console.log(`Received ${type} form submission:`, formData);

    // Basic validation
    if (!type || !formData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required data' 
        }),
      };
    }

    // Process different form types
    let result;
    switch (type) {
      case 'company':
        result = await processCompanySubmission(formData);
        break;
      case 'product':
        result = await processProductSubmission(formData);
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: 'Invalid form type' 
          }),
        };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        data: result,
      }),
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
    };
  }
};

async function processCompanySubmission(formData) {
  // In a real implementation, this might:
  // 1. Validate the data against a schema
  // 2. Send an email notification to admins
  // 3. Create a GitHub issue for review
  // 4. Store in a database
  // 5. Send confirmation email to submitter

  const {
    companyName,
    contactPerson,
    whatsapp,
    instagram,
    email,
    website,
    serviceAreas,
    serviceTypes,
    pickupFrequency,
    pricing,
    wasteTypes,
    availability,
    description,
  } = formData;

  // Basic validation for required fields
  const requiredFields = ['companyName', 'contactPerson', 'whatsapp'];
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Format data for processing
  const processedData = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    type: 'company',
    status: 'pending_review',
    data: {
      companyName,
      contactPerson,
      contact: {
        whatsapp: formatPhoneNumber(whatsapp),
        instagram,
        email,
        website,
      },
      services: {
        areas: serviceAreas,
        types: serviceTypes,
        pickupFrequency,
        pricing: pricing || 'contact_for_pricing',
        wasteTypes,
        availability: availability || 'accepting',
      },
      description,
    },
  };

  console.log('Processed company submission:', processedData);
  
  // Here you would typically:
  // - Send notification email to admins
  // - Create GitHub issue for review
  // - Store in a queue for processing
  
  return {
    id: processedData.id,
    status: 'submitted',
    message: 'Your company information has been submitted for review. We will contact you within 2-3 business days.',
  };
}

async function processProductSubmission(formData) {
  // Similar processing for product submissions
  const {
    productName,
    productType,
    description,
    price,
    vendor,
    contactInfo,
    imageUrl,
    availability,
  } = formData;

  const requiredFields = ['productName', 'productType', 'vendor'];
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  const processedData = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    type: 'product',
    status: 'pending_review',
    data: {
      productName,
      productType,
      description,
      pricing: {
        price,
        currency: 'IDR',
      },
      vendor: {
        name: vendor,
        contact: contactInfo,
      },
      imageUrl,
      availability: availability || 'available',
    },
  };

  console.log('Processed product submission:', processedData);
  
  return {
    id: processedData.id,
    status: 'submitted',
    message: 'Your product has been submitted for review. It will appear in our marketplace after approval.',
  };
}

// Helper functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatPhoneNumber(phone) {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with +62
  if (digits.startsWith('0')) {
    return '+62' + digits.substr(1);
  }
  
  // If already has country code
  if (digits.startsWith('62')) {
    return '+' + digits;
  }
  
  // Default to Indonesian format
  return '+62' + digits;
}
