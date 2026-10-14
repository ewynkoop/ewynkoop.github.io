/* ==========================================================================
   PROJECTS
   --------------------------------------------------------------------------
   Every project on the site comes from this list. To add a new one, copy an
   existing block, paste it where you want it to appear (cards show in the
   order listed here), and edit the fields.

   Fields
     id        short unique name, no spaces. Used in the share link (#id)
               and as the folder name for its photos/videos.
     category  "Engineering", "Personal", or "Other" (drives the filter chips)
     tags      extra little labels shown on the card, e.g. ["AP50"]
     title     project name
     date      shown on the card
     cover     the image on the card. Leave the file missing and a
               "photo coming soon" placeholder appears instead.
     coverPosition  optional. Which part of the cover to keep when it's cropped,
               as "left% top%". "50% 50%" is the center; raise the second
               number to show more of the bottom.
     coverFit  optional. "contain" shows the whole cover with no cropping
               and never blows it up past its real size (good for charts,
               logos, and screenshots).
     coverBackground  optional. Color behind a "contain" cover, e.g. "#EEF1EA",
               so the empty space matches the image. Defaults to white.
     summary   one or two sentences for the card
     sections  the full write-up. Each has a heading and an array of paragraphs.
     media     photos/videos/PDFs shown in the project. Types:
                 { type: "image", src: "...", caption: "..." }
                   add  wide: true  to stretch a photo across the full width
                 { type: "video", src: "...", caption: "..." }   (.mp4 works best)
                   add  wide: false  to a vertical video so it takes one column
                 { type: "youtube", id: "VIDEO_ID", caption: "..." }
                 { type: "pdf", src: "...", caption: "..." }
     links     buttons at the bottom: { label: "...", url: "..." }

   Put files in assets/projects/<id>/ using the exact names below. Anything
   that's missing shows a placeholder until you upload it.
   ========================================================================== */

const AP50_CONTEXT =
  "During my first year at Harvard I took Applied Physics 50 A–B. The course is built around four major projects, two per semester. Students work in teams of four and compete in a project fair against the other 19 teams of Harvard College students.";

