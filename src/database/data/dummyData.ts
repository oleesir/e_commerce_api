import bcrypt from 'bcryptjs';
import { slugify } from '../../utils/slugify';
import cloudinary from '../../utils/cloudinary';

const uploadImage = async (imageFiles: string[]) => {
  try {
    let multiplePicturePromise = imageFiles.map(
      async (file: any) => await cloudinary.uploader.upload(`./assets/${file}`),
    );

    let imageResponses = await Promise.all(multiplePicturePromise);
    return imageResponses.map((img) => {
      return {
        secureUrl: img.secure_url,
        cloudinaryId: img.public_id,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const users = [
  {
    firstName: 'Odey',
    lastName: 'Palatini',
    password: bcrypt.hashSync('BdkyJa6bUXo6', 10),
    email: 'opalatini0@soup.io',
    isAdmin: true,
  },
  {
    firstName: 'Sidoney',
    lastName: 'Mandrake',
    password: bcrypt.hashSync('U93ZGbgoIiV', 10),
    email: 'smandrake1@facebook.com',
  },
  {
    firstName: 'Shelba',
    lastName: 'McCartney',
    password: bcrypt.hashSync('5nBLf0D', 10),
    email: 'smccartney2@patch.com',
  },
  {
    firstName: 'Dion',
    lastName: 'Jaggs',
    password: bcrypt.hashSync('YBjZu5Zyf', 10),
    email: 'djaggs3@sina.com.cn',
  },
  {
    firstName: 'Marysa',
    lastName: 'Mockler',
    password: bcrypt.hashSync('0Stx9oLKNP', 10),
    email: 'mmockler4@tuttocitta.it',
    isAdmin: true,
  },
];

export const getProductsDummyData = async () => [
  {
    name: 'Logitech G915 TKL Tenkeyless LIGHTSPEED Wireless RGB Mechanical Gaming Keyboard, Low Profile Switch Options, LIGHTSYNC RGB, Advanced Wireless and Bluetooth Support - Tactile',
    slug: slugify(
      'Logitech G915 TKL Tenkeyless LIGHTSPEED Wireless RGB Mechanical Gaming Keyboard, Low Profile Switch Options, LIGHTSYNC RGB, Advanced Wireless and Bluetooth Support - Tactile',
    ),
    description: `LIGHTSPEED wireless delivers pro-grade performance with flexibility and freedom from cords. Creates a clean aesthetic for battlestations. Delivers 40 hours on a single full charge.
LIGHTSYNC technology provides RGB lighting that synchronizes lighting with any content. Personalize each key or create custom animations from about 16.8M colors with Logitech G HUB software. Cable Length: 6 ft (1.8 m)
Low Profile mechanical switches offers the speed, accuracy and performance of a mechanical switch at half the height The GL Clicky switch features a distinctive sound and tactile feedback. Comes in 3 options: GL Tactile, GL Linear or GL Clicky.
Tenkeyless design provides more room for mouse movement. Store the USB receiver in the back of the keyboard for additional portability.
Beautifully crafted, the G915 TKL uses aircraft-grade aluminum alloy to deliver incredibly thin but rigid and durable design. Actuation distance: 0.059 in (1.5 mm). Actuation force: 1.76 oz (50 g)`,
    reviews: [],
    images: await uploadImage([
      '41mvrBsVYEL._AC_SR480,480_.jpg',
      '61V2O4vbYhL._AC_UL320_SR320,320_.jpg',
    ]),
    category: 'keyboard',
    brand: 'logitech',
    rating: 0,
    numberOfReviews: 0,
    price: 26900,
    countInStock: 120,
  },
  {
    name: 'NuPhy Air75 Mechanical Keyboard, 75% Low Profile Wireless/Wired Gaming Keyboard, Supports Bluetooth 5.0, 2.4G and Wired Connection, Compatible with Windows and Mac OS Systems-Gateron Brown Switch',
    slug: slugify(
      'NuPhy Air75 Mechanical Keyboard, 75% Low Profile Wireless/Wired Gaming Keyboard, Supports Bluetooth 5.0, 2.4G and Wired Connection, Compatible with Windows and Mac OS Systems-Gateron Brown Switch',
    ),
    description: `⌨【Low Profile Mechanical Keyboard】：Air75 is an innovative, the thinnest mechanical keyboard on the market, use 75% layout (84 keys), thanks to the ultra-thin aluminum frame and advanced aluminum alloy stamping process, the thinnest point is only 16 mm. Like the membrane keyboard, there is no need for a wrist rest, and long-time use will not cause damage to the wrist.
💻【Multi-Device Connection】：Air75 provides a variety of connection methods, including 2.4G wireless mode, Bluetooth 5.0 and USB C wired mode. It can connect to up to four devices at the same time and switch between them easily, it is very suitable for home, office, outing and casual games.
🔋【48 Hours of Battery Life】：It is equipped with a 2500 mAh battery, which can be used continuously for 48 hours (laboratory test results, actual use may vary), and can easily meet the needs of a week of work. Turning off the light mode during the day can greatly extend the use time.The metal nameplate on the back of the keyboard is covered with a transparent protective film that can be removed before use.
💡【RGB Lighting Effects】: Air75 has 21 backlight modes and 4 side light modes. The innovative left LED light shows caps lock and connection mode, while the right LED light bar indicates battery power and system mode. You can choose dynamic or static light mode according to your preferences. With Windows software, you can even customize unlimited lighting effects.
✂【New multimedia buttons】：Air75 is compatible with Mac and Windows, and provides multimedia button layouts and shortcut keys for Mac users. The scissors icon represents part of the screenshot. FN+scissors can capture the full screen. It also supports Siri and Cortana.`,
    reviews: [],
    images: await uploadImage(['nuphy75.jpeg', 'nuphy752.jpeg']),
    category: 'keyboard',
    brand: 'nuphy',
    rating: 0,
    numberOfReviews: 0,
    price: 16900,
    countInStock: 20,
  },
  {
    name: 'Keychron K3 Ultra-Slim 75% Layout Wireless Bluetooth/Wired USB Mechanical Keyboard, Hot Swappable Low-Profile Keychron Optical Switch White LED Backlight 84 Keys Keyboard for Mac Windows-Version 2',
    slug: slugify(
      'Keychron K3 Ultra-Slim 75% Layout Wireless Bluetooth/Wired USB Mechanical Keyboard, Hot Swappable Low-Profile Keychron Optical Switch White LED Backlight 84 Keys Keyboard for Mac Windows-Version 2',
    ),
    description: `Keychron K3, a compact 75% layout 84 keys hot-swappable ultra-slim wireless mechanical keyboard (Exclusive color scheme) built for peak productivity, a great tactile typing experience. Personalize per-key typing experience without soldering, and let you personalize per-key typing experience without soldering.
  Be ready to multitask without missing a beat by connecting the K3 with up to 3 devices via the stable Bluetooth 5.1 chipset and switch between your laptop, PC, tablet and phone seamlessly. It also has wired mode with USB Type-C connection.
  With a unique Mac layout, the K3 has all the necessary Mac multimedia keys while still being compatible with Windows. Extra keycaps for both Windows and Mac operating systems are included.
  The redesigned low-profile Keychron optical red switch is 40% slimmer than conventional switches without sacrificing their typing experience. With the reinforced aluminum body (plastic bottom frame) make the K3 one of the thinnest and lightweight mechanical keyboards on the market.
  You can easily hot-swap every low-profile optical switch without soldering to customize your typing experience on the K3 (*This keyboard is NOT compatible with any conventional MX style mechanical switch). The pre-installed low-profile optical red switch provides unrivaled linear responsiveness with up to 70 million keystroke lifespan, and it supports NKRO on the wired mode or 6KRO on the wireless mode.`,
    reviews: [],
    images: await uploadImage(['keychronk3.jpeg', 'nuphy752.jpeg']),
    category: 'keyboard',
    brand: 'keychron',
    rating: 0,
    numberOfReviews: 0,
    price: 12600,
    countInStock: 20,
  },
  {
    name: 'BlueDiamond GDKB01 Connect Basic, English USB Keyboard - for PC - Spill Proof - Easy Connect and Use - Ergonomic Black',
    slug: slugify(
      'BlueDiamond GDKB01 Connect Basic, English USB Keyboard - for PC - Spill Proof - Easy Connect and Use - Ergonomic Black',
    ),
    description: `[26 Gorgeous Backlighting Effects] The 104 keys gaming keyboard offers 26 backlighting modes with RGB effects, providing over 16 million color combinations to personalize your keyboard's appearance. The lighting also has a memory function, you can quickly resume your preferred lighting mode when restart computer
  [Hot-Swappable Switches] The full keys mechanical keyboard comes with six extra switches (two each of red, brown, and blue) for you to try different switch types and enrich your typing experience. Additionally, the double-shot injection keycaps are fade-resistant and long-lasting
  [Anti-Ghosting Technology] Full-key anti-ghosting technology ensures that every keystroke is registered, and even when multiple keys are pressed at the same time, the keyboard's super-responsive speed keeps up with your best moves, allowing you to enjoy a seamless, uninterrupted gaming experience and help you win games
  [Multi-Functionality and Compatibility] The keyboard has the leading dual system fast control technology, quick MW technology can realize the common multi-function combination control under Apple and Microsoft system, including multimedia control and other high frequency use scenarios, easy for you to achieve fast use
  [KOORUI SERVICES] KOORUI provide high-quality gamer keyboard and premium services, included 12 months warranty. If you find any damage, malfunction or missing accessories, please feel free to contact us`,
    reviews: [],
    images: await uploadImage(['blueDiamond.jpeg', 'blueDiamond2.jpeg']),
    category: 'keyboard',
    brand: 'blueDiamond',
    rating: 0,
    numberOfReviews: 0,
    price: 1400,
    countInStock: 15,
  },
  {
    name: 'Gaming Keyboard, 104 Keys All-Metal Panel, Dacoity Rainbow LED Backlit Quiet Computer Keyboard, Wrist Rest, Multimedia Keys, Anti-ghosting Keys, Waterproof Light Up USB Wired Keyboard for PC Mac Xbox',
    slug: slugify(
      'Gaming Keyboard, 104 Keys All-Metal Panel, Dacoity Rainbow LED Backlit Quiet Computer Keyboard, Wrist Rest, Multimedia Keys, Anti-ghosting Keys, Waterproof Light Up USB Wired Keyboard for PC Mac Xbox',
    ),
    description: `🌟【Ergonomic Design with Wrist Rest】This silent keyboard features a scientific stepped keycap design to maximize hand comfort for long hours of gaming or work. It also provides you with an ergonomic typing angle (7°) and wrist support during use. All keys have a soft feel and no loud clicks. It will not affect others when staying up late typing or playing games, it is very suitable for office or games.
🌟【LED Backlit Light Up Keyboard】There are 2 light-up modes and 3 levels of brightness for choice. ☼: Static Backlit/turn off; FN+☼: Dynamic backlight. Fn+PgUp: Adjust the brightness plus; Fn+PgDn: Adjust the brightness reduction. FN+ +/-: Adjust the speed of the dynamic backlight. (Note: the light is not RGB, the light color cannot be changed).
🌟【Durable Metal Panel Keyboard】This rainbow backlit keyboard is designed with an aluminum alloy panel, which not only improves the overall texture of the USB keyboard but also greatly improves the durability and water resistance. The metal frame on the keyboard is also coated with rubber oil, which is skin-friendly and feels more comfortable. At the same time, there are 4 drainage holes at the bottom of the led keyboard, you don't worry about spilled liquids that will damage the computer keyboard.
🌟【Multi-Media & Anti Ghosting】12 multimedia keys for your gaming operation or work efficiency. 19 anti-ghosting keys, every click is never lost, ensuring smooth typing. You can interchange WSAD keys with arrow keys by pressing FN+W and lock/unlock the WIN key by pressing N+WIN. (Note: Multimedia keys are unavailable on Mac)
🌟【Strong Compatibility & Quality Assurance】Constructed with a classic crater structure, this waterproof keyboard can withstand 50 million keystrokes. No matter how long you use it, the laser-engraved letters on the keycaps are durable and never fade. Removable keycaps for quick cleaning without worrying about dust or dirt. It supports Plug & Play and is widely compatible with Windows 95/98/XP/2000/ME/VISTA/7/8/9/10, Mac.
🌟【You are our VIP customer】Dacoity wired keyboard that meets the need of gamers, typists, programmers, and writers, and combines your office and gaming experience. If you have any quality problems, please contact customer service. We offer 180 days refund or replacement and a free-time warranty for the quality problem.`,
    reviews: [],
    images: await uploadImage(['dacoity.jpeg', 'dacoity2.jpeg']),
    category: 'keyboard',
    brand: 'dacoity',
    rating: 0,
    numberOfReviews: 0,
    price: 2900,
    countInStock: 5,
  },

  {
    name: 'Arteck 2.4G Wireless Keyboard Stainless Steel Ultra Slim Full Size Keyboard with Numeric Keypad for Computer/Desktop/PC/Laptop/Surface/Smart TV and Windows 10/8/ 7 Built in Rechargeable Battery',
    slug: slugify(
      'Arteck 2.4G Wireless Keyboard Stainless Steel Ultra Slim Full Size Keyboard with Numeric Keypad for Computer/Desktop/PC/Laptop/Surface/Smart TV and Windows 10/8/ 7 Built in Rechargeable Battery',
    ),
    description: `Easy Setup: Simply insert the nano USB receiver into your computer and use the keyboard instantly.
Ergonomic design: Stainless steel material gives heavy duty feeling, low-profile keys offer quiet and comfortable typing.
6-Month Battery Life: Rechargeable lithium battery with an industry-high capacity lasts for 6 months with single charge (based on 2 hours non-stop use per day).
Ultra Thin and Light: Compact size (16.9 X 4.9 X 0.6in) and light weight (14.9oz) but provides full size keys, arrow keys, number pad, shortcuts for comfortable typing.
Package contents: Arteck Stainless 2.4G Wireless Keyboard, nano USB receiver, USB charging cable, welcome guide, our 24-month warranty and friendly customer service. }`,
    reviews: [],
    images: await uploadImage(['arteck.jpeg', 'arteck2.jpeg']),
    category: 'keyboard',
    brand: 'arteck',
    rating: 0,
    numberOfReviews: 0,
    price: 3900,
    countInStock: 35,
  },
  {
    name: 'Portable 60% Mechanical Gaming Keyboard, MageGee MK-Box LED Backlit Compact 68 Keys Mini Wired Office Keyboard with Red Switch for Windows Laptop PC Mac - Black/Grey',
    slug: slugify(
      'Portable 60% Mechanical Gaming Keyboard, MageGee MK-Box LED Backlit Compact 68 Keys Mini Wired Office Keyboard with Red Switch for Windows Laptop PC Mac - Black/Grey',
    ),
    description: `Mini Portable 60% Compact Layout: MK-Box is a 68 keys mechanical keyboard with cute small size, but retains separate arrow keys and f1-f12 function keys, you can use it for gaming or work while saving space.
Mechanical red switch: characterized for being linear and smoother, slight key sound has no paragraph sense with minimal resistance, but fast action without a tactile bump feel which makes it easier to tap the keyboard.
Classic charming blue backlit: Customize multiple illuminated LED light effects, supports about 15 backlight modes inclue static and dynamic, press Fn + Ins can control it, FN + ←/→ control backlight speed, FN + ↑/↓ control backlight brightness.
Full anti-ghosting keyboard: all 68 keys are no conflict, black grey mash up design, ergonomic suspension double-color injection keycap, double kickstand feet adjustable typing angle and detachable usb cable, both practical and beautiful.
Extensive compatibility: MageGee MK-Box mechanical keyboards use USB 2.0 connector making it compatible with Windows (2000, XP, ME, Vista, 7, 8), Linux and Mac, plug and play, no drivers or software required.`,
    reviews: [],
    images: await uploadImage(['magegee.jpeg', 'magegee2.jpeg']),
    category: 'keyboard',
    brand: 'mageGee',
    rating: 0,
    numberOfReviews: 0,
    price: 3900,
    countInStock: 25,
  },
  {
    name: 'TMKB Wired Gaming Keyboard LED Backlit Ultra-Compact 60 Percent Keyboard,68 Keys Mechanical Keyboard with Separate Arrow/Control Keys, T68SE',
    slug: slugify(
      'TMKB Wired Gaming Keyboard LED Backlit Ultra-Compact 60 Percent Keyboard,68 Keys Mechanical Keyboard with Separate Arrow/Control Keys, T68SE',
    ),
    description: `Cool LED Backlighting: T68SE wired keyboard is fixed lighting color.There is 19 built-in backlights mode with shortcut keys to adjust backlight brightness and speed. Due to the iterative transparent word colour of the keycap that you may receive a Mixed light or single light.
Compact & Practical 60% Layout: T68SE 60 percent keyboard features a 68-key design with separate arrow keys and commonly used control keys. The included power cord is plug-and-play. Combines practicality, full functionality and portability .
Mechanical Red Switch: Linear red switch without a tactile bump. A favorite for gamers who require quick responses with minimal resistance or for those seeking a quiet typing experience.
Efficient & Comfortable Operation: The T68SE usb keyboard based on ergonomics, scientific stepped keycap design provides maximum comfort. Support full key anti-ghosting.Keep you away from lag and enjoy efficient and smooth gaming typing.
Compatibility & After-sales Service: Suitable for Windows 11/10/8/7/XP. Mac OS, Vista, and Linux are compatible with typing and office only.TMKB product support one year warranty, if you encounter any problems, please feel free to contact us, give you a satisfactory answer within 24 hours.`,
    reviews: [],
    images: await uploadImage(['tmkb.jpeg', 'tmkb2.jpeg']),
    category: 'keyboard',
    brand: 'TMKB Technology Mechanical KeyBoard',
    rating: 0,
    numberOfReviews: 0,
    price: 3900,
    countInStock: 25,
  },
  {
    name: 'SteelSeries Apex 3 TKL RGB Gaming Keyboard – Tenkeyless Compact Form Factor - 8-Zone RGB Illumination – IP32 Water & Dust Resistant – Whisper Quiet Gaming Switch – Gaming Grade Anti-Ghosting',
    slug: slugify(
      'SteelSeries Apex 3 TKL RGB Gaming Keyboard – Tenkeyless Compact Form Factor - 8-Zone RGB Illumination – IP32 Water & Dust Resistant – Whisper Quiet Gaming Switch – Gaming Grade Anti-Ghosting',
    ),
    description: `The compact tenkeyless design is the most popular form factor used by the pros, allowing you to position the keyboard for comfort and to maximize in-game performance.
  Our whisper quiet gaming switches with anti-ghosting technology for keystroke accuracy are made from durable low friction material for near silent use and guaranteed performance for over 20 million keypresses.
  Designed with IP32 Water & Dust Resistant for extra durability to prevent damage from liquids and dust particles, so you can continue to play no matter what happens to your keyboard. N-Key Roll Over: 24 Keys
PrismSync RGB Illumination allows you to choose from millions of colors and effects from reactive lighting to interactive lightshows that bring RGB to the next level.
  Dedicated Multimedia Controls with a clickable volume roller and media keys allowing you to adjust brightness, rewind, skip or pause all at the touch of a button.
  Compatible with Windows, Mac OS X, Xbox Series S, Xbox Series X, PS4, PS5`,
    reviews: [],
    images: await uploadImage(['apex.jpeg', 'apex2.jpeg']),
    category: 'keyboard',
    brand: 'steelSeries',
    rating: 0,
    numberOfReviews: 0,
    price: 4900,
    countInStock: 25,
  },
  {
    name: 'Fogruaden Wired 75% Mechanical Gaming Keyboard 75 Percent Matcha Keyboard Hot Swappable Gasket Mount, Red Switch, RGB Backlit 82 Keys TKL Mechanical Keyboard, NKRO Compact Keyboard with Knob',
    slug: slugify(
      'Fogruaden Wired 75% Mechanical Gaming Keyboard 75 Percent Matcha Keyboard Hot Swappable Gasket Mount, Red Switch, RGB Backlit 82 Keys TKL Mechanical Keyboard, NKRO Compact Keyboard with Knob',
    ),
    description: `【Hot-Swappable 75% Keyboard】Offers premium hot-swappable sockets, allowing users to swap desirable 3-pin or 5-pin mechanical switches afterwards without soldering issue
【Mechanical Red Switch】The red switch characterized for being linear and smoother, slight key sound with minimal resistance, but fast action without a tactile feel; easy to tap the keyboard
【Gasket Mounted Keyboards】Gasket mount is a keyboard mounting style, gasket mount uses gasket material between the plate and keyboard housing on both top and bottom sides. This gives the board a slightly cushioned feel since the plate isn’t in direct touching with the other components of the keyboard, create a softer typing feeling and typing sounds. The unwanted noise can be reduced without changing the tactile feel.
【PC Material Positioning Board Plate】Flexible feel; creating lesser noise; with linear red switch and bottom silent sponge; to create a silent mechanical keyboard; ideal for use in the office or other quiet environments.a quieter keyboard with less key vibration
【N-Key Rollover】 All keys non-conflict, This 75% percent keyboard allow multiple keys to work simultaneously, suitable for gamer, typist, programmer, writer etc.And this keyboard is Wide Compatibilty, it adapt to Windows 7/ 8/ 10 or Later /Mac
【82 Keys Compact Design & Gorgeous RGB Effect】75% mechanical keyboard, more spaces left for mouse movements; 18 RGB backlight modes and 8 backlight color on board, experience stunning RGB lighting effects that bring your keyboard to life
【Ergonomic & Durable PBT Keycaps】The MDA profile stepped keycaps and two-step kickstand provide a comfortable typing angle and reduce your hand wrist fatigue; Thick PBT keycaps make this keyboard more durable and not easy to fade; and extra personalized dye-sublimation keycap available for DIY; A rotary knob to control the volume/play/pause`,
    reviews: [],
    images: await uploadImage(['fogruaden.jpeg', 'fogruaden2.jpeg']),
    category: 'Keyboard',
    brand: 'fogruaden',
    rating: 0,
    numberOfReviews: 0,
    price: 6600,
    countInStock: 25,
  },
  {
    name: 'Logitech Zone Vibe 100 Lightweight Wireless Over Ear Headphones with Noise Canceling Microphone, Advanced Multipoint Bluetooth Headset, Works with Teams, Google Meet, Zoom, Mac/PC - Graphite',
    slug: slugify(
      'Logitech Zone Vibe 100 Lightweight Wireless Over Ear Headphones with Noise Canceling Microphone, Advanced Multipoint Bluetooth Headset, Works with Teams, Google Meet, Zoom, Mac/PC - Graphite',
    ),
    description: `Work. Play. Vibe: Made for the way you work and play, Zone Vibe 100 over ear wireless headphones are professional enough for the office, casual enough for home, and available in three modern colors
Easy Video Meetings from Home: This over ear headset’s compatibility with popular video platforms like Google Meet, Microsoft Teams, and Zoom makes it simple and easy to join any meeting. Microphone Type: Dual omni-directional MEMS mics with directional beamforming and DSP
Noise Canceling Technology: With beamforming technology and digital signal processing (DSP), the noise canceling headphones with microphone capture your voice clearly and eliminate background sound
Immersive Audio: Zone Vibe 100 wireless audiophile headphones have 40 mm speakers that drive full, rich audio and bring music and meetings to life with deep bass, crisp highs, and low distortion.
Wireless Freedom: Seamlessly switch between your devices with multipoint Bluetooth headphones, and enjoy up to 18 hours of wireless use with each charge
Lightweight Comfort: Featuring a featherweight design with memory foam earpads, these comfortable headphones are built for all-day use and won’t weigh you down, even when meetings go long
Flip to Mute Mic: The noise canceling headset’s mic conveniently tucks away when not needed for a clean look, providing immediate privacy anytime and on a moment’s notice
Built for future: Choose sustainability with Zone Vibe 100, made with 25% post-consumer recycled plastic (5) for a better future`,
    reviews: [],
    images: await uploadImage(['logichead.jpeg', 'logichead2.jpeg']),
    category: 'headset',
    brand: 'logitech',
    rating: 0,
    numberOfReviews: 0,
    price: 12900,
    countInStock: 35,
  },
  {
    name: 'Yealink UH36 Professional Wired Headset - Telephone Headphones for Calls and Music, Noise Cancelling Headset with Mic for Computer PC Laptop（for Teams Optimized, Mono,3.5mm Jack/USB Connection）',
    slug: slugify(
      'Yealink UH36 Professional Wired Headset - Telephone Headphones for Calls and Music, Noise Cancelling Headset with Mic for Computer PC Laptop（for Teams Optimized, Mono,3.5mm Jack/USB Connection）',
    ),
    description: `HIGH QUALITY SPEAK AND HEAR EXPERIENCE – Within noise-canceling microphone and passive noise cancelation solution, Yealink UH36 headset have a greater productivity and decent sound performance for calls or entertainments.
CAMPATIBLE WITH ALL PC SYSTEM– Authorized by Microsoft Teams and Zoom, so you can choose UC or Teams Version. Also certified for Skype, Whatsapp, and the other popular online voice call services. Compatible with Win7/Win8/Win10/XP,or MacOS operating system.
LIGHT WEIGHT&PORTABLE – Yealink UH36 is just 155 Grams, no matter in your case or bag, always convenient. The 3.5mm jack lets you connect Yealink headset with your personal device, such as a smartphone or tablet, so you can work or listen to music, radio, talkshow, wherever you are. Also connect with PC by USB
CONFORTABLE WEARING –Designed for all-day, everyday use with Plush protein leather cushions. Plus, simply wearing them even so much noises, such as fitment voices, still keep you stay comfortable and connected stable.
CONTACT US WHEN ANY QUESTION-. YEALINK Warranty: 30 days money back, 60 days free return, life time warranty. This Package including 1pcs mono headset with 3.5mm AUX, 1pcs USB cable, 1 pcs collecting bag, 1 pcs user manual, More than 2,000,000 users have a good conference experience with YEALINK, Redefine Your Workspace`,
    reviews: [],
    images: await uploadImage(['yealink.jpeg', 'yealink2.jpeg']),
    category: 'headset',
    brand: 'yealink',
    rating: 0,
    numberOfReviews: 0,
    price: 9100,
    countInStock: 35,
  },
  {
    name: 'SENZER SG500 Surround Sound Pro Gaming Headset with Noise Cancelling Microphone - Detachable Memory Foam Ear Pads - Portable Foldable Headphones for PC, PS4, PS5, Xbox One, Switch',
    slug: slugify(
      'SENZER SG500 Surround Sound Pro Gaming Headset with Noise Cancelling Microphone - Detachable Memory Foam Ear Pads - Portable Foldable Headphones for PC, PS4, PS5, Xbox One, Switch',
    ),
    description: `[FOLDABLE & DETACHABLE EAR PADS]: Features flexible headphones with telescopic arms and detachable ear pads. The headphones fold inside the arm, making them perfect for easy storage and travelling and the ear pads are magnetic, allowing them to be conveniently attached and removed, making them easier to clean and maintain compared with other headphones.
[COMFORTABLE LIGHTWEIGHT DESIGN]: Comfortable for kids and adults alike, the detachable memory foam ear cushions are extremely lightweight, allowing for up to 8 hours usage without excess pressure build up, meaning you won't feel any discomfort even after many hours of gaming. The overall weight is only 0.66lb; approximately 40% lighter than standard gaming headsets.
[NOISE CANCELLING ANTI-STATIC MICROPHONE]: The bendable microphone arm can be fixed to any position to ensure the clearest voice pick-up, and filters out surrounding environmental noise and eliminates static. The Senzer SG500 noise cancelling headset with microphone provides real-time in game chat without delay, making it easier to communicate with team-mates, friends and family without unnecessary interruptions.
SURROUND SOUND CAPABLE: Proven to enhance your gaming performance, this surround sound gaming headset gives you crystal clear audio and provides you a truly immersive video game experience. Pick up the direction of gunfire, vehicles and voices more clearly, as well as enjoying a more enhanced audio experience as subtle sounds like footsteps, wind and rain are projected with more clarity and precision.
[PLUG AND PLAY MULTI-PLATFORM COMPATIBILITY]: Works with most modern devices which include a 3.5mm jack like PlayStation 4, Xbox One (Older version requires adaptor), Apple Mac, Laptop, PC & Mobile. No drivers or downloads required, simply Plug & Play, making it the ideal headset for travelling or as a gift, safe in the knowledge it will fit a multitude of devices.`,
    reviews: [],
    images: await uploadImage(['senzer.jpeg', 'senzer2.jpeg']),
    category: 'headset',
    brand: 'senzer',
    rating: 0,
    numberOfReviews: 0,
    price: 3900,
    countInStock: 20,
  },
  {
    name: 'Ozeino Gaming Headset for PS5 PS4 Xbox One Switch PC, Over Ear Gaming Headphones with Noise Cancelling Microphone Volume Control RGB Light, Deep Bass Stereo Sound Headset for Laptop Mac Phone',
    slug: slugify(
      'Ozeino Gaming Headset for PS5 PS4 Xbox One Switch PC, Over Ear Gaming Headphones with Noise Cancelling Microphone Volume Control RGB Light, Deep Bass Stereo Sound Headset for Laptop Mac Phone',
    ),
    description: `【Immersive Gaming Audio】If you want to hear your enemies motion in games, wearing a professional gaming headset does matters. Our gaming headset offers up to a 360-degree surround soundscape, adds a sense of realism to your gaming session.
【Noise-cancelling Mic】The omnidirectional microphone captures the your voice yet eliminates unwanted background noise. If you wanna enjoy your valuable me-time without communicating with other players, you could turn off the mic by flipping the switch.
【Built for comfort】Soft leatherette ear cups and ergonomically padded headband allow for long gaming sessions without fatigue.
【Upgraded Breathing RGB Lights】7 colors automatically converted LED Lights design on the earcups, custom-built for gamers, highlight game atmosphere. USB only supplies power to the RGB lights.
【Versatile Compatibility】3.5mm interface Gaming headset support PS4, PS5, Xbox One, MAC, PC, Laptop, Tablet, Smart Phone. Notes: Need an extra Microsoft Adapter(Not Included) when connect with an old version Xbox One controller.`,
    reviews: [],
    images: await uploadImage(['ozeino.jpeg', 'ozeino2.jpeg']),
    category: 'headset',
    brand: 'ozeino',
    rating: 0,
    numberOfReviews: 0,
    price: 3400,
    countInStock: 30,
  },
  {
    name: 'Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphone, Black',
    slug: slugify(
      'Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphone, Black',
    ),
    description: `With up to 50-hour battery life and quick charging, you’ll have enough power for multi-day road trips and long festival weekends.
Great sound quality customizable to your music preference with EQ Custom on the Sony | Headphones Connect App.
Boost the quality of compressed music files and enjoy streaming music with high quality sound through DSEE
Designed to be lightweight and comfortable for all-day use.
Crystal clear hands-free calling with built-in mic.
Multipoint connection allows you to quickly switch between two devices at once.
Find your headphones easily with Fast Pair.
Connect to your PC easily with Swift Pair.
Siri/Google Assistant compatible
Partially made with recycled plastic and uses plastic-free packaging`,
    reviews: [],
    images: await uploadImage(['sony.jpeg', 'sony2.jpeg']),
    category: 'headset',
    brand: 'sony',
    rating: 0,
    numberOfReviews: 0,
    price: 5800,
    countInStock: 50,
  },
  {
    name: 'HyperX Cloud Stinger 2 Core – PC Gaming Headset, Lightweight Over-Ear Headset with mic, Swivel-to-Mute mic Function, DTS Headphone:X Spatial Audio, 40mm Drivers, Black',
    slug: slugify(
      'HyperX Cloud Stinger 2 Core – PC Gaming Headset, Lightweight Over-Ear Headset with mic, Swivel-to-Mute mic Function, DTS Headphone:X Spatial Audio, 40mm Drivers, Black',
    ),
    description: `With up to 50-hour battery life and quick charging, you’ll have enough power for multi-day road trips and long festival weekends.
Great sound quality customizable to your music preference with EQ Custom on the Sony | Headphones Connect App.
Boost the quality of compressed music files and enjoy streaming music with high quality sound through DSEE
Designed to be lightweight and comfortable for all-day use.
Crystal clear hands-free calling with built-in mic.
Multipoint connection allows you to quickly switch between two devices at once.
Find your headphones easily with Fast Pair.
Connect to your PC easily with Swift Pair.
Siri/Google Assistant compatible
Partially made with recycled plastic and uses plastic-free packaging`,
    reviews: [],
    images: await uploadImage(['hyperx.jpeg', 'hyperx2.jpeg']),
    category: 'headset',
    brand: 'hyperx',
    rating: 0,
    numberOfReviews: 0,
    price: 4400,
    countInStock: 50,
  },
  {
    name: 'Bluetooth Headphones Over Ear, KVIDIO 55 Hours Playtime Wireless Headphones with Microphone, Foldable Lightweight Headset with Deep Bass,HiFi Stereo Sound for Travel Work Laptop PC Cellphone (Black)',
    slug: slugify(
      'Bluetooth Headphones Over Ear, KVIDIO 55 Hours Playtime Wireless Headphones with Microphone, Foldable Lightweight Headset with Deep Bass,HiFi Stereo Sound for Travel Work Laptop PC Cellphone (Black)',
    ),
    description: `HIGH FIDELITY STEREO HEADPHONES: KVIDIO upgraded bluetooth headphones with dual 40mm drivers and noise isolation technology, offers an almost concert hall-like feel to your favorite music as close as you're watching it live. Provide high-quality reproduction of sound for listeners, audiophiles, and home audio enthusiasts
UNMATCHED COMFORTABLE HEADPHONES: Over ear earmuff made by softest memory-protein foam gives you all day comfort. Adjustable headband and flexible earmuffs can easily fit any head shape without putting pressure on the ear. Foldable and ONLY 0.44lbs Lightweight design makes it the best choice for Travel, Workout and Every day use by College Students
WIDE COMPATIBILITY: Simply press multi-function button 2s and the over ear headphones with mic will be in ready to pair. KVIDIO wireless headsets are compatible with all devices that support Bluetooth or 3.5 mm plug cables. With the built-in microphone, you can easily make hands-free calls or facetime meetings while working at home(Mic only works with Bluetooth mode not wired mode)
SEAMLESS WIRELESS CONNECTION: Updated Bluetooth version V5.2 ensures an ultra fast and virtually unbreakable connection up to 33 feet (10 meters). Rechargeable 500mAh battery can be quick charged within 2.5 hours. After 55 hours of playtime, you can switch KVIDIO Cordless Headset from wireless to wired mode and enjoy your music NON-STOP. No worry for power shortage problem during long trip
WARRANTY AND SURPPORT: Package include a Foldable Deep Bass Headphone, 3.5mm backup audio cable, USB charging cable and User Manual. 30 days free return and 18 months warranty is our guarantee, please feel free to contact us if you have any inquires during using`,
    reviews: [],
    images: await uploadImage(['kvidio.jpeg', 'kvidio2.jpeg']),
    category: 'headset',
    brand: 'kvidio',
    rating: 0,
    numberOfReviews: 0,
    price: 3600,
    countInStock: 40,
  },
  {
    name: 'Razer BlackShark V2 X Gaming Headset: 7.1 Surround Sound - 50mm Drivers - Memory Foam Cushion - for PC, Mac, PS4, PS5, Switch, Xbox One, Xbox Series X|S, Mobile - 3.5mm Audio Jack - White',
    slug: slugify(
      'Razer BlackShark V2 X Gaming Headset: 7.1 Surround Sound - 50mm Drivers - Memory Foam Cushion - for PC, Mac, PS4, PS5, Switch, Xbox One, Xbox Series X|S, Mobile - 3.5mm Audio Jack - White',
    ),
    description: `The #1 Best-Selling Gaming Peripherals Brand: Source - The NPD Group, Inc. U.S. Retail Tracking Service: Gaming Keyboards, Gaming Mice, Gaming Headsets, Gaming Peripherals; Based on dollar sales, Jan-Sept. 2021 combined
Immersive, 7.1 Surround Sound: Heighten awareness with accurate positional audio that lets you pinpoint intuitively where every sound is coming from (only available on Windows 10 64-bit)
Triforce 50mm Drivers: Cutting-edge proprietary design that divides the driver into 3 parts for the individual tuning of highs, mids, and lows—producing brighter, clearer audio with richer highs and more powerful lows
Advanced Passive Noise Cancellation: Sturdy closed earcups fully cover ears to prevent noise from leaking into the headset, with its cushions providing a closer seal for more sound isolation
Lightweight Design with Breathable Foam Ear Cushions: At just 240g, the headset features thicker headband padding and leatherette with memory foam ear cushions to provide maximum comfort
Bendable Hyperclear Cardioid Mic: An improved pickup pattern ensures more voice and less noise as it tapers off towards the mic’s back and sides, with the sweet spot easily placed at your mouth because of the mic’s bendable design
Cross-platform compatibility: Works with PC, Mac, PS4, PS5, Nintendo Switch, Xbox One, Xbox Series X|S, and mobile devices via 3.5mm jack, allowing you to enjoy unfair audio advantage across almost every platform`,
    reviews: [],
    images: await uploadImage(['razer.jpeg', 'razer2.jpeg']),
    category: 'headset',
    brand: 'razer',
    rating: 0,
    numberOfReviews: 0,
    price: 3600,
    countInStock: 40,
  },
  {
    name: 'Microsoft Modern Wireless Headset: Teams Certified, on-ear controls, noise-reducing microphone, up to 50hrs battery - Black',
    slug: slugify(
      'Microsoft Modern Wireless Headset: Teams Certified, on-ear controls, noise-reducing microphone, up to 50hrs battery - Black',
    ),
    description: `Comfortable on-ear design with lightweight, padded earcups for all-day wear.
Background noise-reducing microphone. Sound pressure level output: Up to 91 dB
High quality stereo speakers optimized for voice.
Flip to mute microphone with status light. Easily see, at a glance, whether you can be heard or not.
Convenient on-ear call controls, including mute, volume, and the Teams button, are always at your fingertips.
Certified for Microsoft Teams. Join meetings at a touch of a button and enjoy high-quality video and audio, plus easy setup and management. Integrates seamlessly with your Surface computer and other Windows 10 PCs.* Teams Certification requires the included USB dongle to connect.
Up to 50 hours of music listening time1 or up to 30 hours of voice calling on Microsoft Teams.2
Compatibility: Bluetooth compatibility Windows 11 Home /Pro, Windows 10: 20H1, 19H1, RS5*Windows 8, Windows 7 Mac OS, Android, IOS. Microsoft Teams （ASP） compatible with Windows 11 Home/Pro, Windows 10, and Mac OS. Some features require software download (storage required); not supported on Mac OS.`,
    reviews: [],
    images: await uploadImage(['microsoft.jpeg', 'microsoft2.jpeg']),
    category: 'headset',
    brand: 'microsoft',
    rating: 0,
    numberOfReviews: 0,
    price: 11800,
    countInStock: 10,
  },
  {
    name: 'JBL Quantum 100 Wired Over-Ear Gaming Headset with Detachable Mic and 3.5mm Audio Cable - Black',
    slug: slugify(
      'JBL Quantum 100 Wired Over-Ear Gaming Headset with Detachable Mic and 3.5mm Audio Cable - Black',
    ),
    description: `In competitive gaming, sound is survival, and JBL knows great sound: From the thrill of tracking enemies in FPS games, to engaging in epic MOBA battles, the JBL Quantum 100 amplifies every victory on PC, Mac, Xbox, PS4 and Nintendo Switch.
Features JBL Quantum Sound Signature which is engineered for accuracy and delivers immersive gaming audio for a competitive edge, so users never have to miss a step, shot or jump during gameplay.
JBL Quantum 100 gaming headset incorporates a detachable boom microphone with echo cancelling technology, allowing users to focus on their teammates' voice rather than background noise, for crystal clear communication.
Memory foam ear cushions on the JBL Quantum 100 headset are covered in soft PU leather, providing comfort for marathon gaming sessions, 3.5mm connection for multi-platform gaming on PC, Mac, Xbox, PS4 and Nintendo Switch.
Items delivered: JBL Quantum 100 wired over ear gaming headset with detachable boom mic in black, compatible with PC, Mac, Xbox, PlayStation, Nintendo Switch, mobile and VR. Ear Cup External Height 10.2 cm, Ear Cup External Width 8.9 cm, Ear Cup Internal Height 6.1 cm, Ear Cup Internal Width 4.9 cm, Ear Cup Depth 2.5 cm`,
    reviews: [],
    images: await uploadImage(['jbl.jpeg', 'jbl2.jpeg']),
    category: 'headset',
    brand: 'jbl',
    rating: 0,
    numberOfReviews: 0,
    price: 6000,
    countInStock: 10,
  },
  {
    name: 'KOORUI 24 Inch Business Computer Monitor Full HD 1920 x 1080p VA Display 75Hz 3000:1 Contrast Ratio with HDMI, VGA, Frameless, 75 x 75 mm VESA Mountable, Ergonomic Tilt, Black',
    slug: slugify(
      'KOORUI 24 Inch Business Computer Monitor Full HD 1920 x 1080p VA Display 75Hz 3000:1 Contrast Ratio with HDMI, VGA, Frameless, 75 x 75 mm VESA Mountable, Ergonomic Tilt, Black',
    ),
    description: `SHARE THE PANORAMIC VIEW : The 23.8 inch monitor adopts a new generation of VA screen, covering 99% of the SRGB color gamut and 8bit gray level over 16.7M color numbers. Thus the business monitor can 100% restore true colors and present vivid details. Besides, the 178° wide viewing angle of this VA monitor allows you to enjoy a clear, sharp, and delicate images at any angle.
EXTREMELY VIEWING COMFORT: Find your best viewing position and stay comfortable by tilting the screen up to 5 degrees forward or 15 degrees backward. Flicker-Free technology, Blue Light Filter, Adaptive FreeSync technology automatically calibrates frame rates so you can enjoy ultra-smooth gameplay or working for all-day without any eyes uncomfort.
ULTRA SLIM DESIGN: The KOORUI 23.8 inch Business Computer Monitor adopts edgeless design to make the picture more complete when multiple monitors connect. A great choice of business display for desktop, or laptop at home.
MULTIPLE PORTS: KOORUI monitors provide video interfaces via HDMI and VGA ports. This HDMI monitor is with 60Hz refresh rate (compatible with most normal graphics cards) and FHD 1920x1080p resolution. You can connect the edge-less monitor to Xbox, PC and laptops etc, transmitting high-quality images, any switch between office and entertainment.
RELIABLE MONITOR: KOORUI owns super strength from monitor quality to premium service, making you assured. With a 3-year warranty, a 12-month replacement service and calling technical support. If you find any damage, malfunction or missing accessories, please feel free to contact us.`,
    reviews: [],
    images: await uploadImage(['kooruiScreen.jpeg', 'kooruiScreen2.jpeg']),
    category: 'Monitor',
    brand: 'koorui',
    rating: 0,
    numberOfReviews: 0,
    price: 13800,
    countInStock: 40,
  },
  {
    name: 'LG Ultragear 32GQ850-B 32" QHD(2560x1440) Nano IPS Gaming Monitor with 1ms Response Time, 240Hz Refresh Rate, GYNC Compatible & AMD FreeSync Premium Pro, HDMI 2.1, Tilt/Height/Pivot Adjustable',
    slug: slugify(
      'LG Ultragear 32GQ850-B 32" QHD(2560x1440) Nano IPS Gaming Monitor with 1ms Response Time, 240Hz Refresh Rate, GYNC Compatible & AMD FreeSync Premium Pro, HDMI 2.1, Tilt/Height/Pivot Adjustable',
    ),
    description: `32 Inch UHD (2560 x 1440) Gaming Monitor with 3-Side Virtually Borderless Design Nano IPS Display
240Hz(O/C 260Hz) Refresh Rate allows gamers to see the next frame quickly and makes image to appear smoothly.
IPS 1ms(GtG) ensures smoother gameplay, reducing blur and ghosting.
VESA Certified AdaptiveSync/NVIDIA G-SYNC Compatible reduce screen tearing and stuttering for a smoother gaming experience.
Nano IPS with ATW covers better Angular Contrast Ratio (max.10 times) and color coverage (max.40 times) than the display not applied the ATW in wider angle.`,
    reviews: [],
    images: await uploadImage(['lgScreen.jpeg', 'lgScreen2.jpeg']),
    category: 'Monitor',
    brand: 'lg',
    rating: 0,
    numberOfReviews: 0,
    price: 60000,
    countInStock: 6,
  },
  {
    name: 'SANSUI Monitor 24 inch with USB Type-C, Built-in Speakers, 75Hz FHD Computor Monitor, Ultra-Slim Ergonomic Tilt with HDMI, VGA (ES-24F1 Type-C Cable and HDMI Cable Included)',
    slug: slugify(
      'SANSUI Monitor 24 inch with USB Type-C, Built-in Speakers, 75Hz FHD Computor Monitor, Ultra-Slim Ergonomic Tilt with HDMI, VGA (ES-24F1 Type-C Cable and HDMI Cable Included)',
    ),
    description: `🖥️【smooth visual experience】: With max 75hz refresh rate and freesync function, SANSUI 24F1 monitor provides you a smooth scene without tearing and blurring.(Attention: You can switch the refresh rate between 60Hz and 75Hz according to your own equipment.)
🖥️【Flexible connectivity】: SANSUI 24F1 monitor has multiple ports that make it more convenient for you to use. The display has HDMI, VGA and Type-C ports which fit a variety of devices and HDMI and Type-C cables are also included!
🖥️【More vivid scene】: The desktop monitor has 99.99% sRGB (72% NTSC) and 16.7 million color that provides you excellent visual effects. Besides, the 1080P resolution and 3000:1 contrast ratio makes scene clearer and you can easily enjoy all the details.
🖥️【Great for home and office】: The monitor feature a three-sided edgeless design, which allows minimal distractions and maximum viewing size to expand your working efficiency. It also has the VESA amount, which is easy to install and can help you to save place, so it’s suitable for home and office.
💕【12-month warranty】:SANSUI comes with 12 months warranty and lifetime technical service. If you find any damage, malfunction or missing accessories, you can contact our after-sale team to find support and they will give you answer ASAP.`,
    reviews: [],
    images: await uploadImage(['sansuiScreen.jpeg', 'sansuiScreen2.jpeg']),
    category: 'Monitor',
    brand: 'sansui',
    rating: 0,
    numberOfReviews: 0,
    price: 12800,
    countInStock: 10,
  },
  {
    name: "ARZOPA Portable Monitor, 15.6'' FHD 1080P Portable Laptop Monitor IPS Computer External Screen USB C HDMI Display w/Smart Cover for PC MAC Phone Xbox PS5 - A1 GAMUT",
    slug: slugify(
      "ARZOPA Portable Monitor, 15.6'' FHD 1080P Portable Laptop Monitor IPS Computer External Screen USB C HDMI Display w/Smart Cover for PC MAC Phone Xbox PS5 - A1 GAMUT",
    ),
    description: `[Full HD 1080P IPS Screen] Designed with Full HD, 1920 x 1080 resolution IPS screen, the ARZOPA portable monitor offers a vivid image with accuracy and a 178° full viewing angle.
[Multiple Display Mode] Duplicate mode, extend mode and second screen mode are the three types of display modes that you can select according to your choice. You can also connect your smartphone to desktop or phone mode with this monitor.
[Ultra Slim] To make it easier for you to travel with our portable monitor, we have made sure that it is lightweight and convenient for you to carry on your trips. The monitor weighs 1.44lb, the top and bottom thickness are 0.2 inch and 0.35 inch respectively.
[Wide Compatibility] The portable monitor is widely compatible with various ports and devices and there is no need of any app or driver, you just need to plug and play and its ready to use. The dual ports USB-C and HDMI can be easily connected to laptop, PC, Mac, Phones, XBOX, PS3, 4, 5 and Switches.
[Durable Quality and Smart Cover] High-Quality and durable metal materials are used to make this portable monitor that shows a fine metal texture and high strength. The monitor also includes a Smart Cover. The smart cover is very sturdy and provides better support and protective for the whole monitor.`,
    reviews: [],
    images: await uploadImage(['arzopaScreen.jpeg', 'arzopaScreen2.jpeg']),
    category: 'Monitor',
    brand: 'arzopa',
    rating: 0,
    numberOfReviews: 0,
    price: 20900,
    countInStock: 12,
  },
  {
    name: 'Samsung LC32R500FHNXZA 32" FHD Freesync 1500R Curved Monitor 3,000:1 contrast 4ms',
    slug: slugify(
      'Samsung LC32R500FHNXZA 32" FHD Freesync 1500R Curved Monitor 3,000:1 contrast 4ms',
    ),
    description: `1500R curvature of the screen provides more curve and better immersion than 1800R Curvature
An ultra-slim and sleek profile that measures less than 0.5 inch thick. The simple circular stand will add a modern look to your space.Refresh rate:Max 75Hz
Game Mode technology which allows you to enjoy smooth images, even during the fastest moving scenes. Make sure to tighten down the cable on both the monitor and the computer end while setup
Experience vibrant, stunningly vivid colors with Samsung's Active Crystal Color technology. The excellent 3000:1 contrast ratio delivers deep blacks and bright whites. Wide viewing angle
Energy Saving Plus reduces screen brightness to save power, plus the screen brightness automatically transitions fluidly—reducing energy use even more..Windows Compatible: Yes. Colour Gamut (NTSC 1976) 72%`,
    reviews: [],
    images: await uploadImage(['samsungScreen3.jpeg', 'samsungScreen4.jpeg']),
    category: 'Monitor',
    brand: 'samsung',
    rating: 0,
    numberOfReviews: 0,
    price: 24800,
    countInStock: 12,
  },

  {
    name: 'LG UltraWide 29WP500-B 29 Inch Full HD 5ms 75Hz Monitor with IPS Display and AMD FreeSync, Black',
    slug: slugify(
      'LG UltraWide 29WP500-B 29 Inch Full HD 5ms 75Hz Monitor with IPS Display and AMD FreeSync, Black',
    ),
    description: `29" UltraWide FHD (2560 x 1080) IPS Display
sRGB 99% Colour Gamut and HDR10. Wall mountable (100 x 100mm)
AMD FreeSync
3-Side Virtually Borderless Display; Brightness (Typ.) 250nits
75Hz Refresh Rate`,
    reviews: [],
    images: await uploadImage(['lgScreen3.jpeg', 'lgScreen4.jpeg']),
    category: 'Monitor',
    brand: 'lg',
    rating: 0,
    numberOfReviews: 0,
    price: 24900,
    countInStock: 13,
  },
  {
    name: 'LG 24MP40A-C 24 Inch Full HD (1920 x 1080) Monitor with IPS 5ms 75Hz Display, AMD FreeSync and OnScreen Control, Charcoal Grey',
    slug: slugify(
      'LG 24MP40A-C 24 Inch Full HD (1920 x 1080) Monitor with IPS 5ms 75Hz Display, AMD FreeSync and OnScreen Control, Charcoal Grey',
    ),
    description: `24 Full HD IPS Monitor with 3-Side Virtually Borderless Design
AMD FreeSync
NTSC 72% (CIE1931)
Reader Mode / Flicker Safe / OnScreen Control / DAS / Black Stabilizer / Crosshair
Connectivity : D-Sub (1) , HDMI (1), Cables Included : Adapter, Power Cord, HDMI`,
    reviews: [],
    images: await uploadImage(['lgScreen5.jpeg', 'lgScreen6.jpeg']),
    category: 'Monitor',
    brand: 'lg',
    rating: 0,
    numberOfReviews: 0,
    price: 13900,
    countInStock: 15,
  },
  {
    name: 'SANSUI Monitor 22 Inch IPS 75Hz FHD 1080P Freesync HDMI VGA Ports Computer Monitor Ultra-Thin Tilt Adjustable VESA Mount Compatible with Eye Comfort 178° Wide Viewing Angle for Game and Office',
    slug: slugify(
      'SANSUI Monitor 22 Inch IPS 75Hz FHD 1080P Freesync HDMI VGA Ports Computer Monitor Ultra-Thin Tilt Adjustable VESA Mount Compatible with Eye Comfort 178° Wide Viewing Angle for Game and Office',
    ),
    description: `22” FHD IPS 75hz (1920X1080) monitor for home, business or gaming.
Ergonomic design: -5° to 15° Tilt|VESA Mounting Compliant (75 x 75mm)|Ultra-thin Bezel|Anti-Glare|Anti-Flicker|Low Blue Light|Hard Coating(3H)
Display: 1000 : 1 Contrast Ratio|250nits Brightness| 16.7M Display Colors| NTSC 72% Color Gamut|178° Wide Viewing Angle
Ports: 1 HDMI port and 1 VGA port (HDMI cable included)
SANSUI offers a 30-day money-back guarantee and a 12-month warranty.`,
    reviews: [],
    images: await uploadImage(['sansuiScreen3.jpeg', 'sansuiScreen4.jpeg']),
    category: 'Monitor',
    brand: 'sansui',
    rating: 0,
    numberOfReviews: 0,
    price: 9800,
    countInStock: 17,
  },
  {
    name: 'LG 27MP60G-B 27 inch Full HD (1920 x 1080) IPS Monitor with AMD FreeSync and 1ms MBR Response Time, Black',
    slug: slugify(
      'LG 27MP60G-B 27 inch Full HD (1920 x 1080) IPS Monitor with AMD FreeSync and 1ms MBR Response Time, Black',
    ),
    description: `
27" Full HD (1920 x 1080) IPS Display
3-Side Virtually Borderless Design
AMD FreeSync
1ms MBR Response Time
Refresh Rate 75Hz`,
    reviews: [],
    images: await uploadImage(['lgScreen7.jpeg', 'lgScreen8.jpeg']),
    category: 'Monitor',
    brand: 'lg',
    rating: 0,
    numberOfReviews: 0,
    price: 19900,
    countInStock: 21,
  },
  {
    name: 'LG 43UN700-B 43 Inch UHD (3840 X 2160) IPS Display with USB Type-C, 4 HDMI Inputs and HDR10, Black',
    slug: slugify(
      'LG 43UN700-B 43 Inch UHD (3840 X 2160) IPS Display with USB Type-C, 4 HDMI Inputs and HDR10, Black',
    ),
    description: `43” UHD (3840 x 2160) IPS display
HDR10 support; Power Consumption (Max.): 200W.Make sure to tighten down the cable on both the monitor and the computer end while setup
4 x HDMI 1 x DisplayPort 1 4 1 x USB Type-C Inputs
10W x 2Ch built-in speakers
Picture in Picture - Up to 4 screens`,
    reviews: [],
    images: await uploadImage(['lgScreen9.jpeg', 'lgScreen10.jpeg']),
    category: 'Monitor',
    brand: 'lg',
    rating: 0,
    numberOfReviews: 0,
    price: 71900,
    countInStock: 24,
  },
  {
    name: 'Motorola Moto E22 Dual-SIM 64GB ROM + 4GB RAM (Only GSM | No CDMA) Factory Unlocked 4G/LTE Smartphone (Astro Black) - International Version',
    slug: slugify(
      'Motorola Moto E22 Dual-SIM 64GB ROM + 4GB RAM (Only GSM | No CDMA) Factory Unlocked 4G/LTE Smartphone (Astro Black) - International Version',
    ),
    description: `For USA Buyers: This Smartphone is not compatible/will not work with any CDMA Networks including: VERIZON, SPRINT, US CELLULAR. Please check with your network provider for 3G or 4G/LTE compatibility check before you purchase.
Dual-SIM, Network Compatibility, SIM CARD 1: [2G : GSM 850 / 900 / 1800 / 1900 and/or 3G : HSDPA 850 / 900 / 2100 and/or 4G : LTE 800(B20) / 850(B5) / 900(B8) / 1800(B3) / 2100(B1) / 2300(B40) / 2500(B41) / 2600(B7) / 2600(B38) ] SIM CARD 2: [2G : GSM 850 / 900 / 1800 / 1900]
6.5 inches, IPS LCD, 720 x 1600 pixels
64GB Storage, 4GB RAM, microSDXC (dedicated)
Android 12, Mediatek MT6765V/CB Helio G37 (12 nm), Octa-core (4x2.3 GHz Cortex-A53 & 4x1.8 GHz Cortex-A53)
16 MP, f/2.2, (wide), 1.0µm, PDAF, 2 MP, f/2.4, (depth), Front, 5 MP, f/2.4, 1/5", 1.12µm`,
    reviews: [],
    images: await uploadImage(['moto.jpeg', 'moto1.jpeg']),
    category: 'Phone',
    brand: 'motorola',
    rating: 0,
    numberOfReviews: 0,
    price: 15000,
    countInStock: 23,
  },
  {
    name: 'SAMSUNG Galaxy A03 Core (SM-A032/DS) Dual SIM 32GB/ 2GB RAM, GSM Unlocked International Version-Black',
    slug: slugify(
      'SAMSUNG Galaxy A03 Core (SM-A032/DS) Dual SIM 32GB/ 2GB RAM, GSM Unlocked International Version-Black',
    ),
    description: `6.5 inch 720 x 1600 (HD+) PLS TFT LCD Infinity-V Display, 5000mAh Battery, 3.5mm jack
32GB ROM, 2GB RAM, Unisoc SC9863A (28nm), Octa-core, IMG8322 GPU, Android 11 (Go edition)
Rear Camera: 8MP, f/2.0, Digital zoom up to 4x, Front Camera: 5MP, f/2.2, Bluetooth 4.2, MicroUSB 2.0
2G GSM: 850/900/1800/1900, 3G: 850/900/1700(AWS)/1900/2100, 4G LTE: B1(2100), B2(1900), B3(1800), B4(AWS), B5(850), B7(2600), B8(900), B12(700), B17(700), B28(700), B38(2600), B40(2300), B41(2500), B66(AWS-3) - Dual SIM
International Model - No Service in US. Compatible with Most GSM Carriers like T-Mobile, AT&T, MetroPCS, etc. Will NOT work with CDMA Carriers Such as Verizon, Cricket, Boost`,
    reviews: [],
    images: await uploadImage(['samsungPhone.jpeg', 'samsungPhone1.jpeg']),
    category: 'Phone',
    brand: 'samsung',
    rating: 0,
    numberOfReviews: 0,
    price: 11800,
    countInStock: 43,
  },
  {
    name: 'Apple iPhone SE 2020 (64GB, 3GB) 4.7" Retina IPS LCD, A13 Bionic, IP67 Water Resistant, Black - Fully Unlocked A2275 (Renewed)',
    slug: slugify(
      'Apple iPhone SE 2020 (64GB, 3GB) 4.7" Retina IPS LCD, A13 Bionic, IP67 Water Resistant, Black - Fully Unlocked A2275 (Renewed)',
    ),
    description: `This phone is unlocked and compatible with any carrier of choice on GSM and CDMA networks (e.g. AT&T, T-Mobile, Sprint, Verizon, US Cellular, Cricket, Metro, Tracfone, Mint Mobile, etc.).
Tested for battery health and guaranteed to have a minimum battery capacity of 80%.
Successfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.
The device does not come with headphones or a SIM card. It does include a generic (Mfi certified) charger and charging cable.
Inspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arm's length.`,
    reviews: [],
    images: await uploadImage(['iphone.jpeg', 'iphone1.jpeg']),
    category: 'Phone',
    brand: 'apple',
    rating: 0,
    numberOfReviews: 0,
    price: 24500,
    countInStock: 20,
  },
  {
    name: 'Apple iPhone 12, 64GB, Blue - Fully Unlocked (Renewed)',
    slug: slugify('Apple iPhone 12, 64GB, Blue - Fully Unlocked (Renewed)'),
    description: `Apple iPhone 12, 64GB, Blue - Fully Unlocked (Renewed)
`,
    reviews: [],
    images: await uploadImage(['iphone12.jpeg', 'iphone122.jpeg']),
    category: 'Phone',
    brand: 'apple',
    rating: 0,
    numberOfReviews: 0,
    price: 53500,
    countInStock: 10,
  },
  {
    name: 'Apple iPhone 14, 128GB, Midnight - Unlocked (Renewed)',
    slug: slugify('Apple iPhone 14, 128GB, Midnight - Unlocked (Renewed)'),
    description: `Vibrant 6.1-inch Super Retina XDR display with OLED technology. Action mode for smooth, steady, handheld videos.
High resolution and color accuracy make everything look sharp and true to life.
New Main camera and improved image processing to capture your shots in all kinds of light - especially low light.
4K Cinematic mode at 24 fps automatically shifts focus to the most important subject in a scene.
A15 Bionic, with a 5‑core GPU for lightning-fast performance. Superfast 5G.`,
    reviews: [],
    images: await uploadImage(['iphone14.jpeg', 'iphone142.jpeg']),
    category: 'Phone',
    brand: 'apple',
    rating: 0,
    numberOfReviews: 0,
    price: 80900,
    countInStock: 15,
  },
  {
    name: 'Apple iPhone 14 Pro Max, 256GB, Space Black - Unlocked (Renewed)',
    slug: slugify('Apple iPhone 14 Pro Max, 256GB, Space Black - Unlocked (Renewed)'),
    description: `6.7-inch Super Retina XDR display featuring Always-On and ProMotion.
Dynamic Island, a magical new way to interact with iPhone.
48MP Main camera for up to 4x greater resolution. Cinematic mode now in 4K Dolby Vision up to 30 fps.
Action mode for smooth, steady, handheld videos and a vital safety feature - Crash Detection.
A16 Bionic, the ultimate smartphone chip. Superfast 5G cellular.`,
    reviews: [],
    images: await uploadImage(['iphone14promax.jpeg', 'iphone14promax2.jpeg']),
    category: 'Phone',
    brand: 'apple',
    rating: 0,
    numberOfReviews: 0,
    price: 194500,
    countInStock: 15,
  },
  {
    name: 'Samsung Galaxy S23 5G Black 128GB - 6.1" 120 Hz AMOLED Adaptive Display, 50MPCamera, 8K Video, Nightography (CAD Version & Warranty)',
    slug: slugify(
      'Samsung Galaxy S23 5G Black 128GB - 6.1" 120 Hz AMOLED Adaptive Display, 50MPCamera, 8K Video, Nightography (CAD Version & Warranty)',
    ),
    description: `Make it a night to remember with stunning Nightography. Night Mode lets you capture brilliant selfies no matter the lighting.
Create crystal-clear content worth sharing with the 50MP high-resolution camera of Galaxy S23
Unlock the trophy for smooth gaming.A truly OP processor. Less cooldown. More GG
No matter your environment, Adaptive Vision Booster adjusts your, screen’s brightness while keeping your content looking amazing
Whether you’re capturing a memory or catching up with friends, Galaxy S23 will be ready when you need it most. With a 3,900mAh battery, stay in the moment without worrying about your phone dying`,
    reviews: [],
    images: await uploadImage(['samsungPhone23.jpeg', 'samsungPhone232.jpeg']),
    category: 'Phone',
    brand: 'samsung',
    rating: 0,
    numberOfReviews: 0,
    price: 84900,
    countInStock: 25,
  },
  {
    name: 'Samsung Galaxy S23 Ultra 5G Cream 512GB - 6.8" 120 Hz AMOLED Display, 200MP+12MP+10MP+10MP Rear Camera, 12MP Selfie Camera, 8K Video, S-Pen Included, Nightography, (CAD Version & Warranty),Cream',
    slug: slugify(
      'Samsung Galaxy S23 Ultra 5G Cream 512GB - 6.8" 120 Hz AMOLED Display, 200MP+12MP+10MP+10MP Rear Camera, 12MP Selfie Camera, 8K Video, S-Pen Included, Nightography, (CAD Version & Warranty),Cream',
    ),
    description: `Make it a night to remember with stunning Nightography. Night Mode lets you capture brilliant selfies no matter the lighting
Create crystal-clear content worth sharing with Galaxy S23 Ultra's 200MP camera — the highest camera resolution on a Galaxy smartphone
Capture scribbles, strokes of genius and everything in between with the built-in S Pen. Writing your next short story or sketching on the go has never felt this easy. Capture epic selfies and beautiful photos with the click of your S Pen
Game at full throttle with the fastest processor ever and impressive built-in storage
Power through a packed day or a long night of gaming without worrying about your phone dying. The robust 5,000mAh battery has been fine-tuned with a smarter processor that helps manage energy usage without slowing you down`,
    reviews: [],
    images: await uploadImage(['samsungPhoneUltra23.jpeg', 'samsungPhoneUltra232.jpeg']),
    category: 'Phone',
    brand: 'samsung',
    rating: 0,
    numberOfReviews: 0,
    price: 169000,
    countInStock: 55,
  },
  {
    name: 'Sony Xperia 10 V XQ-DC72 5G Dual 128GB 8GB RAM Factory Unlocked (GSM Only | No CDMA - not Compatible with Verizon/Sprint) NGP Wireless Charger Included, Global - Green',
    slug: slugify(
      'Sony Xperia 10 V XQ-DC72 5G Dual 128GB 8GB RAM Factory Unlocked (GSM Only | No CDMA - not Compatible with Verizon/Sprint) NGP Wireless Charger Included, Global - Green',
    ),
    description: `NOTE: Global Version. No Warranty. This device is globally unlocked and ready to be used with your preferred GSM Carrier. THIS DEVICE IS NOT COMPATIBLE with CDMA carriers such as Cricket, Verizon, Sprint, Boost Mobile, US Cellular, etc. SIM CARD NOT INCLUDED. Please confirm device compatibility with your service provider before placing your order
Supported Network Bands: 5G/4G/3G/2G. Please note that 5G requires the support of local telecom operator services and may not be available in all regions. Please check with your service provider to see if 5G is offered in your area.
Storage: 128GB 8GB RAM
Display: 6.1 inches, 86.9 cm2 (~82.5% screen-to-body ratio) OLED, 1B colors, HDR
Platform: Android 13 Qualcomm SM6375 Snapdragon 695 5G (6 nm)
Camera: 48 MP, f/1.826mm, (wide), 1/2", 0.8µm, PDAF, OIS
Battery: Li-Po 5000 mAh, non-removable`,
    reviews: [],
    images: await uploadImage(['sonyPhone.jpeg', 'sonyPhone2.jpeg']),
    category: 'Phone',
    brand: 'sony',
    rating: 0,
    numberOfReviews: 0,
    price: 59800,
    countInStock: 55,
  },
  {
    name: 'Google Pixel 7 Pro 5G 128GB 12GB RAM 24-Hour Battery Universal Unlocked for All Carriers-Obsidian',
    slug: slugify(
      'Google Pixel 7 Pro 5G 128GB 12GB RAM 24-Hour Battery Universal Unlocked for All Carriers-Obsidian',
    ),
    description: `The Pixel 7 Pro 6.7-inch Smooth Display helps make things stunning and immersive.[1,2] It intelligently adjusts up to 120 Hz for smoother, more responsive performance.[2]
Use your voice to type, edit and send texts and emails with Assistant voice typing.[3] It's fast and accurate, and even works with emojis.
[1]Measured diagonally; dimensions may vary by configuration and manufacturing process.
[2]Smooth display is not available for all apps or content. Dimensions : 6.1 height x 2.9 width x 0.3 depth (inches)`,
    reviews: [],
    images: await uploadImage(['googlePhone.jpeg', 'googlePhone2.jpeg']),
    category: 'Phone',
    brand: 'google',
    rating: 0,
    numberOfReviews: 0,
    price: 88000,
    countInStock: 65,
  },
];
