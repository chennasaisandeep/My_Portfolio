window.portfolioData = {
    "site": {
        "title": "Saisandeep Chenna",
        "logo": "SS",
        "nav": [
            { "label": "Work", "id": "work" },
            { "label": "Experience", "id": "experience" },
            { "label": "Education", "id": "education" },
            { "label": "Skills", "id": "skills" },
            { "label": "Interests", "id": "hobbies" },
            { "label": "Contact", "id": "contact" }
        ],
        "socials": {
            "linkedin": "https://www.linkedin.com/in/sai-sandeep-chenna-628ab41a7",
            "github": "https://github.com/chennasaisandeep",
            "email": "mailto:saisandeephp@gmail.com"
        },
        "resume": "data/pdf/Saisandeep Chenna.pdf"
    },
    "hero": {
        "headline": "Machine Learning Engineer at HP.",
        "subheadline": "Transforming data into insights. I specialize in building impactful ML solutions, from anomaly detection to web content extraction.",
        "ctas": [
            { "label": "View Projects", "action": "work", "primary": true },
            { "label": "Resume", "action": "resume", "primary": false, "href": "data/pdf/Saisandeep Chenna.pdf" }
        ],
        "metrics": [
            { "label": "Months Experience", "value": "6+" },
            { "label": "Projects Delivered", "value": "3" },
            { "label": "GPA (CMI)", "value": "9.18" }
        ]
    },
    "projects": [
        {
            "id": "proj_solar",
            "title": "Solar Power Anomaly Detection",
            "role": "Data Scientist Intern",
            "company": "Shree Cement Ltd.",
            "location": "Kolkata, West Bengal",
            "year": "May 2024 - Jul 2024",
            "type": "Industrial Internship",
            "summary": "A near real-time anomaly detection system for renewable energy assets, designed to reduce energy wastage and support the transition to green energy.",
            "tags": ["Python", "Power BI", "Streamlit", "Anomaly Detection", "Neural Networks", "EDA"],
            "gradient": "from-amber-500 to-orange-600",
            "links": {},
            "sections": {
                "overview": "At Shree Cement Ltd., I worked with the Data Science & Analytics department to address inefficiencies in solar power generation. The project focused on building a robust system to monitor renewable energy assets in real-time.",
                "problem": "Solar modules often suffer from performance dips due to dust, defects, or environmental factors. Identifying these specific underperforming units manually across vast solar farms is inefficient and leads to significant energy loss.",
                "solution": "I developed a data-driven anomaly detection pipeline. By leveraging historical and real-time sensor data, the system predicts expected power output and flags deviations. This allows the maintenance team to target specific modules for repair or cleaning.",
                "methodology": [
                    { "title": "Data Collection", "description": "Ingested real-time data from inverters and weather stations." },
                    { "title": "Preprocessing", "description": "Cleaned data and handled missing values using statistical imputation." },
                    { "title": "Modeling", "description": "Experimented with Isolation Forests and Autoencoders to learn 'normal' behavior patterns." },
                    { "title": "Deployment", "description": "Built a Streamlit interface for model interaction and integrated results into Microsoft Power BI for the operations team." }
                ],
                "features": [
                    "Real-time monitoring of power output",
                    "Automated alerts for performance deviations",
                    "Interactive Power BI Dashboard",
                    "Root cause analysis support"
                ],
                "results": [
                    { "label": "Energy Efficiency", "value": "Improved" },
                    { "label": "Detection Time", "value": "Real-time" },
                    { "label": "Assets Monitored", "value": "100%" }
                ]
            }
        },
        {
            "id": "proj_covid",
            "title": "Covid-19 Effect on Air Quality",
            "role": "Researcher",
            "company": "Academic Research",
            "location": "Remote",
            "year": "2020",
            "type": "Statistical Analysis",
            "summary": "Investigated the impact of the COVID-19 lockdown on air quality in the Eastern Province of Saudi Arabia using multi-station sensor data.",
            "tags": ["R", "Python", "Hypothesis Testing", "Air Quality", "Statistics", "Data Visualization"],
            "gradient": "from-emerald-500 to-teal-600",
            "links": { "paper": "https://www.isibang.ac.in/~rsen/Stat1old/3.pdf" },
            "sections": {
                "overview": "This study investigated the environmental impact of the nationwide lockdown imposed between March and June 2020 in Saudi Arabia. Using data from four monitoring stations, we analyzed the concentrations of major pollutants including CO, SO2, NO2, O3, and PM10.",
                "problem": "The COVID-19 pandemic forced a global shutdown. While economically devastating, it offered a unique 'natural experiment' to understand how anthropogenic activities influence air quality in arid regions.",
                "solution": "We performed a rigorous statistical analysis (Hypothesis Testing) comparing air quality data across three distinct phases: Pre-lockdown, During-lockdown, and Post-lockdown.",
                "methodology": "The study utilized meteorological and air quality datasets from the Eastern Province. We applied descriptive statistics and outlier analysis. Hypothesis tests were conducted for the mean of each individual pollutant station-wise.",
                "results": [
                    { "label": "NO2 Reduction", "value": "Significant" },
                    { "label": "Ozone (O3)", "value": "Increased" },
                    { "label": "Stations Analyzed", "value": "4" }
                ],
                "features": [
                    "NO2 identified as best marker for lockdown impact",
                    "Found inverse relationship between NOx and Ozone",
                    "Analysis of Pre, During, and Post lockdown phases",
                    "Comparison with global urban data"
                ]
            }
        },
         {
            "id": "proj_gan",
            "title": "Synthetic Data Evaluation Framework",
            "role": "Data Scientist Intern",
            "company": "Cloudcraftz AI",
            "year": "2023",
            "type": "Research & Implementation",
            "summary": "Designed a robust evaluation pipeline for GAN-generated tabular data using the 'TabSynDex' universal metric to quantify fidelity, utility, and privacy.",
            "tags": ["GANs", "TabSynDex", "Python", "Statistical Analysis", "Privacy Preserving"],
            "gradient": "from-purple-600 to-indigo-600",
            "links": {
                 "paper": "https://arxiv.org/pdf/2207.05295"
            },
            "sections": {
                "overview": "Synthetic data generation is critical for privacy-sensitive domains, but evaluating its quality is notoriously difficult. During my internship, I implemented a unified evaluation framework to benchmark various GAN architectures (CTGAN, WGAN-GP, TVAE) against real-world datasets.",
                "problem": "Traditional metrics like accuracy are insufficient for tabular data, which contains mixed data types (categorical/continuous) and complex dependencies. There was no single standard to measure how 'real' the synthetic data actually looked.",
                "solution": "I implemented \"TabSynDex\", a universal metric  that aggregates multiple quality dimensions into a single interpretable score (0-1). This allowed us to objectively rank generative models based on their ability to preserve data distribution and utility.",
                "methodology": [
                    { "title": "Basic Statistical Comparison", "description": "Computed the similarity of mean, median, and standard deviation between real and synthetic columns. Used the Kolmogorov-Smirnov (KS) test to detect distributional shifts." },
                    { "title": "Correlation Preservation", "description": "Calculated the difference between the Correlation Matrices of real and synthetic data (using Pearson for numerical and Theil's U for categorical) to ensure inter-column relationships were maintained." },
                    { "title": "Machine Learning Efficacy", "description": "Executed 'Train on Synthetic, Test on Real' (TSTR) experiments. We trained classifiers (Random Forest, XGBoost) on synthetic data and validated them on real hold-out sets to measure utility." },
                    { "title": "Privacy Assessment", "description": "Performed Distance to Closest Record (DCR) analysis to verify that the GANs were generating novel samples rather than memorizing the training data." }
                ],
                "features": [
                    "Unified TabSynDex Score (0-1) for easy benchmarking",
                    "Support for Mixed-Type Data (Numerical & Categorical)",
                    "Automated comparative reports for CTGAN vs WGAN",
                    "Privacy leakage detection via Distance Metrics"
                ],
                "results": [
                    { "label": "Evaluation Metric", "value": "TabSynDex" },
                    { "label": "Models Ranked", "value": "3+" },
                    { "label": "Outcome", "value": "Validated" }
                ]
            }
        },
        {
            "id": "proj_mlp",
            "title": "MLP Classifier from Scratch",
            "role": "Individual Contributor",
            "company": "Personal Project",
            "year": "2023",
            "type": "Deep Learning Implementation",
            "summary": "A deep dive into the mathematics of Neural Networks by building a Multilayer Perceptron completely from scratch using only NumPy.",
            "tags": ["Python", "NumPy", "Calculus", "Deep Learning", "Algorithms"],
            "gradient": "from-blue-500 to-indigo-600",
            "links": { "github": "https://github.com/chennasaisandeep" },
            "sections": {
                "overview": "Modern frameworks like PyTorch and TensorFlow abstract away the complexity of backpropagation. To truly understand the mechanics of learning, I built a neural network using only matrix multiplication libraries.",
                "problem": "Understanding the 'Black Box' nature of neural networks and the calculus behind gradient descent optimization.",
                "solution": "Implemented a configurable MLP class in Python that handles forward propagation, loss calculation, backpropagation, and weight updates manually.",
                "methodology": [
                    { "title": "Architecture", "description": "Designed a flexible architecture allowing variable hidden layers and neurons." },
                    { "title": "Math", "description": "Implemented derivation of activation functions (Sigmoid/ReLU) and Chain Rule for backpropagation." },
                    { "title": "Optimization", "description": "Coded Stochastic Gradient Descent (SGD) from scratch." },
                    { "title": "Testing", "description": "Benchmarked on the Raisin dataset to classify between Besni and Kecimen varieties." }
                ],
                "results": [
                    { "label": "Precision", "value": "90%" },
                    { "label": "Dependencies", "value": "NumPy Only" },
                    { "label": "Understanding", "value": "100%" }
                ]
            }
        }
    ],
    "experience": [
        {
            "id": 0,
            "company": "HP",
            "role": "Machine Learning Engineer",
            "location": "Bengaluru, Karnataka",
            "period": "Jun 2025 – Present",
            "summary": "Working as a Full-time Machine Learning Engineer.",
            "achievements": [
                "Developing scalable ML solutions.",
                "Leveraging Python, PyTorch, and cloud technologies.",
                "Collaborating with cross-functional teams to deploy models."
            ]
        },
        {
            "id": 0.5,
            "company": "HP",
            "role": "Machine Learning Engineer Intern",
            "location": "Chennai, Tamil Nadu (Remote)",
            "period": "Mar 2025 – May 2025",
            "summary": "Focused on enhancing web content extraction efficiency.",
            "achievements": [
                "Developed a comprehensive HTML readability system.",
                "Leveraged Python's readability module to extract clean main content.",
                "Optimized extraction for A4 print formatting."
            ]
        },
        {
            "id": 1,
            "company": "Shree Cement Ltd.",
            "role": "Data Scientist Intern",
            "location": "Kolkata",
            "period": "May 2024 – Jul 2024",
            "summary": "Improved solar power generation efficiency by creating a data-driven anomaly detection system.",
            "achievements": [
                "Explored Isolation Forest, Local Outlier Factor, DBSCAN.",
                "Developed a near real-time anomaly detection application.",
                "Integrated pipeline with Power BI."
            ]
        },
        {
            "id": 2,
            "company": "Cloudcraftz AI",
            "role": "Data Scientist Intern",
            "location": "Kolkata",
            "period": "May 2023 – Jul 2023",
            "summary": "Worked on evaluating large-scale tabular synthetic data generated by GAN models.",
            "achievements": [
                "Evaluated GAN model quality using statistical metrics.",
                "Optimized BodhiX web application by enabling multiprocessing."
            ]
        }
    ],
    "skills": {
        "Generative AI & Agents": [
            "LangGraph",
            "LangChain",
            "Multi-Agent Systems",
            "Agentic Graph RAG",
            "Vector DBs (Qdrant)",
            "LLM Finetuning"
        ],
        "Deep Learning & Vision": [
            "PyTorch",
            "TensorFlow",
            "Transformers",
            "OpenCV",
            "Hugging Face",
            "Neural Networks"
        ],
        "Data & MLOps": [
            "Pandas",
            "NumPy",
            "SQL",
            "Docker",
            "Git",
            "Power BI"
        ],
        "Math & Foundations": [
            "Python",
            "Probability & Statistics",
            "Calculus",
            "Linear Algebra",
            "Algorithms",
            "Data Structures"
        ]
    },
    "education": [
        {
            "school": "Chennai Mathematical Institute",
            "degree": "M.Sc. Data Science",
            "year": "Aug 2023 - Apr 2025",
            "grade": "GPA: 9.18",
            "icon": "fa-graduation-cap"
        },
        {
            "school": "Indian Statistical Institute",
            "degree": "B.Math (Hons.)",
            "year": "July 2019 - May 2022",
            "grade": "77% (First Div)",
            "icon": "fa-university"
        }
    ],
    "certificates": [
        {
            "name": "Google Data Analytics Professional",
            "issuer": "Google (Coursera)",
            "description": "Comprehensive program covering data fundamentals, preparation, processing, and analysis.",
            "icon": "fab fa-google",
            "link": "https://www.coursera.org/account/accomplishments/professional-cert/PJDUC7GM2YW7"
        },
        {
            "name": "Complete Data Science Bootcamp",
            "issuer": "Udemy",
            "description": "End-to-end data science training including classification, regression, clustering, and DL.",
            "icon": "fas fa-certificate",
            "images": [
                "https://udemy-certificate.s3.amazonaws.com/image/UC-63128b89-958c-43ea-a363-92aa011fbcc2.jpg?v=1654781806000"
            ],
            "link": "https://www.udemy.com/certificate/UC-63128b89-958c-43ea-a363-92aa011fbcc2/"
        },
        {
            "name": "Tensorflow for Deep Learning Bootcamp",
            "issuer": "Udemy",
            "description": "Comprehensive TensorFlow 2 mastery covering Neural Networks, CNNs, RNNs, NLP, Computer Vision, Transfer Learning, and Time Series.",
            "icon": "fas fa-brain",
            "images": [
                "https://udemy-certificate.s3.amazonaws.com/image/UC-e6b0542b-58a1-4ea7-8ef0-80f58ddb8ac1.jpg?v=1765541464000"
            ],
            "link": "https://www.udemy.com/certificate/UC-e6b0542b-58a1-4ea7-8ef0-80f58ddb8ac1/"
        },
        {
            "name": "Complete Python Pro Bootcamp",
            "issuer": "Udemy",
            "description": "Advanced Python programming concepts and best practices.",
            "icon": "fab fa-python",
            "images": [
                "https://udemy-certificate.s3.amazonaws.com/image/UC-fd0b1ffa-4d87-41b1-af4b-f750aa13dbe1.jpg"
            ],
            "link": "https://www.udemy.com/certificate/UC-fd0b1ffa-4d87-41b1-af4b-f750aa13dbe1/"
        }
    ],
    "hobbies": [
        {
            "name": "Photography & Editing",
            "description": "I love capturing moments and bringing them to life through creative editing.",
            "icon": "fa-camera",
            "gallery": [
                "images/photography/1.jpg", "images/photography/2.jpg", "images/photography/3.jpg",
                "images/photography/4.jpg", "images/photography/5.jpg", "images/photography/6.jpg"
            ]
        },
        {
            "name": "CGI & VFX",
            "description": "Creating 3D graphics and visual effects using Blender 3D and After Effects.",
            "icon": "fa-cube",
            "gallery": [
                "images/renders/7.jpg", "images/renders/8.jpg", "images/renders/9.jpg",
                "images/renders/10.jpg", "images/renders/11.jpg"
            ]
        },
        {
            "name": "Drawing",
            "description": "Passionate about anamorphic art and perspective manipulation.",
            "icon": "fa-paint-brush",
            "gallery": [
                "images/drawings/12.jpg", "images/drawings/13.jpg", "images/drawings/14.jpg",
                "images/drawings/15.jpg", "images/drawings/16.jpg"
            ]
        },
        {
            "name": "Music",
            "description": "Music is my stress buster. I enjoy exploring different genres and discovering new artists.",
            "icon": "fa-music",
            "playlists": {
                "English": [
                    { "title": "Perfect", "artist": "Ed Sheeran", "link": "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
                    { "title": "Uptown Funk", "artist": "Mark Ronson ft. Bruno Mars", "link": "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
                    { "title": "Until I Found You", "artist": "Stephen Sanchez & Em Beihold", "link": "https://www.youtube.com/watch?v=hWCZP3MXdkE" },
                    { "title": "Shape of You", "artist": "Ed Sheeran", "link": "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
                    { "title": "Blinding Lights", "artist": "The Weeknd", "link": "https://www.youtube.com/watch?v=4NRXx6U8ABQ" }
                ],
                "Telugu": [
                    { "title": "Hukum", "artist": "Anirudh Ravichander", "link": "https://www.youtube.com/watch?v=u2CpHdkz-bs" },
                    { "title": "Samajavaragamana", "artist": "Sid Sriram", "link": "https://www.youtube.com/watch?v=VwjbJEdYT4s" },
                    { "title": "Naatu Naatu", "artist": "Rahul Sipligunj, Kaala Bhairava", "link": "https://www.youtube.com/watch?v=OsU0CGZoV8E" },
                    { "title": "Butta Bomma", "artist": "Armaan Malik", "link": "https://www.youtube.com/watch?v=q7P9AJi0P3E" },
                    { "title": "Oo Antava", "artist": "Indravathi Chauhan", "link": "https://www.youtube.com/watch?v=LB7D36n_xCw" }
                ],
                "Hindi": [
                    { "title": "Kesariya", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=bZIp90pC00E" },
                    { "title": "Apna Bana Le", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=BddP6PYo2gs" },
                    { "title": "Tum Hi Ho", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=Umqb9KENgmk" },
                    { "title": "Raabta", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=Hx4Df7JsHWI" },
                    { "title": "Channa Mereya", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=bzSTpdcs-EA" }
                ],
                "Others": [
                    { "title": "Telepatía", "artist": "Kali Uchis", "link": "https://www.youtube.com/watch?v=bn_p95HbHoQ" },
                    { "title": "Comment Allez-Vous?", "artist": "Leslie Clio", "link": "https://www.youtube.com/watch?v=tKhEnC9YSd4" },
                    { "title": "Despacito", "artist": "Luis Fonsi", "link": "https://www.youtube.com/watch?v=kJQP7kiw5Fk" },
                    { "title": "Con Altura", "artist": "ROSALÍA & J Balvin", "link": "https://www.youtube.com/watch?v=p7bfOZek9t4" }
                ]
            }
        },
        {
            "name": "Fast Typing",
            "description": "Achieved typing speed of 67 WPM to boost coding productivity.",
            "icon": "fa-keyboard"
        }
    ]
};
