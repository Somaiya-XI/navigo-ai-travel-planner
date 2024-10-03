export const travelerList = [
  {
    id: 1,
    title: 'Solo',
    desc: 'A solo adventure awaits!',
    icon: '🧳',
    people: '1 person',
    traveling: 'solo person',
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'Two hearts, one journey',
    icon: '💕',
    people: '2 people',
    traveling: 'Couple',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'Family fun for everyone!',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 people',
    traveling: 'Family',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'Unforgettable memories with your crew',
    icon: '👯‍♂️',
    people: '5 to 10 people',
    traveling: 'Group of Friends',
  },
];

export const budgetList = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of cost',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Do not worry about cost',
  },
];

export const AI_PROMPT = 'Generate a Travel Plan for Location {location}, for {noDays} day(s) and {noNights} night(s) for a {traveler} with a {budget} budget. The traveler will be departing from {departure_city}. Include flight details with flight price and booking URL, a list of hotel options with hotel name, hotel address, price, hotel image URL, geo coordinates, rating, and description. Also, include places to visit with place name, place details, place image URL, geo coordinates, ticket pricing if any, and travel time to each location. Plan each day with all places and the best time to visit for the {noDays} day(s) and {noNights} night(s). Please ensure the output follows this exact JSON format: {"trip_details":{"destination":"{location}","duration":"{noDays} days, {noNights} nights","traveler_type":"{traveler}","budget":"{budget}"},"flights":{"flight_details":[{"airline":"Airline Name","departure_city":"{departure_city}","arrival_city":"{location}","departure_date":"YYYY-MM-DD","return_date":"YYYY-MM-DD","price":"$XXX","booking_url":"https://example.com"}]},"hotels":{"hotel_options":[{"hotel_name":"Hotel Name","hotel_address":"Address","price":"$XXX/night","hotel_image_url":"https://example.com/image.jpg","geo_coordinates":"XX.XXXX,XX.XXXX","rating":X,"description":"Hotel Description"}]},"itinerary":{"day_1":{"morning":{"place_name":"Place Name","place_details":"Details about the place","place_image_url":"https://example.com/image.jpg","geo_coordinates":"XX.XXXX,XX.XXXX","ticket_pricing":"$XX","travel_time":"X hour(s)"}}}}';

  //PREVIOUS PROMPT! 'Generate Travel Plan for Location {location}, for {noDays} day(s) and {noNights} Night(s) for a {traveler} with {budget} budget with a flight details, flight price with booking url, hotels options list with Hotel name, hotel address, price, hitel image url, geo coordinates, rating, descriptions and places to visit with place name, place details, place image url, geo coordinates, ticket pricing if any, and time to travel to each of the locations, Plan each day with all places and best time to visit of the days/nights for the {noDays} day(s) and {noNights} night(s) in JSON format.';




  