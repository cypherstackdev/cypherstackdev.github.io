// MedicareSync - Medical & Healthcare Data Store
window.MedicareData = {
  clinicInfo: {
    name: "Medicare Sync Multi-Specialty Clinic & Telehealth Hub",
    tagline: "Smart Healthcare Scheduling, Digital Prescriptions & Care Continuity",
    phone: "+91 80 4567 8900",
    emergencyHelpline: "108 / +91 99887 76655",
    email: "care@medicaresync.health",
    address: "42, Richmond Health Enclave, 80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034",
    googleMapsUrl: "https://maps.google.com/?q=Koramangala+4th+Block+Bangalore+Medical+Center",
    operatingHours: "Monday – Saturday: 08:00 AM – 09:30 PM | Sunday: 09:00 AM – 02:00 PM (Emergency 24/7)",
    branches: [
      { id: "blr-kor", name: "Koramangala Main Center", address: "42, 80 Feet Rd, Koramangala 4th Block", mapsUrl: "https://maps.google.com/?q=Koramangala+Bangalore" },
      { id: "blr-ind", name: "Indiranagar Super-Specialty Hub", address: "100 Feet Rd, HAL 2nd Stage, Indiranagar", mapsUrl: "https://maps.google.com/?q=Indiranagar+Bangalore" },
      { id: "blr-whf", name: "Whitefield Diagnostics & Care Center", address: "ITPL Main Road, Prestige Shantiniketan, Whitefield", mapsUrl: "https://maps.google.com/?q=Whitefield+Bangalore" }
    ]
  },

  specialties: [
    {
      id: "all",
      name: "All Specialties",
      icon: "layout-grid",
      description: "Browse all verified specialist doctors",
      symptoms: []
    },
    {
      id: "cardiology",
      name: "Cardiology",
      icon: "heart-pulse",
      description: "Heart health, hypertension, ECG & cardiac rehabilitation",
      symptoms: ["Chest Pain", "Palpitations", "High BP", "Shortness of Breath", "Dizziness"]
    },
    {
      id: "dermatology",
      name: "Dermatology",
      icon: "sparkles",
      description: "Skin, hair, nails, acne treatment & aesthetic cosmetology",
      symptoms: ["Acne", "Skin Rash", "Hair Fall", "Pigmentation", "Eczema", "Mole Check"]
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      icon: "baby",
      description: "Child health, growth milestones, newborn care & vaccination",
      symptoms: ["Child Fever", "Vaccination", "Cough & Cold", "Infant Colic", "Growth Check"]
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      icon: "bone",
      description: "Joint pain, spine care, fractures, arthritis & sports injuries",
      symptoms: ["Knee Pain", "Backache", "Joint Stiffness", "Fracture Care", "Sciatica"]
    },
    {
      id: "general-medicine",
      name: "General Medicine",
      icon: "stethoscope",
      description: "Fever, diabetes management, thyroid, seasonal flu & checkups",
      symptoms: ["Viral Fever", "Diabetes Care", "Thyroid Issues", "Fatigue", "Gastric Troubles"]
    },
    {
      id: "neurology",
      name: "Neurology",
      icon: "brain",
      description: "Migraines, stroke recovery, epilepsy & nerve disorders",
      symptoms: ["Chronic Migraine", "Numbness", "Seizures", "Tremors", "Memory Loss"]
    },
    {
      id: "gynecology",
      name: "Gynecology & Obs",
      icon: "users",
      description: "Women's wellness, prenatal care, PCOS & hormonal health",
      symptoms: ["PCOS / PCOD", "Pregnancy Care", "Menstrual Irregularity", "Pelvic Pain"]
    }
  ],

  doctors: [
    {
      id: "dr-aravind-sharma",
      name: "Dr. Aravind Sharma",
      qualifications: "MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi",
      specialtyId: "cardiology",
      specialtyName: "Senior Interventional Cardiologist",
      experience: 16,
      rating: 4.95,
      reviewCount: 542,
      fee: 800,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Hindi", "Kannada"],
      hospitalAffiliation: "Medicare Central Hospital & Apollo Fellow",
      modes: ["in-clinic", "video"],
      bio: "Dr. Aravind Sharma has over 16 years of clinical excellence in complex coronary angioplasty, heart failure management, and preventive cardiology.",
      nextSlot: "Today, 05:30 PM",
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: {
        morning: ["09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM"],
        afternoon: ["02:00 PM", "03:00 PM", "03:30 PM"],
        evening: ["05:00 PM", "05:30 PM", "06:30 PM", "07:15 PM"]
      }
    },
    {
      id: "dr-meera-nair",
      name: "Dr. Meera Nair",
      qualifications: "MBBS, MD (Dermatology, Venereology & Leprosy) - CMC Vellore",
      specialtyId: "dermatology",
      specialtyName: "Consultant Dermatologist & Trichologist",
      experience: 12,
      rating: 4.91,
      reviewCount: 680,
      fee: 700,
      image: "https://images.unsplash.com/photo-1594824813689-c4544d673994?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Malayalam", "Tamil", "Hindi"],
      hospitalAffiliation: "Medicare Skin & Aesthetic Institute",
      modes: ["in-clinic", "video"],
      bio: "Specializing in advanced clinical dermatology, laser skin rejuvenation, anti-aging therapies, and comprehensive hair loss / trichology treatments.",
      nextSlot: "Today, 06:15 PM",
      availableDays: ["Mon", "Wed", "Thu", "Fri", "Sat"],
      slots: {
        morning: ["10:00 AM", "10:30 AM", "11:30 AM"],
        afternoon: ["02:30 PM", "03:30 PM", "04:00 PM"],
        evening: ["05:30 PM", "06:15 PM", "07:00 PM", "08:00 PM"]
      }
    },
    {
      id: "dr-rohit-deshmukh",
      name: "Dr. Rohit Deshmukh",
      qualifications: "MBBS, DCH, DNB (Pediatrics) - KEM Hospital Mumbai",
      specialtyId: "pediatrics",
      specialtyName: "Senior Pediatrician & Neonatal Specialist",
      experience: 14,
      rating: 4.98,
      reviewCount: 810,
      fee: 600,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Hindi", "Marathi", "Kannada"],
      hospitalAffiliation: "Medicare Child Care & Rainbow Associate",
      modes: ["in-clinic", "video"],
      bio: "Known for his gentle and child-friendly approach, Dr. Rohit provides holistic pediatric care, newborn growth tracking, and international vaccination protocols.",
      nextSlot: "Tomorrow, 10:00 AM",
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      slots: {
        morning: ["09:00 AM", "10:00 AM", "10:45 AM", "11:30 AM"],
        afternoon: ["01:30 PM", "02:30 PM"],
        evening: ["05:00 PM", "06:00 PM", "07:00 PM"]
      }
    },
    {
      id: "dr-vikram-shetty",
      name: "Dr. Vikram Shetty",
      qualifications: "MBBS, MS (Orthopedics), MCh (Joint Replacement) - UK",
      specialtyId: "orthopedics",
      specialtyName: "Orthopedic & Robotic Joint Surgeon",
      experience: 18,
      rating: 4.93,
      reviewCount: 490,
      fee: 900,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Kannada", "Hindi", "Tulu"],
      hospitalAffiliation: "Medicare Center for Bone & Joint Health",
      modes: ["in-clinic", "video"],
      bio: "Pioneer in minimally invasive robotic knee & hip replacements, arthroscopy, sports trauma, and complex spinal disorders.",
      nextSlot: "Today, 04:30 PM",
      availableDays: ["Mon", "Tue", "Thu", "Fri", "Sat"],
      slots: {
        morning: ["09:00 AM", "10:30 AM", "11:15 AM"],
        afternoon: ["03:00 PM", "04:30 PM"],
        evening: ["06:00 PM", "07:00 PM", "07:45 PM"]
      }
    },
    {
      id: "dr-ananya-sen",
      name: "Dr. Ananya Sen",
      qualifications: "MBBS, MD (General Medicine) - Lady Hardinge, New Delhi",
      specialtyId: "general-medicine",
      specialtyName: "Senior Consultant Physician & Diabetologist",
      experience: 11,
      rating: 4.89,
      reviewCount: 720,
      fee: 550,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Bengali", "Hindi"],
      hospitalAffiliation: "Medicare Internal Medicine Department",
      modes: ["in-clinic", "video"],
      bio: "Expert in infectious diseases, chronic diabetes reversal plans, thyroid disorders, geriatric health, and lifestyle disease management.",
      nextSlot: "Today, 03:00 PM",
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: {
        morning: ["08:30 AM", "09:15 AM", "10:00 AM", "11:30 AM"],
        afternoon: ["02:00 PM", "03:00 PM", "04:15 PM"],
        evening: ["05:30 PM", "06:30 PM", "07:30 PM", "08:15 PM"]
      }
    },
    {
      id: "dr-pradeep-menon",
      name: "Dr. Pradeep Menon",
      qualifications: "MBBS, MD (Medicine), DM (Neurology) - NIMHANS",
      specialtyId: "neurology",
      specialtyName: "Senior Neurologist & Stroke Specialist",
      experience: 15,
      rating: 4.96,
      reviewCount: 380,
      fee: 1000,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Malayalam", "Kannada", "Hindi"],
      hospitalAffiliation: "Medicare Brain & Spine Institute",
      modes: ["in-clinic", "video"],
      bio: "Trained at premier institute NIMHANS; expert in refractory headaches, migraine clinics, Parkinson's disease, neuromuscular disorders, and post-stroke rehab.",
      nextSlot: "Tomorrow, 11:00 AM",
      availableDays: ["Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: {
        morning: ["10:00 AM", "11:00 AM", "11:45 AM"],
        afternoon: ["02:30 PM", "03:30 PM"],
        evening: ["05:00 PM", "06:00 PM", "07:15 PM"]
      }
    },
    {
      id: "dr-priya-kulkarni",
      name: "Dr. Priya Kulkarni",
      qualifications: "MBBS, MS (Obstetrics & Gynecology), FMAS - Manipal Hospital",
      specialtyId: "gynecology",
      specialtyName: "Consultant Obstetrician & Laparoscopic Surgeon",
      experience: 13,
      rating: 4.94,
      reviewCount: 610,
      fee: 750,
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400",
      languages: ["English", "Marathi", "Kannada", "Hindi"],
      hospitalAffiliation: "Medicare Mother & Child Wing",
      modes: ["in-clinic", "video"],
      bio: "Dedicated to holistic women's healthcare, high-risk pregnancy management, PCOS lifestyle correction, and minimally invasive keyhole surgeries.",
      nextSlot: "Today, 06:45 PM",
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: {
        morning: ["09:30 AM", "10:30 AM", "11:30 AM"],
        afternoon: ["02:00 PM", "03:00 PM"],
        evening: ["05:30 PM", "06:45 PM", "07:45 PM"]
      }
    }
  ],

  patientProfile: {
    id: "PAT-89231",
    name: "Rajesh Kumar",
    age: 38,
    gender: "Male",
    bloodGroup: "O +ve",
    phone: "+91 98450 12345",
    email: "rajesh.kumar@example.com",
    abhaId: "91-4521-8890-1234",
    emergencyContact: "Sunita Kumar (Wife) - +91 98450 67890",
    knownAllergies: "Penicillin, Sulfa drugs"
  },

  prescriptions: [
    {
      id: "RX-2026-0814",
      date: "2026-08-14",
      doctorName: "Dr. Aravind Sharma",
      specialty: "Cardiology",
      diagnosis: "Essential Hypertension (Stage 1) & Mild Hyperlipidemia",
      vitals: { bp: "138/88 mmHg", pulse: "76 bpm", bmi: "24.2", weight: "74 kg" },
      medicines: [
        {
          name: "Telmisartan 40mg (Telma 40)",
          dosage: "1 Tablet",
          frequency: "1 - 0 - 0 (Morning after breakfast)",
          duration: "30 Days",
          instructions: "Take with warm water regularly. Monitor BP weekly."
        },
        {
          name: "Rosuvastatin 10mg (Rozavel 10)",
          dosage: "1 Tablet",
          frequency: "0 - 0 - 1 (Night after dinner)",
          duration: "30 Days",
          instructions: "Take at bedtime. Avoid grapefruit."
        },
        {
          name: "Cholecalciferol 60,000 IU (Vitamin D3)",
          dosage: "1 Capsule",
          frequency: "Once a week on Sundays with milk",
          duration: "8 Weeks",
          instructions: "Take for 8 consecutive weeks."
        }
      ],
      advice: "Engage in 30 mins brisk walking daily. Reduce dietary sodium (< 5g/day). Repeat Lipid Panel & Serum Creatinine after 4 weeks.",
      followUp: "2026-09-15 (In 1 Month)",
      signedBy: "Dr. Aravind Sharma, MD DM (Cardiology)",
      qrCodeData: "https://medicaresync.health/verify/rx/RX-2026-0814"
    },
    {
      id: "RX-2026-0620",
      date: "2026-06-20",
      doctorName: "Dr. Ananya Sen",
      specialty: "General Medicine",
      diagnosis: "Acute Upper Respiratory Tract Infection & Mild Dehydration",
      vitals: { bp: "120/80 mmHg", pulse: "82 bpm", temp: "100.4°F", weight: "75 kg" },
      medicines: [
        {
          name: "Paracetamol 650mg (Dolo 650)",
          dosage: "1 Tablet",
          frequency: "SOS (Max 3 times daily after food if fever > 99.5°F)",
          duration: "3 Days",
          instructions: "Take when fever or body ache occurs."
        },
        {
          name: "Levocetirizine 5mg + Montelukast 10mg (Montair LC)",
          dosage: "1 Tablet",
          frequency: "0 - 0 - 1 (Night before sleep)",
          duration: "5 Days",
          instructions: "Helps with nasal congestion and cough."
        },
        {
          name: "Azithromycin 500mg (Azithral 500)",
          dosage: "1 Tablet",
          frequency: "1 - 0 - 0 (Once daily 1 hour before meal)",
          duration: "3 Days",
          instructions: "Complete the full 3-day course."
        }
      ],
      advice: "Steam inhalation twice daily. Drink 3+ liters of warm fluids / ORS. Plenty of rest.",
      followUp: "SOS if fever persists beyond 3 days",
      signedBy: "Dr. Ananya Sen, MD (General Medicine)",
      qrCodeData: "https://medicaresync.health/verify/rx/RX-2026-0620"
    }
  ],

  labReports: [
    {
      id: "LAB-2026-8921",
      testName: "Comprehensive Lipid Profile Panel",
      category: "Biochemistry",
      date: "2026-08-14",
      labName: "Medicare Central Diagnostics (NABL Accredited)",
      doctorReferred: "Dr. Aravind Sharma",
      status: "Verified & Ready",
      criticalCount: 1,
      results: [
        { parameter: "Total Cholesterol", value: "218 mg/dL", normalRange: "< 200 mg/dL", flag: "High" },
        { parameter: "HDL (Good Cholesterol)", value: "44 mg/dL", normalRange: "> 40 mg/dL", flag: "Normal" },
        { parameter: "LDL (Bad Cholesterol)", value: "142 mg/dL", normalRange: "< 100 mg/dL", flag: "High" },
        { parameter: "Triglycerides", value: "160 mg/dL", normalRange: "< 150 mg/dL", flag: "Borderline" },
        { parameter: "VLDL Cholesterol", value: "32 mg/dL", normalRange: "5 - 30 mg/dL", flag: "Normal" },
        { parameter: "Total / HDL Ratio", value: "4.95", normalRange: "< 5.0", flag: "Normal" }
      ],
      summary: "Mild elevation in LDL & Total Cholesterol. Statin therapy and low-fat dietary interventions initiated.",
      pathologist: "Dr. Kavita Rao, MD (Pathology), Senior Consultant"
    },
    {
      id: "LAB-2026-8804",
      testName: "Complete Blood Count (CBC) with ESR",
      category: "Hematology",
      date: "2026-06-20",
      labName: "Medicare Central Diagnostics",
      doctorReferred: "Dr. Ananya Sen",
      status: "Verified & Ready",
      criticalCount: 0,
      results: [
        { parameter: "Hemoglobin (Hb)", value: "14.8 g/dL", normalRange: "13.0 - 17.0 g/dL", flag: "Normal" },
        { parameter: "Total WBC Count", value: "7,800 /mcL", normalRange: "4,000 - 11,000 /mcL", flag: "Normal" },
        { parameter: "Platelet Count", value: "2.45 Lakhs/mcL", normalRange: "1.50 - 4.50 Lakhs/mcL", flag: "Normal" },
        { parameter: "RBC Count", value: "4.92 mill/mcL", normalRange: "4.5 - 5.9 mill/mcL", flag: "Normal" },
        { parameter: "ESR (Westergren)", value: "12 mm/hr", normalRange: "0 - 15 mm/hr", flag: "Normal" }
      ],
      summary: "Normal blood counts. No signs of bacterial infection or anemia.",
      pathologist: "Dr. Kavita Rao, MD (Pathology), Senior Consultant"
    },
    {
      id: "LAB-2026-7640",
      testName: "Glycated Hemoglobin (HbA1c) & Fasting Plasma Glucose",
      category: "Diabetology",
      date: "2026-05-10",
      labName: "Medicare Central Diagnostics",
      doctorReferred: "Dr. Ananya Sen",
      status: "Verified & Ready",
      criticalCount: 0,
      results: [
        { parameter: "HbA1c (Glycosylated Hb)", value: "5.6 %", normalRange: "< 5.7 % (Non-Diabetic)", flag: "Normal" },
        { parameter: "Estimated Avg Glucose (eAG)", value: "114 mg/dL", normalRange: "90 - 120 mg/dL", flag: "Normal" },
        { parameter: "Fasting Blood Sugar (FBS)", value: "94 mg/dL", normalRange: "70 - 100 mg/dL", flag: "Normal" }
      ],
      summary: "Euglycemic status within optimal limits.",
      pathologist: "Dr. Kavita Rao, MD (Pathology)"
    }
  ],

  sampleAppointments: [
    {
      id: "MED-2026-8942",
      doctor: {
        id: "dr-aravind-sharma",
        name: "Dr. Aravind Sharma",
        specialtyName: "Cardiology",
        qualifications: "MBBS, MD, DM (Cardiology)"
      },
      patient: {
        name: "Rajesh Kumar",
        phone: "+91 98450 12345",
        age: 38,
        gender: "Male",
        symptoms: "Routine Hypertension Check & Medication Review"
      },
      date: "2026-08-30",
      time: "05:30 PM",
      slotShift: "Evening",
      mode: "in-clinic",
      clinicBranch: "Koramangala Main Center",
      fee: 800,
      tokenNumber: "TK-14",
      status: "Confirmed",
      bookedAt: "2026-08-25T11:42:00Z"
    },
    {
      id: "MED-2026-7120",
      doctor: {
        id: "dr-ananya-sen",
        name: "Dr. Ananya Sen",
        specialtyName: "General Medicine",
        qualifications: "MBBS, MD"
      },
      patient: {
        name: "Rajesh Kumar",
        phone: "+91 98450 12345",
        age: 38,
        gender: "Male",
        symptoms: "Viral fever, cold and severe headache"
      },
      date: "2026-06-20",
      time: "03:00 PM",
      slotShift: "Afternoon",
      mode: "video",
      videoMeetingUrl: "https://telehealth.medicaresync.health/room/MED-2026-7120",
      fee: 550,
      tokenNumber: "TK-08",
      status: "Completed",
      bookedAt: "2026-06-19T09:15:00Z"
    }
  ],

  testimonials: [
    {
      name: "Sneha Reddy",
      city: "Bengaluru",
      rating: 5,
      review: "Booking an in-clinic appointment with Dr. Sharma took literally 30 seconds. The instant WhatsApp confirmation with the Google Maps link was super helpful for my parents!",
      doctor: "Dr. Aravind Sharma (Cardiology)"
    },
    {
      name: "Karthik Subramanian",
      city: "Chennai",
      rating: 5,
      review: "The HD Teleconsultation feature with Dr. Meera Nair was flawless. Got my digital prescription with clear dosage instructions within 5 minutes directly in my portal.",
      doctor: "Dr. Meera Nair (Dermatology)"
    },
    {
      name: "Deepa & Vikas Joshi",
      city: "Bengaluru",
      rating: 5,
      review: "Dr. Rohit is our go-to pediatrician. No waiting in crowded waiting rooms—we arrive at our allocated slot and get attended promptly. Outstanding platform!",
      doctor: "Dr. Rohit Deshmukh (Pediatrics)"
    }
  ],

  faqs: [
    {
      q: "How does the instant WhatsApp confirmation work?",
      a: "Once you confirm your slot, MedicareSync automatically generates a formatted WhatsApp confirmation containing your Booking Reference ID, Doctor details, Date/Time, Clinic address, and a 1-tap Google Maps navigation link. You can open it directly in WhatsApp or download a PDF slip."
    },
    {
      q: "What is the difference between In-Clinic and Video Teleconsultation?",
      a: "In-Clinic consultations take place at our physical clinic hubs with in-person examination. Video consultations take place over an end-to-end encrypted HD video link accessible from your smartphone or laptop, ideal for follow-ups and second opinions."
    },
    {
      q: "How do I access my digital prescriptions and lab reports?",
      a: "Visit the 'Patient Vault' section on this portal. All your digital prescriptions with detailed dosage schedules and NABL-accredited diagnostic lab reports are securely stored and can be downloaded or printed anytime."
    },
    {
      q: "Can I reschedule or cancel my appointment?",
      a: "Yes. You can reschedule or cancel up to 2 hours before your scheduled slot directly from your 'My Appointments' portal or by messaging our automated WhatsApp care desk."
    },
    {
      q: "Is there any emergency service available?",
      a: "Yes! Our 24/7 Emergency Trauma & Ambulance helpline (108 / +91 99887 76655) is always active. Tap the Emergency Banner at the top of the page for immediate assistance."
    }
  ]
};
