const {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} = require('@google/generative-ai');

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate a Travel Plan for Location North Coast, Egypt, for 2 day(s) and 1 night(s) for a solo person with a Moderate budget. The traveler will be departing from Riyadh, Saudi Arabia. Include flight details with flight price and booking URL, a list of hotel options with hotel name, hotel address, price, hotel image URL, geo coordinates, rating, and description. Also, include places to visit with place name, place details, place image URL, geo coordinates, ticket pricing if any, and travel time to each location. Plan each day with all places and the best time to visit for the 2 day(s) and 1 night(s). Please ensure the output follows this exact JSON format: {"trip_details":{"destination":"{location}","duration":"{noDays} days, {noNights} nights","traveler_type":"{traveler}","budget":"{budget}"},"flights":{"flight_details":[{"airline":"Airline Name","departure_city":"{departure_city}","arrival_city":"{location}","departure_date":"YYYY-MM-DD","return_date":"YYYY-MM-DD","price":"$XXX","booking_url":"https://example.com"}]},"hotels":{"hotel_options":[{"hotel_name":"Hotel Name","hotel_address":"Address","price":"$XXX/night","hotel_image_url":"https://example.com/image.jpg","geo_coordinates":"XX.XXXX,XX.XXXX","rating":X,"description":"Hotel Description"}]},"itinerary":{"day_1":{"morning":{"place_name":"Place Name","place_details":"Details about the place","place_image_url":"https://example.com/image.jpg","geo_coordinates":"XX.XXXX,XX.XXXX","ticket_pricing":"$XX","travel_time":"X hour(s)"}}}}',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n{"trip_details": {"destination": "North Coast, Egypt", "duration": "2 days, 1 night", "traveler_type": "solo", "budget": "Moderate"}, "flights": {"flight_details": [{"airline": "Flynas", "departure_city": "Riyadh", "arrival_city": "Alexandria", "departure_date": "2024-03-15", "return_date": "2024-03-17", "price": "$200", "booking_url": "https://www.flynas.com/"}]}, "hotels": {"hotel_options": [{"hotel_name": "Sunrise Marina Resort", "hotel_address": "North Coast, Egypt", "price": "$100/night", "hotel_image_url": "https://www.sunriseresorts.com/media/images/hotels/sunrise-marina-resort/sunrise-marina-resort-1.jpg", "geo_coordinates": "31.2454,30.1147", "rating": 4.5, "description": "A beachfront resort with swimming pools, restaurants, and various activities."}, {"hotel_name": "Raya Hotel & Spa", "hotel_address": "North Coast, Egypt", "price": "$80/night", "hotel_image_url": "https://www.rayahotels.com/media/images/hotels/raya-hotel-and-spa/raya-hotel-and-spa-1.jpg", "geo_coordinates": "31.2387,30.1211", "rating": 4, "description": "A modern hotel with a spa, gym, and multiple dining options."}]}, "itinerary": {"day_1": {"morning": {"place_name": "Cleopatra\'s Beach", "place_details": "A beautiful beach known for its clear waters and soft sand. It\'s a great place to relax and soak up the sun.", "place_image_url": "https://www.egypttoursportal.com/images/cleopatra-beach-alexandria-egypt.jpg", "geo_coordinates": "31.2260,29.9396", "ticket_pricing": "Free", "travel_time": "1 hour"}, "afternoon": {"place_name": "Alexandria Bibliotheca", "place_details": "A modern library with a vast collection of books and exhibits. It\'s a great place to learn about the history of Alexandria.", "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bibliotheca_Alexandrina_outside_view_02.jpg/1280px-Bibliotheca_Alexandrina_outside_view_02.jpg", "geo_coordinates": "31.2115,29.9459", "ticket_pricing": "$5", "travel_time": "30 minutes"}, "evening": {"place_name": "El-Mursi Abul Abbas Mosque", "place_details": "A historical mosque with beautiful architecture. It\'s a great place to learn about the Islamic culture of Alexandria.", "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/El-Mursi_Abul_Abbas_Mosque_in_Alexandria_Egypt.jpg/1280px-El-Mursi_Abul_Abbas_Mosque_in_Alexandria_Egypt.jpg", "geo_coordinates": "31.2082,29.9471", "ticket_pricing": "Free", "travel_time": "15 minutes"}}, "day_2": {"morning": {"place_name": "Catacombs of Kom El Shoqafa", "place_details": "Ancient Roman burial catacombs with intricate carvings and sculptures. It\'s a fascinating glimpse into the history of Alexandria.", "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Catacombs_of_Kom_el-Shoqafa.jpg/1280px-Catacombs_of_Kom_el-Shoqafa.jpg", "geo_coordinates": "31.2039,29.9343", "ticket_pricing": "$5", "travel_time": "30 minutes"}, "afternoon": {"place_name": "Pompey\'s Pillar", "place_details": "A massive granite column dating back to Roman times. It\'s a great place to learn about the Roman history of Alexandria.", "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Pompey%27s_Pillar.jpg/1280px-Pompey%27s_Pillar.jpg", "geo_coordinates": "31.2078,29.9483", "ticket_pricing": "Free", "travel_time": "15 minutes"}, "evening": {"place_name": "Stanley Bay", "place_details": "A lively waterfront area with restaurants, cafes, and shops. It\'s a great place to enjoy the sunset.", "place_image_url": "https://www.egypttoursportal.com/images/stanley-bay-alexandria-egypt.jpg", "geo_coordinates": "31.2009,29.9575", "ticket_pricing": "Free", "travel_time": "15 minutes"}}}}\n```',
        },
      ],
    },
  ],
});

