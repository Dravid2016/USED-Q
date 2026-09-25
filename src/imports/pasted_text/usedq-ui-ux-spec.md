You are designing the complete production-ready UI/UX for USEDQ, a modern peer-to-peer marketplace for buying and selling pre-owned products.

PROJECT NAME:
USEDQ

DOMAIN:
usedq.com

BRAND:
usedq

TAGLINE:
Buy Used. Sell Smart.

IMPORTANT:
This is a UI/UX-first project.

If an existing USEDQ website/project is provided with this prompt, FIRST inspect and understand the existing project structure, routes, pages, components, assets, and existing user flows.

Do NOT blindly replace working functionality.

Preserve useful existing structure and functionality where possible, but redesign and improve the entire visual experience according to this specification.

Do not build backend/database/API logic as part of this task.
Use realistic mock data where necessary.
Keep mock data and UI components logically separated so real APIs can be connected later.

The final result must feel like a real, production-quality marketplace product rather than a generic UI template.

==================================================
1. PRODUCT VISION
==================================================

USEDQ is a modern marketplace for buying and selling used products.

The primary marketplace journey is:

DISCOVER
→ VIEW LISTING
→ BUILD TRUST
→ CONTACT SELLER
→ MAKE OFFER
→ NEGOTIATE
→ AGREE DEAL
→ MEET / COMPLETE TRANSACTION
→ MARK SOLD

The listing is the central object of the marketplace.

Everything should connect naturally around the listing:

LISTING
├── Seller
├── Images
├── Price
├── Location
├── Condition
├── Description
├── Specifications
├── Save
├── Share
├── Contact
├── Offers
├── Reports
└── Deal

Do not turn USEDQ into an Amazon-style shopping cart or warehouse/delivery platform.

Do not turn USEDQ into a social media platform.

Do not make auction functionality part of the core experience.

The product should feel like a modern classifieds/re-commerce marketplace.

==================================================
2. BRAND DIRECTION
==================================================

The official USEDQ logo is already established.

DO NOT redesign, distort, stretch, recolor, or modify the official logo artwork.

Use the existing official USEDQ logo asset wherever available.

Brand personality:

- Modern
- Trustworthy
- Youthful
- Clean
- Premium but accessible
- Efficient
- Human
- Community-oriented
- Sustainable

The visual identity should communicate:

"Buy Used. Sell Smart."

==================================================
3. EXACT COLOR SYSTEM
==================================================

Use the approved USEDQ color palette.

PRIMARY BRAND COLORS:

Brand Orange / Gold:
#FDB209

Deep Orange:
#E98B00

Warm Highlight:
#FFBE24

Ink Black:
#12151A

White:
#FFFFFF

Soft Neutral:
#F7F7F5

Border Neutral:
#E7E7E3

PRIMARY GRADIENT:

#FDB209 → #E98B00

Use gradients carefully.

DO NOT make every section gradient.

Gradients should primarily appear in:

- Primary CTA emphasis
- Selected/highlighted controls
- Important promotional areas
- Controlled brand accents
- Certain hero treatments
- Selected interactive states

Most of the interface should remain clean and solid-color.

Avoid:

- Blue-heavy UI
- Green-heavy UI
- Purple UI
- Red UI
- Random gradients
- Rainbow gradients
- Excessive glassmorphism
- Neon cyberpunk styling

Orange should be the brand accent, not the entire background.

==================================================
4. TYPOGRAPHY
==================================================

Use Inter as the primary UI font if available.

Typography hierarchy:

Display:
40–48px

Large heading:
32–40px

Section heading:
24–28px

Card/title:
18–20px

Body:
16px

Secondary:
14px

Caption:
12–13px

Use strong typography hierarchy.

Avoid excessive font weights.

Use bold/semi-bold primarily for:

- Prices
- Product titles
- Section headings
- Primary CTAs
- Important marketplace states

==================================================
5. DESIGN PRINCIPLES
==================================================

Create a polished marketplace experience with:

- Strong visual hierarchy
- Generous whitespace
- Large product imagery
- Clear pricing
- Easy scanning
- Rounded cards
- Subtle shadows
- Clean borders
- Consistent spacing
- Clear CTAs
- Accessible contrast
- Smooth interaction states
- Responsive layouts

