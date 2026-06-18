const stakeholders = {
  "credit-risk": [
    {
      "stakeholder": "Loan Officer",
      "description": "A financial professional responsible for assessing loan applications and making lending decisions based on risk assessments.",
      "values": [
        { "name": "Utility", "score": 4.5 },
        { "name": "Satisfaction", "score": 4.1 },
        { "name": "Effectiveness", "score": 4.25 }
      ]
    },
    {
      "stakeholder": "Compliance Analyst",
      "description": "A specialist who ensures that loan decisions follow regulatory and organisational compliance policies.",
      "values": [
        { "name": "Utility", "score": 4.0 },
        { "name": "Satisfaction", "score": 3.9 },
        { "name": "Effectiveness", "score": 3.7 }
      ]
    },
    {
      "stakeholder": "Applicant",
      "description": "An individual applying for a loan who receives and tries to understand the decision and explanation given by the AI.",
      "values": [
        { "name": "Utility", "score": 2.3 },
        { "name": "Satisfaction", "score": 2.0 },
        { "name": "Effectiveness", "score": 2.3 }
      ]
    }
  ],
  "fracture-diagnosis": [
    {
      "stakeholder": "Radiologist",
      "description": "A medical expert who interprets medical images to diagnose fractures and assess the AI's accuracy and reasoning.",
      "values": [
        { "name": "Utility", "score": 4.4 },
        { "name": "Satisfaction", "score": 4.5 },
        { "name": "Effectiveness", "score": 4.4 }
      ]
    },
    {
      "stakeholder": "Orthopaedic Surgeon",
      "description": "A specialist who treats fractures and uses the AI explanation to plan surgical interventions or confirm diagnoses.",
      "values": [
        { "name": "Utility", "score": 4.0 },
        { "name": "Satisfaction", "score": 4.3 },
        { "name": "Effectiveness", "score": 4.1 }
      ]
    },
    {
      "stakeholder": "Patient",
      "description": "A person who has suffered a fracture and is presented with the AI explanation to better understand their diagnosis.",
      "values": [
        { "name": "Utility", "score": 2.5 },
        { "name": "Satisfaction", "score": 2.2 },
        { "name": "Effectiveness", "score": 2.35 }
      ]
    },
    {
      "stakeholder": "Hospital Administrator",
      "description": "An administrative figure who evaluates the AI explanation for its effectiveness, resource implications, and overall quality of care delivery.",
      "values": [
        { "name": "Utility", "score": 3.6 },
        { "name": "Satisfaction", "score": 3.4 },
        { "name": "Effectiveness", "score": 3.35 }
      ]
    }
  ],
  "course-assistant": [
    {
      "stakeholder": "Student",
      "description": "A learner using the AI explanation to understand their performance and make decisions about future learning paths.",
      "values": [
        { "name": "Utility", "score": 4.2 },
        { "name": "Satisfaction", "score": 4.0 },
        { "name": "Effectiveness", "score": 4.0 }
      ]
    },
    {
      "stakeholder": "Academic Advisor",
      "description": "A staff member who guides students using AI-generated insights to support course planning and personal development.",
      "values": [
        { "name": "Utility", "score": 4.4 },
        { "name": "Satisfaction", "score": 4.2 },
        { "name": "Effectiveness", "score": 4.15 }
      ]
    },
    {
      "stakeholder": "Lecturer",
      "description": "An educator who assesses the AI explanation's ability to complement or inform their teaching and student progress evaluations.",
      "values": [
        { "name": "Utility", "score": 2.2 },
        { "name": "Satisfaction", "score": 2.0 },
        { "name": "Effectiveness", "score": 2.55 }
      ]
    },
    {
      "stakeholder": "Course Leader",
      "description": "An academic responsible for overseeing the course's structure and quality, evaluating how the AI explanations align with learning objectives.",
      "values": [
        { "name": "Utility", "score": 3.8 },
        { "name": "Satisfaction", "score": 3.9 },
        { "name": "Effectiveness", "score": 3.6 }
      ]
    }
  ]
};

export default stakeholders;