/* ::PREVIOUS HISTORIES OF OTHER PLANS:: */

// const p = {
//   trip_details: {
//     destination: 'North Coast, Egypt',
//     duration: '2 days, 1 night',
//     traveler_type: 'solo',
//     budget: 'Moderate',
//   },
//   flights: {
//     flight_details: [
//       {
//         airline: 'Flynas',
//         departure_city: 'Riyadh',
//         arrival_city: 'Alexandria',
//         departure_date: '2024-03-15',
//         return_date: '2024-03-17',
//         price: '$200',
//         booking_url: 'https://www.flynas.com/',
//       },
//     ],
//   },
//   hotels: {
//     hotel_options: [
//       {
//         hotel_name: 'Sunrise Marina Resort',
//         hotel_address: 'North Coast, Egypt',
//         price: '$100/night',
//         hotel_image_url:
//           'https://www.sunriseresorts.com/media/images/hotels/sunrise-marina-resort/sunrise-marina-resort-1.jpg',
//         geo_coordinates: '31.2454,30.1147',
//         rating: 4.5,
//         description: 'A beachfront resort with swimming pools, restaurants, and various activities.',
//       },
//       {
//         hotel_name: 'Raya Hotel & Spa',
//         hotel_address: 'North Coast, Egypt',
//         price: '$80/night',
//         hotel_image_url: 'https://www.rayahotels.com/media/images/hotels/raya-hotel-and-spa/raya-hotel-and-spa-1.jpg',
//         geo_coordinates: '31.2387,30.1211',
//         rating: 4,
//         description: 'A modern hotel with a spa, gym, and multiple dining options.',
//       },
//     ],
//   },
//   itinerary: {
//     day_1: {
//       morning: {
//         place_name: "Cleopatra's Beach",
//         place_details:
//           "A beautiful beach known for its clear waters and soft sand. It's a great place to relax and soak up the sun.",
//         place_image_url: 'https://www.egypttoursportal.com/images/cleopatra-beach-alexandria-egypt.jpg',
//         geo_coordinates: '31.2260,29.9396',
//         ticket_pricing: 'Free',
//         travel_time: '1 hour',
//       },
//       afternoon: {
//         place_name: 'Alexandria Bibliotheca',
//         place_details:
//           "A modern library with a vast collection of books and exhibits. It's a great place to learn about the history of Alexandria.",
//         place_image_url:
//           'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bibliotheca_Alexandrina_outside_view_02.jpg/1280px-Bibliotheca_Alexandrina_outside_view_02.jpg',
//         geo_coordinates: '31.2115,29.9459',
//         ticket_pricing: '$5',
//         travel_time: '30 minutes',
//       },
//       evening: {
//         place_name: 'El-Mursi Abul Abbas Mosque',
//         place_details:
//           "A historical mosque with beautiful architecture. It's a great place to learn about the Islamic culture of Alexandria.",
//         place_image_url:
//           'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/El-Mursi_Abul_Abbas_Mosque_in_Alexandria_Egypt.jpg/1280px-El-Mursi_Abul_Abbas_Mosque_in_Alexandria_Egypt.jpg',
//         geo_coordinates: '31.2082,29.9471',
//         ticket_pricing: 'Free',
//         travel_time: '15 minutes',
//       },
//     },
//     day_2: {
//       morning: {
//         place_name: 'Catacombs of Kom El Shoqafa',
//         place_details:
//           "Ancient Roman burial catacombs with intricate carvings and sculptures. It's a fascinating glimpse into the history of Alexandria.",
//         place_image_url:
//           'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Catacombs_of_Kom_el-Shoqafa.jpg/1280px-Catacombs_of_Kom_el-Shoqafa.jpg',
//         geo_coordinates: '31.2039,29.9343',
//         ticket_pricing: '$5',
//         travel_time: '30 minutes',
//       },
//       afternoon: {
//         place_name: "Pompey's Pillar",
//         place_details:
//           "A massive granite column dating back to Roman times. It's a great place to learn about the Roman history of Alexandria.",
//         place_image_url:
//           'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Pompey%27s_Pillar.jpg/1280px-Pompey%27s_Pillar.jpg',
//         geo_coordinates: '31.2078,29.9483',
//         ticket_pricing: 'Free',
//         travel_time: '15 minutes',
//       },
//       evening: {
//         place_name: 'Stanley Bay',
//         place_details:
//           "A lively waterfront area with restaurants, cafes, and shops. It's a great place to enjoy the sunset.",
//         place_image_url: 'https://www.egypttoursportal.com/images/stanley-bay-alexandria-egypt.jpg',
//         geo_coordinates: '31.2009,29.9575',
//         ticket_pricing: 'Free',
//         travel_time: '15 minutes',
//       },
//     },
//   },
// };

