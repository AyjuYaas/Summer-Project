interface Review {
  name: string;
  rating: number;
  review: string;
}

const reviews: Review[] = [
  {
    name: "John",
    rating: 5,
    review: "I like the platform.",
  },
  {
    name: "Emily",
    rating: 4,
    review: `Great experience, but the UI could be improved. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum asperiores ipsam magni totam, neque eligendi cum quasi voluptates rem velit distinctio, fugiat similique est perferendis natus corrupti enim ipsum? Culpa? Mollitia recusandae ea id ad perferendis dolorum unde. Veniam quidem ducimus blanditiis animi, voluptate numquam autem praesentium alias, quaerat sint quas itaque! Tempora dolorem culpa quibusdam perspiciatis placeat harum eum! Sunt, beatae deleniti? Accusamus, consectetur labore placeat dolorum nihil ex similique aliquid blanditiis alias ea atque fugiat ipsum provident tempore rem eum expedita? Temporibus aperiam provident modi inventore porro ad!`,
  },
  {
    name: "Michael",
    rating: 5,
    review: "TheraFind made it so easy to find the right therapist for me!",
  },
  {
    name: "Sophia",
    rating: 4.2,
    review:
      "Very helpful platform, but I wish there were more therapists available.",
  },
  {
    name: "David",
    rating: 5,
    review:
      "Seamless booking process and great therapists. Highly recommended!",
  },
  {
    name: "Olivia",
    rating: 4,
    review: "Good service, but the response time could be a little faster.",
  },
  {
    name: "Daniel",
    rating: 5,
    review:
      "Life-changing platform. Finally found a therapist that truly understands me.",
  },
  {
    name: "Emma",
    rating: 4.5,
    review: "Loved the experience! The video call feature is very smooth.",
  },
  {
    name: "James",
    rating: 5,
    review: "Simple, efficient, and highly useful for mental health support.",
  },
  {
    name: "Ava",
    rating: 4,
    review: "Great service, but I hope they add more features in the future.",
  },
];

export default reviews;
