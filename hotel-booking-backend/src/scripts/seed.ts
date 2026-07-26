/**
 * Wipe + seed MongoDB demo data (Mongoose — not Prisma).
 *
 * Usage: npm run seed
 * Requires MONGODB_CONNECTION_STRING in .env
 *
 * Destroys: User, Hotel, Booking, Review, Analytics collections.
 * Creates test@user.com / 12345678 as admin (for /admin + manual testing).
 * Populates every documented schema field with Arab world demo data in English script.
 */
import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/user";
import Hotel from "../models/hotel";
import Booking from "../models/booking";
import Review from "../models/review";
import Analytics from "../models/analytics";

const IMG = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
];

const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

const daysAgo = (n: number) => daysFromNow(-n);

export async function seedData(disconnectAfter: boolean = true) {
  const uri = process.env.MONGODB_CONNECTION_STRING;
  if (!uri && disconnectAfter) {
    console.error("Missing MONGODB_CONNECTION_STRING");
    process.exit(1);
  }

  if (disconnectAfter && uri) {
    const wantsTls =
      uri.includes("mongodb+srv://") ||
      /[?&]tls=true/i.test(uri) ||
      /[?&]ssl=true/i.test(uri);

    await mongoose.connect(uri, {
      ...(wantsTls
        ? { tls: true, tlsAllowInvalidCertificates: false }
        : {}),
    });
  }
  console.log("Wiping demo collections…");

  await Promise.all([
    Review.deleteMany({}),
    Booking.deleteMany({}),
    Hotel.deleteMany({}),
    Analytics.deleteMany({}),
    User.deleteMany({}),
  ]);

  console.log("Seeding users (Arab names & English addresses)…");
  const admin = await new User({
    email: "test@user.com",
    password: "12345678",
    firstName: "Ahmed",
    lastName: "Al-Arabi (Admin)",
    image: "https://i.pravatar.cc/150?u=admin",
    role: "admin",
    phone: "+20 100 123 4567",
    address: {
      street: "Corniche El Nile St, Garden City",
      city: "Cairo",
      state: "Cairo",
      country: "Egypt",
      zipCode: "11511",
    },
    preferences: {
      preferredDestinations: ["Cairo", "Dubai", "Riyadh"],
      preferredHotelTypes: ["Boutique", "Luxury"],
      budgetRange: { min: 100, max: 500 },
    },
    totalBookings: 0,
    totalSpent: 0,
    lastLogin: daysAgo(0),
    emailVerified: true,
    isActive: true,
  }).save();

  const owner = await new User({
    email: "owner@hotel.com",
    password: "12345678",
    firstName: "Mohamed",
    lastName: "Al-Malik (Owner)",
    image: "https://i.pravatar.cc/150?u=owner",
    role: "hotel_owner",
    phone: "+971 50 987 6543",
    address: {
      street: "Sheikh Zayed Road, Palm Jumeirah",
      city: "Dubai",
      state: "Dubai",
      country: "United Arab Emirates",
      zipCode: "00000",
    },
    preferences: {
      preferredDestinations: ["Dubai", "Abu Dhabi", "Sharm El Sheikh"],
      preferredHotelTypes: ["Luxury", "Resort"],
      budgetRange: { min: 150, max: 800 },
    },
    totalBookings: 0,
    totalSpent: 0,
    lastLogin: daysAgo(1),
    emailVerified: true,
    isActive: true,
  }).save();

  const guest = await new User({
    email: "guest@user.com",
    password: "12345678",
    firstName: "Omar",
    lastName: "Al-Musafir (Guest)",
    image: "https://i.pravatar.cc/150?u=guest",
    role: "user",
    phone: "+966 55 123 4567",
    address: {
      street: "King Fahd Road, Olaya",
      city: "Riyadh",
      state: "Riyadh",
      country: "Saudi Arabia",
      zipCode: "12211",
    },
    preferences: {
      preferredDestinations: ["Cairo", "Dubai", "Jeddah"],
      preferredHotelTypes: ["Resort", "Apartment"],
      budgetRange: { min: 80, max: 350 },
    },
    totalBookings: 0,
    totalSpent: 0,
    lastLogin: daysAgo(2),
    emailVerified: true,
    isActive: true,
  }).save();

  console.log("Seeding hotels with Arab cities & English names…");
  const hotelA = await new Hotel({
    userId: owner.id,
    name: "Nile Royal Hotel Cairo",
    city: "Cairo",
    country: "Egypt",
    description: "Refined 5-star riverside hotel with panoramic Nile views, fine dining restaurants, and outdoor infinity pool in downtown Cairo.",
    type: ["Boutique", "Luxury"],
    adultCount: 2,
    childCount: 1,
    facilities: ["Free WiFi", "Parking", "Spa", "Restaurant", "Nile View Pool"],
    pricePerNight: 180,
    starRating: 5,
    imageUrls: [IMG[0], IMG[1]],
    lastUpdated: new Date(),
    location: {
      latitude: 30.0444,
      longitude: 31.2357,
      address: {
        street: "Corniche El Nile, Garden City",
        city: "Cairo",
        state: "Cairo",
        country: "Egypt",
        zipCode: "11511",
      },
    },
    contact: {
      phone: "+20 2 2790 0000",
      email: "info@nileroyalcairo.com",
      website: "https://nileroyalcairo.example",
    },
    policies: {
      checkInTime: "15:00",
      checkOutTime: "12:00",
      cancellationPolicy: "Free cancellation up to 48h before check-in",
      petPolicy: "No pets allowed",
      smokingPolicy: "Non-smoking rooms",
    },
    amenities: {
      parking: true,
      wifi: true,
      pool: true,
      gym: true,
      spa: true,
      restaurant: true,
      bar: true,
      airportShuttle: true,
      businessCenter: true,
    },
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 4.9,
    reviewCount: 12,
    occupancyRate: 85,
    isActive: true,
    isFeatured: true,
  }).save();

  const hotelB = await new Hotel({
    userId: admin.id,
    name: "The Palm Dubai Resort",
    city: "Dubai",
    country: "United Arab Emirates",
    description: "Ultra-luxury resort located on the iconic Palm Jumeirah crescent featuring private beaches, Michelin-starred chefs, and underwater suites.",
    type: ["Luxury", "Resort"],
    adultCount: 4,
    childCount: 2,
    facilities: ["Free WiFi", "Private Beach", "Spa", "Valet Parking", "Infinity Pool"],
    pricePerNight: 320,
    starRating: 5,
    imageUrls: [IMG[2], IMG[0]],
    lastUpdated: new Date(),
    location: {
      latitude: 25.1124,
      longitude: 55.139,
      address: {
        street: "Crescent Road, Palm Jumeirah",
        city: "Dubai",
        state: "Dubai",
        country: "United Arab Emirates",
        zipCode: "00000",
      },
    },
    contact: {
      phone: "+971 4 426 0000",
      email: "stay@palmdubai.com",
      website: "https://palmdubai.example",
    },
    policies: {
      checkInTime: "15:00",
      checkOutTime: "12:00",
      cancellationPolicy: "Free cancellation 24h before check-in",
      petPolicy: "Small pets welcome",
      smokingPolicy: "Designated smoking areas",
    },
    amenities: {
      parking: true,
      wifi: true,
      pool: true,
      gym: true,
      spa: true,
      restaurant: true,
      bar: true,
      airportShuttle: true,
      businessCenter: true,
    },
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 4.8,
    reviewCount: 25,
    occupancyRate: 90,
    isActive: true,
    isFeatured: true,
  }).save();

  const hotelC = await new Hotel({
    userId: owner.id,
    name: "Riyadh Oasis Hotel",
    city: "Riyadh",
    country: "Saudi Arabia",
    description: "Modern high-rise hotel in Riyadh's Olaya business district combining Arabian hospitality with executive luxury.",
    type: ["Modern", "Business"],
    adultCount: 3,
    childCount: 2,
    facilities: ["Free WiFi", "Parking", "Executive Lounge", "Business Center"],
    pricePerNight: 160,
    starRating: 4,
    imageUrls: [IMG[1], IMG[2]],
    lastUpdated: new Date(),
    location: {
      latitude: 24.7136,
      longitude: 46.6753,
      address: {
        street: "King Fahd Road, Olaya",
        city: "Riyadh",
        state: "Riyadh",
        country: "Saudi Arabia",
        zipCode: "12211",
      },
    },
    contact: {
      phone: "+966 11 465 0000",
      email: "info@riyadhoasis.com",
      website: "https://riyadhoasis.example",
    },
    policies: {
      checkInTime: "14:00",
      checkOutTime: "12:00",
      cancellationPolicy: "Free cancellation up to 24h before",
      petPolicy: "No pets allowed",
      smokingPolicy: "100% non-smoking property",
    },
    amenities: {
      parking: true,
      wifi: true,
      pool: false,
      gym: true,
      spa: false,
      restaurant: true,
      bar: false,
      airportShuttle: true,
      businessCenter: true,
    },
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 4.7,
    reviewCount: 18,
    occupancyRate: 75,
    isActive: true,
    isFeatured: true,
  }).save();

  const hotel1 = await new Hotel({
    userId: owner.id,
    name: "Sharm El Sheikh Beach Resort",
    city: "Sharm El Sheikh",
    country: "Egypt",
    description: "Breathtaking Red Sea beachfront resort featuring private waterparks, world-class scuba diving reefs, and luxury family villas.",
    type: ["Resort", "Beach Front"],
    adultCount: 4,
    childCount: 2,
    facilities: ["Free WiFi", "Private Beach", "Aqua Park", "Spa", "All Inclusive Restaurant"],
    pricePerNight: 140,
    starRating: 5,
    imageUrls: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"],
    lastUpdated: new Date(),
    location: {
      latitude: 27.9158,
      longitude: 34.3299,
      address: { street: "Naama Bay, Promenade", city: "Sharm El Sheikh", state: "South Sinai", country: "Egypt", zipCode: "46619" },
    },
    contact: { phone: "+20 69 360 0000", email: "booking@sharmresort.com", website: "https://sharmresort.example" },
    policies: { checkInTime: "14:00", checkOutTime: "12:00", cancellationPolicy: "Free cancellation 48h before", petPolicy: "No pets allowed", smokingPolicy: "Outdoor smoking allowed" },
    amenities: { parking: true, wifi: true, pool: true, gym: true, spa: true, restaurant: true, bar: true, airportShuttle: true, businessCenter: false },
    totalBookings: 0, totalRevenue: 0, averageRating: 4.9, reviewCount: 32, occupancyRate: 88, isActive: true, isFeatured: true,
  }).save();

  const hotel2 = await new Hotel({
    userId: admin.id,
    name: "Jeddah Corniche Royal Hotel",
    city: "Jeddah",
    country: "Saudi Arabia",
    description: "Stunning hotel on Jeddah's iconic seaside corniche near King Fahd Fountain, featuring sea-view balconies and fresh seafood dining.",
    type: ["Luxury", "Boutique"],
    adultCount: 3,
    childCount: 1,
    facilities: ["Free WiFi", "Sea View", "Parking", "Restaurant", "Fitness Center"],
    pricePerNight: 210,
    starRating: 5,
    imageUrls: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"],
    lastUpdated: new Date(),
    location: {
      latitude: 21.5433,
      longitude: 39.1728,
      address: { street: "Corniche Road, Al-Shati District", city: "Jeddah", state: "Makkah Region", country: "Saudi Arabia", zipCode: "23412" },
    },
    contact: { phone: "+966 12 607 0000", email: "info@jeddahcorniche.com", website: "https://jeddahcorniche.example" },
    policies: { checkInTime: "15:00", checkOutTime: "12:00", cancellationPolicy: "Free cancellation 24h before", petPolicy: "No pets", smokingPolicy: "Non-smoking rooms" },
    amenities: { parking: true, wifi: true, pool: true, gym: true, spa: true, restaurant: true, bar: false, airportShuttle: true, businessCenter: true },
    totalBookings: 0, totalRevenue: 0, averageRating: 4.8, reviewCount: 22, occupancyRate: 82, isActive: true, isFeatured: true,
  }).save();

  const hotel3 = await new Hotel({
    userId: owner.id,
    name: "Hurghada Sunset Resort",
    city: "Hurghada",
    country: "Egypt",
    description: "Vibrant Red Sea coastal resort equipped with lagoons, pristine sandy beaches, and diving excursions.",
    type: ["Resort", "Beach Front"],
    adultCount: 4,
    childCount: 2,
    facilities: ["Free WiFi", "Beach Access", "Pool", "Diving Center", "Restaurant"],
    pricePerNight: 110,
    starRating: 4,
    imageUrls: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"],
    lastUpdated: new Date(),
    location: {
      latitude: 27.2579,
      longitude: 33.8116,
      address: { street: "Touristic Promenade", city: "Hurghada", state: "Red Sea", country: "Egypt", zipCode: "84511" },
    },
    contact: { phone: "+20 65 344 0000", email: "res@hurghadasunset.com", website: "https://hurghadasunset.example" },
    policies: { checkInTime: "14:00", checkOutTime: "11:00", cancellationPolicy: "Flexible cancellation", petPolicy: "Pets allowed", smokingPolicy: "Designated areas" },
    amenities: { parking: true, wifi: true, pool: true, gym: false, spa: true, restaurant: true, bar: true, airportShuttle: true, businessCenter: false },
    totalBookings: 0, totalRevenue: 0, averageRating: 4.6, reviewCount: 19, occupancyRate: 78, isActive: true, isFeatured: false,
  }).save();

  const hotel4 = await new Hotel({
    userId: owner.id,
    name: "Etihad Towers Hotel Abu Dhabi",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    description: "Iconic landmark hotel with floor-to-ceiling panoramic views over Abu Dhabi's Corniche and Arabian Gulf.",
    type: ["Luxury", "Business"],
    adultCount: 2,
    childCount: 1,
    facilities: ["Free WiFi", "Panoramic Views", "Luxury Spa", "Fine Dining"],
    pricePerNight: 290,
    starRating: 5,
    imageUrls: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800", "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"],
    lastUpdated: new Date(),
    location: {
      latitude: 24.4539,
      longitude: 54.3773,
      address: { street: "West Corniche Road", city: "Abu Dhabi", state: "Abu Dhabi", country: "United Arab Emirates", zipCode: "00000" },
    },
    contact: { phone: "+971 2 811 5555", email: "stay@etihadtowers.com", website: "https://etihadtowers.example" },
    policies: { checkInTime: "15:00", checkOutTime: "12:00", cancellationPolicy: "Free cancellation up to 48h", petPolicy: "No pets", smokingPolicy: "Non-smoking" },
    amenities: { parking: true, wifi: true, pool: true, gym: true, spa: true, restaurant: true, bar: true, airportShuttle: true, businessCenter: true },
    totalBookings: 0, totalRevenue: 0, averageRating: 4.9, reviewCount: 28, occupancyRate: 85, isActive: true, isFeatured: true,
  }).save();

  const hotel5 = await new Hotel({
    userId: admin.id,
    name: "Montaza Palace Hotel Alexandria",
    city: "Alexandria",
    country: "Egypt",
    description: "Classic historic hotel adjacent to Alexandria's famous Montaza Palace and Gardens overlooking the Mediterranean Sea.",
    type: ["Historic", "Boutique"],
    adultCount: 2,
    childCount: 1,
    facilities: ["Free WiFi", "Garden Access", "Sea View", "Restaurant"],
    pricePerNight: 130,
    starRating: 4,
    imageUrls: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"],
    lastUpdated: new Date(),
    location: {
      latitude: 31.2882,
      longitude: 30.0163,
      address: { street: "El-Geish Road, Montaza Gardens", city: "Alexandria", state: "Alexandria", country: "Egypt", zipCode: "21500" },
    },
    contact: { phone: "+20 3 548 0000", email: "info@montazapalace.com", website: "https://montazapalace.example" },
    policies: { checkInTime: "14:00", checkOutTime: "12:00", cancellationPolicy: "Free cancellation 24h before", petPolicy: "No pets", smokingPolicy: "Designated areas" },
    amenities: { parking: true, wifi: true, pool: false, gym: true, spa: false, restaurant: true, bar: false, airportShuttle: true, businessCenter: true },
    totalBookings: 0, totalRevenue: 0, averageRating: 4.7, reviewCount: 21, occupancyRate: 74, isActive: true, isFeatured: false,
  }).save();

  const hotel6 = await new Hotel({
    userId: owner.id,
    name: "The Pearl Doha Resort",
    city: "Doha",
    country: "Qatar",
    description: "Modern resort on Qatar's man-made island featuring private yacht marinas, luxury shopping, and Mediterranean dining.",
    type: ["Luxury", "Resort"],
    adultCount: 3,
    childCount: 2,
    facilities: ["Free WiFi", "Marina Access", "Spa", "Private Beach", "Pool"],
    pricePerNight: 270,
    starRating: 5,
    imageUrls: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"],
    lastUpdated: new Date(),
    location: {
      latitude: 25.3712,
      longitude: 51.5476,
      address: { street: "The Pearl Island, Porto Arabia", city: "Doha", state: "Doha", country: "Qatar", zipCode: "00000" },
    },
    contact: { phone: "+974 4 495 3888", email: "info@pearldoha.com", website: "https://pearldoha.example" },
    policies: { checkInTime: "15:00", checkOutTime: "12:00", cancellationPolicy: "Free cancellation 48h before", petPolicy: "Pets welcome", smokingPolicy: "Non-smoking" },
    amenities: { parking: true, wifi: true, pool: true, gym: true, spa: true, restaurant: true, bar: true, airportShuttle: true, businessCenter: true },
    totalBookings: 0, totalRevenue: 0, averageRating: 4.9, reviewCount: 35, occupancyRate: 87, isActive: true, isFeatured: true,
  }).save();

  console.log("Seeding bookings with Arab names & English details…");
  const bookingSpecs = [
    {
      hotelId: hotelA.id,
      userId: guest.id,
      firstName: "Omar",
      lastName: "Al-Musafir",
      email: "guest@user.com",
      phone: "+966 55 123 4567",
      adultCount: 2,
      childCount: 1,
      status: "confirmed" as const,
      paymentStatus: "paid" as const,
      paymentMethod: "card",
      specialRequests: "High floor with direct river Nile view if possible",
      checkIn: daysFromNow(14),
      checkOut: daysFromNow(17),
      createdAt: daysAgo(2),
      totalCost: 540,
      stripePaymentIntentId: "pi_seed_upcoming_paid",
    },
    {
      hotelId: hotelB.id,
      userId: guest.id,
      firstName: "Sara",
      lastName: "Mahmoud",
      email: "sara@user.com",
      phone: "+966 50 987 6543",
      adultCount: 2,
      childCount: 0,
      status: "confirmed" as const,
      paymentStatus: "paid" as const,
      paymentMethod: "card",
      specialRequests: "Late check-in after 21:00",
      checkIn: daysFromNow(20),
      checkOut: daysFromNow(23),
      createdAt: daysAgo(1),
      totalCost: 960,
      stripePaymentIntentId: "pi_seed_dubai_paid",
    },
    {
      hotelId: hotelC.id,
      userId: admin.id,
      firstName: "Ahmed",
      lastName: "Al-Arabi",
      email: "test@user.com",
      phone: "+20 100 123 4567",
      adultCount: 1,
      childCount: 0,
      status: "completed" as const,
      paymentStatus: "paid" as const,
      paymentMethod: "card",
      specialRequests: "Quiet room away from elevator",
      checkIn: daysAgo(10),
      checkOut: daysAgo(8),
      createdAt: daysAgo(25),
      totalCost: 320,
      stripePaymentIntentId: "pi_seed_admin_completed",
    },
  ];

  const savedBookings = [];
  for (const spec of bookingSpecs) {
    const b = await new Booking({
      userId: spec.userId,
      hotelId: spec.hotelId,
      firstName: spec.firstName,
      lastName: spec.lastName,
      email: spec.email,
      phone: spec.phone,
      adultCount: spec.adultCount,
      childCount: spec.childCount,
      checkIn: spec.checkIn,
      checkOut: spec.checkOut,
      totalCost: spec.totalCost,
      status: spec.status,
      paymentStatus: spec.paymentStatus,
      paymentMethod: spec.paymentMethod,
      specialRequests: spec.specialRequests || "",
      stripePaymentIntentId: spec.stripePaymentIntentId,
      createdAt: spec.createdAt,
      updatedAt: spec.createdAt,
    }).save();
    savedBookings.push(b);
  }

  const paidActive = savedBookings.filter(
    (b) =>
      b.paymentStatus === "paid" &&
      b.status !== "cancelled" &&
      b.status !== "refunded"
  );
  for (const hotel of [hotelA, hotelB, hotelC, hotel1, hotel2, hotel3, hotel4, hotel5, hotel6]) {
    const mine = paidActive.filter((b) => b.hotelId === hotel.id);
    hotel.totalBookings = mine.length;
    hotel.totalRevenue = mine.reduce((s, b) => s + (b.totalCost || 0), 0);
    await hotel.save();
  }

  console.log("Seeding English reviews for Arab hotels…");
  await new Review({
    userId: guest.id,
    hotelId: hotelA.id,
    bookingId: savedBookings[0]?.id,
    rating: 5,
    comment: "Exceptional stay with breathtaking Nile views! Staff were extremely helpful and clean.",
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
      amenities: 5,
    },
    isVerified: true,
    helpfulCount: 15,
  }).save();

  await new Review({
    userId: admin.id,
    hotelId: hotelB.id,
    bookingId: savedBookings[1]?.id,
    rating: 5,
    comment: "Ultra-luxurious resort on Palm Jumeirah. The private beach and service exceeded expectations.",
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 4,
      amenities: 5,
    },
    isVerified: true,
    helpfulCount: 9,
  }).save();

  console.log("Seeding analytics snapshot (Arab destinations in English)…");
  await Analytics.create({
    date: new Date(),
    metrics: {
      totalBookings: savedBookings.length,
      totalRevenue: paidActive.reduce((s, b) => s + (b.totalCost || 0), 0),
      totalUsers: 3,
      totalHotels: 9,
      averageBookingValue: 350,
      conversionRate: 75.0,
      cancellationRate: 10,
      averageRating: 4.8,
    },
    breakdown: {
      byStatus: {
        pending: 0,
        confirmed: 2,
        cancelled: 0,
        completed: 1,
        refunded: 0,
      },
      byPaymentStatus: {
        pending: 0,
        paid: 3,
        failed: 0,
        refunded: 0,
      },
      byDestination: [
        { city: "Cairo", bookings: 1, revenue: 540 },
        { city: "Dubai", bookings: 1, revenue: 960 },
        { city: "Riyadh", bookings: 1, revenue: 320 },
      ],
      byHotelType: [
        { type: "Boutique", bookings: 1, revenue: 540 },
        { type: "Luxury", bookings: 1, revenue: 960 },
        { type: "Business", bookings: 1, revenue: 320 },
      ],
    },
  });

  guest.totalBookings = paidActive.filter((b) => b.userId === guest.id).length;
  guest.totalSpent = paidActive
    .filter((b) => b.userId === guest.id)
    .reduce((s, b) => s + (b.totalCost || 0), 0);
  await guest.save();

  admin.totalBookings = paidActive.filter((b) => b.userId === admin.id).length;
  admin.totalSpent = paidActive
    .filter((b) => b.userId === admin.id)
    .reduce((s, b) => s + (b.totalCost || 0), 0);
  await admin.save();

  console.log("Seed complete.");
  console.log("  Admin login: test@user.com / 12345678 (role=admin)");
  console.log("  Owner login: owner@hotel.com / 12345678");
  console.log("  Guest login: guest@user.com / 12345678");
  if (disconnectAfter) {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedData(true).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
