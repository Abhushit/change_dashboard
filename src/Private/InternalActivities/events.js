import moment from "moment"

const now = new Date()

export default [
  {
    id: 90,
    title: 'All Day Event very long title',
    location: 'United States',
    bookable: 'Yes',
    start: new Date("2022-11-14 19:03"),
    end: new Date("2022-11-14 20:03")
  },
  {
    id: 1,
    title: 'Long Event',
    location: 'Australia',
    bookable: 'Yes',
    start:new Date("2022-11-15 13:03"),
    end:new Date("2022-11-15 14:03")
  },

  {
    id: 2,
    title: 'DTS STARTS',
    location: 'Ireland',
    bookable: 'Yes',
    start:new Date("2022-11-15 15:03"),
    end:new Date("2022-11-15 26:03")
  },

  {
    id: 3,
    title: 'DTS ENDS',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-14 18:03"),
    end:new Date("2022-11-14 19:03")
  },

  {
    id: 4,
    title: 'Some Event',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-14 12:03"),
    end:new Date("2022-11-14 13:03")
  },
  {
    id: 5,
    title: 'Conference',
    location: 'South Queensland',
    bookable: 'Yes',
    start:new Date("2022-11-14 14:03"),
    end:new Date("2022-11-14 15:03")
  },
  {
    id: 6,
    title: 'Meeting',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-14 21:03"),
    end:new Date("2022-11-15 9:03")
  },
  {
    id: 7,
    title: 'Lunch',
    location: 'Liverpool',
    bookable: 'Yes',
    start:new Date("2022-11-14 14:03"),
    end:new Date("2022-11-14 15:03")
  },
  {
    id: 8,
    title: 'Meeting with client',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-16 11:03"),
    end:new Date("2022-11-17 12:03")
  },
  {
    id: 9,
    title: 'Happy Hour',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-12 11:03"),
    end:new Date("2022-11-13 12:03")
  },
  {
    id: 10,
    title: 'Dinner',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-16 14:03"),
    end:new Date("2022-11-17 15:03")
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-15 18:03"),
    end:new Date("2022-11-17 18:03")
  },
  {
    id: 11.1,
    title: 'Inconvenient Conference Call',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-14 17:03"),
    end:new Date("2022-11-14 18:03")
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-15 19:03"),
    end:new Date("2022-11-15 20:03")
  },
  {
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-14 11:03"),
    end:new Date("2022-11-14 12:03")
  },
  {
    id: 12,
    title: 'Late Night Event',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-15 15:03"),
    end:new Date("2022-11-16 16:03")
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-15 19:03"),
    end:new Date("2022-11-16 20:03")
  },
  {
    id: 13,
    title: 'Multi-day Event',
    location: 'United States',
    bookable: 'Yes',
    start:new Date("2022-11-17 19:03"),
    end:new Date("2022-11-18 20:03")
  },
  // {
  //   id: 14,
  //   title: 'Today',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 15,
  //   title: 'Point in Time Event',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 16,
  //   title: 'Video Record',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 17,
  //   title: 'Dutch Song Producing',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 18,
  //   title: 'Itaewon Halloween Meeting',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 19,
  //   title: 'Online Coding Test',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 20,
  //   title: 'An overlapped Event',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 21,
  //   title: 'Phone Interview',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 22,
  //   title: 'Cooking Class',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
  // {
  //   id: 23,
  //   title: 'Go to the gym',
  //   location: 'United States',
  //   bookable: 'Yes',
  //   start:new Date("2022-11-14 19:03"),
  //   end:new Date("2022-11-14 20:03")
  // },
]