Use an 8px spacing system.

Recommended spacing:

4
8
12
16
24
32
48
64
80

Recommended corner radius:

8
12
16
20
24
999/full pill

Do not over-round every element.

Use cards where cards improve scanning.

Do not put unnecessary cards inside cards.

==================================================
6. RESPONSIVE STRATEGY
==================================================

Design all major screens for:

Desktop:
1440px

Laptop:
1280px

Tablet:
768px

Mobile:
390px

Also ensure layouts can adapt to:

320px
375px
430px

Desktop and mobile must feel intentionally designed.

Do not simply shrink desktop layouts onto mobile.

Mobile should use:

- Bottom navigation
- Large touch targets
- Sticky actions where appropriate
- Compact filters
- Mobile-friendly image galleries
- Full-width CTAs
- Bottom sheets where appropriate

==================================================
7. APPLICATION SHELL
==================================================

DESKTOP HEADER:

LEFT:
USEDQ logo

CENTER:
Large search field

Search placeholder:

"What are you looking for?"

LOCATION:
"Select location"

RIGHT:
Saved
Messages
Notifications
Profile

PRIMARY CTA:

"+ Sell"

The Sell CTA should be visually prominent using the USEDQ brand treatment.

HEADER SHOULD:

- Stay clean
- Avoid unnecessary menu items
- Remain readable
- Support responsive behavior
- Use subtle shadow/border

MOBILE HEADER:

USEDQ logo
Search
Notifications

BOTTOM NAVIGATION:

Home
Search
Sell
Saved
Profile

The Sell action can be visually emphasized.

==================================================
8. HOMEPAGE
==================================================

Create a polished marketplace homepage.

Hero section:

Headline:

"Buy Used. Sell Smart."

Supporting text:

"Find great products nearby or sell things you no longer need."

Primary search:

"What are you looking for?"

Location:

"Select location"

Search button.

Below hero:

POPULAR CATEGORIES

Show visually distinct category cards.

Suggested categories:

Mobiles & Tablets
Electronics
Vehicles
Property
Fashion
Home & Furniture
Books & Education
Sports & Hobbies
Jobs & Services
Other

Then:

RECOMMENDED FOR YOU

Product grid.

Then:

RECENTLY ADDED

Product grid.

Then:

POPULAR NEAR YOU

Product grid.

Then:

SELL ON USEDQ

A seller-focused CTA section.

Then:

TRUST & SAFETY

Explain:

- Verified users
- Report suspicious listings
- Block users
- Safe communication
- Marketplace guidelines

Then footer.

==================================================
9. PRODUCT CARD SYSTEM
==================================================

Create reusable product cards.

Each card should include:

Product image
Favorite icon
Price
Title
Condition
Location
Posted time

Example:

₹25,000

iPhone 14 128GB

Good Condition

Chennai

2 days ago

Card interactions:

Default
Hover
Focused
Saved
Loading
Unavailable
Sold

Optional badges:

Featured
Verified Seller
New
Urgent
Sold

Do not overload cards with badges.

Image ratio should be consistent.

Use strong image hierarchy.

Price should be immediately visible.

==================================================
10. CATEGORY SYSTEM
==================================================

Create category browsing.

Categories page:

All Categories

Mobiles & Tablets
Electronics
Vehicles
Property
Fashion
Home & Furniture
Sports & Hobbies
Books & Education
Jobs & Services
Other

Category landing page should contain:

Breadcrumb
Category title
Category description
Subcategories
Popular searches
Listings
Filters
Sorting

==================================================
11. SEARCH EXPERIENCE
==================================================

Search is one of the most important parts of USEDQ.

Create:

Search page

Search bar

Location

Filter button

Sort button

Result count

Product grid/list

Search suggestions

Recent searches

Popular searches

Search empty state

Search no-results state

Search loading state

Search error state

Suggested no-result actions:

"Try a different keyword"

"Browse categories"

"Expand location"

==================================================
12. FILTER SYSTEM
==================================================

Common filters:

Location
Distance
Price
Condition
Posted date
Seller type

Dynamic category filters.

Electronics:

Brand
Model
Storage
RAM
Warranty
Condition

Vehicles:

