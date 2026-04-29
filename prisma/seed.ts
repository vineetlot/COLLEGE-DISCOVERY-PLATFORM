import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const collegesData: Prisma.CollegeCreateManyInput[] = [
  {
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    fees: 200000,
    rating: 4.8,
    courses: JSON.stringify([
      {name: 'Computer Science', duration: '4 years'},
      {name: 'Electrical Engineering', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 25.0, companies: ['Google', 'Microsoft', 'Goldman Sachs']}),
    reviews: JSON.stringify([
      {user: 'Rahul S.', text: 'Excellent campus and faculty', rating: 5},
      {user: 'Priya K.', text: 'Best placements', rating: 5}
    ])
  },
  {
    name: 'IIT Delhi',
    location: 'Delhi',
    fees: 210000,
    rating: 4.7,
    courses: JSON.stringify([
      {name: 'Electrical', duration: '4 years'},
      {name: 'Mechanical', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 24.0, companies: ['Amazon', 'Facebook', 'McKinsey']}),
    reviews: JSON.stringify([
      {user: 'Amit R.', text: 'Great research opportunities', rating: 4},
      {user: 'Neha G.', text: 'Good infra', rating: 5}
    ])
  },
  {
    name: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    fees: 205000,
    rating: 4.8,
    courses: JSON.stringify([
      {name: 'CSE', duration: '4 years'},
      {name: 'Civil', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 23.5, companies: ['Microsoft', 'Apple', 'Uber']}),
    reviews: JSON.stringify([
      {user: 'Karthik M.', text: 'Innovation hub', rating: 5},
      {user: 'Lakshmi S.', text: 'Supportive environment', rating: 4}
    ])
  },
  {
    name: 'IIT Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    fees: 195000,
    rating: 4.6,
    courses: JSON.stringify([
      {name: 'Aerospace', duration: '4 years'},
      {name: 'Mathematics', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 22.0, companies: ['Intel', 'IBM', 'Bain']}),
    reviews: JSON.stringify([
      {user: 'Vikram P.', text: 'Strong academics', rating: 4},
      {user: 'Anjali D.', text: 'Good labs', rating: 5}
    ])
  },
  {
    name: 'IIT Kharagpur',
    location: 'Kharagpur, West Bengal',
    fees: 198000,
    rating: 4.5,
    courses: JSON.stringify([
      {name: 'Architecture', duration: '5 years'},
      {name: 'Mining', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 21.5, companies: ['TCS', 'Wipro', 'Accenture']}),
    reviews: JSON.stringify([
      {user: 'Sourav B.', text: 'Largest campus', rating: 4},
      {user: 'Riya M.', text: 'Diverse courses', rating: 4}
    ])
  },
  {
    name: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    fees: 150000,
    rating: 4.5,
    courses: JSON.stringify([
      {name: 'ECE', duration: '4 years'},
      {name: 'CSE', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 15.0, companies: ['TCS', 'Infosys', 'Cognizant']}),
    reviews: JSON.stringify([
      {user: 'Arun K.', text: 'Excellent placements', rating: 5},
      {user: 'Deepa R.', text: 'Strict discipline', rating: 4}
    ])
  },
  // Add 14 more similar...
  {
    name: 'NIT Surathkal',
    location: 'Mangalore, Karnataka',
    fees: 145000,
    rating: 4.4,
    courses: JSON.stringify([
      {name: 'IT', duration: '4 years'},
      {name: 'Mechanical', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 14.5, companies: ['Amazon', 'Flipkart', 'Dell']}),
    reviews: JSON.stringify([
      {user: 'Nikhil S.', text: 'Beautiful campus', rating: 5},
      {user: 'Pooja N.', text: 'Good IT placements', rating: 4}
    ])
  },
  {
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    fees: 500000,
    rating: 4.6,
    courses: JSON.stringify([
      {name: 'EEE', duration: '4 years'},
      {name: 'Chemical', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 20.0, companies: ['Google', 'Microsoft', 'JPMorgan']}),
    reviews: JSON.stringify([
      {user: 'Rohan G.', text: 'Industry focused', rating: 5},
      {user: 'Shruti P.', text: 'High fees but worth', rating: 4}
    ])
  },
  {
    name: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    fees: 200000,
    rating: 4.2,
    courses: JSON.stringify([
      {name: 'CSE', duration: '4 years'},
      {name: 'Biotech', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 8.0, companies: ['Wipro', 'TCS', 'HCL']}),
    reviews: JSON.stringify([
      {user: 'Kiran V.', text: 'Mass recruiters', rating: 4},
      {user: 'Meera L.', text: 'Flexible curriculum', rating: 4}
    ])
  },
  {
    name: 'DTU Delhi',
    location: 'Delhi',
    fees: 250000,
    rating: 4.3,
    courses: JSON.stringify([
      {name: 'Software Engg', duration: '4 years'},
      {name: 'Civil', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 12.0, companies: ['Microsoft', 'Google', 'Zomato']}),
    reviews: JSON.stringify([
      {user: 'Sameer D.', text: 'Good Delhi location', rating: 4},
      {user: 'Tara S.', text: 'Active clubs', rating: 5}
    ])
  },
  {
    name: 'NSIT Delhi',
    location: 'Delhi',
    fees: 120000,
    rating: 4.1,
    courses: JSON.stringify([
      {name: 'IT', duration: '4 years'},
      {name: 'Electronics', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 11.0, companies: ['Infosys', 'Accenture', 'TechM']}),
    reviews: JSON.stringify([
      {user: 'Vishal N.', text: 'Affordable fees', rating: 4},
      {user: 'Anita K.', text: 'Competitive environment', rating: 4}
    ])
  },
  {
    name: 'IIIT Hyderabad',
    location: 'Hyderabad, Telangana',
    fees: 300000,
    rating: 4.4,
    courses: JSON.stringify([
      {name: 'CSE', duration: '4 years'},
      {name: 'ECD', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 22.0, companies: ['Facebook', 'Google', 'Microsoft']}),
    reviews: JSON.stringify([
      {user: 'Rajesh H.', text: 'Research focused', rating: 5},
      {user: 'Sangeeta I.', text: 'Small batch size', rating: 4}
    ])
  },
  {
    name: 'IIIT Bangalore',
    location: 'Bangalore, Karnataka',
    fees: 350000,
    rating: 4.3,
    courses: JSON.stringify([
      {name: 'CSE', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 20.5, companies: ['Amazon', 'LinkedIn', 'Salesforce']}),
    reviews: JSON.stringify([
      {user: 'Prateek B.', text: 'Industry partnerships', rating: 5},
      {user: 'Divya J.', text: 'Urban location', rating: 4}
    ])
  },
  {
    name: 'IIT Roorkee',
    location: 'Roorkee, Uttarakhand',
    fees: 215000,
    rating: 4.5,
    courses: JSON.stringify([
      {name: 'Biosciences', duration: '4 years'},
      {name: 'Energy Science', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 18.0, companies: ['BPCL', 'ONGC', 'Schlumberger']}),
    reviews: JSON.stringify([
      {user: 'Manish R.', text: 'Heritage institute', rating: 4},
      {user: 'Kavya U.', text: 'Green campus', rating: 5}
    ])
  },
  {
    name: 'IIT Guwahati',
    location: 'Guwahati, Assam',
    fees: 205000,
    rating: 4.4,
    courses: JSON.stringify([
      {name: 'Data Science', duration: '4 years'},
      {name: 'Design', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 19.0, companies: ['Adobe', 'Qualcomm', 'Samsung']}),
    reviews: JSON.stringify([
      {user: 'Abhijit G.', text: 'Scenic beauty', rating: 5},
      {user: 'Rupali A.', text: 'Newer facilities', rating: 4}
    ])
  },
  {
    name: 'NIT Warangal',
    location: 'Warangal, Telangana',
    fees: 160000,
    rating: 4.3,
    courses: JSON.stringify([
      {name: 'Chemical', duration: '4 years'},
      {name: 'Metallurgy', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 13.5, companies: ['L&T', 'BHEL', 'DRDO']}),
    reviews: JSON.stringify([
      {user: 'Siddharth W.', text: 'Core placements good', rating: 4},
      {user: 'Nidhi T.', text: 'Sports facilities', rating: 4}
    ])
  },
  {
    name: 'NIT Rourkela',
    location: 'Rourkela, Odisha',
    fees: 155000,
    rating: 4.2,
    courses: JSON.stringify([
      {name: 'Biomedical', duration: '4 years'},
      {name: 'Ceramics', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 12.5, companies: ['SAIL', 'Tata Steel', 'Vedanta']}),
    reviews: JSON.stringify([
      {user: 'Bibhu O.', text: 'Industrial exposure', rating: 4},
      {user: 'Sweta R.', text: 'Research focus', rating: 4}
    ])
  },
  {
    name: 'MNIT Jaipur',
    location: 'Jaipur, Rajasthan',
    fees: 170000,
    rating: 4.2,
    courses: JSON.stringify([
      {name: 'Architecture', duration: '5 years'},
      {name: 'CSE', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 11.5, companies: ['Genpact', 'Capgemini', 'Bosch']}),
    reviews: JSON.stringify([
      {user: 'Ravi J.', text: 'Cultural city', rating: 4},
      {user: 'Madhuri M.', text: 'Hostel life good', rating: 5}
    ])
  },
  {
    name: 'NIT Calicut',
    location: 'Kozhikode, Kerala',
    fees: 152000,
    rating: 4.3,
    courses: JSON.stringify([
      {name: 'Production Engg', duration: '4 years'},
      {name: 'Materials Science', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 13.0, companies: ['MRF', 'Bosch', 'Intel']}),
    reviews: JSON.stringify([
      {user: 'Nithin K.', text: 'Nature paradise', rating: 5},
      {user: 'Aishwarya C.', text: 'Calm atmosphere', rating: 5}
    ])
  },
  {
    name: 'NIT Kurukshetra',
    location: 'Kurukshetra, Haryana',
    fees: 148000,
    rating: 4.0,
    courses: JSON.stringify([
      {name: 'Industrial Engg', duration: '4 years'},
      {name: 'Instrumentation', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 10.5, companies: ['DMRC', 'BSNL', 'SAIL']}),
    reviews: JSON.stringify([
      {user: 'Pankaj K.', text: 'Reasonable fees', rating: 4},
      {user: 'Simran H.', text: 'Near Delhi', rating: 4}
    ])
  },
  {
    name: 'Thapar University',
    location: 'Patiala, Punjab',
    fees: 280000,
    rating: 4.1,
    courses: JSON.stringify([
      {name: 'Mechatronics', duration: '4 years'},
      {name: 'MBA Tech', duration: '5 years'}
    ]),
    placements: JSON.stringify({avgSalary: 9.5, companies: ['PepsiCo', 'Siemens', 'Varroc']}),
    reviews: JSON.stringify([
      {user: 'Gurpreet P.', text: 'Private good placement', rating: 4},
      {user: 'Harpreet T.', text: 'Modern campus', rating: 4}
    ])
  },
  {
    name: 'SRM Institute',
    location: 'Chennai, Tamil Nadu',
    fees: 250000,
    rating: 4.0,
    courses: JSON.stringify([
      {name: 'Nanotech', duration: '4 years'},
      {name: 'Automobile', duration: '4 years'}
    ]),
    placements: JSON.stringify({avgSalary: 7.5, companies: ['Hyundai', 'TVS', 'Hero']}),
    reviews: JSON.stringify([
      {user: 'Vignesh S.', text: 'Many branches', rating: 4},
      {user: 'Preethi R.', text: 'Industry tieups', rating: 3}
    ])
  }
  // Total: 20 colleges with realistic data
]

async function main() {
  console.log(`Seeding ${collegesData.length} colleges...`)
  await prisma.college.deleteMany() // Clear existing
  await prisma.college.createMany({
    data: collegesData,
  })
  console.log(`✅ Seeded ${collegesData.length} colleges`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

