// mock.js

// docker-compose exec backend python manage.py migrate
// docker-compose exec backend python manage.py createsuperuser
// docker-compose exec backend python manage.py runserver 0.0.0.0:8000
export const users = [
  {
    username: "Mlindaamani",
    email: "mlindaamani@domain.com",
    role: "admin",
    rating: 5.0,
    messagesSent: 100,
    isActive: true,
    signUpDate: "2024-01-15",
  },

  {
    username: "John Doe",
    email: "johndoe@domain.com",
    role: "admin",
    rating: 4.5,
    messagesSent: 100,
    isActive: true,
    signUpDate: "2024-01-15",
  },
  {
    username: "Alice Smith",
    email: "alice.smith@company.org",
    role: "user",
    rating: 3.8,
    messagesSent: 42,
    isActive: true,
    signUpDate: "2024-02-10",
  },
  {
    username: "Bob Johnson",
    email: "bob.j@network.co",
    role: "moderator",
    rating: 4.1,
    messagesSent: 15,
    isActive: false,
    signUpDate: "2024-03-05",
  },
  {
    username: "Emma Wilson",
    email: "emma.w@service.io",
    role: "user",
    rating: 4.7,
    messagesSent: 56,
    isActive: true,
    signUpDate: "2024-01-25",
  },
  {
    username: "Michael Brown",
    email: "mike.br@domain.com",
    role: "admin",
    rating: 4.3,
    messagesSent: 33,
    isActive: true,
    signUpDate: "2024-02-18",
  },
  {
    username: "Sarah Davis",
    email: "s.davis@webapp.com",
    role: "guest",
    rating: 2.9,
    messagesSent: 8,
    isActive: true,
    signUpDate: "2024-03-12",
  },
  {
    username: "David Miller",
    email: "d.miller@cloud.net",
    role: "user",
    rating: 4.0,
    messagesSent: 19,
    isActive: false,
    signUpDate: "2024-02-28",
  },
  {
    username: "Zexie",
    email: "xazie@cloud.net",
    role: "admin",
    rating: 5.0,
    messagesSent: 60,
    isActive: true,
    signUpDate: "2024-02-28",
  },
  {
    username: "Jovine",
    email: "jovine@cloud.net",
    role: "admin",
    rating: 5.0,
    messagesSent: 50,
    isActive: true,
    signUpDate: "2024-02-28",
  },
  {
    username: "Antia Mwendwa",
    email: "antia@cloud.net",
    role: "user",
    rating: 5.0,
    messagesSent: 79,
    isActive: true,
    signUpDate: "2024-02-28",
  },
];