Brand
Model
Year
Fuel type
Transmission
Kilometers
Owner count

Property:

Property type
Bedrooms
Bathrooms
Area
Furnished
Ownership

Filters should be:

- Clear
- Easy to reset
- Easy to apply
- Responsive
- Mobile friendly

Desktop:
Use filter sidebar or structured filter bar.

Mobile:
Use filter bottom sheet.

Include:

Apply Filters

Clear All

Active filter chips.

==================================================
13. LISTING DETAIL PAGE
==================================================

This is a critical screen.

Desktop layout:

LEFT:
Large image gallery

RIGHT:
Price
Title
Condition
Location
Posted date
Save
Share
Contact Seller
Make Offer

Below:

Description

Specifications

Seller information

Safety information

Related listings

Mobile:

Image gallery first.

Sticky bottom CTA:

Contact Seller

Secondary:

Make Offer

Use clear hierarchy.

Listing page must communicate trust.

Include:

Seller verification
Member since
Seller rating
Response information

Do not expose private exact addresses.

Use:

Chennai
Velachery

rather than exact residential address.

==================================================
14. IMAGE GALLERY
==================================================

Create:

Desktop gallery

Mobile swipe gallery

Thumbnail navigation

Full-screen image viewer

Image counter:

1 / 8

Image loading state

Broken image state

No image state

Allow:

Zoom
Swipe
Previous
Next
Close

==================================================
15. SELLER PROFILE
==================================================

Seller profile should show:

Profile photo
Name
Verified status
Rating
Location
Member since
Response information

Stats:

Active listings
Sold listings

Seller listings grid.

Actions:

Contact Seller

Report User

Block User

Seller reputation should feel informative, not gamified.

==================================================
16. CREATE LISTING / SELL FLOW
==================================================

Create a clear multi-step flow.

STEP 1:

"What are you selling?"

Category selection.

STEP 2:

Product information.

Fields:

Title
Description
Price
Condition
Brand
Model
Specifications

STEP 3:

Photos.

"Add photos"

Show upload area.

Allow multiple images.

Show:

Upload progress
Remove
Reorder
Set cover image

STEP 4:

Location.

City
Area
Pincode

Optional:

Use current location

Do not expose exact private location publicly.

STEP 5:

Preview.

Show the listing exactly as buyers will see it.

STEP 6:

Publish.

Primary CTA:

"Publish Listing"

Include draft save.

==================================================
17. LISTING CREATION STATES
==================================================

Create:

Empty form
Filled form
Validation error
Upload loading
Upload success
Upload error
Draft saved
Publish confirmation
Publish failure

Do not rely only on red error text.

Use inline validation.

==================================================
18. MY LISTINGS
==================================================

Create seller dashboard.

Tabs:

All
Active
Drafts
Sold
Expired

Each listing should show:

Image
Title
Price
Views
Favorites
Enquiries
Status

Actions:

Edit
Preview
Mark Sold
Delete
Share

Listing statuses:

DRAFT
PENDING REVIEW
ACTIVE
SOLD
EXPIRED
REJECTED
DELETED

Use visually distinct but restrained status treatments.

==================================================
19. SAVED LISTINGS
==================================================

Saved page:

Saved Listings

Product grid.

States:

Saved listings
No saved listings
Listing removed
Listing sold
Price changed

Example empty state:

"Nothing saved yet."

CTA:

"Explore Listings"

==================================================
20. MESSAGING
==================================================

Create marketplace chat.

Desktop:

Conversation list
Active conversation
Listing reference

Mobile:

Conversation list
Chat screen

Conversation should show the referenced listing.

Example:

iPhone 14
₹25,000
Chennai

Buttons:

View Listing
Make Offer

Chat UI:

Buyer message
Seller message
Timestamp
Read state

Create:

Empty
Loading
Error
Blocked
Deleted listing
User blocked
Offline/reconnecting

==================================================
21. OFFER SYSTEM
==================================================

Buyer can make an offer.

Example:

Listed price:

₹25,000

Offer:

₹21,000

CTA:

"Send Offer"

Seller actions:

Accept
Reject
Counter Offer

Offer states:

PENDING
ACCEPTED
REJECTED
COUNTERED
EXPIRED

Create visual offer cards inside chat.

