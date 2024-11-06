import { VendorType } from "./types";


export const VendorDataList: VendorType[] = [
    {
        id: "1",
        companyName: "Tech Innovations Inc.",
        businessRegistrationNumber: "BRN123456789",
        taxId: "TID987654321",
        establishmentDate: new Date("2010-05-15"),
        businessType: { id: "TECH001", name: "Technology" },
        isActive: true,
        addresses: [
            {
                id: "ADDR001",
                addressType: "MAIN",
                addressLine: "123 Silicon Valley",
                subDistrictId: "SD001",
                districtId: "D001",
                provinceId: "P001",
                postalCode: "94025",
                isPrimary: true
            },
            {
                id: "ADDR002",
                addressType: "BILLING",
                addressLine: "456 Finance Street",
                subDistrictId: "SD002",
                districtId: "D002",
                provinceId: "P002",
                postalCode: "94026",
                isPrimary: false
            }
        ],
        contacts: [
            {
                id: "CONT001",
                name: "John Doe",
                position: "CEO",
                phone: "555-1234",
                email: "john.doe@techinnovations.com",
                department: "Executive",
                isPrimary: true
            },
            {
                id: "CONT002",
                name: "Jane Smith",
                position: "CTO",
                phone: "555-5678",
                email: "jane.smith@techinnovations.com",
                department: "Technology",
                isPrimary: false
            }
        ],
        rating: 4.8
    },
    {
        id: "2",
        companyName: "Green Fields Produce",
        businessRegistrationNumber: "BRN987654321",
        taxId: "TID123456789",
        establishmentDate: new Date("2015-03-20"),
        businessType: { id: "AGRI001", name: "Agriculture" },
        isActive: true,
        addresses: [
            {
                id: "ADDR003",
                addressType: "MAIN",
                addressLine: "456 Farm Road",
                subDistrictId: "SD003",
                districtId: "D003",
                provinceId: "P003",
                postalCode: "97301",
                isPrimary: true
            }
        ],
        contacts: [
            {
                id: "CONT003",
                name: "Alice Johnson",
                position: "Manager",
                phone: "555-7890",
                email: "alice.johnson@greenfields.com",
                department: "Management",
                isPrimary: true
            }
        ],
        rating: 4.5
    },
    {
        id: "3",
        companyName: "Oceanic Solutions",
        businessRegistrationNumber: "BRN456789123",
        taxId: "TID654321987",
        establishmentDate: new Date("2018-01-11"),
        businessType: { id: "MAR001", name: "Marine" },
        isActive: true,
        addresses: [
            {
                id: "ADDR004",
                addressType: "MAIN",
                addressLine: "789 Ocean Drive",
                subDistrictId: "SD004",
                districtId: "D004",
                provinceId: "P004",
                postalCode: "12345",
                isPrimary: true
            }
        ],
        contacts: [
            {
                id: "CONT004",
                name: "Mike Lee",
                position: "Director",
                phone: "555-2468",
                email: "mike.lee@oceanicsolutions.com",
                department: "Operations",
                isPrimary: true
            }
        ],
        rating: 4.9
    },
    {
        id: "4",
        companyName: "Health Plus",
        businessRegistrationNumber: "BRN321654987",
        taxId: "TID789456123",
        establishmentDate: new Date("2012-07-25"),
        businessType: { id: "HEALTH001", name: "Healthcare" },
        isActive: true,
        addresses: [
            {
                id: "ADDR005",
                addressType: "MAIN",
                addressLine: "101 Health Ave",
                subDistrictId: "SD005",
                districtId: "D005",
                provinceId: "P005",
                postalCode: "54321",
                isPrimary: true
            }
        ],
        contacts: [
            {
                id: "CONT005",
                name: "Sara Parker",
                position: "Nurse",
                phone: "555-1357",
                email: "sara.parker@healthplus.com",
                department: "Medical",
                isPrimary: true
            }
        ],
        rating: 4.7
    },
    {
        id: "5",
        companyName: "Smart Home Solutions",
        businessRegistrationNumber: "BRN987123456",
        taxId: "TID321654987",
        establishmentDate: new Date("2020-09-05"),
        businessType: { id: "SMART001", name: "Smart Home Technology" },
        isActive: true,
        addresses: [
            {
                id: "ADDR006",
                addressType: "MAIN",
                addressLine: "202 Smart St",
                subDistrictId: "SD006",
                districtId: "D006",
                provinceId: "P006",
                postalCode: "67890",
                isPrimary: true
            }
        ],
        contacts: [
            {
                id: "CONT006",
                name: "Tom Green",
                position: "Product Manager",
                phone: "555-6789",
                email: "tom.green@smarthomes.com",
                department: "Product Development",
                isPrimary: true
            }
        ],
        rating: 4.6
    }
]