// const text = {
//   trip_details: {
//     destination: 'Hurghada, Egypt',
//     duration: '4 days, 3 nights',
//     traveler_type: 'family',
//     budget: 'luxury',
//   },
//   flights: {
//     flight_details: [
//       {
//         airline: 'Emirates',
//         departure_city: 'Your Departure City',
//         arrival_city: 'Hurghada',
//         departure_date: '2024-03-15',
//         return_date: '2024-03-19',
//         price: '$800',
//         booking_url: 'https://www.emirates.com/',
//       },
//     ],
//   },
//   hotels: {
//     hotel_options: [
//       {
//         hotel_name: 'The Oberoi, Sahl Hasheesh',
//         hotel_address: 'Sahl Hasheesh Rd, Hurghada, Red Sea Governorate',
//         price: '$400/night',
//         hotel_image_url: 'https://www.oberoihotels.com/media/images/hotels/sahl-hasheesh/hotel-exterior.jpg',
//         geo_coordinates: '27.2356,33.8588',
//         rating: 5.0,
//         description:
//           'A luxurious resort with private beach access, multiple pools, fine dining, and spa facilities.',
//       },
//       {
//         hotel_name: 'The Ritz-Carlton, Hurghada',
//         hotel_address: 'Sahl Hasheesh, Hurghada, Red Sea Governorate',
//         price: '$350/night',
//         hotel_image_url: 'https://www.ritzcarlton.com/en/hotels/egypt/hurghada/images/hotel-exterior.jpg',
//         geo_coordinates: '27.2381,33.8582',
//         rating: 4.5,
//         description:
//           'A world-class resort with stunning views, elegant rooms, multiple restaurants, and a full-service spa.',
//       },
//       {
//         hotel_name: 'Albatros Palace Resort',
//         hotel_address: 'Sahl Hasheesh Rd, Hurghada, Red Sea Governorate',
//         price: '$250/night',
//         hotel_image_url: 'https://www.albatroshotels.com/media/images/hotels/palace/exterior.jpg',
//         geo_coordinates: '27.2408,33.8577',
//         rating: 4.0,
//         description:
//           'A large and luxurious resort with a wide range of amenities, including water sports, pools, and restaurants.',
//       },
//     ],
//   },
//   itinerary: {
//     day_1: {
//       morning: {
//         place_name: 'Mahmya Island',
//         place_details:
//           'Take a private boat trip to this pristine island with crystal-clear waters perfect for snorkeling and swimming.',
//         place_image_url: 'https://www.egypt-tours-holidays.com/images/Mahmya-Island.jpg',
//         geo_coordinates: '27.1667,33.9167',
//         ticket_pricing: 'Around $100 per person',
//         travel_time: '1 hour boat ride from Hurghada',
//       },
//       afternoon: {
//         place_name: 'Giftun Island',
//         place_details: 'Explore this beautiful island with its diverse marine life and white sandy beaches.',
//         place_image_url: 'https://www.tripadvisor.com/Tourism-g297549-Hurghada-Vacations.html',
//         geo_coordinates: '27.1833,33.8833',
//         ticket_pricing: 'Around $50 per person',
//         travel_time: '30 minutes boat ride from Hurghada',
//       },
//       evening: {
//         place_name: 'Hurghada Marina',
//         place_details: 'Enjoy a leisurely stroll along the marina, admiring the yachts and the vibrant atmosphere.',
//         place_image_url: 'https://www.egypt-tours-holidays.com/images/Hurghada-Marina.jpg',
//         geo_coordinates: '27.2297,33.8192',
//         ticket_pricing: 'Free',
//         travel_time: '15 minutes from your hotel',
//       },
//     },
//     day_2: {
//       morning: {
//         place_name: 'Hurghada Aquarium',
//         place_details: 'Discover a fascinating collection of marine life from the Red Sea.',
//         place_image_url: 'https://www.hurghada-aquarium.com/images/aquarium.jpg',
//         geo_coordinates: '27.2353,33.8210',
//         ticket_pricing: 'Around $15 per person',
//         travel_time: '10 minutes from your hotel',
//       },
//       afternoon: {
//         place_name: 'Hurghada Grand Aquarium',
//         place_details: 'Experience a unique underwater world with sharks, rays, and other fascinating creatures.',
//         place_image_url: 'https://www.hurghada-grand-aquarium.com/images/grand-aquarium.jpg',
//         geo_coordinates: '27.2386,33.8216',
//         ticket_pricing: 'Around $25 per person',
//         travel_time: '10 minutes from your hotel',
//       },
//       evening: {
//         place_name: 'El Gouna',
//         place_details:
//           'Enjoy a scenic drive to this upscale resort town with its charming canals and beautiful beaches.',
//         place_image_url: 'https://www.elgouna.com/media/images/el-gouna-aerial-view.jpg',
//         geo_coordinates: '27.2000,33.8333',
//         ticket_pricing: 'Free',
//         travel_time: '30 minutes drive from Hurghada',
//       },
//     },
//     day_3: {
//       morning: {
//         place_name: 'Sandboarding in the Desert',
//         place_details: 'Experience the thrill of sandboarding on the golden dunes of the Sahara Desert.',
//         place_image_url: 'https://www.desert-adventures.com/images/sandboarding.jpg',
//         geo_coordinates: '27.2000,33.9000',
//         ticket_pricing: 'Around $50 per person',
//         travel_time: '1 hour drive from Hurghada',
//       },
//       afternoon: {
//         place_name: 'Bedouin Village',
//         place_details:
//           'Immerse yourself in the culture of the Bedouin people with a visit to a traditional village.',
//         place_image_url: 'https://www.egypt-tours-holidays.com/images/bedouin-village.jpg',
//         geo_coordinates: '27.2000,33.9000',
//         ticket_pricing: 'Around $20 per person',
//         travel_time: '1 hour drive from Hurghada',
//       },
//       evening: {
//         place_name: 'Traditional Egyptian Dinner',
//         place_details: 'Enjoy a delicious dinner with live music and traditional entertainment.',
//         place_image_url: 'https://www.egypt-tours-holidays.com/images/egyptian-dinner.jpg',
//         geo_coordinates: '27.2297,33.8192',
//         ticket_pricing: 'Around $30 per person',
//         travel_time: '15 minutes from your hotel',
//       },
//     },
//     day_4: {
//       morning: {
//         place_name: 'Relaxing Day at the Resort',
//         place_details:
//           'Enjoy a day of relaxation at your luxury resort with swimming, sunbathing, and spa treatments.',
//         place_image_url: 'https://www.oberoihotels.com/media/images/hotels/sahl-hasheesh/pool-view.jpg',
//         geo_coordinates: "Your hotel's coordinates",
//         ticket_pricing: 'Included in your hotel stay',
//         travel_time: '0 minutes',
//       },
//       afternoon: {
//         place_name: 'Shopping in Hurghada',
//         place_details: 'Browse the local markets and shops for souvenirs and unique finds.',
//         place_image_url: 'https://www.egypt-tours-holidays.com/images/hurghada-market.jpg',
//         geo_coordinates: '27.2297,33.8192',
//         ticket_pricing: 'Free',
//         travel_time: '15 minutes from your hotel',
//       },
//       evening: {
//         place_name: 'Farewell Dinner',
//         place_details: 'Enjoy a final delicious meal at a waterfront restaurant with stunning views.',
//         place_image_url: 'https://www.egypt-tours-holidays.com/images/hurghada-restaurant.jpg',
//         geo_coordinates: '27.2297,33.8192',
//         ticket_pricing: 'Varies by restaurant',
//         travel_time: '15 minutes from your hotel',
//       },
//     },
//   },
// };