Offer history should be visible.

Example:

Seller:
₹23,000

Buyer:
₹21,000

Seller:
₹22,000

Buyer:
Accepted

Keep the interaction extremely clear.

==================================================
22. NEGOTIATION
==================================================

Negotiation should happen naturally inside messaging.

Create:

Offer card
Counter offer card
Accepted state
Rejected state
Expired state

Avoid making negotiation feel like an auction.

==================================================
23. DEAL / MEETUP FLOW
==================================================

After offer acceptance:

OFFER ACCEPTED
↓
DEAL AGREED
↓
DATE
↓
TIME
↓
LOCATION
↓
MEET
↓
TRANSACTION
↓
MARK SOLD

Create a Deal screen.

Show:

Product
Agreed price
Buyer
Seller
Meeting date
Meeting time
Meeting location
Deal status

Actions:

Confirm Deal
Change Details
Cancel Deal
Mark Completed

Important:

USEDQ should facilitate communication and deal coordination.

Do not imply that USEDQ automatically handles payment or delivery unless explicitly configured later.

==================================================
24. DEAL STATES
==================================================

Create:

Deal pending
Deal confirmed
Meeting scheduled
Meeting today
Completed
Cancelled
Buyer cancelled
Seller cancelled
Expired

Also design edge cases:

Buyer did not show
Seller did not show
Meeting cancelled
Product unavailable
Deal cancelled

==================================================
25. NOTIFICATIONS
==================================================

Create notification center.

Notification types:

New message
New offer
Counter offer
Offer accepted
Offer rejected
Saved listing price changed
Listing sold
Listing approved
Listing rejected
Deal reminder
Safety notification
Account/security notification

Each notification should deep-link to the relevant object.

Create:

Unread
Read
Empty
Loading
Error

==================================================
26. PROFILE
==================================================

Profile page:

Profile photo
Name
Email/phone verification
Location
Member since

Sections:

My Listings
Saved
Messages
Notifications
Reviews
Settings

==================================================
27. SETTINGS
==================================================

Settings:

Account
Profile
Privacy
Notifications
Security
Blocked users
Language
Help & Support
Terms
Privacy Policy
Logout

Danger zone:

Delete account

Make destructive actions clearly distinguishable.

==================================================
28. TRUST & SAFETY
==================================================

Create a dedicated trust and safety experience.

Listing report:

Report listing

Reasons:

Fraud
Fake product
Duplicate listing
Wrong category
Inappropriate content
Suspicious seller
Incorrect information
Other

User report:

Report user

Block user.

Safety tips:

Meet in public places
Verify the product
Do not share sensitive information
Be careful with unusual payment requests
Report suspicious behavior

Use calm, professional language.

Do not use fear-based design.

==================================================
29. REPORT FLOW
==================================================

Create:

Report modal
Reason selection
Optional details
Submit confirmation

States:

Submitting
Success
Error

Example:

"Thanks. Your report has been submitted."

==================================================
30. ADMIN UI PREVIEW
==================================================

Create a separate admin visual direction.

Admin dashboard:

Overview
Users
Listings
Categories
Reports
Moderation
Featured Listings
Analytics
Settings

Dashboard cards:

Total Users
Active Listings
Sold Listings
Pending Reports
New Listings
New Users

Admin listing moderation:

Approve
Reject
Suspend
Delete
Feature

Keep admin visually related to USEDQ but clearly different from the consumer marketplace.

==================================================
31. LOADING STATES
==================================================

Create skeleton loaders for:

Homepage
Product cards
Listing detail
Seller profile
Search
Messages
Notifications
My Listings

Avoid generic spinning loaders wherever skeleton loading makes more sense.

==================================================
32. EMPTY STATES
==================================================

Create useful empty states.

Examples:

No listings
No search results
No saved items
No messages
No notifications
No offers
No listings created
No sold items

Each should include:

Simple illustration/icon
Short explanation
Relevant CTA

Do not make empty states visually depressing.

==================================================
33. ERROR STATES
==================================================

Create:

Network error
Server error
Listing unavailable
Listing deleted
Permission denied
Session expired
Image upload failure
Message failed
Offer failed
Unknown error

Provide:

What happened
What the user can do next

