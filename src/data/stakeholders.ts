const stakeholders = {
  "credit-risk": [
    {
      "stakeholder": "Loan Officer",
      "description": "A financial professional responsible for assessing loan applications and making lending decisions based on risk assessments.",
      "values": [
        { "name": "Learning", "score": 4.2 },
        { "name": "Utility", "score": 4.5 },
        { "name": "Fulfilment", "score": 4.1 },
        { "name": "Engagement", "score": 4.3 }
      ]
    },
    {
      "stakeholder": "Compliance Analyst",
      "description": "A specialist who ensures that loan decisions follow regulatory and organisational compliance policies.",
      "values": [
        { "name": "Learning", "score": 3.8 },
        { "name": "Utility", "score": 4.0 },
        { "name": "Fulfilment", "score": 3.9 },
        { "name": "Engagement", "score": 3.6 }
      ]
    },
    {
      "stakeholder": "Applicant",
      "description": "An individual applying for a loan who receives and tries to understand the decision and explanation given by the AI.",
      "values": [
        { "name": "Learning", "score": 2.1 },
        { "name": "Utility", "score": 2.3 },
        { "name": "Fulfilment", "score": 2.0 },
        { "name": "Engagement", "score": 2.5 }
      ]
    }
  ],
  "fracture-diagnosis": [
    {
      "stakeholder": "Radiologist",
      "description": "A medical expert who interprets medical images to diagnose fractures and assess the AI's accuracy and reasoning.",
      "values": [
        { "name": "Learning", "score": 4.6 },
        { "name": "Utility", "score": 4.4 },
        { "name": "Fulfilment", "score": 4.5 },
        { "name": "Engagement", "score": 4.2 }
      ]
    },
    {
      "stakeholder": "Orthopaedic Surgeon",
      "description": "A specialist who treats fractures and uses the AI explanation to plan surgical interventions or confirm diagnoses.",
      "values": [
        { "name": "Learning", "score": 4.2 },
        { "name": "Utility", "score": 4.0 },
        { "name": "Fulfilment", "score": 4.3 },
        { "name": "Engagement", "score": 4.0 }
      ]
    },
    {
      "stakeholder": "Patient",
      "description": "A person who has suffered a fracture and is presented with the AI explanation to better understand their diagnosis.",
      "values": [
        { "name": "Learning", "score": 2.3 },
        { "name": "Utility", "score": 2.5 },
        { "name": "Fulfilment", "score": 2.2 },
        { "name": "Engagement", "score": 2.4 }
      ]
    },
    {
      "stakeholder": "Hospital Administrator",
      "description": "An administrative figure who evaluates the AI explanation for its effectiveness, resource implications, and overall quality of care delivery.",
      "values": [
        { "name": "Learning", "score": 3.5 },
        { "name": "Utility", "score": 3.6 },
        { "name": "Fulfilment", "score": 3.4 },
        { "name": "Engagement", "score": 3.2 }
      ]
    }
  ],
  "course-assistant": [
    {
      "stakeholder": "Student",
      "description": "A learner using the AI explanation to understand their performance and make decisions about future learning paths.",
      "values": [
        { "name": "Learning", "score": 3.9 },
        { "name": "Utility", "score": 4.2 },
        { "name": "Fulfilment", "score": 4.0 },
        { "name": "Engagement", "score": 4.1 }
      ]
    },
    {
      "stakeholder": "Academic Advisor",
      "description": "A staff member who guides students using AI-generated insights to support course planning and personal development.",
      "values": [
        { "name": "Learning", "score": 4.3 },
        { "name": "Utility", "score": 4.4 },
        { "name": "Fulfilment", "score": 4.2 },
        { "name": "Engagement", "score": 4.0 }
      ]
    },
    {
      "stakeholder": "Lecturer",
      "description": "An educator who assesses the AI explanation’s ability to complement or inform their teaching and student progress evaluations.",
      "values": [
        { "name": "Learning", "score": 2.5 },
        { "name": "Utility", "score": 2.2 },
        { "name": "Fulfilment", "score": 2.0 },
        { "name": "Engagement", "score": 2.6 }
      ]
    },
    {
      "stakeholder": "Course Leader",
      "description": "An academic responsible for overseeing the course’s structure and quality, evaluating how the AI explanations align with learning objectives.",
      "values": [
        { "name": "Learning", "score": 3.7 },
        { "name": "Utility", "score": 3.8 },
        { "name": "Fulfilment", "score": 3.9 },
        { "name": "Engagement", "score": 3.5 }
      ]
    }
  ]
};

export default stakeholders;