const PROJECTS = [
  {
    id: "calibrated-car",
    category: "Engineering",
    tags: ["AP50A"],
    title: "The 5corpion: Precision Calibrated Car",
    date: "Sep – Oct 2025",
    cover: "assets/projects/calibrated-car/car.jpg",
    coverPosition: "50% 55%",
    summary:
      "An unpowered car that has to stop at a mystery distance between 1 and 4 m. We used a string as a brake and finished within a few centimeters both rounds.",
    sections: [
      { heading: "About AP50", body: [AP50_CONTEXT] },
      {
        heading: "The challenge",
        body: [
          "Build a toy car in the Active Learning Lab in Harvard's Science and Engineering Complex that can carry a 50 g weight and travel a mystery distance between 1 and 4 m, with no motor and no electricity.",
          "Teams learn the distance only 3 minutes before presenting, so the car needs a calibration system that has been tested heavily ahead of time. Some teams adjust a ramp angle, others tune the spring tension on a mousetrap, and others release the car from different heights on an incline.",
        ],
      },
      {
        heading: "Our approach",
        body: [
          "We secured a long string to the top of the car and wrapped the excess around the axle so it acted as a brake. For every 10 cm increment on the interval [1 m, 4 m], we measured how much string was needed and tied off the rest.",
          "We used premade wheels and built the axles from dowels. The body was a cut piece of plywood, with a plastic tube that kept the string from tangling in the wheels. We released the car from a steep ramp because we were confident the string would stop even a fast-moving car.",
          "We called it the 5corpion because we were Team 5 and the tube looked a little like a scorpion's tail.",
        ],
      },
      {
        heading: "The result",
        body: [
          "Each group got the Round 1 distance and had 60 seconds to calibrate before presenting. The top 6 of 20 teams moved on to Round 2 with a new distance, usually farther, which means more room for error. The top three teams received medals.",
          "We landed within a couple of centimeters both times and took 1st place.",
        ],
      },
    ],
    media: [
      { type: "video", src: "assets/projects/calibrated-car/competition.mp4", caption: "Our group in Round 1 of the competition. So exciting!" },
      { type: "video", src: "assets/projects/calibrated-car/walkthrough.mp4", caption: "Video walkthrough. Turn the audio on for an informal explanation." },
      { type: "image", src: "assets/projects/calibrated-car/team.jpg", caption: "Our celebration photo together" },
      { type: "image", src: "assets/projects/calibrated-car/car.jpg", caption: "The 5corpion: Team 5, plus a tube that looked a little like a scorpion" },
    ],
    links: [],
  },

  {
    id: "rube-goldberg",
    category: "Engineering",
    tags: ["AP50A"],
    title: "The Bird Feeder: Rube Goldberg Machine",
    date: "Oct – Dec 2025",
    cover: "assets/projects/rube-goldberg/machine.jpg",
    summary:
      "A 40 cm cube machine that chains seven physics concepts together (marbles, dominoes, a mousetrap, a pulley, a catapult, and a tube of lentils) to ring a bell.",
    sections: [
      { heading: "About AP50", body: [AP50_CONTEXT] },
      {
        heading: "The challenge",
        body: [
          "New teams of four had to build a Rube Goldberg machine with seven steps, each showing a different physics concept. It had to ring a bell, run for at least 20 seconds, and fit inside a 40 × 40 × 40 cm storage box.",
          "Afterward we tracked all of the motion with tracking software to analyze the energy transfer from potential to kinetic energy mathematically. We built it in the Active Learning Lab on a $75 budget from approved wholesale suppliers.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "The video explains it best, but here's the short version. A marble goes into a U-shaped plastic tube, rocks back and forth, then drops into a funnel. It rolls down a track, hits a popsicle-stick hinge, and knocks over a line of dominoes.",
          "The dominoes release a second ball into a plastic tube. It runs down a series of ramps and into another funnel, and when it comes out it hits a popsicle stick that sets off a mousetrap.",
          "The mousetrap does two things at once: it pulls a plastic strip out of a tube full of lentils, and it releases a magnetic ball that was anchoring a pulley. The pulley drops onto a platform and fires a rubber-band catapult. The projectile knocks over the last set of dominoes, which ring the bell.",
          "The lentils were there mainly to keep the machine moving for more than 20 seconds. They also gave it its name: The Bird Feeder.",
        ],
      },
      {
        heading: "The result",
        body: [
          "After every group presented, each student voted for the Best Engineered project, and nobody could vote for their own team. I'm proud to say we won.",
        ],
      },
    ],
    media: [
      { type: "video", src: "assets/projects/rube-goldberg/competition.mp4", caption: "Video from the day of the fair!" },
      { type: "image", src: "assets/projects/rube-goldberg/team.jpg", caption: "Our celebration photo together" },
      { type: "image", src: "assets/projects/rube-goldberg/machine.jpg", caption: "The Bird Feeder" },
    ],
    links: [{ label: "Read the article", url: "https://bit.ly/4qJzueC" }],
  },

  {
    id: "hungry-hungry-hippos",
    category: "Engineering",
    tags: ["AP50B"],
    title: "Hungry Hungry Hippos: Electrostatic Magic Trick",
    date: "Feb – Mar 2026",
    cover: "assets/projects/hungry-hungry-hippos/hippos.jpg",
    coverPosition: "50% 60%",
    summary:
      "A safe, static-only magic trick for middle schoolers. Rub the lid and the aluminum balls inside start moving without anyone touching them.",
    sections: [
      { heading: "About AP50", body: [AP50_CONTEXT] },
      {
        heading: "The challenge",
        body: [
          "This was a short, simple project compared to the others. Teams built an electrostatic magic trick to present to middle school students. It had to be very safe, so it used very low voltage and static electricity only.",
          "It couldn't be as simple as rubbing a balloon on your head, and it couldn't be as complex as the high-voltage builds either. Mostly the project was about being creative.",
        ],
      },
      {
        heading: "Our approach",
        body: [
          "We were inspired by the wandering aluminum balls trick. We built a lined box with aluminum balls inside, so students could rub the surface and watch the balls move without touching them. Then we put a hippo sculpture on each corner and called it Hungry Hungry Hippos.",
        ],
      },
    ],
    media: [{ type: "image", src: "assets/projects/hungry-hungry-hippos/design-notes.jpg", caption: "Design notes: box geometry and the aluminum balls", wide: true }],
    links: [],
  },

  {
    id: "huceg-wind",
    category: "Engineering",
    tags: ["HUCEG"],
    title: "Collegiate Wind Competition Turbine",
    date: "Ongoing",
    cover: "assets/projects/huceg-wind/cover.png",
    coverFit: "contain",
    summary:
      "Designing an optimized wind turbine with the Harvard Undergraduate Clean Energy Group's BUILD team.",
    sections: [
      {
        heading: "About HUCEG",
        body: [
          "The Harvard Undergraduate Clean Energy Group has several branches, including finance, equity, and service. As a member of the BUILD team, I help develop our entry for the Collegiate Wind Competition.",
        ],
      },
      {
        heading: "What I'm working on",
        body: [
          "We're building an optimized windmill. So far that has meant drafting CAD models, attending info sessions from Electrical Engineering concentrators and faculty, and working on the research team.",
        ],
      },
    ],
    media: [],
    links: [{ label: "HUCEG BUILD", url: "https://www.huceg.org/build" }],
  },

  {
    id: "isef-hydropower",
    category: "Engineering",
    tags: ["High School", "Regional Science Fair", "ISEF"],
    title: "Low-Pressure Hydropower Generator",
    date: "Aug 2023 – Mar 2024",
    cover: "assets/projects/isef-hydropower/display.jpg",
    coverPosition: "50% 18%",
    summary:
      "A small hydro generator for places with no sun and no wind. A repurposed paint-mixer propeller produced about 4 volts. Regional ISEF-affiliated science fair.",
    sections: [
      {
        heading: "The question",
        body: [
          "Picture this: you're camping in rural Virginia and your tent lamp runs out of power. It's dark, cloudy, and still, so solar and wind generators are useless. How would you charge your lamp without electricity? That question made me curious, and it's why I registered for the regional International Science and Engineering Fair (ISEF).",
          "Every day on my way to school I crossed the Conway River, and that got me thinking about hydropower. Most hydroelectric generators need a big elevation drop to produce power at scale. I wanted to build a smaller version that would work in low-pressure environments.",
        ],
      },
      {
        heading: "The build",
        body: [
          "To develop the idea, I dove into water dynamics through lectures and reading. After months of research, I designed a system where a bucket fills with water and then releases it to build pressure in a PVC pipe. The water turns a propeller, repurposed from a paint mixer, which spins a rotor around a stator and produces about four volts.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Over those six months I learned that engineering is more than diagrams on graph paper (though I spent hours drawing them). It's wandering through Lowe's for materials, troubleshooting designs on my bathroom floor, and sharing what you love at competitions. On competition day I presented my project, learned from other students, and met fellow engineers.",
          "The experience showed me that engineering is about more than solutions. It's about experimenting, collaborating, and discovering things along the way.",
        ],
      },
    ],
    media: [
      { type: "image", src: "assets/projects/isef-hydropower/display.jpg", caption: "My display at the regional science fair" },
      { type: "image", src: "assets/projects/isef-hydropower/generator.jpg", caption: "The finished generator, with the paint-mixer propeller inside" },
      { type: "image", src: "assets/projects/isef-hydropower/sketch.jpg", caption: "My sketch of the internal setup" },
      { type: "image", src: "assets/projects/isef-hydropower/test-setup.jpg", caption: "Testing setup: the bucket feeds the generator while a multimeter reads the voltage" },
      { type: "video", src: "assets/projects/isef-hydropower/generator-video.mp4", caption: "A closer look at the generator", wide: false },
      { type: "video", src: "assets/projects/isef-hydropower/test-run.mp4", caption: "A test run, pouring water through the system", wide: false },
      { type: "pdf", src: "assets/projects/isef-hydropower/poster.pdf", caption: "My original high school poster board" },
    ],
    links: [],
  },

  {
    id: "life-organizer",
    category: "Personal",
    tags: [],
    title: "Task, Time & Life Schedule Organizer",
    date: "Jul 2026 – Ongoing",
    cover: "assets/projects/life-organizer/cover.png",
    coverFit: "contain",
    summary:
      "A Google Sheets system that gives me high-level stats on where my time goes. I built it with Claude to get ready for a busier sophomore year.",
    sections: [
      {
        heading: "Why I built it",
        body: [
          "I started sophomore year knowing I'd be taking on a lot of new responsibilities, and I wanted a way to see high-level stats on where I was spending my time. So I built a Google Sheet and developed it with Claude.",
          "It's been very helpful, especially while I was settling into the semester.",
        ],
      },
      {
        heading: "What's next",
        body: [
          "It's always changing. Next, I want to automate a lot of my routines so I don't have to enter them over and over.",
        ],
      },
    ],
    media: [{ type: "video", src: "assets/projects/life-organizer/walkthrough.mp4", caption: "Video walkthrough" }],
    links: [
      {
        label: "Open a sample copy (Google Sheets)",
        url: "https://docs.google.com/spreadsheets/d/15JnVYWhj1h_nlFaiX_X5h_ouLUrUNGxA/edit?usp=sharing&ouid=102107540727194259592&rtpof=true&sd=true",
      },
    ],
  },

  {
    id: "free-food-app",
    category: "Other",
    tags: ["Startups class"],
    title: "Campus Free-Food Finder: App Mockup",
    date: "October 2026",
    cover: "assets/projects/free-food-app/cover.png",
    coverFit: "contain",
    coverBackground: "#EEF1EA",
    summary:
      "A quickly vibe-coded mockup of an app that connects students with club events that have free food, built to test whether there's traction before launching.",
    sections: [
      {
        heading: "The assignment",
        body: [
          "In my startups class, we had to come up with an app idea and build a very basic mockup. The point was to show that in the past year, founders have been able to gauge the market like never before. They can vibe code something in a few hours to test whether a product has traction before actually launching anything.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Persona problem statement: Stella wants free food on campus that's better than the dining hall, but she never knows when events are happening, and the chance to get involved with new clubs is a bonus. We know other college students share this struggle because dining hall rankings show how much student satisfaction varies, and college marketing teams often target students on a budget.",
        ],
      },
      {
        heading: "The solution",
        body: [
          "An app where club leaders and recruiters post events with descriptions, times, locations, how long you have to stay to get food (e.g., stay 10 minutes for a bagel), membership restrictions (members only or open to everyone), and extra resources like forms and PDFs. Club leaders can also upload rosters with members' names, emails, and phone numbers.",
          "Students log in with their name, school email, and phone number. Their dashboard shows events from clubs they belong to, plus events open to everyone. They can sort and filter by time, distance, food type, interests, and more, mark whether they plan to attend, and turn on notifications. That lets them plan meals around free food, discover new clubs, and meet other students instead of eating alone.",
          "Many students lead one or more clubs, so the app supports that too. A bottom navigation bar has a general Dashboard tab, a tab for each club a student manages or belongs to, and an option to discover or join new clubs. That makes it easy to switch between finding events, managing a club, and exploring.",
        ],
      },
      {
        heading: "Measuring success",
        body: ["Event attendance, number of active users, search and filter activity, and user experience ratings."],
      },
    ],
    media: [],
    links: [
      {
        label: "Try the interactive mockup (Snack Track)",
        url: "https://claude.ai/artifact/BvLFaSbgjbRPvasj1siF5u",
      },
    ],
  },

  {
    id: "collage-team",
    category: "Other",
    tags: ["CollageAI"],
    title: "Collage-Team Prototype for AP50",
    date: "Jun 2026 – Ongoing",
    cover: "assets/projects/collage-team/cover.jpg",
    summary: "Full write-up coming soon.",
    sections: [{ heading: "Coming soon", body: ["I'm still working on this one. Check back for the full story."] }],
    media: [],
    links: [],
  },
];