Example:

"Something went wrong."

"Please try again."

[Try Again]

==================================================
34. SUCCESS STATES
==================================================

Create clear success feedback.

Examples:

Listing published
Listing saved
Offer sent
Offer accepted
Message sent
Deal confirmed
Listing marked sold
Report submitted

Use the orange brand system carefully.

==================================================
35. MICROINTERACTIONS
==================================================

Design interaction states for:

Buttons
Cards
Inputs
Favorites
Tabs
Dropdowns
Filters
Search
Messages
Offers
Listing status

States:

Default
Hover
Pressed
Focused
Disabled
Loading
Success
Error

Use subtle animation.

Avoid excessive motion.

==================================================
36. ACCESSIBILITY
==================================================

Design with accessibility in mind.

Requirements:

Strong color contrast
Visible focus states
Keyboard navigation
Readable typography
Large touch targets
Clear labels
Accessible icons
Do not rely only on color to communicate status

Important:

Orange gradients must not be used behind small text when contrast is insufficient.

==================================================
37. RESPONSIVE MOBILE UX
==================================================

Mobile is a first-class experience.

Mobile homepage:

Header
Search
Categories
Listings
Bottom navigation

Mobile listing:

Gallery
Price
Title
Location
Seller
Description
Details

Sticky bottom:

Contact Seller
Make Offer

Mobile sell flow:

Use step-based screens.

Mobile filters:

Bottom sheet.

Mobile chat:

Full-screen conversation.

Mobile deal:

Simple step-by-step confirmation.

==================================================
38. DESKTOP UX
==================================================

Use large screens effectively.

Maximum content width around:

1200–1320px

Use:

2-column listing details

3–5 column product grids depending on viewport

Persistent navigation where useful

Sidebar filters where useful

Do not stretch content across the entire screen.

==================================================
39. COMPONENT LIBRARY
==================================================

Create reusable components.

Navigation:

Header
Mobile Header
Bottom Navigation
Footer

Inputs:

Text Input
Search Input
Select
Location Select
Price Input
Textarea

Buttons:

Primary
Secondary
Ghost
Danger
Icon Button
Loading Button

Cards:

Product Card
Seller Card
Offer Card
Notification Card
Conversation Card
Deal Card

Feedback:

Toast
Alert
Badge
Status
Skeleton
Empty State
Error State

Overlays:

Modal
Drawer
Bottom Sheet
Image Viewer
Confirmation Dialog

Marketplace:

Category Card
Filter Chip
Filter Panel
Sort Menu
Listing Gallery
Seller Profile Card
Offer Composer
Message Composer
Deal Summary

==================================================
40. DESIGN SYSTEM CONSISTENCY
==================================================

Every screen must use the same:

Colors
Typography
Spacing
Radii
Shadows
Icon style
Button style
Input style
Card style

Do not create one-off UI styles unless absolutely necessary.

Create reusable components and variants.

==================================================
41. VISUAL QUALITY
==================================================

The result should feel like a serious startup product.

Target visual quality:

Premium
Clean
Modern
Minimal
Trustworthy
Fast
Human

Avoid:

Generic SaaS dashboard aesthetic
Overly futuristic UI
Excessive glassmorphism
Excessive gradients
Crowded screens
Random colors
Huge unnecessary illustrations
Excessive shadows
Inconsistent cards

==================================================
42. IMAGE DIRECTION
==================================================

Use realistic marketplace imagery.

Product images should feel like real second-hand marketplace listings.

Include realistic examples such as:

Phones
Laptops
Cameras
Furniture
Bikes
Cars
Fashion
Books
Gaming products
Home appliances

Do not use obviously fake AI-looking product photography where realistic imagery is available.

==================================================
43. CONTENT
==================================================

Use realistic marketplace copy.

Avoid:

"Lorem ipsum"

"Product Name"

"John Doe"

Use believable examples:

"iPhone 14 128GB"
"Samsung Galaxy S23"
"Royal Enfield Classic 350"
"Wooden Study Table"
"Canon EOS 1500D"

Use Indian marketplace context.

Currency:

₹

Locations can include:

Chennai
Bengaluru
Hyderabad
Mumbai
Delhi
Coimbatore
Pune

