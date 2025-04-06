import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Tell me about diease cancer. Please give the question asked by user and the answer in the json format, give question and answer as a field\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "question": "Tell me about the disease cancer.",\n  "answer": "Cancer is not a single disease, but rather a collection of over 100 diseases characterized by the uncontrolled growth and spread of abnormal cells. Here\'s a breakdown of key aspects:\\n\\n**What Happens in Cancer:**\\n\\n*   **Uncontrolled Cell Growth:** Normal cells grow, divide, and die in a regulated process. Cancer cells, however, develop mutations that disrupt this process. They may grow too rapidly, divide uncontrollably, and fail to die when they should. This leads to a buildup of abnormal cells.\\n*   **Tumor Formation:** This excess of abnormal cells often forms a mass or lump called a tumor. Tumors can be benign (non-cancerous) or malignant (cancerous). Benign tumors don\'t spread to other parts of the body, while malignant tumors do.\\n*   **Metastasis:** Metastasis is the spread of cancer cells from the primary tumor to other parts of the body. Cancer cells can break away from the original tumor and travel through the bloodstream or lymphatic system to form new tumors in distant organs or tissues. This process makes cancer much harder to treat.\\n\\n**Causes and Risk Factors:**\\n\\n*   **Genetic Mutations:** Cancer is primarily caused by changes (mutations) in DNA, the genetic material within cells. These mutations can be inherited (passed down from parents), acquired during a person\'s lifetime (due to environmental factors), or occur randomly as cells divide.\\n*   **Environmental Factors:** Exposure to certain environmental factors can increase the risk of cancer. These include:\\n    *   **Tobacco use:** Smoking is a leading cause of many types of cancer, including lung, throat, and bladder cancer.\\n    *   **Radiation:** Exposure to ionizing radiation (e.g., from X-rays or radon gas) and ultraviolet (UV) radiation (from the sun or tanning beds) can damage DNA and increase cancer risk.\\n    *   **Chemicals:** Exposure to certain chemicals, such as asbestos, benzene, and vinyl chloride, can increase the risk of specific cancers.\\n    *   **Infections:** Some viral and bacterial infections, such as human papillomavirus (HPV) and Helicobacter pylori (H. pylori), can increase the risk of certain cancers.\\n*   **Lifestyle Factors:** Certain lifestyle choices can influence cancer risk, including:\\n    *   **Diet:** A diet high in processed foods, red meat, and sugary drinks, and low in fruits, vegetables, and whole grains, is associated with increased cancer risk.\\n    *   **Obesity:** Being overweight or obese increases the risk of several types of cancer.\\n    *   **Physical inactivity:** Lack of physical activity is linked to increased cancer risk.\\n    *   **Alcohol consumption:** Excessive alcohol consumption increases the risk of certain cancers, such as liver, breast, and colon cancer.\\n\\n**Types of Cancer:**\\n\\nCancer is classified based on the type of cell or tissue in which it originates. Common types include:\\n\\n*   **Carcinoma:** Arises from epithelial cells, which line the surfaces of the body. This is the most common type of cancer (e.g., lung cancer, breast cancer, colon cancer).\\n*   **Sarcoma:** Arises from connective tissues, such as bone, cartilage, fat, and muscle.\\n*   **Leukemia:** Cancer of the blood-forming tissues, such as bone marrow, resulting in the production of abnormal blood cells.\\n*   **Lymphoma:** Cancer of the lymphatic system, which is part of the immune system.\\n*   **Melanoma:** Cancer that begins in melanocytes (cells that produce pigment).\\n*   **Brain and spinal cord tumors:** These cancers can be either benign or malignant.\\n\\n**Symptoms:**\\n\\nCancer symptoms vary widely depending on the type, location, and stage of the disease. Some common signs and symptoms include:\\n\\n*   Unexplained weight loss\\n*   Fatigue\\n*   Persistent pain\\n*   Changes in bowel or bladder habits\\n*   Unusual bleeding or discharge\\n*   A lump or thickening in any part of the body\\n*   A sore that does not heal\\n*   Changes in a mole or wart\\n*   Persistent cough or hoarseness\\n\\n**Diagnosis:**\\n\\nCancer is typically diagnosed through a combination of methods, including:\\n\\n*   **Physical examination:** A doctor will examine the patient for any signs or symptoms of cancer.\\n*   **Imaging tests:** X-rays, CT scans, MRI scans, PET scans, and ultrasounds can help visualize tumors and assess their size and location.\\n*   **Biopsy:** A tissue sample is removed from the suspected tumor and examined under a microscope to confirm the presence of cancer cells.\\n*   **Blood tests:** Blood tests can help detect certain substances that may indicate the presence of cancer.\\n\\n**Treatment:**\\n\\nCancer treatment depends on the type, stage, and location of the cancer, as well as the patient\'s overall health. Common treatment options include:\\n\\n*   **Surgery:** Removal of the tumor and surrounding tissue.\\n*   **Radiation therapy:** Using high-energy rays to kill cancer cells.\\n*   **Chemotherapy:** Using drugs to kill cancer cells throughout the body.\\n*   **Immunotherapy:** Stimulating the body\'s immune system to attack cancer cells.\\n*   **Targeted therapy:** Using drugs that specifically target cancer cells\' unique characteristics.\\n*   **Hormone therapy:** Blocking the effects of hormones that fuel certain cancers.\\n*   **Stem cell transplant:** Replacing damaged bone marrow with healthy stem cells.\\n\\n**Prevention:**\\n\\nWhile not all cancers are preventable, several steps can be taken to reduce the risk:\\n\\n*   **Avoid tobacco use.**\\n*   **Maintain a healthy weight.**\\n*   **Eat a healthy diet.**\\n*   **Be physically active.**\\n*   **Limit alcohol consumption.**\\n*   **Protect your skin from the sun.**\\n*   **Get vaccinated against HPV and hepatitis B.**\\n*   **Get regular cancer screenings.**\\n\\n**Important Note:** This information is for general knowledge and informational purposes only, and does not constitute medical advice. It is essential to consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment."\n}\n```',
        },
      ],
    },
  ],
});