==================================================
44. UI/UX PHASE STRUCTURE
==================================================

Organize the Figma project into:

01 — Foundations
02 — Components
03 — Application Shell
04 — Home & Discovery
05 — Categories
06 — Search & Filters
07 — Listing Details
08 — Seller Profile
09 — Sell Flow
10 — My Listings
11 — Saved
12 — Messaging
13 — Offers & Negotiation
14 — Deal & Meetup
15 — Notifications
16 — Trust & Safety
17 — Profile & Settings
18 — Admin
19 — Responsive
20 — States
21 — Final QA

==================================================
45. SCREEN COMPLETENESS
==================================================

Do not create only the happy-path screens.

For EVERY major feature, create:

Default
Loading
Empty
Error
Success
Disabled
Unavailable

Where applicable also create:

Hover
Focused
Pressed
Saved
Sold
Expired
Blocked
Reported

==================================================
46. FINAL UX FLOW
==================================================

The complete user journey must work visually:

NEW USER
↓
HOME
↓
SEARCH / CATEGORY
↓
FILTER
↓
LISTING
↓
SELLER PROFILE
↓
SAVE / CONTACT
↓
CHAT
↓
MAKE OFFER
↓
COUNTER OFFER
↓
OFFER ACCEPTED
↓
DEAL
↓
MEETUP
↓
COMPLETED
↓
LISTING SOLD

SELLER JOURNEY:

LOGIN
↓
SELL
↓
CATEGORY
↓
PRODUCT DETAILS
↓
PHOTOS
↓
LOCATION
↓
PREVIEW
↓
PUBLISH
↓
ACTIVE LISTING
↓
BUYER ENQUIRY
↓
CHAT
↓
OFFER
↓
NEGOTIATION
↓
DEAL
↓
MARK SOLD

==================================================
47. IMPORTANT PRODUCT RULES
==================================================

1. USEDQ is a marketplace, not an e-commerce warehouse.
2. The listing is the central marketplace object.
3. Buyer and seller communication is central.
4. Offers and negotiation are first-class experiences.
5. Accepted offer does not automatically mean transaction completed.
6. Deal and meetup must be visually separate from offer acceptance.
7. Seller can mark the listing as sold.
8. Exact private residential addresses should not be publicly displayed.
9. Trust should be visible without overwhelming the interface.
10. The official USEDQ logo must remain unchanged.
11. Do not introduce unrelated brand colors.
12. Do not overuse gradients.
13. Do not copy another marketplace's exact visual design.
14. Use USEDQ's own visual identity.
15. Keep UI components reusable.
16. Keep mock data separate from UI components.
17. Design responsive layouts intentionally.
18. Every important feature needs loading, empty and error states.
19. Accessibility must be considered from the beginning.
20. Prioritize clarity over visual decoration.

==================================================
48. FINAL DELIVERABLE
==================================================

Create the complete USEDQ marketplace UI/UX as a cohesive production-ready design system and screen library.

The final design should include:

- Complete design system
- Brand foundations
- Reusable components
- Desktop screens
- Tablet behavior
- Mobile screens
- Homepage
- Search
- Categories
- Filters
- Listing details
- Seller profile
- Sell flow
- My listings
- Saved listings
- Messaging
- Offers
- Negotiation
- Deal/Meetup
- Notifications
- Trust & Safety
- Profile
- Settings
- Admin UI
- Loading states
- Empty states
- Error states
- Success states
- Responsive states
- Accessibility states

Create a coherent end-to-end experience rather than disconnected screens.

The final result should look like a real product that could be handed to a development team for implementation.

MOST IMPORTANT:

Do not stop after creating a homepage.

Complete the entire marketplace experience.

Build the UI/UX systematically from:

FOUNDATIONS
→ COMPONENTS
→ APPLICATION SHELL
→ DISCOVERY
→ LISTINGS
→ SELLING
→ COMMUNICATION
→ OFFERS
→ NEGOTIATION
→ DEALS
→ TRUST
→ SETTINGS
→ RESPONSIVE
→ STATES
→ FINAL QA.

Before considering the design complete, perform a visual consistency pass across every screen and make sure the USEDQ brand system, spacing, typography, components, interactions, and responsive behavior remain consistent throughout the entire product.